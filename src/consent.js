'use strict';

/**
 * Consent manager — three tiers, persisted, revocable.
 *
 *   off         : capture nothing; drop the queue and send nothing.
 *   anonymized  : default. feature/device/engagement events, scrubbed & pseudonymized.
 *   full        : opt-in. same scrubbed data, plus opt-in non-PHI attributes.
 */

const TIERS = ['off', 'anonymized', 'full'];
const DEFAULT_TIER = 'anonymized';

class ConsentManager {
  constructor(opts = {}) {
    this.persist = opts.persist || (() => {});
    this.load = opts.load || (() => undefined);
    const loaded = this.load();
    this.tier = loaded && TIERS.includes(loaded) ? loaded : (opts.tier || DEFAULT_TIER);
    this.listeners = new Set();
  }

  get current() { return this.tier; }
  get enabled() { return this.tier !== 'off'; }

  set(tier) {
    if (!TIERS.includes(tier)) throw new Error('Invalid consent tier: ' + tier);
    this.tier = tier;
    this.persist(tier);
    for (const fn of this.listeners) fn(tier);
  }

  onChange(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }

  allows(eventClass) {
    if (this.tier === 'off') return false;
    return ['feature_usage', 'device_performance', 'dashboard_engagement'].includes(eventClass);
  }
}

module.exports = { ConsentManager, TIERS, DEFAULT_TIER };
