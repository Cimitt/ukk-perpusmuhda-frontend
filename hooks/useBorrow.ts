'use client'

import { useState } from 'react'
import { bookService } from '@/services'
import api from '@/lib/axios'
import type { Book, Member } from '@/types'

interface ScannedBook extends Book {
  scannedAt: Date
  dueDate: Date
}

export function useBorrow() {
  const [member, setMember] = useState<Member | null>(null)
  const [scannedBooks, setScannedBooks] = useState<ScannedBook[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Lookup member by NIS
  async function lookupMember(nis: string): Promise<Member | null> {
    try {
      setLoading(true)
      setError(null)
      
      const { data } = await api.get<{ results: Member[] }>('/auth/members/', {
        params: { search: nis }
      })
      
      if (data.results && data.results.length > 0) {
        const foundMember = data.results[0]
        setMember(foundMember)
        return foundMember
      } else {
        setError(`Member dengan NIS ${nis} tidak ditemukan`)
        return null
      }
    } catch (err: any) {
      setError(err.message || 'Gagal mencari member')
      return null
    } finally {
      setLoading(false)
    }
  }

  // Lookup book by barcode
  async function lookupBook(barcode: string): Promise<Book | null> {
    try {
      setLoading(true)
      setError(null)
      
      const book = await bookService.getByBarcode(barcode)
      
      // Check if book is available
      if (book.status !== 'available') {
        setError(`Buku "${book.title}" sedang tidak tersedia`)
        return null
      }

      // Check if already scanned
      const alreadyScanned = scannedBooks.some(b => b.id === book.id)
      if (alreadyScanned) {
        setError(`Buku "${book.title}" sudah ada dalam daftar`)
        return null
      }

      return book
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Buku tidak ditemukan')
      return null
    } finally {
      setLoading(false)
    }
  }

  // Add book to cart
  function addBook(book: Book, daysToReturn: number = 7) {
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + daysToReturn)

    const scannedBook: ScannedBook = {
      ...book,
      scannedAt: new Date(),
      dueDate,
    }

    setScannedBooks(prev => [...prev, scannedBook])
  }

  // Remove book from cart
  function removeBook(bookId: number) {
    setScannedBooks(prev => prev.filter(b => b.id !== bookId))
  }

  // Update due date for a book
  function updateDueDate(bookId: number, dueDate: Date) {
    setScannedBooks(prev =>
      prev.map(book => (book.id === bookId ? { ...book, dueDate } : book))
    )
  }

  // Submit all borrows
  async function submitBorrows() {
    if (!member) {
      throw new Error('Member belum dipilih')
    }
    if (scannedBooks.length === 0) {
      throw new Error('Belum ada buku yang dipilih')
    }

    setLoading(true)
    setError(null)

    try {
      // Process each book
      const results = await Promise.all(
        scannedBooks.map(async (book) => {
          const response = await api.post('/transactions/borrow/', {
            barcode: book.barcode_number,
            member_id: member.id,
            due_date: book.dueDate.toISOString(),
          })
          return response.data
        })
      )

      // Reset after success
      setScannedBooks([])
      setMember(null)

      return results
    } catch (err: any) {
      throw new Error(err.response?.data?.detail || 'Gagal memproses peminjaman')
    } finally {
      setLoading(false)
    }
  }

  // Reset all
  function reset() {
    setMember(null)
    setScannedBooks([])
    setError(null)
  }

  return {
    member,
    scannedBooks,
    loading,
    error,
    lookupMember,
    lookupBook,
    addBook,
    removeBook,
    updateDueDate,
    submitBorrows,
    reset,
    setError,
  }
}