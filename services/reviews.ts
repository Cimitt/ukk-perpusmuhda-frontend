import api from '@/lib/axios'
import type {
  Review,
  CreateReviewData,
  BookReviewsResponse,
  PaginatedResponse,
} from '@/types'

export const reviewService = {
  // list reviews
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

  // create review
  async create(reviewData: CreateReviewData): Promise<Review> {
    const { data } = await api.post<Review>('/reviews/', reviewData)
    return data
  },

  // get review detail
  async get(id: string): Promise<Review> {
    const { data } = await api.get<Review>(`/reviews/${id}/`)
    return data
  },

  // update review
  async update(id: string, updates: Partial<CreateReviewData>): Promise<Review> {
    const { data } = await api.patch<Review>(`/reviews/${id}/`, updates)
    return data
  },

  // delete review
  async delete(id: string): Promise<void> {
    await api.delete(`/reviews/${id}/`)
  },

  // get all reviews for a specific book
  async getBookReviews(bookId: string): Promise<BookReviewsResponse> {
    const { data } = await api.get<BookReviewsResponse>(`/reviews/book/${bookId}/`)
    return data
  },
}