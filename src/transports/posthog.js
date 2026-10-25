'use strict';

/**
 * PostHog self-hosted transport. Sends batched events to the /capture endpoint.
 * Uses the write-only ingest token (project API key). Refuses non-HTTPS in production.
 */

const https = require('https');
const http = require('http');

class PostHogTransport {
  constructor(opts) {
    this.endpoint = opts.endpoint.replace(/\/+$/, '');
    this.apiKey = opts.apiKey;
    this.allowInsecure = !!opts.allowInsecure;
    if (!this.allowInsecure && !this.endpoint.startsWith('https://')) {
      throw new Error('Telemetry transport requires an https:// endpoint in production');
    }
  }

  async send(batch) {
    const payload = JSON.stringify({
      api_key: this.apiKey,
      batch: batch.map((e) => ({ event: e.event, properties: e })),
    });

    return new Promise((resolve, reject) => {
      const url = new URL('/capture/', this.endpoint);
      const lib = url.protocol === 'https:' ? https : http;
      const req = lib.request({
        method: 'POST',
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: url.pathname + url.search,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      }, (res) => {
        res.resume();
        if (res.statusCode >= 200 && res.statusCode < 300) resolve();
        else reject(new Error('Telemetry transport HTTP ' + res.statusCode));
      });
      req.on('error', reject);
      req.setTimeout(10_000, () => { req.destroy(new Error('Telemetry transport timeout')); });
      req.write(payload);
      req.end();
    });
  }
}

module.exports = { PostHogTransport };
