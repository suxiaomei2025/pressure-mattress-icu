'use strict';

const { scrubObject, assertNoPII } = require('./scrubber');
const { createAnonymizer } = require('./anonymizer');
const { ConsentManager } = require('./consent');
const { featureUsage, devicePerformance, dashboardEngagement } = require('./events');
const { PostHogTransport } = require('./transports/posthog');

class TelemetryClient {
  constructor(opts = {}) {
    this.consent = new ConsentManager({
      tier: opts.consent,
      persist: opts.persistConsent,
      load: opts.loadConsent,
    });
    this.anonymize = createAnonymizer(opts.salt);
    this.app = {
      name: 'pressure-mattress-icu',
      version: opts.appVersion || '0.0.0',
      env: opts.env || 'dev',
    };
    this.user = {
      ...(opts.anonymousId ? { anonymousId: this.anonymize(opts.anonymousId) } : {}),
      ...(opts.facilityId ? { facilityHash: this.anonymize(opts.facilityId) } : {}),
    };
    this.queue = [];
    this.maxQueue = opts.maxQueue || 250;
    this.flushIntervalMs = opts.flushIntervalMs || 10_000;
    this.transport = opts.transport || new PostHogTransport({
      endpoint: opts.endpoint,
      apiKey: opts.apiKey,
      allowInsecure: opts.allowInsecure,
    });

    this._timer = setInterval(() => this.flush().catch(() => {}), this.flushIntervalMs);
    if (this._timer.unref) this._timer.unref();

    this.consent.onChange((tier) => {
      if (tier === 'off') this.queue.length = 0;
    });
  }

  _ctx() {
    return { consentTier: this.consent.current, app: this.app, user: this.user };
  }

  _track(eventObj) {
    if (!this.consent.enabled) return false;
    const scrubbed = scrubObject(eventObj, this.anonymize);
    assertNoPII(scrubbed);
    this.queue.push(scrubbed);
    if (this.queue.length >= this.maxQueue) this.flush().catch(() => {});
    return true;
  }

  trackFeature(name, opts) { return this._track(featureUsage(this._ctx(), name, opts)); }
  trackDevicePerformance(metrics) { return this._track(devicePerformance(this._ctx(), metrics)); }
  trackDashboardEngagement(opts) { return this._track(dashboardEngagement(this._ctx(), opts)); }

  setConsent(tier) { this.consent.set(tier); }

  async flush() {
    if (this.queue.length === 0) return;
    const batch = this.queue.splice(0, this.queue.length);
    try {
      await this.transport.send(batch);
    } catch (err) {
      this.queue = this.queue.concat(batch).slice(-this.maxQueue);
      throw err;
    }
  }

  shutdown() {
    clearInterval(this._timer);
    return this.flush();
  }
}

module.exports = { TelemetryClient };
