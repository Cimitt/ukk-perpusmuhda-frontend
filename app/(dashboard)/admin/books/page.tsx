'use client'

import { useState } from 'react'
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ClockIcon,
  MoreVerticalIcon,
  FileDownIcon,
  EditIcon,
  TrashIcon,
  Loader2Icon,
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { useBooks } from '@/hooks/useBooks'
import { useBookStats } from '@/hooks/useBookStats'
import { BookFormDialog } from '@/components/dashboard/admin/books/BookFormDialog'
import { DeleteBookDialog } from '@/components/dashboard/admin/books/DeleteBookDialog'
import type { Book, CreateBookData } from '@/types'

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const { books, loading, error, fetchBooks, createBook, updateBook, deleteBook } = useBooks({
    search: searchQuery,
  })

  const { stats, loading: loadingStats } = useBookStats()

  const handleCreate = async (data: CreateBookData) => {
    await createBook(data)
    fetchBooks()
  }

  const handleEdit = async (data: CreateBookData) => {
    if (!selectedBook) return
    await updateBook(selectedBook.id, data)
    fetchBooks()
  }

  const handleDelete = async () => {
    if (!selectedBook) return
    await deleteBook(selectedBook.id)
    fetchBooks()
  }

  const openEditDialog = (book: Book) => {
    setSelectedBook(book)
    setIsEditModalOpen(true)
  }

  const openDeleteDialog = (book: Book) => {
    setSelectedBook(book)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className='space-y-6 animate-in fade-in duration-500'>
      {/* Header & Action */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Inventaris Buku</h1>
          <p className='text-muted-foreground text-sm'>Kelola koleksi buku, ketersediaan, dan lokasi rak.</p>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm'>
            <FileDownIcon className='mr-2 size-4 text-green-600' /> Import Excel
          </Button>
          <Button size='sm' className='bg-primary shadow-lg shadow-primary/20' onClick={() => setIsAddModalOpen(true)}>
            <PlusIcon className='mr-2 size-4' /> Tambah Buku
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className='grid gap-4 md:grid-cols-3'>
        <Card className='border-none shadow-sm bg-white'>
          <CardContent className='p-4 flex items-center gap-4'>
            <div className='p-2 bg-blue-50 text-blue-600 rounded-lg'>
              <BookOpenIcon className='size-5' />
            </div>
            <div>
              <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>Total Koleksi</p>
              {loadingStats ? (
                <Skeleton className='h-6 w-20' />
              ) : (
                <p className='text-xl font-bold'>
                  {stats?.total || 0} <span className='text-xs font-normal text-slate-400'>Judul</span>
                </p>
              )}
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
              {loadingStats ? (
                <Skeleton className='h-6 w-20' />
              ) : (
                <p className='text-xl font-bold'>
                  {stats?.available || 0} <span className='text-xs font-normal text-slate-400'>Buku</span>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className='border-none shadow-sm bg-white'>
          <CardContent className='p-4 flex items-center gap-4'>
            <div className='p-2 bg-amber-50 text-amber-600 rounded-lg'>
              <ClockIcon className='size-5' />
            </div>
            <div>
              <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>Tidak Tersedia</p>
              {loadingStats ? (
                <Skeleton className='h-6 w-20' />
              ) : (
                <p className='text-xl font-bold'>
                  {stats?.unavailable || 0} <span className='text-xs font-normal text-slate-400'>Buku</span>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className='border-none shadow-sm shadow-slate-200/50 overflow-hidden'>
        <CardHeader className='flex flex-col sm:flex-row items-center gap-4 border-b bg-white'>
          <div className='relative flex-1 w-full'>
            <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
            <input
              placeholder='Cari judul, penulis, atau barcode...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                <TableHead>Barcode</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='text-right pr-6'>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className='pl-6'>
                      <Skeleton className='h-10 w-full' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-6 w-16' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 w-20' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 w-12' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-6 w-20' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-8 w-8 ml-auto' />
                    </TableCell>
                  </TableRow>
                ))
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={6} className='text-center py-8 text-destructive'>
                    {error}
                  </TableCell>
                </TableRow>
              ) : books.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className='text-center py-8 text-muted-foreground'>
                    Tidak ada data buku. Tambahkan buku baru untuk memulai.
                  </TableCell>
                </TableRow>
              ) : (
                books.map((book) => (
                  <TableRow key={book.id} className='hover:bg-slate-50/50 transition-colors group'>
                    <TableCell className='pl-6'>
                      <div className='flex items-center gap-3'>
                        {book.cover_image && (
                          <img
                            src={book.cover_image}
                            alt={book.title}
                            className='size-10 rounded object-cover'
                          />
                        )}
                        <div className='flex flex-col'>
                          <span className='font-medium text-sm text-slate-900'>{book.title}</span>
                          <span className='text-[10px] text-muted-foreground'>
                            {book.author} • {book.published_year}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant='secondary' className='text-[10px] font-normal'>
                        {book.category_name}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-sm text-slate-600 font-mono'>{book.barcode_number}</TableCell>
                    <TableCell className='text-sm text-slate-600'>{book.stock}</TableCell>
                    <TableCell>
                      <Badge
                        variant={book.status === 'available' ? 'default' : 'outline'}
                        className='text-[10px]'
                      >
                        {book.status === 'available' ? 'Tersedia' : 'Tidak Tersedia'}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right pr-6'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' size='icon' className='size-8'>
                            <MoreVerticalIcon className='size-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem onClick={() => openEditDialog(book)}>
                            <EditIcon className='mr-2 size-4' />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openDeleteDialog(book)}
                            className='text-destructive focus:text-destructive'
                          >
                            <TrashIcon className='mr-2 size-4' />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <BookFormDialog
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleCreate}
        mode='create'
      />

      <BookFormDialog
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSubmit={handleEdit}
        book={selectedBook}
        mode='edit'
      />

      <DeleteBookDialog
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDelete}
        book={selectedBook}
      />
    </div>
  )
}