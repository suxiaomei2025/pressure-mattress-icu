'use strict';

/**
 * Pseudonymization via HMAC-SHA256 with a rotating salt.
 * Pure Node (no external deps) using the built-in crypto module.
 */

const crypto = require('crypto');
const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function base62(bytes) {
  let n = BigInt('0x' + bytes.toString('hex'));
  if (n === 0n) return '0';
  let out = '';
  while (n > 0n) {
    out = ALPHABET[Number(n % 62n)] + out;
    n = n / 62n;
  }
  return out;
}

/**
 * Create an anonymizer bound to a salt. The salt should be a per-deployment secret,
 * rotated periodically. The client intentionally does NOT retain old salts, so a rotated
 * salt breaks longitudinal joinability — a privacy feature.
 */
function createAnonymizer(salt, length = 32) {
  if (!salt) throw new Error('Telemetry anonymizer requires a non-empty salt');
  return function anonymize(value) {
    if (value === null || value === undefined) return null;
    const h = crypto.createHmac('sha256', salt).update(String(value)).digest();
    return base62(h).slice(0, length);
  };
}

module.exports = { createAnonymizer, base62 };
