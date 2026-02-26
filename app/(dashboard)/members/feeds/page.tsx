'use client'

import { 
  HeartIcon, 
  MessageCircleIcon, 
  Share2Icon, 
  StarIcon, 
  MoreHorizontalIcon,
  PlusIcon,
  FlameIcon
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const FEEDS = [
  {
    id: 1,
    user: {
      name: "Bagas Pratama",
      class: "XI TKJ 2",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bagas"
    },
    book: {
      title: "Filosofi Teras",
      author: "Henry Manampiring",
      category: "Self Development"
    },
    rating: 5,
    content: "Buku ini bener-bener ngerubah cara pandang gue soal masalah hidup. Stoikisme ternyata aplikatif banget buat anak sekolah yang sering kena mental! Wajib baca pokoknya. 🔥",
    likes: 24,
    comments: 5,
    time: "2 jam yang lalu"
  },
  {
    id: 2,
    user: {
      name: "Siti Aminah",
      class: "X RPL 1",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti"
    },
    book: {
      title: "Bumi",
      author: "Tere Liye",
      category: "Fantasy"
    },
    rating: 4,
    content: "Petualangan Raib, Seli, dan Ali seru banget! Gak nyangka dunia paralel bisa dikemas sekeren ini. Cuma agak sedih pas bagian akhirnya gantung banget.",
    likes: 18,
    comments: 2,
    time: "5 jam yang lalu"
  }
]

export default function ReviewFeedsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Feed */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Review Feeds</h1>
          <p className="text-sm text-muted-foreground">Apa yang teman-temanmu baca hari ini?</p>
        </div>
        <Button className="rounded-full shadow-lg shadow-primary/20">
          <PlusIcon className="mr-2 size-4" /> Tulis Review
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* KOLOM KIRI: MAIN FEEDS (8 Kolom) */}
        <div className="lg:col-span-8 space-y-6">
          {FEEDS.map((post) => (
            <Card key={post.id} className="border-none shadow-sm overflow-hidden">
              <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10 ring-2 ring-primary/10">
                    <AvatarImage src={post.user.avatar} />
                    <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold leading-none">{post.user.name}</span>
                    <span className="text-[10px] text-muted-foreground mt-1">{post.user.class} • {post.time}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontalIcon className="size-4" />
                </Button>
              </CardHeader>

              {/* Book Insight Card inside Feed */}
              <div className="px-4 pb-2">
                <div className="bg-slate-50 rounded-xl p-3 flex gap-4 border border-slate-100">
                  <div className="w-16 h-20 bg-slate-200 rounded-md flex items-center justify-center flex-shrink-0 shadow-inner">
                    <span className="text-[8px] font-bold text-slate-400 italic">COVER</span>
                  </div>
                  <div className="flex flex-col justify-center overflow-hidden">
                    <Badge variant="secondary" className="w-fit text-[9px] h-4 mb-1">{post.book.category}</Badge>
                    <h4 className="text-sm font-bold truncate italic">"{post.book.title}"</h4>
                    <p className="text-[10px] text-slate-500">{post.book.author}</p>
                    <div className="flex items-center gap-0.5 mt-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`size-3 ${i < post.rating ? 'fill-current' : 'text-slate-300'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-4 pt-2 space-y-4">
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{post.content}"
                </p>
                
                <Separator className="opacity-50" />

                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-1.5 text-slate-500 hover:text-red-500 transition-colors group">
                    <HeartIcon className="size-5 group-hover:fill-red-500" />
                    <span className="text-xs font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-slate-500 hover:text-primary transition-colors">
                    <MessageCircleIcon className="size-5" />
                    <span className="text-xs font-medium">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors ml-auto">
                    <Share2Icon className="size-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* KOLOM KANAN: WIDGET (4 Kolom) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-sm bg-gradient-to-br from-primary to-indigo-600 text-white">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <FlameIcon className="size-5 text-amber-400 fill-amber-400" />
                <h3 className="font-bold">Top Reviewer</h3>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-xs font-bold opacity-70 w-4">{i}.</div>
                    <Avatar className="size-8 border-2 border-white/20">
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">User_{i}02</span>
                      <span className="text-[10px] opacity-70">12 Reviews</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="secondary" className="w-full text-xs h-8">Lihat Leaderboard</Button>
            </CardContent>
          </Card>

          <div className="p-4 bg-slate-100/50 rounded-2xl border border-dashed border-slate-200">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Community Rules</h4>
            <ul className="text-[10px] space-y-2 text-slate-500 italic">
              <li>• Tidak mengandung spoiler berat.</li>
              <li>• Gunakan bahasa yang sopan.</li>
              <li>• Berikan rating yang objektif.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}