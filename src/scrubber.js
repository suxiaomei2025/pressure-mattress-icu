'use strict';

/**
 * PII/PHI scrubber — deny-by-default.
 *
 * Every field in an event must pass an allowlist. Known identifier-shaped fields are
 * redacted or pseudonymized. This runs unconditionally (independent of consent tier):
 * consent widens WHICH event classes are captured, never WHETHER identifiers are stripped.
 */

// HIPAA "18 identifiers" mapped to a mitigation rule.
const PHI_RULES = {
  name: 'redact', fullName: 'redact', givenName: 'redact', familyName: 'redact',
  dateOfBirth: 'redact', birthDate: 'redact', admissionDate: 'redact', dischargeDate: 'redact',
  phone: 'redact', phoneNumber: 'redact', fax: 'redact', email: 'redact',
  ssn: 'redact', socialSecurityNumber: 'redact',
  mrn: 'pseudonymize', medicalRecordNumber: 'pseudonymize',
  accountNumber: 'pseudonymize', healthPlanNumber: 'pseudonymize',
  certificateNumber: 'pseudonymize', licenseNumber: 'pseudonymize',
  serialNumber: 'pseudonymize', deviceSerial: 'pseudonymize', vehicleId: 'pseudonymize',
  ip: 'redact', ipAddress: 'redact', url: 'redact',
  biometric: 'redact', photo: 'redact', fullFacePhoto: 'redact',
  streetAddress: 'redact', city: 'redact', state: 'redact', postalCode: 'redact', zipCode: 'redact',
  facilityName: 'redact', facilityAddress: 'redact', address: 'redact',
  latitude: 'redact', longitude: 'redact',
};

// Fields explicitly allowed to pass through unchanged. Keys NOT in this map and NOT in
// PHI_RULES are dropped.
const ALLOWED_FIELDS = new Set([
  'eventId', 'schemaVersion', 'sentAt', 'consentTier', 'event',
  'name', 'version', 'env',
  'anonymousId', 'facilityHash', 'modelHash',
  'type', 'firmwareMajor', 'batteryLevel', 'reconnectCount', 'sensorLatencyMs',
  'action', 'screen', 'page', 'durationMs', 'depth',
]);

const REDACTED = '<redacted>';
const DROPPED = Symbol('dropped');

function scrubValue(key, value, anonymizer) {
  if (PHI_RULES[key] === 'redact') return REDACTED;
  if (PHI_RULES[key] === 'pseudonymize') return anonymizer(value);
  if (ALLOWED_FIELDS.has(key)) return value;
  return DROPPED;
}

function scrubObject(obj, anonymizer) {
  if (obj === null || typeof obj !== 'object') return obj;
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      const scrubbed = scrubObject(value, anonymizer);
      if (scrubbed && Object.keys(scrubbed).length > 0) out[key] = scrubbed;
      continue;
    }
    const result = scrubValue(key, value, anonymizer);
    if (result !== DROPPED) out[key] = result;
  }
  return out;
}

function assertNoPII(event) {
  const json = JSON.stringify(event);
  const patterns = [
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
    /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/,
    /\b\d{3}-\d{2}-\d{4}\b/,
  ];
  for (const p of patterns) {
    if (p.test(json)) {
      throw new Error('Telemetry scrub failed: identifier-shaped data detected in event');
    }
  }
  return event;
}

module.exports = { scrubObject, scrubValue, assertNoPII, PHI_RULES, ALLOWED_FIELDS, REDACTED, DROPPED };
