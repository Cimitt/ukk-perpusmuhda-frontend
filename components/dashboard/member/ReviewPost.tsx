import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, MessageCircle, Bookmark, Star } from 'lucide-react'

export function ReviewPost({ user, bookTitle, content, rating }: any) {
  return (
    <div className="bg-white border rounded-2xl overflow-hidden max-w-lg mx-auto mb-8 shadow-sm">
      {/* Header Post */}
      <div className="p-4 flex items-center gap-3">
        <Avatar className="size-9 border">
          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user}`} />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-bold leading-tight">{user}</span>
          <span className="text-[10px] text-slate-500 uppercase font-medium">Mengulas {bookTitle}</span>
        </div>
      </div>

      {/* Book Image */}
      <div className="aspect-square bg-slate-50 flex items-center justify-center border-y relative group">
        <div className="text-slate-300 font-bold italic group-hover:scale-110 transition-transform cursor-pointer">
          BOOK COVER
        </div>
        <div className="absolute bottom-4 left-4 flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`size-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
          ))}
        </div>
      </div>

      {/* Interactions */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-4 mb-2">
          <Heart className="size-6 text-slate-700 hover:text-red-500 transition-colors cursor-pointer" />
          <MessageCircle className="size-6 text-slate-700 hover:text-primary transition-colors cursor-pointer" />
          <div className="flex-1" />
          <Bookmark className="size-6 text-slate-700 cursor-pointer" />
        </div>
        <p className="text-sm leading-snug">
          <span className="font-extrabold mr-2">{user.toLowerCase()}</span>
          {content}
        </p>
        <p className="text-[11px] text-slate-400 font-medium cursor-pointer hover:underline">
          Lihat semua komentar...
        </p>
      </div>
    </div>
  )
}