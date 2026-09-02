# Situs Sekolah Resmi - SD Negeri Sumber Waru 2

Proyek ini adalah full-stack Next.js 15 (App Router) + TypeScript + Tailwind + Supabase untuk situs resmi dan sistem administrasi sekolah.

## 🎯 Fitur Utama

### Website Publik
- 🏠 Homepage dengan hero section
- 📋 Halaman Profil Sekolah
- 📰 Blog/Berita dengan CRUD
- 🖼️ Galeri Foto
- 📝 Pendaftaran PPDB Online
- 🏆 Prestasi & Achievement
- 📞 Halaman Kontak

### Dashboard Admin
- 👥 Multi-role Authentication (Admin, Kepala Sekolah, Guru, Operator, Bendahara)
- 📊 Dashboard dengan Statistik Real-time
- 👨‍🎓 Manajemen Data Siswa (CRUD + Search)
- 📝 Kelola Berita & Publikasi
- 📋 Manajemen PPDB dengan Status Approval
- 🖼️ Galeri Management
- 👨‍🏫 Manajemen Data Guru
- 📈 Laporan & Analytics
- ⚙️ Pengaturan Sistem

### Teknologi
- ✅ Next.js 15 dengan App Router
- ✅ TypeScript untuk type safety
- ✅ Tailwind CSS untuk styling
- ✅ Supabase untuk database & authentication
- ✅ React Query untuk data fetching
- ✅ React Hook Form + Zod untuk form validation
- ✅ Lucide React untuk icons
- ✅ PWA support untuk offline access
- ✅ SEO optimized

## 🚀 Quickstart (Local Development)

### Prerequisites
- Node.js 18+ dan npm/yarn
- Supabase account (https://app.supabase.com)

### Setup Steps

#### 1. Clone Repository
```bash
git clone https://github.com/SDSWADA2/situs-sekolah-resmi.git
cd situs-sekolah-resmi
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Setup Supabase
1. Buat project baru di https://app.supabase.com
2. Ambil credentials di Project Settings → API:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

#### 4. Konfigurasi Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` dengan values dari Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx
```

#### 5. Setup Database
Jalankan SQL migrations di Supabase SQL Editor:

**5a. Schema Creation** - Copy-paste dari `app/db/schema.sql`
**5b. RLS Policies** - Copy-paste dari `app/db/rls.sql`

Atau gunakan Supabase CLI:
```bash
supabase link --project-ref xxxxx
supabase db push
```

#### 6. Buat Admin User
Di Supabase Authentication, buat user dengan:
- Email: `admin@sekolah.local`
- Password: `password123`

Kemudian di table `users`, insert:
```sql
INSERT INTO users (email, name, role) VALUES
('admin@sekolah.local', 'Administrator', 'admin');
```

#### 7. Jalankan Development Server
```bash
npm run dev
```

Akses aplikasi:
- 🌐 Website: http://localhost:3000
- 🔐 Login: http://localhost:3000/login
- 📊 Dashboard: http://localhost:3000/dashboard

## 🌐 Deployment

### Deploy ke Vercel

1. Push ke GitHub
2. Connect repository ke Vercel
3. Set environment variables di Vercel dashboard:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   ```
4. Deploy!

### Production Checklist
- ✅ Enable Supabase Realtime
- ✅ Enable Supabase Storage
- ✅ Configure RLS policies
- ✅ Setup email templates di Supabase
- ✅ Enable HTTPS
- ✅ Setup domain
- ✅ Configure CORS untuk Supabase

## 📁 Project Structure

```
app/
├── dashboard/              # Admin dashboard pages
│   ├── students/          # Student management
│   ├── articles/          # News management
│   ├── ppdb/             # PPDB management
│   └── page.tsx          # Dashboard home
├── components/            # Reusable components
│   ├── dashboard/        # Dashboard components
│   └── Navbar.tsx
├── hooks/                 # Custom React hooks
│   ├── useAuth.ts        # Auth state management
│   └── useAdminStats.ts  # Dashboard stats
├── lib/                   # Utilities
│   └── supabase.ts       # Supabase client
├── types/                 # TypeScript interfaces
│   └── index.ts
├── styles/                # Global styles
│   └── globals.css
├── db/                    # Database
│   ├── schema.sql        # Tables definition
│   └── rls.sql           # Row level security
├── login/                 # Auth pages
│   └── page.tsx
└── page.tsx              # Homepage
```

## 🔐 Role-Based Access Control

| Role | Akses |
|------|-------|
| **Admin** | Semua menu |
| **Kepala Sekolah** | Dashboard, Siswa, Berita, PPDB, Galeri, Guru, Laporan |
| **Guru** | Siswa |
| **Operator** | Dashboard, Siswa, Berita, PPDB, Galeri |
| **Bendahara** | Laporan |

## 📚 API Routes (Future)

```
api/
├── auth/
├── students/
├── articles/
├── ppdb/
├── upload/
└── reports/
```

## 🔄 Realtime Features (Future)

- Live notification untuk PPDB approval
- Chat support
- Real-time student updates
- Activity feeds

## 📝 Database Schema

### Users
- id, email, name, role, created_at

### Articles
- id, title, slug, content, excerpt, author, image, published, created_at

### Students
- id, name, email, phone, address, class_id, enrollment_date

### PPDB Applications
- id, student_name, email, phone, address, birth_date, documents[], status, created_at

### Gallery
- id, title, description, image_url, category, created_at

## 🛠️ Development

### Available Scripts
```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Technologies Stack
- Frontend: React 19, Next.js 15, TypeScript
- Styling: Tailwind CSS 4
- Backend: Supabase (PostgreSQL)
- Authentication: Supabase Auth
- State Management: Custom Hooks + Context
- Forms: React Hook Form + Zod
- Icons: Lucide React

## 📦 Dependencies

Lihat `package.json` untuk daftar lengkap dependencies.

## 🤝 Contributing

Contributions welcome! Silakan buat issue atau PR.

## 📄 License

MIT License - Gratis untuk digunakan dan dimodifikasi.

## 📧 Support

Untuk pertanyaan atau bantuan, hubungi admin@sekolah.local

---

**Dibuat dengan ❤️ untuk SD Negeri Sumber Waru 2**
