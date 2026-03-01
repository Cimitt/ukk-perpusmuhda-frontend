// services/favorites.ts - Favorite books API calls

import api from '@/lib/axios'
import type {
  Favorite,
  CreateFavoriteData,
  ToggleFavoriteData,
  ToggleFavoriteResponse,
  MemberFavoritesResponse,
  PaginatedResponse,
} from '@/types'

export const favoriteService = {
  // list favorites
  async list(params?: {
    search?: string
    member?: string
    book?: string
    ordering?: string
    page?: number
  }): Promise<PaginatedResponse<Favorite>> {
    const { data } = await api.get<PaginatedResponse<Favorite>>('/favorites/', { params })
    return data
  },

  // create favorite
  async create(favoriteData: CreateFavoriteData): Promise<Favorite> {
    const { data } = await api.post<Favorite>('/favorites/', favoriteData)
    return data
  },

  // get favorite detail
  async get(id: string): Promise<Favorite> {
    const { data } = await api.get<Favorite>(`/favorites/${id}/`)
    return data
  },

  // delete favorite
  async delete(id: string): Promise<void> {
    await api.delete(`/favorites/${id}/`)
  },

  // toggle favorite (add/remove)
  async toggle(toggleData: ToggleFavoriteData): Promise<ToggleFavoriteResponse> {
    const { data } = await api.post<ToggleFavoriteResponse>('/favorites/toggle/', toggleData)
    return data
  },

  // get all favorites for a specific member
  async getMemberFavorites(memberId: string): Promise<MemberFavoritesResponse> {
    const { data } = await api.get<MemberFavoritesResponse>(`/favorites/member/${memberId}/`)
    return data
  },

  // get total favorite count for a specific book
  async getBookFavoriteCount(bookId: string): Promise<{
    book_id: string
    favorite_count: number
  }> {
    const { data } = await api.get(`/favorites/book/${bookId}/count/`)
    return data
  },
}