'use client'

import { useState } from 'react'
import {
  ScanBarcodeIcon,
  UserCheckIcon,
  CheckCircle2Icon,
  CameraIcon,
  KeyboardIcon,
  TrashIcon,
  CalendarIcon,
  Loader2Icon,
  AlertCircleIcon,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useBorrow } from '@/hooks/useBorrow'
import { BarcodeCamera } from '@/components/dashboard/admin/transactions/BarcodeCamera'
import { ManualInput } from '@/components/dashboard/admin/transactions/ManualInput'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function BorrowPage() {
  const router = useRouter()
  const {
    member,
    scannedBooks,
    loading,
    error,
    lookupMember,
    lookupBook,
    addBook,
    removeBook,
    submitBorrows,
    reset,
    setError,
  } = useBorrow()

  const [inputMode, setInputMode] = useState<'manual' | 'camera'>('manual')
  const [submitting, setSubmitting] = useState(false)

  // Handle member scan/input
  const handleMemberInput = async (nis: string) => {
    const foundMember = await lookupMember(nis)
    if (foundMember) {
      toast.success(`Member ditemukan: ${foundMember.first_name} ${foundMember.last_name}`)
    }
  }

  // Handle book scan/input
  const handleBookInput = async (barcode: string) => {
    const book = await lookupBook(barcode)
    if (book) {
      addBook(book)
      toast.success(`Buku ditambahkan: ${book.title}`)
    }
  }

  // Handle barcode detection (from camera or manual)
  const handleBarcodeDetected = async (code: string) => {
    if (!member) {
      await handleMemberInput(code)
    } else {
      await handleBookInput(code)
    }
  }

  // Submit all borrows
  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      await submitBorrows()
      toast.success('Peminjaman berhasil diproses!')
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500'>
      {/* Header */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight text-slate-900'>Peminjaman Buku</h1>
          <p className='text-muted-foreground'>Scan NIS member dan barcode buku untuk memproses peminjaman.</p>
        </div>

        {/* Toggle Mode Input */}
        <div className='flex bg-slate-100 p-1 rounded-lg border'>
          <Button
            variant={inputMode === 'manual' ? 'secondary' : 'ghost'}
            size='sm'
            onClick={() => setInputMode('manual')}
            className={`text-xs ${inputMode === 'manual' ? 'bg-white shadow-sm' : ''}`}
          >
            <KeyboardIcon className='mr-2 size-3' /> Input Manual
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

      {/* Error Alert */}
      {error && (
        <Alert variant='destructive'>
          <AlertCircleIcon className='size-4' />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className='grid gap-6 lg:grid-cols-12'>
        {/* Left: Scanner Area */}
        <div className='lg:col-span-4 space-y-4'>
          {/* Scanner Card */}
          <Card className='border-2 border-primary/10 shadow-lg shadow-primary/5 overflow-hidden'>
            <CardContent className='p-0'>
              <div className='p-4 border-b bg-slate-50/50 flex items-center justify-between'>
                <span className='text-[10px] font-bold uppercase tracking-widest text-slate-500'>
                  {inputMode === 'camera' ? 'Kamera Scanner' : 'Input Manual'}
                </span>
                <Badge variant={member ? 'default' : 'outline'}>
                  {member ? 'Step 2: Scan Buku' : 'Step 1: Scan Member'}
                </Badge>
              </div>

              <div className='p-6'>
                {inputMode === 'camera' ? (
                  <BarcodeCamera onScanSuccess={handleBarcodeDetected} disabled={loading} />
                ) : (
                  <ManualInput
                    placeholder={member ? 'Scan Barcode Buku...' : 'Scan NIS Member...'}
                    onSubmit={handleBarcodeDetected}
                    disabled={loading}
                    autoFocus
                  />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Member Info Card */}
          {member && (
            <Card className='border-green-500 bg-green-50/30 animate-in fade-in zoom-in-95'>
              <CardContent className='p-4 flex items-center gap-3'>
                <div className='size-10 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0'>
                  <UserCheckIcon className='size-5' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-bold truncate'>
                    {member.first_name} {member.last_name}
                  </p>
                  <p className='text-[10px] text-slate-500'>
                    NIS: {member.nis} • {member.full_name}
                  </p>
                </div>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => {
                    reset()
                    toast.info('Data direset')
                  }}
                  className='text-red-500 h-7 text-[10px] shrink-0'
                >
                  Reset
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: Book List */}
        <div className='lg:col-span-8'>
          <Card className='border-none shadow-sm shadow-slate-200/50 overflow-hidden h-full flex flex-col'>
            <div className='bg-slate-900 text-white px-6 py-4 flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <CheckCircle2Icon className='size-4 text-primary' />
                <span className='font-medium text-sm'>Daftar Pinjaman</span>
              </div>
              <span className='text-xs text-slate-400 font-mono'>
                {scannedBooks.length} BUKU TERPILIH
              </span>
            </div>

            <CardContent className='p-0 flex-1 flex flex-col'>
              {scannedBooks.length > 0 ? (
                <div className='overflow-x-auto'>
                  <Table>
                    <TableHeader className='bg-slate-50'>
                      <TableRow>
                        <TableHead className='pl-6'>Info Buku</TableHead>
                        <TableHead>Barcode</TableHead>
                        <TableHead>Stok</TableHead>
                        <TableHead>
                          <div className='flex items-center gap-1'>
                            <CalendarIcon className='size-3' />
                            Tgl. Kembali
                          </div>
                        </TableHead>
                        <TableHead className='text-right pr-6'>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scannedBooks.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell className='pl-6'>
                            <div className='flex items-center gap-3'>
                              {book.cover_image && (
                                <img
                                  src={book.cover_image}
                                  alt={book.title}
                                  className='size-10 rounded object-cover'
                                />
                              )}
                              <div>
                                <p className='font-medium text-sm'>{book.title}</p>
                                <p className='text-xs text-muted-foreground'>{book.author}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <code className='text-xs bg-slate-100 px-2 py-1 rounded'>
                              {book.barcode_number}
                            </code>
                          </TableCell>
                          <TableCell>
                            <Badge variant='outline' className='text-xs'>
                              {book.stock} tersedia
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className='text-sm'>
                              {book.dueDate.toLocaleDateString('id-ID')}
                            </span>
                          </TableCell>
                          <TableCell className='text-right pr-6'>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='size-8 text-destructive hover:text-destructive'
                              onClick={() => removeBook(book.id)}
                            >
                              <TrashIcon className='size-4' />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className='flex-1 flex flex-col items-center justify-center p-12 text-center text-muted-foreground'>
                  <div className='size-16 rounded-full bg-slate-50 flex items-center justify-center mb-4'>
                    <ScanBarcodeIcon className='size-8 text-slate-200' />
                  </div>
                  <p className='text-sm font-medium'>Belum ada buku yang discan</p>
                  <p className='text-xs max-w-[300px] mt-2'>
                    {member
                      ? 'Scan barcode buku untuk menambahkan ke daftar peminjaman'
                      : 'Scan NIS member terlebih dahulu untuk memulai'}
                  </p>
                </div>
              )}
            </CardContent>

            {/* Footer */}
            {member && scannedBooks.length > 0 && (
              <div className='p-4 bg-slate-50 border-t flex justify-between items-center'>
                <div className='text-sm text-muted-foreground'>
                  Total: <strong className='text-foreground'>{scannedBooks.length}</strong> buku
                </div>
                <div className='flex gap-3'>
                  <Button variant='outline' onClick={reset} disabled={submitting}>
                    Batalkan
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className='bg-primary px-8 shadow-lg shadow-primary/20'
                  >
                    {submitting ? (
                      <>
                        <Loader2Icon className='mr-2 size-4 animate-spin' />
                        Memproses...
                      </>
                    ) : (
                      'Konfirmasi Peminjaman'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}