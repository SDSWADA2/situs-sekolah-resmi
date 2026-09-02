-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE ppdb_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Users can read public articles
CREATE POLICY "articles_read_public" ON articles
  FOR SELECT USING (published = true);

-- Admins can do everything
CREATE POLICY "articles_admin" ON articles
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- PPDB applications can be created by anyone
CREATE POLICY "ppdb_create" ON ppdb_applications
  FOR INSERT WITH CHECK (true);

-- Users can view their own applications
CREATE POLICY "ppdb_read_own" ON ppdb_applications
  FOR SELECT USING (email = current_user_email());

-- Gallery is public
CREATE POLICY "gallery_read_public" ON gallery
  FOR SELECT USING (true);
