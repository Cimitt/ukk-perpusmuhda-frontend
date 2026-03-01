'use client'

import { useState, useMemo } from 'react'
import {
  PlusIcon,
  SearchIcon,
  FolderIcon,
  MoreVerticalIcon,
  LayersIcon,
  EditIcon,
  TrashIcon,
  Loader2Icon,
  BookOpenIcon,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCategories } from '@/hooks/useCategories'
import { bookService } from '@/services'
import { CategoryFormDialog } from '@/components/dashboard/admin/categories/CategoryFormDialog'
import { DeleteCategoryDialog } from '@/components/dashboard/admin/categories/DeleteCategoryDialog'
import type { Category } from '@/types'

const COLORS = [
  'bg-blue-500',
  'bg-green-500',
  'bg-amber-500',
  'bg-indigo-500',
  'bg-emerald-500',
  'bg-rose-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-cyan-500',
  'bg-orange-500',
]

export default function CategoriesPage() {
  const { categories, loading, error, fetchCategories, createCategory } = useCategories()
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [categories, searchQuery])

  // Handlers
  const handleCreate = async (name: string) => {
    await createCategory(name)
    fetchCategories()
  }

  const handleEdit = async (name: string) => {
    if (!selectedCategory) return
    await bookService.updateCategory(selectedCategory.id, name)
    fetchCategories()
  }

  const handleDelete = async () => {
    if (!selectedCategory) return
    await bookService.deleteCategory(selectedCategory.id)
    fetchCategories()
  }

  const openEditDialog = (category: Category) => {
    setSelectedCategory(category)
    setIsEditModalOpen(true)
  }

  const openDeleteDialog = (category: Category) => {
    setSelectedCategory(category)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className='space-y-6 animate-in fade-in duration-500'>
      {/* Header */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Kategori Buku</h1>
          <p className='text-muted-foreground text-sm'>
            Kelola klasifikasi buku untuk mempermudah pencarian.
          </p>
        </div>
        <Button size='sm' onClick={() => setIsAddModalOpen(true)}>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20'
            />
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className='border-none shadow-sm'>
              <CardContent className='p-5'>
                <div className='flex items-start justify-between mb-4'>
                  <Skeleton className='size-12 rounded-xl' />
                  <Skeleton className='size-8' />
                </div>
                <Skeleton className='h-5 w-24 mb-2' />
                <Skeleton className='h-4 w-32' />
                <div className='mt-4 pt-4 border-t'>
                  <Skeleton className='h-4 w-full' />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card className='border-destructive'>
          <CardContent className='p-6 text-center'>
            <p className='text-destructive'>{error}</p>
            <Button variant='outline' size='sm' className='mt-4' onClick={fetchCategories}>
              Coba Lagi
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!loading && !error && filteredCategories.length === 0 && (
        <Card className='border-dashed'>
          <CardContent className='p-12 text-center'>
            <FolderIcon className='size-12 mx-auto mb-4 text-muted-foreground' />
            <h3 className='text-lg font-semibold mb-2'>
              {searchQuery ? 'Kategori Tidak Ditemukan' : 'Belum Ada Kategori'}
            </h3>
            <p className='text-muted-foreground mb-4'>
              {searchQuery
                ? `Tidak ada kategori yang cocok dengan "${searchQuery}"`
                : 'Tambahkan kategori pertama untuk mengklasifikasikan buku'}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsAddModalOpen(true)}>
                <PlusIcon className='mr-2 size-4' /> Tambah Kategori
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Grid Kategori */}
      {!loading && !error && filteredCategories.length > 0 && (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {filteredCategories.map((category, index) => {
            const color = COLORS[index % COLORS.length]
            const shadowColor = color.replace('bg-', 'shadow-').replace('-500', '-100')

            return (
              <Card
                key={category.id}
                className='border-none shadow-sm hover:shadow-md transition-all group cursor-pointer'
              >
                <CardContent className='p-5'>
                  <div className='flex items-start justify-between mb-4'>
                    <div className={`p-3 rounded-xl text-white ${color} shadow-lg ${shadowColor}`}>
                      <FolderIcon className='size-5' />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='size-8 opacity-0 group-hover:opacity-100 transition-opacity'
                        >
                          <MoreVerticalIcon className='size-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem onClick={() => openEditDialog(category)}>
                          <EditIcon className='mr-2 size-4' />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openDeleteDialog(category)}
                          className='text-destructive focus:text-destructive'
                        >
                          <TrashIcon className='mr-2 size-4' />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div>
                    <h3 className='font-bold text-slate-900'>{category.name}</h3>
                    <div className='flex items-center gap-2 mt-1'>
                      <BookOpenIcon className='size-3 text-slate-400' />
                      <span className='text-xs text-slate-500'>
                        Dibuat {new Date(category.created_at).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  </div>

                  <div className='mt-4 pt-4 border-t flex justify-between items-center'>
                    <span className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
                      ID: {category.id}
                    </span>
                    <Button
                      variant='ghost'
                      className='h-6 px-2 text-[10px] font-bold text-primary hover:bg-primary/10'
                      onClick={() => {
                        // Navigate to books filtered by this category
                        window.location.href = `/books?category=${category.id}`
                      }}
                    >
                      LIHAT BUKU
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Stats Footer */}
      {!loading && !error && filteredCategories.length > 0 && (
        <Card className='border-none shadow-sm bg-slate-50'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between text-sm'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <LayersIcon className='size-4' />
                <span>
                  Menampilkan <strong className='text-foreground'>{filteredCategories.length}</strong>{' '}
                  dari <strong className='text-foreground'>{categories.length}</strong> kategori
                </span>
              </div>
              {searchQuery && (
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setSearchQuery('')}
                  className='text-xs'
                >
                  Reset Filter
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dialogs */}
      <CategoryFormDialog
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleCreate}
        mode='create'
      />

      <CategoryFormDialog
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSubmit={handleEdit}
        category={selectedCategory}
        mode='edit'
      />

      <DeleteCategoryDialog
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDelete}
        category={selectedCategory}
      />
    </div>
  )
}