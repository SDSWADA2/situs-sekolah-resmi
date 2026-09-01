import Hero from '../components/Hero'
import Navbar from '../components/Navbar'

export default async function Home(){
  return (
    <main>
      <Navbar />
      <Hero />
      <section className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold">Berita Terbaru</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* NewsCard components will render dynamically from Supabase */}
          <div className="p-4 glass rounded-xl shadow">Contoh Berita</div>
          <div className="p-4 glass rounded-xl shadow">Contoh Berita</div>
          <div className="p-4 glass rounded-xl shadow">Contoh Berita</div>
        </div>
      </section>
    </main>
  )
}
