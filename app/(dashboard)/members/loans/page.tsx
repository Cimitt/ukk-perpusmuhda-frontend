'use client'

import { useState } from 'react'
import { 
  BookCheckIcon, 
  ClockIcon, 
  AlertCircleIcon, 
  CalendarIcon, 
  InfoIcon, 
  UserIcon, 
  HashIcon,
  AlertTriangleIcon
} from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Separator } from '@/components/ui/separator'

const ACTIVE_LOANS = [
  {
    id: "TRX-9901",
    title: "Sistem Basis Data Terdistribusi",
    author: "Ir. Bambang S.T",
    borrowedAt: "19 Feb 2026",
    dueDate: "26 Feb 2026",
    progress: 100,
    status: "Overdue",
    fine: 5000,
    category: "Teknologi Informasi",
    description: "Buku ini membahas arsitektur basis data skala besar dan distribusi data pada jaringan komputer."
  },
  {
    id: "TRX-9905",
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    borrowedAt: "24 Feb 2026",
    dueDate: "03 Mar 2026",
    progress: 40,
    status: "Active",
    fine: 0,
    category: "Filsafat / Self Development",
    description: "Penerapan filosofi Stoikisme dalam kehidupan modern untuk menjaga kesehatan mental dan kebahagiaan."
  }
]

export default function ActiveLoansPage() {
  // State untuk mengontrol modal dan data yang dipilih
  const [selectedLoan, setSelectedLoan] = useState<typeof ACTIVE_LOANS[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenDetail = (loan: typeof ACTIVE_LOANS[0]) => {
    setSelectedLoan(loan)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-900">
          <BookCheckIcon className="size-6 text-primary" /> Pinjaman Aktif
        </h1>
        <p className="text-sm text-muted-foreground">Kelola buku yang sedang kamu pinjam dan perhatikan batas waktu.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ACTIVE_LOANS.map((loan) => (
          <Card key={loan.id} className={`overflow-hidden border-none shadow-md transition-all hover:shadow-lg ${loan.status === 'Overdue' ? 'ring-2 ring-destructive/20' : ''}`}>
            <CardContent className="p-0">
              <div className="flex h-full">
                <div className="w-32 bg-slate-100 flex items-center justify-center border-r">
                   <span className="text-[10px] font-bold text-slate-400 italic">COVER</span>
                </div>
                
                <div className="flex-1 p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <Badge variant={loan.status === 'Overdue' ? 'destructive' : 'secondary'} className="text-[10px]">
                      {loan.status === 'Overdue' ? 'Terlambat' : 'Aktif'}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-sm line-clamp-2 leading-tight">{loan.title}</h3>
                    <p className="text-[10px] text-muted-foreground mt-1">{loan.author}</p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-slate-500 uppercase">Waktu Pinjam</span>
                      <span className={loan.status === 'Overdue' ? 'text-destructive' : 'text-primary'}>
                         {loan.status === 'Overdue' ? 'Segera Kembalikan!' : 'Aktif'}
                      </span>
                    </div>
                    <Progress value={loan.progress} className={`h-1.5 ${loan.status === 'Overdue' ? '[&>div]:bg-destructive' : ''}`} />
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="bg-slate-50/50 p-3 flex justify-between items-center border-t">
              <div className="flex items-center gap-1.5 text-slate-500">
                <CalendarIcon className="size-3" />
                <span className="text-[10px] font-medium">Batas: {loan.dueDate}</span>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="h-7 text-[10px] font-bold"
                onClick={() => handleOpenDetail(loan)} // Pemicu Modal
              >
                Detail
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* MODAL POPUP DETAIL */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <InfoIcon className="size-5 text-primary" /> Detail Peminjaman
            </DialogTitle>
            <DialogDescription>
              Informasi lengkap mengenai status peminjaman buku.
            </DialogDescription>
          </DialogHeader>

          {selectedLoan && (
            <div className="space-y-6 py-4">
              {/* Header Info */}
              <div className="flex gap-4">
                <div className="w-20 h-28 bg-slate-100 rounded-md flex items-center justify-center text-[8px] font-bold text-slate-400 border italic">
                  COVER
                </div>
                <div className="flex-1 space-y-1">
                  <Badge className="text-[9px] h-5 mb-1">{selectedLoan.category}</Badge>
                  <h4 className="font-bold text-base leading-tight">{selectedLoan.title}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <UserIcon className="size-3" /> {selectedLoan.author}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Loan Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ID Transaksi</span>
                  <p className="text-sm font-semibold flex items-center gap-1.5">
                    <HashIcon className="size-3.5 text-slate-400" /> {selectedLoan.id}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
                  <div>
                    <Badge variant={selectedLoan.status === 'Overdue' ? 'destructive' : 'secondary'} className="text-[10px]">
                      {selectedLoan.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tgl Pinjam</span>
                  <p className="text-sm font-medium">{selectedLoan.borrowedAt}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tgl Kembali</span>
                  <p className={`text-sm font-bold ${selectedLoan.status === 'Overdue' ? 'text-red-500' : 'text-primary'}`}>
                    {selectedLoan.dueDate}
                  </p>
                </div>
              </div>

              {/* Denda Section (Hanya muncul jika ada denda) */}
              {selectedLoan.fine > 0 && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertTriangleIcon className="size-4" />
                    <span className="text-xs font-bold">Denda Keterlambatan</span>
                  </div>
                  <span className="text-sm font-extrabold text-red-600">
                    Rp {selectedLoan.fine.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Deskripsi Singkat</span>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{selectedLoan.description}"
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => setIsModalOpen(false)}>
              Tutup
            </Button>
            {selectedLoan?.status === 'Overdue' && (
              <Button variant="destructive" className="w-full sm:w-auto">
                Laporkan Kendala
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Empty State tetap sama */}
      {ACTIVE_LOANS.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ClockIcon className="size-16 text-slate-200 mb-4" />
          <h3 className="font-bold text-slate-900">Belum ada pinjaman</h3>
        </div>
      )}
    </div>
  )
}