import './styles/globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'SD Negeri Sumber Waru 2 - Situs Resmi',
  description: 'Website resmi dan sistem administrasi SD Negeri Sumber Waru 2, Pamekasan, Jawa Timur.'
}

export default function RootLayout({ children }: { children: ReactNode }){
  return (
    <html lang="id">
      <body className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800">
        {children}
      </body>
    </html>
  )
}
