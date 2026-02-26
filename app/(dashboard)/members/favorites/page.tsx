'use client'

import { HeartIcon, SearchIcon, Trash2Icon, BookOpenIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const FAVORITES = [
  { id: 1, title: "Laskar Pelangi", category: "Novel", author: "Andrea Hirata", available: true },
  { id: 2, title: "Atomic Habits", category: "Self Dev", author: "James Clear", available: false },
  { id: 3, title: "Dilan 1990", category: "Romance", author: "Pidi Baiq", available: true },
  { id: 4, title: "Sapiens", category: "Sejarah", author: "Yuval Noah Harari", available: true },
]

export default function MyFavoritesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-900">
            <HeartIcon className="size-6 text-red-500 fill-red-500" /> Buku Favorit
          </h1>
          <p className="text-sm text-muted-foreground">Simpan buku yang ingin kamu baca nanti di sini.</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input 
            placeholder="Cari di favorit..." 
            className="w-full bg-slate-50 border-none rounded-lg py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {FAVORITES.map((book) => (
          <div key={book.id} className="group relative space-y-3">
            {/* Book Cover Container */}
            <div className="aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden relative shadow-sm group-hover:shadow-md transition-all border group-hover:border-primary/50">
              <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold text-xs uppercase italic">
                Cover Buku
              </div>
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="secondary" className="size-8 rounded-full">
                  <BookOpenIcon className="size-4" />
                </Button>
                <Button size="icon" variant="destructive" className="size-8 rounded-full">
                  <Trash2Icon className="size-4" />
                </Button>
              </div>

              <div className="absolute top-2 left-2">
                <Badge className={book.available ? "bg-green-500/90" : "bg-slate-500/90"} variant="default">
                  <div className={`size-1.5 rounded-full mr-1.5 animate-pulse ${book.available ? 'bg-white' : 'bg-slate-300'}`} />
                  {book.available ? "Tersedia" : "Kosong"}
                </Badge>
              </div>
            </div>

            {/* Book Info */}
            <div className="space-y-1">
              <h3 className="font-bold text-sm truncate leading-tight">{book.title}</h3>
              <p className="text-[10px] text-muted-foreground font-medium uppercase">{book.author}</p>
              <p className="text-[10px] font-bold text-primary">{book.category}</p>
            </div>
          </div>
        ))}
      </div>

      {FAVORITES.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <HeartIcon className="size-12 text-slate-200 mb-4" />
          <h3 className="font-bold text-slate-400 italic">Belum ada buku favorit</h3>
        </div>
      )}
    </div>
  )
}