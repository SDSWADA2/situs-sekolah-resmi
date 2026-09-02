import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            SD Sumber Waru 2
          </Link>
          <ul className="flex gap-6 text-sm font-medium">
            <li><Link href="/" className="hover:text-indigo-600">Beranda</Link></li>
            <li><Link href="/profil" className="hover:text-indigo-600">Profil</Link></li>
            <li><Link href="/berita" className="hover:text-indigo-600">Berita</Link></li>
            <li><Link href="/ppdb" className="hover:text-indigo-600">PPDB</Link></li>
            <li><Link href="/admin" className="hover:text-indigo-600">Admin</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
