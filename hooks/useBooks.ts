'use client'

import { useState, useEffect } from 'react'
import { bookService } from '@/services'
import type { Book, CreateBookData, PaginatedResponse } from '@/types'

export function useBooks(filters?: {
  search?: string
  category?: string
  status?: string
}) {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchBooks()
  }, [filters?.search, filters?.category, filters?.status, page])

  async function fetchBooks() {
    try {
      setLoading(true)
      setError(null)
      const data: PaginatedResponse<Book> = await bookService.list({
        ...filters,
        page,
      })
      setBooks(data.results)
      setTotalCount(data.count)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch books')
    } finally {
      setLoading(false)
    }
  }

  async function createBook(bookData: CreateBookData) {
    const newBook = await bookService.create(bookData)
    setBooks((prev) => [newBook, ...prev])
    return newBook
  }

  async function updateBook(id: number, updates: Partial<CreateBookData>) {
    const updatedBook = await bookService.update(id, updates)
    setBooks((prev) => prev.map((book) => (book.id === id ? updatedBook : book)))
    return updatedBook
  }

  async function deleteBook(id: number) {
    await bookService.delete(id)
    setBooks((prev) => prev.filter((book) => book.id !== id))
  }

  return {
    books,
    loading,
    error,
    totalCount,
    page,
    setPage,
    fetchBooks,
    createBook,
    updateBook,
    deleteBook,
  }
}