import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <section className="h-screen flex items-center" aria-label="Hero Sekolah">
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold" style={{color:'#0F766E'}}>SD Negeri Sumber Waru 2</h1>
          <p className="mt-4 text-lg text-slate-600">Membangun Generasi Cerdas dan Berakhlak Mulia — Kabupaten Pamekasan</p>
          <div className="mt-6 flex gap-3">
            <a href="/ppdb" className="bg-primary text-white px-5 py-3 rounded-xl shadow hover:opacity-95">Daftar PPDB</a>
            <a href="#profil" className="border border-slate-200 px-5 py-3 rounded-xl">Profil Sekolah</a>
          </div>
        </motion.div>
        <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="flex items-center justify-center">
          <div className="w-full max-w-md rounded-xl overflow-hidden shadow-lg glass">
            <img src="/images/school.jpg" alt="Foto sekolah" className="w-full h-64 object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
