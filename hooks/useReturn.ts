'use client'

import { useState } from 'react'
import api from '@/lib/axios'
import type { Book, Member } from '@/types'

interface ScannedBook extends Book {
  scannedAt: Date
  fineAmount?: number
}

export function useReturnBook() {
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

    const { data: book } = await api.get<Book>(`/books/barcode/${barcode}/`)

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

  // Add book to return list
  function addBook(book: Book, fineAmount?: number) {
    const scannedBook: ScannedBook = {
      ...book,
      scannedAt: new Date(),
      fineAmount,
    }

    setScannedBooks(prev => [...prev, scannedBook])
  }

  // Remove book from return list
  function removeBook(bookId: number) {
    setScannedBooks(prev => prev.filter(b => b.id !== bookId))
  }

  // Submit all returns
  async function submitReturns() {
    if (!member) {
      throw new Error('Member belum dipilih')
    }
    if (scannedBooks.length === 0) {
      throw new Error('Belum ada buku yang dipilih')
    }

    setLoading(true)
    setError(null)

    try {
      const results = await Promise.all(
        scannedBooks.map(async (book) => {
          const response = await api.post('/transactions/return/', {
            barcode: book.barcode_number,
            member_id: member.id,
          })
          return response.data
        })
      )

      setScannedBooks([])
      setMember(null)

      return results
    } catch (err: any) {
      throw new Error(err.response?.data?.detail || 'Gagal memproses pengembalian')
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
    submitReturns,
    reset,
    setError,
  }
}