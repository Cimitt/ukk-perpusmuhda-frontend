'use client'

import { 
  PlusIcon, 
  SearchIcon, 
  FilterIcon, 
  BookOpenIcon, 
  CheckCircleIcon, 
  ClockIcon,
  MoreVerticalIcon
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function BooksPage() {
  return (
    <div className='space-y-6'>
      {/* Header & Action */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Inventaris Buku</h1>
          <p className='text-muted-foreground text-sm'>Kelola koleksi buku, ketersediaan, dan lokasi rak.</p>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm'>Import Excel</Button>
          <Button size='sm' className='bg-primary'>
            <PlusIcon className='mr-2 size-4' /> Tambah Buku
          </Button>
        </div>
      </div>

      {/* Stats Ringkas */}
      <div className='grid gap-4 md:grid-cols-3'>
        <Card className='border-none shadow-sm bg-white'>
          <CardContent className='p-4 flex items-center gap-4'>
            <div className='p-2 bg-blue-50 text-blue-600 rounded-lg'>
              <BookOpenIcon className='size-5' />
            </div>
            <div>
              <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>Total Koleksi</p>
              <p className='text-xl font-bold'>1.240 <span className='text-xs font-normal text-slate-400'>Judul</span></p>
            </div>
          </CardContent>
        </Card>
        <Card className='border-none shadow-sm bg-white'>
          <CardContent className='p-4 flex items-center gap-4'>
            <div className='p-2 bg-green-50 text-green-600 rounded-lg'>
              <CheckCircleIcon className='size-5' />
            </div>
            <div>
              <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>Tersedia</p>
              <p className='text-xl font-bold'>1.102 <span className='text-xs font-normal text-slate-400'>Ekspl</span></p>
            </div>
          </CardContent>
        </Card>
        <Card className='border-none shadow-sm bg-white'>
          <CardContent className='p-4 flex items-center gap-4'>
            <div className='p-2 bg-amber-50 text-amber-600 rounded-lg'>
              <ClockIcon className='size-5' />
            </div>
            <div>
              <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>Sedang Dipinjam</p>
              <p className='text-xl font-bold'>138 <span className='text-xs font-normal text-slate-400'>Buku</span></p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabel Utama */}
      <Card className='border-none shadow-sm shadow-slate-200/50 overflow-hidden'>
        <CardHeader className='flex flex-col sm:flex-row items-center gap-4 border-b bg-white'>
          <div className='relative flex-1 w-full'>
            <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
            <input 
              placeholder='Cari judul, penulis, atau ISBN...' 
              className='w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all'
            />
          </div>
          <Button variant='outline' size='sm'>
            <FilterIcon className='mr-2 size-4' /> Filter
          </Button>
        </CardHeader>
        <CardContent className='p-0 bg-white'>
          <Table>
            <TableHeader className='bg-slate-50/50'>
              <TableRow>
                <TableHead className='pl-6'>Info Buku</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Lokasi Rak</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='text-right pr-6'>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i} className='hover:bg-slate-50/50 transition-colors group cursor-pointer'>
                  <TableCell className='pl-6'>
                    <div className='flex flex-col'>
                      <span className='font-medium text-sm text-slate-900'>Laskar Pelangi</span>
                      <span className='text-[10px] text-muted-foreground'>Andrea Hirata • ISBN: 978-602-291</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant='secondary' className='text-[10px] font-normal'>Fiksi</Badge>
                  </TableCell>
                  <TableCell className='text-sm text-slate-600 font-medium'>A-{i}</TableCell>
                  <TableCell className='text-sm text-slate-600'>12/15</TableCell>
                  <TableCell>
                    <Badge variant={i % 3 === 0 ? 'outline' : 'default'} className='text-[10px]'>
                      {i % 3 === 0 ? 'Kosong' : 'Tersedia'}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-right pr-6'>
                    <Button variant='ghost' size='icon' className='size-8'>
                      <MoreVerticalIcon className='size-4' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}