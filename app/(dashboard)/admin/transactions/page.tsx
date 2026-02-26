import { 
  SearchIcon, 
  FilterIcon, 
  DownloadIcon, 
  ArrowUpRightIcon, 
  ArrowDownLeftIcon 
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function AllTransactionsPage() {
  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Riwayat Transaksi</h1>
          <p className='text-muted-foreground text-sm'>Audit semua aktivitas peminjaman dan pengembalian.</p>
        </div>
        <Button variant='outline' size='sm'>
          <DownloadIcon className='mr-2 size-4' /> Export Laporan
        </Button>
      </div>

      <Card className='border-none shadow-sm shadow-slate-200/50'>
        <CardHeader className='flex flex-col sm:flex-row items-center gap-4 border-b pb-6'>
          <div className='relative flex-1 w-full'>
            <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
            <input 
              placeholder='Cari member, judul buku, atau ID transaksi...' 
              className='w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-md text-sm focus:ring-2 focus:ring-primary/20 outline-none'
            />
          </div>
          <div className='flex gap-2 w-full sm:w-auto'>
            <Button variant='secondary' size='sm'>Semua</Button>
            <Button variant='ghost' size='sm'>Peminjaman</Button>
            <Button variant='ghost' size='sm'>Pengembalian</Button>
          </div>
        </CardHeader>
        <CardContent className='p-0'>
          <Table>
            <TableHeader className='bg-slate-50/50'>
              <TableRow>
                <TableHead className='pl-6'>Tipe</TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Buku</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='text-right pr-6'>Petugas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i} className='hover:bg-slate-50/50 transition-colors'>
                  <TableCell className='pl-6'>
                    {i % 2 === 0 ? (
                      <div className='flex items-center gap-2 text-blue-600 font-medium text-xs'>
                        <ArrowDownLeftIcon className='size-3' /> Pinjam
                      </div>
                    ) : (
                      <div className='flex items-center gap-2 text-green-600 font-medium text-xs'>
                        <ArrowUpRightIcon className='size-3' /> Kembali
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col'>
                      <span className='text-sm font-medium'>Rizky Ramadhan</span>
                      <span className='text-[10px] text-muted-foreground'>NIS: 120938</span>
                    </div>
                  </TableCell>
                  <TableCell className='text-sm italic text-slate-600'>"Laskar Pelangi"</TableCell>
                  <TableCell className='text-xs text-slate-500'>25 Feb 2026, 14:20</TableCell>
                  <TableCell>
                    <Badge variant={i === 1 ? 'outline' : 'secondary'} className='text-[10px] font-bold'>
                      {i === 1 ? 'Selesai' : 'Sedang Dipinjam'}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-right pr-6 text-xs font-medium'>Admin_Dedi</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}