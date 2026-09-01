# Situs Sekolah Resmi - SD Negeri Sumber Waru 2

Proyek ini adalah full-stack Next.js 15 (App Router) + TypeScript + Tailwind + Supabase untuk situs resmi dan sistem administrasi sekolah.

Fitur utama:
- Website publik: Home, Profil, Berita, Galeri, PPDB, Prestasi, Kontak, dll.
- Dashboard admin dengan multi-role (Super Admin, Kepala Sekolah, Guru, Operator, Bendahara)
- Realtime (Supabase Realtime)
- PPDB online dengan upload berkas dan bukti PDF
- CRUD Berita, Galeri, Guru, Siswa, Surat, BOS, Inventaris, Perpustakaan, Absensi
- PWA, SEO, Accessibility

Quickstart (lokal):

1. Clone repository
   git clone https://github.com/SDSWADA2/situs-sekolah-resmi.git
   cd situs-sekolah-resmi

2. Install dependencies
   npm install

3. Buat project Supabase (https://app.supabase.com) dan catat:
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY (jika perlu untuk migrations)
   - SUPABASE_ANON_KEY

4. Salin file .env.example menjadi .env.local dan isi variabel

5. Buat database dan jalankan SQL migrations di /supabase/schema.sql dan /supabase/rls.sql (gunakan SQL editor di Supabase)

6. Jalankan development
   npm run dev

Deploy
- Deploy ke Vercel. Set environment variables di dashboard Vercel.
- Pastikan Supabase Realtime dan storage sudah diaktifkan.

Dokumentasi lebih lengkap akan ditambahkan. Jika Anda ingin, saya akan melanjutkan dengan menambahkan fitur CRUD Berita lengkap, uploader ke Supabase Storage, server actions, dan integrasi RLS + Auth.
