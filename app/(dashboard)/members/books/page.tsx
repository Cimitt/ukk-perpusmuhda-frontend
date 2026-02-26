'use client'

import { useState } from 'react'
import { 
  SearchIcon, 
  FilterIcon, 
  StarIcon, 
  ArrowUpDownIcon,
  HeartIcon,
  InfoIcon,
  BookOpenIcon,
  MapPinIcon,
  LayersIcon
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Separator } from '@/components/ui/separator'

const BOOKS = [
  { id: 1, title: "Laskar Pelangi", author: "Andrea Hirata", category: "Novel", stock: 5, rating: 4.8, location: "Rak A-12", isbn: "978-602-291", description: "Kisah perjuangan sepuluh anak di Belitung dalam menempuh pendidikan di sekolah yang penuh keterbatasan." },
  { id: 2, title: "Atomic Habits", author: "James Clear", category: "Self Dev", stock: 0, rating: 4.9, location: "Rak B-05", isbn: "978-602-063", description: "Panduan praktis untuk membangun kebiasaan baik dan menghilangkan kebiasaan buruk dengan perubahan kecil." },
  { id: 3, title: "Fisika Modern", author: "Dr. Eng. Sumarsono", category: "Edukasi", stock: 12, rating: 4.5, location: "Rak C-01", isbn: "978-979-011", description: "Pembahasan mendalam mengenai mekanika kuantum, relativitas, dan partikel subatomik." },
  { id: 4, title: "Filosofi Teras", author: "Henry Manampiring", category: "Philosophy", stock: 3, rating: 4.7, location: "Rak B-02", isbn: "978-602-412", description: "Penerapan stoisisme dalam kehidupan sehari-hari untuk menjaga ketenangan mental." },
  { id: 5, title: "Bumi", author: "Tere Liye", category: "Fantasy", stock: 8, rating: 4.6, location: "Rak A-08", isbn: "978-602-030", description: "Petualangan tiga sahabat di dunia paralel yang penuh dengan kekuatan magis dan teknologi canggih." },
]

export default function BrowseCatalogPage() {
  const [search, setSearch] = useState('')
  const [selectedBook, setSelectedBook] = useState<typeof BOOKS[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenDetail = (book: typeof BOOKS[0]) => {
    setSelectedBook(book)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Search Bar Section */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Katalog Buku</h1>
          <p className="text-sm text-muted-foreground">Jelajahi ribuan koleksi buku Perpustakaan Smuhda.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input 
              placeholder="Cari judul buku, penulis, atau ISBN..." 
              className="pl-10 h-11 bg-white shadow-sm border-slate-200 focus:ring-primary/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-[140px] h-11 bg-white">
                <FilterIcon className="size-3.5 mr-2" />
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="novel">Novel</SelectItem>
                <SelectItem value="edukasi">Edukasi</SelectItem>
                <SelectItem value="teknologi">Teknologi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {BOOKS.map((book) => (
          <Card key={book.id} className="border-none shadow-sm group hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden ring-1 ring-slate-100">
            <div className="aspect-[3/4] bg-slate-100 relative overflow-hidden flex items-center justify-center">
              <div className="text-slate-300 font-bold italic group-hover:scale-110 transition-transform duration-500">
                COVER BUKU
              </div>
              <div className="absolute top-3 right-3">
                <Badge className={`${book.stock > 0 ? 'bg-green-500/90' : 'bg-red-500/90'} backdrop-blur-sm border-none text-[9px] h-5`}>
                  {book.stock > 0 ? 'Tersedia' : 'Kosong'}
                </Badge>
              </div>
            </div>

            <CardContent className="p-4 flex-1 flex flex-col gap-1">
              <div className="flex items-center gap-1 text-amber-500 mb-1">
                <StarIcon className="size-3 fill-current" />
                <span className="text-[10px] font-bold text-slate-600">{book.rating}</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                {book.title}
              </h3>
              <p className="text-[10px] text-slate-500 font-medium italic">{book.author}</p>
            </CardContent>

            <CardFooter className="p-3 bg-slate-50/50 border-t flex gap-2">
              <Button 
                size="sm" 
                className="w-full text-[10px] h-8 font-bold"
                onClick={() => handleOpenDetail(book)}
              >
                <InfoIcon className="size-3 mr-1.5" /> Detail Buku
              </Button>
              <Button size="icon" variant="outline" className="h-8 w-8 shrink-0 hover:text-red-500">
                <HeartIcon className="size-3.5" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* DIALOG DETAIL BUKU */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] overflow-hidden">
          {selectedBook && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">{selectedBook.title}</DialogTitle>
                <DialogDescription className="text-xs">
                  Informasi ketersediaan dan detail teknis buku.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                <div className="flex gap-6">
                  <div className="w-32 h-44 bg-slate-100 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-slate-400">NO COVER</span>
                  </div>
                  <div className="space-y-3 flex-1">
                    <div>
                      <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold text-primary border-primary/20 bg-primary/5">
                        {selectedBook.category}
                      </Badge>
                      <h4 className="text-sm font-bold mt-2">{selectedBook.author}</h4>
                      <p className="text-[11px] text-muted-foreground">ISBN: {selectedBook.isbn}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-md bg-slate-50 border border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Stok</p>
                        <p className={`text-sm font-extrabold ${selectedBook.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedBook.stock} Buku
                        </p>
                      </div>
                      <div className="p-2 rounded-md bg-slate-50 border border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Lokasi</p>
                        <p className="text-sm font-extrabold text-slate-700 flex items-center gap-1">
                          <MapPinIcon className="size-3 text-primary" /> {selectedBook.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-xs font-bold flex items-center gap-2">
                    <BookOpenIcon className="size-3.5" /> Sinopsis
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed text-justify italic">
                    {selectedBook.description}
                  </p>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 flex items-start gap-3">
                  <LayersIcon className="size-4 text-amber-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-amber-900 leading-none">Status Pinjam</p>
                    <p className="text-[10px] text-amber-700">
                      {selectedBook.stock > 0 
                        ? "Buku tersedia untuk dipinjam langsung di perpustakaan." 
                        : "Buku sedang habis, silakan tambahkan ke favorit untuk dipantau."}
                    </p>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" className="text-xs" onClick={() => setIsModalOpen(false)}>
                  Tutup
                </Button>
                <Button className="text-xs" disabled={selectedBook.stock === 0}>
                  {selectedBook.stock > 0 ? "Ajukan Peminjaman" : "Ingatkan Saya"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}