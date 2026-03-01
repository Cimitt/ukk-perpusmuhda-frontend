'use client'

import { useState, useEffect } from 'react'
import { PlusIcon, SaveIcon, Loader2Icon, FolderIcon } from 'lucide-react'
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
import { Alert, AlertDescription } from '@/components/ui/alert'
import type { Category } from '@/types'

interface CategoryFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (name: string) => Promise<void>
  category?: Category | null
  mode: 'create' | 'edit'
}

export function CategoryFormDialog({
  open,
  onOpenChange,
  onSubmit,
  category,
  mode,
}: CategoryFormDialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')

  // Load category data when editing
  useEffect(() => {
    if (mode === 'edit' && category) {
      setName(category.name)
    }
  }, [mode, category])

  // Reset form on close
  useEffect(() => {
    if (!open) {
      setName('')
      setError('')
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!name.trim()) {
      setError('Nama kategori tidak boleh kosong')
      setLoading(false)
      return
    }

    try {
      await onSubmit(name.trim())
      onOpenChange(false)
    } catch (err: any) {
      setError(err.response?.data?.name?.[0] || err.message || 'Failed to save category')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <FolderIcon className='size-5 text-primary' />
            {mode === 'create' ? 'Tambah Kategori Baru' : 'Edit Kategori'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'Buat kategori baru untuk mengklasifikasikan buku.'
              : 'Update nama kategori di bawah ini.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {error && (
            <Alert variant='destructive' className='mb-4'>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='name' className='text-xs font-bold uppercase'>
                Nama Kategori *
              </Label>
              <Input
                id='name'
                placeholder='Contoh: Fiksi, Sains, Teknologi'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
                className='h-10'
              />
              <p className='text-xs text-muted-foreground'>
                Masukkan nama kategori yang jelas dan mudah dipahami
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type='submit' disabled={loading} className='gap-2'>
              {loading ? (
                <>
                  <Loader2Icon className='size-4 animate-spin' />
                  Menyimpan...
                </>
              ) : (
                <>
                  <SaveIcon className='size-4' />
                  {mode === 'create' ? 'Tambah Kategori' : 'Update Kategori'}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}