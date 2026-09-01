import Link from 'next/link'

export default function Navbar(){
  return (
    <nav className="w-full bg-white/60 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">SW</div>
          <div>
            <div className="font-semibold">SD Negeri Sumber Waru 2</div>
            <div className="text-xs text-slate-600">Kab. Pamekasan — Jawa Timur</div>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/profil" className="hover:text-primary">Profil</Link>
          <Link href="/berita" className="hover:text-primary">Berita</Link>
          <Link href="/galeri" className="hover:text-primary">Galeri</Link>
          <Link href="/ppdb" className="bg-primary text-white px-4 py-2 rounded-xl shadow-lg">PPDB</Link>
        </div>
      </div>
    </nav>
  )
}
