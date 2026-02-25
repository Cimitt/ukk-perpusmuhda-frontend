'use client'

import { useState, useEffect } from 'react'
import { authService, memberService, bookService, transactionService } from '@/services'
import type { DashboardStats, MemberStats, BookStats, TransactionStats } from '@/types'

export function useDashboard() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null)
  const [memberStats, setMemberStats] = useState<MemberStats | null>(null)
  const [bookStats, setBookStats] = useState<BookStats | null>(null)
  const [transactionStats, setTransactionStats] = useState<TransactionStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAllStats()
  }, [])

  async function fetchAllStats() {
    try {
      setLoading(true)
      setError(null)

      const [dashboard, members, books, transactions] = await Promise.all([
        authService.getDashboardStats(),
        memberService.getStats(),
        bookService.getStats(),
        transactionService.getStats(),
      ])

      setDashboardStats(dashboard)
      setMemberStats(members)
      setBookStats(books)
      setTransactionStats(transactions)
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || 'Failed to fetch dashboard data'
      setError(errorMessage)
      console.error('Dashboard fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  return {
    dashboardStats,
    memberStats,
    bookStats,
    transactionStats,
    loading,
    error,
    refetch: fetchAllStats,
  }
}