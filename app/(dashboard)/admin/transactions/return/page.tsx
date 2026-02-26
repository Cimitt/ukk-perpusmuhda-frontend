'use client'

import { useState } from 'react'
import { 
  RotateCcwIcon, 
  ScanBarcodeIcon, 
  WalletIcon, 
  CalendarIcon, 
  CheckCircle2Icon 
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function ReturnPage() {
  const [scannedBook, setScannedBook] = useState<any>(null)

  return (
    <div className='max-w-4xl mx-auto space-y-8'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold tracking-tight'>Pengembalian Buku</h1>
        <p className='text-muted-foreground text-sm'>
          Scan barcode buku untuk memproses pengembalian dan cek denda.
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-12'>
        {/* INPUT SECTION */}
        <div className='md:col-span-5 space-y-6'>
          <Card className='border-2 border-primary/20 shadow-lg shadow-primary/5'>
            <CardContent className='p-6 space-y-4'>
              <div className='flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest'>
                <ScanBarcodeIcon className='size-4' />
                Scan Barcode Buku
              </div>
              <div className='relative'>
                <input 
                  autoFocus
                  placeholder='Scan ID Buku...' 
                  className='w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-4 text-lg font-bold placeholder:text-slate-300 focus:border-primary outline-none transition-all'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      // Simulasi data ditemukan
                      setScannedBook({
                        title: "Sistem Basis Data",
                        borrower: "Ahmad Maulana",
                        dueDate: "20 Feb 2026",
                        status: "Overdue",
                        fine: 5000
                      })
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {scannedBook && (
            <Card className={`border-none shadow-md ${scannedBook.fine > 0 ? 'bg-amber-50' : 'bg-green-50'}`}>
              <CardContent className='p-6 space-y-4'>
                <div className='flex justify-between items-start'>
                  <div>
                    <h3 className='font-bold text-slate-900'>{scannedBook.title}</h3>
                    <p className='text-xs text-slate-500'>Dipinjam oleh: {scannedBook.borrower}</p>
                  </div>
                  <Badge variant={scannedBook.fine > 0 ? 'destructive' : 'default'}>
                    {scannedBook.fine > 0 ? 'Terlambat' : 'Tepat Waktu'}
                  </Badge>
                </div>
                
                <div className='grid grid-cols-2 gap-4 py-4 border-y border-slate-200/50'>
                  <div className='space-y-1'>
                    <p className='text-[10px] text-slate-400 uppercase font-bold tracking-tighter'>Tgl Harus Kembali</p>
                    <div className='flex items-center gap-2 text-sm font-medium text-slate-700'>
                      <CalendarIcon className='size-3' /> {scannedBook.dueDate}
                    </div>
                  </div>
                  <div className='space-y-1 text-right'>
                    <p className='text-[10px] text-slate-400 uppercase font-bold tracking-tighter'>Denda</p>
                    <div className='flex items-center justify-end gap-2 text-lg font-bold text-red-600'>
                      <WalletIcon className='size-4' /> Rp {scannedBook.fine.toLocaleString()}
                    </div>
                  </div>
                </div>

                <Button className='w-full shadow-lg' size='lg'>
                  <RotateCcwIcon className='mr-2 size-4' /> Proses Pengembalian
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* RECENT RETURNS LOG (Right side) */}
        <div className='md:col-span-7'>
          <Card className='border-none shadow-sm h-full'>
            <CardContent className='p-0'>
              <div className='p-4 border-b bg-slate-50/50'>
                <h3 className='text-sm font-bold'>Baru Saja Dikembalikan</h3>
              </div>
              <div className='p-12 text-center text-muted-foreground'>
                <CheckCircle2Icon className='size-12 mx-auto mb-4 text-slate-100' />
                <p className='text-sm'>Riwayat pengembalian sesi ini akan muncul di sini.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}