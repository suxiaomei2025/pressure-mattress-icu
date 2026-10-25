'use strict';

const assert = require('assert');
const { scrubObject, assertNoPII, REDACTED } = require('../src/scrubber');
const { createAnonymizer } = require('../src/anonymizer');

const anonymize = createAnonymizer('test-salt');

function t(name, fn) {
  try { fn(); console.log('ok  ' + name); }
  catch (e) { console.error('FAIL ' + name); console.error(e); process.exitCode = 1; }
}

t('redacts email addresses', () => {
  const out = scrubObject({ email: 'nurse@hospital.org' }, anonymize);
  assert.strictEqual(out.email, REDACTED);
});

t('pseudonymizes medical record numbers', () => {
  const out = scrubObject({ mrn: 'MRN-12345' }, anonymize);
  assert.notStrictEqual(out.mrn, 'MRN-12345');
  assert.strictEqual(out.mrn.length, 32);
  assert.doesNotMatch(out.mrn, /MRN/);
});

t('drops unknown/free-text fields', () => {
  const out = scrubObject({ freeTextNote: 'patient complained of pain' }, anonymize);
  assert.strictEqual(out.freeTextNote, undefined);
});

t('keeps allowed bounded numeric metrics', () => {
  const out = scrubObject({ sensorLatencyMs: 42, batteryLevel: 0.87 }, anonymize);
  assert.strictEqual(out.sensorLatencyMs, 42);
  assert.strictEqual(out.batteryLevel, 0.87);
});

t('deterministic pseudonymization for same salt+value', () => {
  const a = createAnonymizer('same-salt')('facility-9');
  const b = createAnonymizer('same-salt')('facility-9');
  assert.strictEqual(a, b);
});

t('different salt yields different hash (rotation breaks joins)', () => {
  const a = createAnonymizer('salt-a')('facility-9');
  const b = createAnonymizer('salt-b')('facility-9');
  assert.notStrictEqual(a, b);
});

t('assertNoPII rejects identifier remnants', () => {
  assert.throws(() => assertNoPII({ note: 'call 555-123-4567' }));
});

console.log(process.exitCode ? '\nSome tests failed' : '\nAll tests passed');
