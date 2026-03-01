'use client'

import { useState, useEffect } from 'react'
import { PlusIcon, UploadIcon, SaveIcon, Loader2Icon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useCategories } from '@/hooks/useCategories'
import type { Book, CreateBookData } from '@/types'

interface BookFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: CreateBookData) => Promise<void>
  book?: Book | null
  mode: 'create' | 'edit'
}

export function BookFormDialog({ open, onOpenChange, onSubmit, book, mode }: BookFormDialogProps) {
  const { categories, loading: loadingCategories, error: categoriesError } = useCategories()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [coverPreview, setCoverPreview] = useState<string | null>(null)

  // Form state
  const defaultForm: CreateBookData = {
    barcode_number: '',
    title: '',
    category: 0,
    author: '',
    publisher: '',
    published_year: new Date().getFullYear(),
    isbn: '',
    description: '',
    stock: 1,
    cover_image: undefined,
  }
  const [formData, setFormData] = useState<CreateBookData>({ ...defaultForm })

  // Load book data when editing
  useEffect(() => {
    if (mode === 'edit' && book) {
      setFormData({
        barcode_number: book.barcode_number || '',
        title: book.title || '',
        category: book.category || 0,
        author: book.author || '',
        publisher: book.publisher || '',
        published_year: book.published_year || new Date().getFullYear(),
        isbn: book.isbn || '',
        description: book.description || '',
        stock: book.stock ?? 1,
        cover_image: undefined, // always start as undefined, user can upload new file
      })
      if (book.cover_image) setCoverPreview(book.cover_image)
    }
  }, [mode, book])

  // Reset form on close
  useEffect(() => {
    if (!open) {
      setFormData({ ...defaultForm })
      setCoverPreview(null)
      setError('')
    }
  }, [open])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, cover_image: file }))
      const reader = new FileReader()
      reader.onloadend = () => setCoverPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Validate required fields
      if (!formData.barcode_number || !formData.title || !formData.author || 
          !formData.publisher || !formData.category || !formData.published_year) {
        setError('Mohon lengkapi semua field yang wajib diisi (*)')
        setLoading(false)
        return
      }

      // Always send full CreateBookData
      const submitData: CreateBookData = {
        barcode_number: formData.barcode_number,
        title: formData.title,
        category: formData.category,
        author: formData.author,
        publisher: formData.publisher,
        published_year: formData.published_year,
        isbn: formData.isbn,
        description: formData.description,
        stock: formData.stock,
        cover_image: formData.cover_image,
      }

      await onSubmit(submitData)
      onOpenChange(false)
    } catch (err: any) {
      console.error('Submit error:', err)
      let errorMessage = 'Gagal menyimpan buku'
      if (err.response?.data) {
        const errors = err.response.data
        if (typeof errors === 'object') {
          errorMessage = Object.entries(errors)
            .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
            .join('\n')
        } else if (typeof errors === 'string') {
          errorMessage = errors
        } else if (errors.detail) {
          errorMessage = errors.detail
        }
      } else if (err.message) {
        errorMessage = err.message
      }
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <PlusIcon className='size-5 text-primary' />
            {mode === 'create' ? 'Tambah Koleksi Buku' : 'Edit Buku'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'Isi formulir di bawah ini untuk menambahkan buku baru ke dalam sistem.'
              : 'Update informasi buku di bawah ini.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {error && (
            <Alert variant='destructive' className='mb-4'>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {categoriesError && (
            <Alert variant='destructive' className='mb-4'>
              <AlertDescription>
                Gagal memuat kategori: {categoriesError}
              </AlertDescription>
            </Alert>
          )}

          <div className='grid gap-4 py-4'>
            {/* Barcode */}
            <div className='grid gap-2'>
              <Label htmlFor='barcode_number'>Nomor Barcode *</Label>
              <Input
                id='barcode_number'
                value={formData.barcode_number}
                onChange={(e) => setFormData((prev) => ({ ...prev, barcode_number: e.target.value.toUpperCase() }))}
                required
                className='h-9'
              />
            </div>

            {/* Title */}
            <div className='grid gap-2'>
              <Label htmlFor='title'>Judul Buku *</Label>
              <Input
                id='title'
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                required
                className='h-9'
              />
            </div>

            {/* Author & Publisher */}
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='author'>Penulis *</Label>
                <Input
                  id='author'
                  value={formData.author}
                  onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                  required
                  className='h-9'
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='publisher'>Penerbit *</Label>
                <Input
                  id='publisher'
                  value={formData.publisher}
                  onChange={(e) => setFormData((prev) => ({ ...prev, publisher: e.target.value }))}
                  required
                  className='h-9'
                />
              </div>
            </div>

            {/* ISBN & Year */}
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='isbn'>ISBN</Label>
                <Input
                  id='isbn'
                  value={formData.isbn}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isbn: e.target.value }))}
                  className='h-9'
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='published_year'>Tahun Terbit *</Label>
                <Input
                  id='published_year'
                  type='number'
                  value={formData.published_year}
                  onChange={(e) => setFormData((prev) => ({ ...prev, published_year: parseInt(e.target.value) }))}
                  required
                  className='h-9'
                />
              </div>
            </div>

            {/* Category & Stock */}
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='category'>Kategori *</Label>
                <Select
                  value={formData.category ? String(formData.category) : ''}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: parseInt(value) }))}
                  required
                >
                  <SelectTrigger className='h-9'>
                    <SelectValue placeholder='Pilih Kategori' />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingCategories ? (
                      <SelectItem value='loading' disabled>Loading...</SelectItem>
                    ) : categoriesError ? (
                      <SelectItem value='error' disabled>Error loading categories</SelectItem>
                    ) : !categories || categories.length === 0 ? (
                      <SelectItem value='empty' disabled>Tidak ada kategori tersedia</SelectItem>
                    ) : (
                      categories.map((cat) => <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>)
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='stock'>Jumlah Stok *</Label>
                <Input
                  id='stock'
                  type='number'
                  value={formData.stock}
                  onChange={(e) => setFormData((prev) => ({ ...prev, stock: parseInt(e.target.value) }))}
                  required
                  min={0}
                  className='h-9'
                />
              </div>
            </div>

            {/* Description */}
            <div className='grid gap-2'>
              <Label htmlFor='description'>Deskripsi</Label>
              <Textarea
                id='description'
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            {/* Cover Image */}
            <div className='grid gap-2'>
              <Label>Cover Buku</Label>
              <div className='flex items-center gap-4'>
                {coverPreview && <img src={coverPreview} alt='Cover preview' className='size-20 rounded-md border object-cover' />}
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  className='h-9 flex-1 border-dashed'
                  onClick={() => document.getElementById('cover_image')?.click()}
                >
                  <UploadIcon className='mr-2 size-3' /> Upload Cover
                </Button>
                <input id='cover_image' type='file' accept='image/*' onChange={handleFileChange} className='hidden' />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>Batal</Button>
            <Button type='submit' disabled={loading} className='gap-2'>
              {loading ? (
                <>
                  <Loader2Icon className='size-4 animate-spin' /> Menyimpan...
                </>
              ) : (
                <>
                  <SaveIcon className='size-4' /> {mode === 'create' ? 'Simpan Buku' : 'Update Buku'}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}