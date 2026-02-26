'use client'

import { 
  MessageSquareIcon, 
  StarIcon, 
  Edit3Icon, 
  Trash2Icon, 
  EyeIcon,
  CheckCircle2Icon,
  ClockIcon
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const MY_REVIEWS = [
  {
    id: 1,
    bookTitle: "Atomic Habits",
    author: "James Clear",
    rating: 5,
    date: "12 Feb 2026",
    content: "Perubahan kecil yang memberikan hasil luar biasa. Buku ini sangat membantu saya mengatur jadwal belajar di SMK.",
    status: "Published",
    views: 124,
    likes: 45
  },
  {
    id: 2,
    bookTitle: "Hujan",
    author: "Tere Liye",
    rating: 4,
    date: "05 Feb 2026",
    content: "Ceritanya sangat menyentuh. Tentang persahabatan, cinta, dan melupakan. Latar masa depannya juga sangat imajinatif.",
    status: "Pending",
    views: 0,
    likes: 0
  }
]

export default function MyReviewsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-900">
            <MessageSquareIcon className="size-6 text-primary" /> Ulasan Saya
          </h1>
          <p className="text-sm text-muted-foreground">Kelola semua ulasan buku yang telah kamu tulis.</p>
        </div>
        
        <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="text-center px-4 border-r border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</p>
            <p className="text-xl font-bold text-slate-900">12</p>
          </div>
          <div className="text-center px-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Likes</p>
            <p className="text-xl font-bold text-primary">158</p>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {MY_REVIEWS.map((review) => (
          <Card key={review.id} className="border-none shadow-sm hover:shadow-md transition-all overflow-hidden group">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Thumbnail Buku (Hidden on Mobile) */}
                <div className="hidden md:flex w-40 bg-slate-50 items-center justify-center border-r border-slate-100 italic text-[10px] text-slate-300 font-bold">
                  COVER BUKU
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg leading-tight">{review.bookTitle}</h3>
                      <p className="text-xs text-slate-500 mt-1">Oleh {review.author}</p>
                    </div>
                    <Badge 
                      variant={review.status === 'Published' ? 'secondary' : 'outline'}
                      className={`w-fit h-6 text-[10px] font-bold ${
                        review.status === 'Published' 
                        ? 'bg-green-50 text-green-600 border-green-100' 
                        : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}
                    >
                      {review.status === 'Published' ? (
                        <CheckCircle2Icon className="mr-1 size-3" />
                      ) : (
                        <ClockIcon className="mr-1 size-3" />
                      )}
                      {review.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className={`size-3.5 ${i < review.rating ? 'fill-current' : 'text-slate-200'}`} />
                    ))}
                    <span className="text-xs text-slate-400 ml-2 font-medium">{review.date}</span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-3 rounded-lg border border-slate-50">
                    "{review.content}"
                  </p>

                  <Separator className="opacity-50" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-slate-400">
                      <div className="flex items-center gap-1.5 text-xs">
                        <EyeIcon className="size-3.5" />
                        {review.views} Views
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
                        <StarIcon className="size-3.5 fill-primary" />
                        {review.likes} Likes
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 px-3 text-[10px] font-bold text-slate-600 hover:text-primary transition-colors">
                        <Edit3Icon className="mr-1.5 size-3.5" /> EDIT
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-3 text-[10px] font-bold text-red-500 hover:bg-red-50 transition-colors">
                        <Trash2Icon className="mr-1.5 size-3.5" /> HAPUS
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {MY_REVIEWS.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <MessageSquareIcon className="size-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-slate-400 italic">Belum ada ulasan yang kamu tulis.</h3>
        </div>
      )}
    </div>
  )
}