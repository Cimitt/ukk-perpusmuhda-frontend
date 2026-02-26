'use client'

import { 
  BarChart3Icon, 
  DownloadIcon, 
  CalendarIcon, 
  TrendingUpIcon, 
  ArrowUpRightIcon,
  UsersIcon,
  BookOpenIcon,
  FileTextIcon
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'

export default function ReportsPage() {
  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Laporan Sistem</h1>
          <p className='text-muted-foreground text-sm'>Analisis data aktivitas perpustakaan secara real-time.</p>
        </div>
        <div className='flex items-center gap-2'>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[180px] bg-white">
              <CalendarIcon className="mr-2 size-4 text-slate-400" />
              <SelectValue placeholder="Periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Minggu Ini</SelectItem>
              <SelectItem value="monthly">Bulan Ini</SelectItem>
              <SelectItem value="yearly">Tahun Ini</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary shadow-lg shadow-primary/20">
            <DownloadIcon className="mr-2 size-4" /> Cetak Laporan
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase text-slate-500 tracking-wider">Total Pinjaman</CardTitle>
            <TrendingUpIcon className="size-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">452</div>
            <p className="text-[10px] text-green-600 font-medium flex items-center mt-1">
              <ArrowUpRightIcon className="size-3 mr-1" /> +12% dari bulan lalu
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase text-slate-500 tracking-wider">Buku Terpopuler</CardTitle>
            <BookOpenIcon className="size-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate italic">"Laskar Pelangi"</div>
            <p className="text-[10px] text-slate-400 mt-1">Dipinjam 48 kali</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase text-slate-500 tracking-wider">Member Aktif</CardTitle>
            <UsersIcon className="size-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-[10px] text-slate-400 mt-1">Siswa sering meminjam</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase text-slate-500 tracking-wider">Total Denda</CardTitle>
            <FileTextIcon className="size-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 845.000</div>
            <p className="text-[10px] text-red-500 font-medium mt-1">Belum tertagih: 15%</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold">Statistik Peminjaman</CardTitle>
            <CardDescription>Grafik frekuensi buku dipinjam per hari.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center bg-slate-50/50 rounded-lg m-6 border border-dashed">
            <div className="text-center space-y-2">
              <BarChart3Icon className="size-10 text-slate-200 mx-auto" />
              <p className="text-xs text-slate-400 font-medium italic">Integration: Connect Recharts or Chart.js here</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold">Kategori Terlaris</CardTitle>
            <CardDescription>Persentase peminjaman berdasarkan kategori.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {[
              { label: 'Fiksi', value: 70, color: 'bg-blue-500' },
              { label: 'Sains', value: 45, color: 'bg-green-500' },
              { label: 'Sejarah', value: 30, color: 'bg-amber-500' },
              { label: 'Teknologi', value: 20, color: 'bg-indigo-500' },
            ].map((item, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-slate-500">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Export Section */}
      <Card className="border-none shadow-sm bg-slate-900 text-white">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold">Butuh laporan dalam format lain?</h3>
            <p className="text-xs text-slate-400">Unduh data mentah dalam format CSV atau Excel untuk diolah secara manual.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">Export CSV</Button>
            <Button variant="secondary" size="sm">Export Excel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}