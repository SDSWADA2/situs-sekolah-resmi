-- RLS policies template (apply after enabling row level security)

-- Enable RLS on tables
ALTER TABLE IF EXISTS news ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS ppdb_applicants ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS students ENABLE ROW LEVEL SECURITY;

-- Example policy: allow authenticated users to insert data
CREATE POLICY IF NOT EXISTS "auth_insert" ON news FOR INSERT USING (auth.role() <> 'anonymous');

-- Allow select to everyone for published news
CREATE POLICY IF NOT EXISTS "public_select_published" ON news FOR SELECT USING (status = 'publish');

-- Allow full access to super_admin
CREATE POLICY IF NOT EXISTS "super_admin_full_access" ON news FOR ALL USING (
  auth.role() = 'authenticated' AND (current_setting('request.jwt.claims.role', true) = 'super_admin')
);

-- For ppdb: allow operators and super_admin to update, others can insert
CREATE POLICY IF NOT EXISTS "ppdb_insert_authenticated" ON ppdb_applicants FOR INSERT USING (auth.role() = 'authenticated');
CREATE POLICY IF NOT EXISTS "ppdb_operator_update" ON ppdb_applicants FOR UPDATE USING (current_setting('request.jwt.claims.role', true) IN ('operator','super_admin'));

-- Note: Adjust policies to map your JWT claims structure. Supabase sets claims under "request.jwt.claims".
