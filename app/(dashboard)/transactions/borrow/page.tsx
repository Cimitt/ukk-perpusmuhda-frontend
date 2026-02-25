'use client'

import { useState } from 'react'
import { 
  ScanBarcodeIcon, 
  UserCheckIcon, 
  BookPlusIcon, 
  CheckCircle2Icon,
  CameraIcon,
  KeyboardIcon
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CameraScanner from '@/components/dashboard/CameraScanner'

export default function BorrowPage() {
  const [memberFound, setMemberFound] = useState(false)
  const [scannedBooks, setScannedBooks] = useState<any[]>([])
  
  // state input/camera
  const [inputMode, setInputMode] = useState<'hardware' | 'camera'>('hardware')

  // scan func
  const handleBarcodeDetected = (code: string) => {
    if (!memberFound) {
      // logic verifikasi member (dummy)
      console.log("Verifikasi Member:", code)
      if (code.length >= 5) setMemberFound(true)
    } else {
      // logic tambah buku (dummy)
      console.log("Tambah Buku:", code)
      const newBook = { id: Date.now(), title: "Buku Baru", barcode: code }
      setScannedBooks(prev => [...prev, newBook])
    }
  }

  return (
    <div className='max-w-5xl mx-auto space-y-8'>
      <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight text-slate-900'>Peminjaman Buku</h1>
          <p className='text-muted-foreground'>Pilih metode input untuk mulai memproses transaksi.</p>
        </div>

        {/* Toggle Mode Input */}
        <div className='flex bg-slate-100 p-1 rounded-lg border'>
            <Button 
                variant={inputMode === 'hardware' ? 'secondary' : 'ghost'} 
                size='sm' 
                onClick={() => setInputMode('hardware')}
                className={`text-xs ${inputMode === 'hardware' ? 'bg-white shadow-sm' : ''}`}
            >
                <KeyboardIcon className='mr-2 size-3' /> Hardware
            </Button>
            <Button 
                variant={inputMode === 'camera' ? 'secondary' : 'ghost'} 
                size='sm' 
                onClick={() => setInputMode('camera')}
                className={`text-xs ${inputMode === 'camera' ? 'bg-white shadow-sm' : ''}`}
            >
                <CameraIcon className='mr-2 size-3' /> Kamera
            </Button>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-12'>
        
        <div className='md:col-span-4 space-y-6'>
          {/* AREA SCANNER */}
          <Card className='border-2 border-primary/10 shadow-lg shadow-primary/5 overflow-hidden'>
            <CardContent className='p-0'>
              <div className='p-4 border-b bg-slate-50/50 flex items-center justify-between'>
                <span className='text-[10px] font-bold uppercase tracking-widest text-slate-500'>
                  Scanner Active
                </span>
                <Badge variant={memberFound ? 'default' : 'outline'}>
                    {memberFound ? 'Step 2: Scan Buku' : 'Step 1: Scan Member'}
                </Badge>
              </div>

              <div className='p-6'>
                {inputMode === 'camera' ? (
                  // camera components
                  <div className='space-y-4'>
                    <CameraScanner onScanSuccess={handleBarcodeDetected} />
                    <p className='text-[10px] text-center text-muted-foreground italic'>
                      Hadapkan barcode ke arah kamera laptop Anda.
                    </p>
                  </div>
                ) : (
                  // input code
                  <div className='space-y-4'>
                    <div className='relative'>
                      <input 
                        autoFocus
                        placeholder={memberFound ? 'Scan Barcode Buku...' : 'Scan NIS Member...'} 
                        className='w-full bg-white border-2 border-slate-100 rounded-xl px-4 py-4 text-lg font-bold placeholder:text-slate-300 focus:border-primary outline-none transition-all'
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleBarcodeDetected(e.currentTarget.value)
                            e.currentTarget.value = ""
                          }
                        }}
                      />
                      <ScanBarcodeIcon className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-300' />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Info Member (Hanya muncul jika sudah discan) */}
          {memberFound && (
            <Card className='border-green-500 bg-green-50/30 animate-in fade-in zoom-in-95'>
              <CardContent className='p-4 flex items-center gap-3'>
                <div className='size-10 rounded-full bg-green-500 flex items-center justify-center text-white'>
                  <UserCheckIcon className='size-5' />
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-bold'>Muhammad Rizky</p>
                  <p className='text-[10px] text-slate-500'>XII - Teknik Informatika</p>
                </div>
                <Button variant='ghost' size='sm' onClick={() => {setMemberFound(false); setScannedBooks([])}} className='text-red-500 h-7 text-[10px]'>
                  Reset
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className='md:col-span-8'>
          <Card className='border-none shadow-sm shadow-slate-200/50 overflow-hidden h-full flex flex-col'>
            <div className='bg-slate-900 text-white px-6 py-4 flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <CheckCircle2Icon className='size-4 text-primary' />
                <span className='font-medium text-sm'>Daftar Pinjaman</span>
              </div>
              <span className='text-xs text-slate-400 font-mono'>{scannedBooks.length} BUKU TERPILIH</span>
            </div>
            
            <CardContent className='p-0 flex-1 flex flex-col'>
              {scannedBooks.length > 0 ? (
                <Table>
                  <TableHeader className='bg-slate-50'>
                    <TableRow>
                      <TableHead className='pl-6'>Info Buku</TableHead>
                      <TableHead>Barcode</TableHead>
                      <TableHead>Tgl. Kembali</TableHead>
                      <TableHead className='text-right pr-6'>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Render buku yang discan di sini */}
                  </TableBody>
                </Table>
              ) : (
                <div className='flex-1 flex flex-col items-center justify-center p-12 text-center text-muted-foreground'>
                  <div className='size-16 rounded-full bg-slate-50 flex items-center justify-center mb-4'>
                    <ScanBarcodeIcon className='size-8 text-slate-200' />
                  </div>
                  <p className='text-sm font-medium'>Belum ada buku yang discan</p>
                  <p className='text-xs max-w-[200px] mt-1'>Data buku akan muncul di sini setelah Anda men-scan barcode buku.</p>
                </div>
              )}
            </CardContent>

            {/* footer */}
            {memberFound && (
              <div className='p-4 bg-slate-50 border-t flex justify-end gap-3'>
                <Button variant='outline' onClick={() => setMemberFound(false)}>Batalkan</Button>
                <Button className='bg-primary px-8 shadow-lg shadow-primary/20'>
                  Konfirmasi Peminjaman
                </Button>
              </div>
            )}
          </Card>
        </div>

      </div>
    </div>
  )
}