'use strict';

/**
 * Typed event constructors. Each returns an object shaped to pass schema validation,
 * carrying ONLY non-identifying, bounded values. Identifiers are pseudonymized by the
 * client before serialization.
 */

const SCHEMA_VERSION = '1.0.0';

let counter = 0;
function eventId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  counter = (counter + 1) % 0xffffffff;
  return 'evt_' + Date.now().toString(36) + '_' + counter.toString(36);
}

function envelope(event, fields) {
  return {
    eventId: eventId(),
    event,
    schemaVersion: SCHEMA_VERSION,
    sentAt: new Date().toISOString(),
    consentTier: fields.consentTier,
    app: fields.app,
    user: fields.user,
    ...fields.payload,
  };
}

function featureUsage(ctx, name, opts = {}) {
  return envelope('feature_usage', {
    consentTier: ctx.consentTier, app: ctx.app, user: ctx.user,
    payload: {
      feature: {
        name,
        action: opts.action || 'click',
        ...(opts.screen ? { screen: opts.screen } : {}),
      },
    },
  });
}

function devicePerformance(ctx, metrics = {}) {
  return envelope('device_performance', {
    consentTier: ctx.consentTier, app: ctx.app, user: ctx.user,
    payload: {
      device: {
        type: metrics.type || 'mattress',
        ...(metrics.modelHash ? { modelHash: metrics.modelHash } : {}),
        ...(metrics.firmwareMajor !== undefined ? { firmwareMajor: metrics.firmwareMajor } : {}),
        ...(metrics.batteryLevel !== undefined ? { batteryLevel: metrics.batteryLevel } : {}),
        ...(metrics.reconnectCount !== undefined ? { reconnectCount: metrics.reconnectCount } : {}),
        ...(metrics.sensorLatencyMs !== undefined ? { sensorLatencyMs: metrics.sensorLatencyMs } : {}),
      },
    },
  });
}

function dashboardEngagement(ctx, opts = {}) {
  return envelope('dashboard_engagement', {
    consentTier: ctx.consentTier, app: ctx.app, user: ctx.user,
    payload: {
      engagement: {
        page: opts.page || '/',
        ...(opts.durationMs !== undefined ? { durationMs: opts.durationMs } : {}),
        ...(opts.depth !== undefined ? { depth: opts.depth } : {}),
      },
    },
  });
}

module.exports = { featureUsage, devicePerformance, dashboardEngagement, SCHEMA_VERSION, envelope };
