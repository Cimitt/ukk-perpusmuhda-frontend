'use client'

import { 
  PlusIcon, 
  SearchIcon, 
  FolderIcon, 
  MoreVerticalIcon, 
  LayersIcon 
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function CategoriesPage() {
  const categories = [
    { name: 'Fiksi', count: 450, color: 'bg-blue-500' },
    { name: 'Sains', count: 210, color: 'bg-green-500' },
    { name: 'Sejarah', count: 120, color: 'bg-amber-500' },
    { name: 'Komputer', count: 340, color: 'bg-indigo-500' },
    { name: 'Religi', count: 180, color: 'bg-emerald-500' },
    { name: 'Biografi', count: 90, color: 'bg-rose-500' },
  ]

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Kategori Buku</h1>
          <p className='text-muted-foreground text-sm'>Kelola klasifikasi buku untuk mempermudah pencarian.</p>
        </div>
        <Button size='sm'>
          <PlusIcon className='mr-2 size-4' /> Kategori Baru
        </Button>
      </div>

      {/* Search Bar */}
      <Card className='border-none shadow-sm shadow-slate-200/50'>
        <CardContent className='p-4'>
          <div className='relative w-full max-w-md'>
            <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
            <input 
              placeholder='Cari nama kategori...' 
              className='w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20'
            />
          </div>
        </CardContent>
      </Card>

      {/* Grid Kategori */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {categories.map((cat, i) => (
          <Card key={i} className='border-none shadow-sm hover:shadow-md transition-all group cursor-pointer'>
            <CardContent className='p-5'>
              <div className='flex items-start justify-between mb-4'>
                <div className={`p-3 rounded-xl text-white ${cat.color} shadow-lg shadow-${cat.color.split('-')[1]}-100`}>
                  <FolderIcon className='size-5' />
                </div>
                <Button variant='ghost' size='icon' className='size-8 opacity-0 group-hover:opacity-100 transition-opacity'>
                  <MoreVerticalIcon className='size-4' />
                </Button>
              </div>
              <div>
                <h3 className='font-bold text-slate-900'>{cat.name}</h3>
                <div className='flex items-center gap-2 mt-1'>
                  <LayersIcon className='size-3 text-slate-400' />
                  <span className='text-xs text-slate-500'>{cat.count} Judul Buku</span>
                </div>
              </div>
              <div className='mt-4 pt-4 border-t flex justify-between items-center'>
                <span className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>Rak Utama: A-1</span>
                <Button variant='ghost' className='h-6 px-2 text-[10px] font-bold text-primary'>LIHAT BUKU</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}