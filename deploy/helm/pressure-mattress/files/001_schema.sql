-- =============================================================================
-- PressureMattress ICU - on-prem database schema
-- Idempotent: safe to re-run; uses CREATE TABLE IF NOT EXISTS.
-- Domain: ICU pressure-relief mattress monitoring (beds, patients, devices,
-- sensor readings, and alerts).
-- =============================================================================

CREATE TABLE IF NOT EXISTS beds (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL UNIQUE,
    unit        TEXT,
    status      TEXT NOT NULL DEFAULT 'available'
                CHECK (status IN ('available', 'occupied', 'maintenance')),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS patients (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mrn         TEXT NOT NULL UNIQUE,          -- medical record number
    full_name   TEXT NOT NULL,
    bed_id      UUID REFERENCES beds(id) ON DELETE SET NULL,
    risk_score  INTEGER NOT NULL DEFAULT 0 CHECK (risk_score BETWEEN 0 AND 100),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS mattress_devices (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    serial_number     TEXT NOT NULL UNIQUE,
    bed_id            UUID REFERENCES beds(id) ON DELETE SET NULL,
    firmware_version  TEXT,
    last_seen_at      TIMESTAMPTZ,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sensor_readings (
    id            BIGSERIAL PRIMARY KEY,
    device_id     UUID NOT NULL REFERENCES mattress_devices(id) ON DELETE CASCADE,
    patient_id    UUID REFERENCES patients(id) ON DELETE SET NULL,
    pressure_mmhg NUMERIC(8,2),
    position      TEXT,
    recorded_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sensor_readings_device_time
    ON sensor_readings (device_id, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_sensor_readings_patient_time
    ON sensor_readings (patient_id, recorded_at DESC);

CREATE TABLE IF NOT EXISTS alerts (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id  UUID REFERENCES patients(id) ON DELETE CASCADE,
    type        TEXT NOT NULL,
    severity    TEXT NOT NULL DEFAULT 'info'
                CHECK (severity IN ('info', 'warning', 'critical')),
    message     TEXT NOT NULL,
    status      TEXT NOT NULL DEFAULT 'open'
                CHECK (status IN ('open', 'acknowledged', 'resolved')),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Keep patients.updated_at fresh on any update.
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_patients_updated_at ON patients;
CREATE TRIGGER trg_patients_updated_at
    BEFORE UPDATE ON patients
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
