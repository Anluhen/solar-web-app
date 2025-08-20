CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- envios
CREATE TABLE IF NOT EXISTS envios (
  id BIGSERIAL PRIMARY KEY,
  pep TEXT NOT NULL,
  zvgp TEXT NOT NULL,
  gerador TEXT NOT NULL,
  observacoes TEXT,
  status TEXT NOT NULL CHECK (status IN ('RASCUNHO','ENVIADO','CANCELADO')) DEFAULT 'RASCUNHO',  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- materiais
CREATE TABLE IF NOT EXISTS materiais (
  id BIGSERIAL PRIMARY KEY,
  envios_id BIGINT REFERENCES envios(id) ON DELETE CASCADE,
  SAP BIGSERIAL NOT NULL,
  descricao TEXT NOT NULL,
  quantidade INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- trigger to keep updated_at fresh
-- CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
-- BEGIN
--   NEW.updated_at = now();
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- DROP TRIGGER IF EXISTS envios_set_updated_at ON envios;
-- CREATE TRIGGER envios_set_updated_at
-- BEFORE UPDATE ON envios
-- FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- -- helpful index
-- CREATE INDEX IF NOT EXISTS idx_envios_created_at ON envios(created_at DESC);
