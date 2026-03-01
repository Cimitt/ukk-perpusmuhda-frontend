'use client'

import { useState, useEffect } from 'react'
import { bookService } from '@/services'
import type { BookStats } from '@/types'

export function useBookStats() {
  const [stats, setStats] = useState<BookStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {
    try {
      const data = await bookService.getStats()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch book stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return { stats, loading, refetch: fetchStats }
}