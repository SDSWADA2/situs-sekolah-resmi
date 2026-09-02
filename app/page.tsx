import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-indigo-600">
              SD Negeri Sumber Waru 2
            </div>
            <ul className="flex gap-6 text-sm font-medium">
              <li><Link href="/" className="hover:text-indigo-600">Beranda</Link></li>
              <li><Link href="/profil" className="hover:text-indigo-600">Profil</Link></li>
              <li><Link href="/berita" className="hover:text-indigo-600">Berita</Link></li>
              <li><Link href="/ppdb" className="hover:text-indigo-600">PPDB</Link></li>
              <li><Link href="/kontak" className="hover:text-indigo-600">Kontak</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Selamat Datang di SD Negeri Sumber Waru 2
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Membangun pendidikan berkualitas untuk masa depan cerah
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700">
            Daftar PPDB
          </button>
          <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50">
            Pelajari Lebih Lanjut
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Fitur Utama</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Informasi Sekolah", desc: "Data lengkap profil dan program sekolah" },
              { title: "PPDB Online", desc: "Pendaftaran peserta didik baru secara digital" },
              { title: "Berita & Galeri", desc: "Update kegiatan dan prestasi sekolah" },
            ].map((item, i) => (
              <div key={i} className="p-6 border rounded-lg hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 SD Negeri Sumber Waru 2. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
