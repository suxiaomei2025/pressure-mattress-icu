'use strict';

const express = require('express');
const { Pool } = require('pg');

const PORT = Number(process.env.PORT || 8080);
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();
app.use(express.json());

// Minimal structured JSON logging (no PII in logs).
function log(level, msg, fields) {
  const line = { ts: new Date().toISOString(), level: level, msg: msg };
  if (fields) Object.assign(line, fields);
  console.log(JSON.stringify(line));
}

// Connection pool; created lazily from DATABASE_URL.
const pool = DATABASE_URL ? new Pool({ connectionString: DATABASE_URL, max: 10 }) : null;

// Liveness: the process is up.
app.get('/health', function (_req, res) {
  res.json({ status: 'ok', service: 'pressure-mattress-api', ts: new Date().toISOString() });
});

// Readiness: the process can reach the database.
app.get('/ready', async function (_req, res) {
  if (!pool) return res.status(503).json({ status: 'not_ready', reason: 'no database configured' });
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ready' });
  } catch (err) {
    log('error', 'readiness check failed', { error: err.message });
    res.status(503).json({ status: 'not_ready', reason: err.message });
  }
});

// Service metadata.
app.get('/api/v1/info', function (_req, res) {
  res.json({ service: 'pressure-mattress-api', version: '1.0.0', env: process.env.NODE_ENV || 'development' });
});

// Domain: patient risk overview (read-only demo of DB connectivity).
app.get('/api/v1/patients', async function (_req, res) {
  if (!pool) return res.status(503).json({ error: 'database unavailable' });
  try {
    const result = await pool.query(
      'SELECT p.id, p.mrn, p.full_name, p.risk_score, p.updated_at, b.name AS bed_name ' +
      'FROM patients p LEFT JOIN beds b ON b.id = p.bed_id ' +
      'ORDER BY p.risk_score DESC LIMIT 100'
    );
    res.json({ patients: result.rows });
  } catch (err) {
    log('error', 'failed to list patients', { error: err.message });
    res.status(500).json({ error: 'internal error' });
  }
});

app.listen(PORT, function () {
  log('info', 'api listening', { port: PORT, level: LOG_LEVEL });
});
