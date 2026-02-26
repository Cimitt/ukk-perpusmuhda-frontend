'use client'

import { 
  HistoryIcon, 
  SearchIcon, 
  CheckCircle2Icon, 
  RotateCcwIcon, 
  AlertTriangleIcon,
  DownloadIcon,
  FilterIcon
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const HISTORY_DATA = [
  {
    id: "TRX-001",
    title: "Sistem Operasi",
    borrowDate: "10 Jan 2026",
    returnDate: "17 Jan 2026",
    status: "Returned",
    fine: 0,
  },
  {
    id: "TRX-002",
    title: "Filosofi Teras",
    borrowDate: "05 Feb 2026",
    returnDate: "12 Feb 2026",
    status: "Late", // Dikembalikan tapi terlambat
    fine: 5000,
  },
  {
    id: "TRX-003",
    title: "Bumi",
    borrowDate: "20 Feb 2026",
    returnDate: "-",
    status: "On Going",
    fine: 0,
  }
]

export default function LoanHistoryPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header & Action */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-900">
            <HistoryIcon className="size-6 text-primary" /> Riwayat Peminjaman
          </h1>
          <p className="text-sm text-muted-foreground">Daftar buku yang pernah dan sedang kamu pinjam.</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 h-9">
          <DownloadIcon className="size-4" /> Cetak Riwayat
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input 
            placeholder="Cari berdasarkan judul buku atau ID transaksi..." 
            className="pl-10 bg-white"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <FilterIcon className="size-4" /> Filter Status
        </Button>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {HISTORY_DATA.map((item) => (
          <Card key={item.id} className="border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row md:items-center">
                {/* Status Indicator Stripe */}
                <div className={`w-full md:w-2 h-2 md:h-20 ${
                  item.status === 'Returned' ? 'bg-green-500' : 
                  item.status === 'Late' ? 'bg-amber-500' : 'bg-primary'
                }`} />

                <div className="flex-1 p-5 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  {/* Book Info */}
                  <div className="md:col-span-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">ID: {item.id}</p>
                    <h3 className="font-bold text-slate-900 leading-tight">{item.title}</h3>
                  </div>

                  {/* Dates */}
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tanggal Pinjam</p>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <RotateCcwIcon className="size-3 text-slate-400" /> {item.borrowDate}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tanggal Kembali</p>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2Icon className={`size-3 ${item.returnDate === '-' ? 'text-slate-300' : 'text-green-500'}`} /> 
                      {item.returnDate}
                    </div>
                  </div>

                  {/* Status & Fine */}
                  <div className="flex flex-row md:flex-col justify-between md:items-end gap-2">
                    <Badge 
                      variant={item.status === 'Returned' ? 'secondary' : item.status === 'Late' ? 'destructive' : 'default'}
                      className="text-[10px] font-bold"
                    >
                      {item.status}
                    </Badge>
                    {item.fine > 0 && (
                      <div className="flex items-center gap-1 text-red-500 text-xs font-bold italic">
                        <AlertTriangleIcon className="size-3" />
                        Denda: Rp {item.fine.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {HISTORY_DATA.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <HistoryIcon className="size-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-slate-400 italic">Belum ada riwayat transaksi.</h3>
        </div>
      )}
    </div>
  )
}