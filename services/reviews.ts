import api from '@/lib/axios'
import type {
  Review,
  CreateReviewData,
  BookReviewsResponse,
  PaginatedResponse,
} from '@/types'

export const reviewService = {
  /**
   * List all reviews with filters
   */
  async list(params?: {
    search?: string
    book?: string
    book_id?: string
    member?: string
    rating?: number
    ordering?: string
    page?: number
  }): Promise<PaginatedResponse<Review>> {
    const { data } = await api.get<PaginatedResponse<Review>>('/reviews/', { params })
    return data
  },

  /**
   * Create new review
   */
  async create(reviewData: CreateReviewData): Promise<Review> {
    const { data } = await api.post<Review>('/reviews/', reviewData)
    return data
  },

  /**
   * Get review detail
   */
  async get(id: string): Promise<Review> {
    const { data } = await api.get<Review>(`/reviews/${id}/`)
    return data
  },

  /**
   * Update review
   */
  async update(id: string, updates: Partial<CreateReviewData>): Promise<Review> {
    const { data } = await api.patch<Review>(`/reviews/${id}/`, updates)
    return data
  },

  /**
   * Delete review
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/reviews/${id}/`)
  },

  /**
   * Get all reviews for a specific book with stats
   */
  async getBookReviews(bookId: string): Promise<BookReviewsResponse> {
    const { data } = await api.get<BookReviewsResponse>(`/reviews/book/${bookId}/`)
    return data
  },
}