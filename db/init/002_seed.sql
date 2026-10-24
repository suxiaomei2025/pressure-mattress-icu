-- =============================================================================
-- Optional seed data for local development and demos.
-- Loaded by docker-compose only (NOT part of the production Helm chart).
-- Idempotent via ON CONFLICT ... DO NOTHING.
-- =============================================================================

INSERT INTO beds (name, unit, status) VALUES
    ('ICU-BED-01', 'ICU-A', 'occupied'),
    ('ICU-BED-02', 'ICU-A', 'available'),
    ('ICU-BED-03', 'ICU-B', 'occupied')
ON CONFLICT (name) DO NOTHING;

INSERT INTO patients (mrn, full_name, bed_id, risk_score) VALUES
    ('MRN-1001', 'Demo Patient One', (SELECT id FROM beds WHERE name = 'ICU-BED-01'), 42),
    ('MRN-1002', 'Demo Patient Two', (SELECT id FROM beds WHERE name = 'ICU-BED-03'), 78)
ON CONFLICT (mrn) DO NOTHING;
