'use client'

import { useState } from 'react'
import { AlertCircleIcon, Loader2Icon, TrashIcon } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import type { Category } from '@/types'

interface DeleteCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => Promise<void>
  category: Category | null
}

export function DeleteCategoryDialog({
  open,
  onOpenChange,
  onConfirm,
  category,
}: DeleteCategoryDialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleConfirm = async () => {
    setLoading(true)
    setError('')
    try {
      await onConfirm()
      onOpenChange(false)
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.detail ||
        err.response?.data?.error ||
        err.message ||
        'Failed to delete category'
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  if (!category) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-center gap-2 text-destructive'>
            <AlertCircleIcon className='size-5' />
            Hapus Kategori?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus kategori <strong>"{category.name}"</strong>?
            <br />
            <br />
            <span className='text-amber-600 font-medium'>
              ⚠️ Perhatian: Semua buku dalam kategori ini tidak akan terhapus, namun akan kehilangan
              kategorinya.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <Alert variant='destructive'>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <AlertDialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)} disabled={loading}>
            Batal
          </Button>
          <Button variant='destructive' onClick={handleConfirm} disabled={loading}>
            {loading ? (
              <>
                <Loader2Icon className='mr-2 size-4 animate-spin' />
                Menghapus...
              </>
            ) : (
              <>
                <TrashIcon className='mr-2 size-4' />
                Ya, Hapus
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}