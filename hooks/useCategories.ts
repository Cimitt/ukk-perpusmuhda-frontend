'use client'

import { useState, useEffect } from 'react'
import { bookService } from '@/services'
import type { Category } from '@/types'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      setLoading(true)
      setError(null)
      const data = await bookService.listCategories()
      setCategories(data)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch categories')
      console.error('Failed to fetch categories:', err)
      setCategories([])
    } finally {
      setLoading(false)
    }
  }

  async function createCategory(name: string) {
    const newCategory = await bookService.createCategory(name)
    setCategories((prev) => [...prev, newCategory])
    return newCategory
  }

  async function updateCategory(id: number, name: string) {
    const updatedCategory = await bookService.updateCategory(id, name)
    setCategories((prev) => prev.map((cat) => (cat.id === id ? updatedCategory : cat)))
    return updatedCategory
  }

  async function deleteCategory(id: number) {
    await bookService.deleteCategory(id)
    setCategories((prev) => prev.filter((cat) => cat.id !== id))
  }

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}