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
import type { Book } from '@/types'

interface DeleteBookDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => Promise<void>
  book: Book | null
}

export function DeleteBookDialog({ open, onOpenChange, onConfirm, book }: DeleteBookDialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleConfirm = async () => {
    setLoading(true)
    setError('')
    try {
      await onConfirm()
      onOpenChange(false)
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Failed to delete book')
    } finally {
      setLoading(false)
    }
  }

  if (!book) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-center gap-2 text-destructive'>
            <AlertCircleIcon className='size-5' />
            Hapus Buku?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus buku <strong>"{book.title}"</strong>? Tindakan ini tidak
            dapat dibatalkan.
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