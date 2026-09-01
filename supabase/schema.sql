-- Supabase SQL schema for situs-sekolah-resmi

-- Enable uuid-ossp if needed
-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users and roles
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE,
  display_name text,
  phone text,
  role_id uuid REFERENCES roles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

-- News / Berita
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  summary text,
  content text,
  thumbnail text,
  category text,
  tags text[],
  author_id uuid REFERENCES users(id),
  status text DEFAULT 'draft', -- draft|publish
  featured boolean DEFAULT false,
  seo_meta jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

-- Gallery
CREATE TABLE IF NOT EXISTS galleries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  description text,
  images jsonb,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

-- PPDB Applicants
CREATE TABLE IF NOT EXISTS ppdb_applicants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_no text UNIQUE,
  nik text,
  nisn text,
  name text,
  birth_place text,
  birth_date date,
  gender text,
  religion text,
  address text,
  parent_name text,
  phone text,
  files jsonb,
  status text DEFAULT 'pending', -- pending|verified|accepted|rejected
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

-- Teachers
CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nuptk text,
  nip text,
  name text,
  degree text,
  gender text,
  birth_place text,
  birth_date date,
  religion text,
  address text,
  education text,
  position text,
  status text,
  photo text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

-- Students
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nis text,
  nisn text,
  name text,
  birth_place text,
  birth_date date,
  gender text,
  class text,
  parent jsonb,
  contact text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

-- Audit log
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid,
  table_name text,
  record_id uuid,
  action text,
  changes jsonb,
  created_at timestamptz DEFAULT now()
);

-- Basic indexes
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_ppdb_reg_no ON ppdb_applicants(registration_no);

-- Sample roles
INSERT INTO roles (id, name, description) VALUES
  (gen_random_uuid(), 'super_admin', 'Full access'),
  (gen_random_uuid(), 'kepala_sekolah', 'Access for kepala sekolah'),
  (gen_random_uuid(), 'guru', 'Guru role'),
  (gen_random_uuid(), 'operator', 'Operator role'),
  (gen_random_uuid(), 'bendahara', 'Bendahara role')
ON CONFLICT (name) DO NOTHING;
