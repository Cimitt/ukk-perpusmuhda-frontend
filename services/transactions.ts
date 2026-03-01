import api from '@/lib/axios'
import type {
  Transaction,
  BorrowBookData,
  ReturnBookData,
  ReturnBookResponse,
  TransactionStats,
  PaginatedResponse,
} from '@/types'

export const transactionService = {
  async list(params?: {
    search?: string
    status?: string
    borrow_scan_method?: string
    ordering?: string
    page?: number
    page_size?: number
  }): Promise<PaginatedResponse<Transaction>> {
    const { data } = await api.get<PaginatedResponse<Transaction>>('/transactions/', { params })
    return data
  },

  async get(id: string): Promise<Transaction> {
    const { data } = await api.get<Transaction>(`/transactions/${id}/`)
    return data
  },

  async borrowBook(borrowData: BorrowBookData): Promise<Transaction> {
    const { data } = await api.post<Transaction>('/transactions/borrow/', borrowData)
    return data
  },

  async returnBook(returnData: ReturnBookData): Promise<ReturnBookResponse> {
    const { data } = await api.post<ReturnBookResponse>('/transactions/return/', returnData)
    return data
  },

  async getOverdue(): Promise<{ count: number; results: Transaction[] }> {
    const { data } = await api.get('/transactions/overdue/')
    return data
  },

  async getStats(): Promise<TransactionStats> {
    const { data } = await api.get<TransactionStats>('/transactions/stats/')
    return data
  },
}