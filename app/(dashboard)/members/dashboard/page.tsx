import { 
  BookOpenIcon, 
  HeartIcon, 
  StarIcon, 
  TrendingUpIcon, 
  ZapIcon,
  ArrowRightIcon
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ActiveLoanCard } from "@/components/dashboard/member/ActiveLoancard"
import { MemberCard } from "@/components/dashboard/member/MemberCard"

export default function UserDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Selamat Datang, rbe! 👋
          </h1>
          <p className="text-muted-foreground">
            Ada 2 buku yang harus kamu kembalikan minggu ini.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Bantuan</Button>
          <Button size="sm" className="bg-primary shadow-lg shadow-primary/20">
            <Link href="/members/books">
              Cari Buku Baru
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Kolom Kiri (Main Content) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section: Sedang Dipinjam */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                <BookOpenIcon className="size-5 text-primary" /> Pinjaman Aktif
              </h2>
              
              {/* SHORTCUT ARROW BUTTON */}
              <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary hover:bg-primary/5 group">
                <Link href="/members/loans" className="flex items-center gap-2">
                  <span className="text-xs font-bold">Lihat Semua</span>
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ActiveLoanCard 
                title="Sains Terapan" 
                dueDate="28 Feb 2026" 
                progress={85} 
              />
              <ActiveLoanCard 
                title="Algoritma Lanjut" 
                dueDate="24 Feb 2026" 
                progress={100} 
                isOverdue 
              />
            </div>
          </section>

          {/* Section: Rekomendasi (UI Card Grid) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                <ZapIcon className="size-5 text-amber-500 fill-amber-500" /> Rekomendasi Hari Ini
              </h2>
              {/* Shortcut tambahan untuk Katalog jika diperlukan */}
              <Button variant="ghost" size="sm" asChild className="text-slate-500 group">
                <Link href="/user/books" className="flex items-center gap-2">
                  <span className="text-xs font-bold">Jelajahi</span>
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="border-none shadow-sm hover:ring-2 ring-primary/20 transition-all cursor-pointer group">
                  <div className="aspect-[3/4] bg-slate-100 rounded-t-xl flex items-center justify-center overflow-hidden">
                     <span className="text-[10px] font-bold text-slate-400 group-hover:scale-110 transition-transform italic">COVER</span>
                  </div>
                  <CardContent className="p-3">
                    <h4 className="text-xs font-bold truncate">Judul Buku {i}</h4>
                    <p className="text-[10px] text-slate-500">Kategori {i}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Kolom Kanan (Sidebar Content) */}
        <div className="lg:col-span-4 space-y-6">
          {/* ... sisa kode Kolom Kanan tetap sama ... */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Identity</h3>
            <MemberCard name="robe del rey" nis="2026010001" />
          </div>

          <Card className="border-none shadow-sm bg-slate-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">Aktivitas Membaca</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Buku Selesai</span>
                <span className="text-sm font-bold">12 Buku</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Ulasan Diberikan</span>
                <span className="text-sm font-bold">8 Ulasan</span>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <div className="flex items-center gap-2 text-[10px] font-bold text-green-600">
                  <TrendingUpIcon className="size-3" /> Level Literasi: Mahir
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <StarIcon className="size-4 text-amber-500" /> Trending Review
            </h3>
            {[1, 2].map((i) => (
              <div key={i} className="p-3 bg-white border rounded-xl flex gap-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="size-10 rounded bg-slate-100 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-xs font-bold line-clamp-1">"Buku yang sangat menginspirasi..."</p>
                  <p className="text-[10px] text-slate-500">Oleh Siswa_Anonymous</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}