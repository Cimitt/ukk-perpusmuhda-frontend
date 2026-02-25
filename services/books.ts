import api from '@/lib/axios'
import type {
  Book,
  Category,
  CreateBookData,
  BookStats,
  PaginatedResponse,
} from '@/types'

export const bookService = {
  // ── Books ───────────────────────────────────────────────────────────────────

  /**
   * List all books with optional filters
   */
  async list(params?: {
    search?: string
    category?: string
    status?: string
    published_year?: number
    ordering?: string
    page?: number
  }): Promise<PaginatedResponse<Book>> {
    const { data } = await api.get<PaginatedResponse<Book>>('/books/', { params })
    return data
  },

  /**
   * Create new book
   */
  async create(bookData: CreateBookData): Promise<Book> {
    const formData = new FormData()
    formData.append('barcode_number', bookData.barcode_number)
    formData.append('title', bookData.title)
    formData.append('category', bookData.category)
    formData.append('author', bookData.author)
    formData.append('publisher', bookData.publisher)
    formData.append('published_year', String(bookData.published_year))
    if (bookData.description) {
      formData.append('description', bookData.description)
    }
    if (bookData.stock !== undefined) {
      formData.append('stock', String(bookData.stock))
    }
    if (bookData.cover_image) {
      formData.append('cover_image', bookData.cover_image)
    }

    const { data } = await api.post<Book>('/books/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },

  /**
   * Get book detail
   */
  async get(id: string): Promise<Book> {
    const { data } = await api.get<Book>(`/books/${id}/`)
    return data
  },

  /**
   * Update book
   */
  async update(id: string, updates: Partial<CreateBookData>): Promise<Book> {
    const formData = new FormData()
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        if (value instanceof File) {
          formData.append(key, value)
        } else {
          formData.append(key, String(value))
        }
      }
    })

    const { data } = await api.patch<Book>(`/books/${id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },

  /**
   * Delete book
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/books/${id}/`)
  },

  /**
   * Look up book by barcode number (for scanner)
   */
  async getByBarcode(barcodeNumber: string): Promise<Book> {
    const { data } = await api.get<Book>(`/books/barcode/${barcodeNumber}/`)
    return data
  },

  /**
   * Regenerate barcode image for a book
   */
  async regenerateBarcode(id: string): Promise<{
    detail: string
    barcode_image?: string
  }> {
    const { data } = await api.post(`/books/${id}/regenerate-barcode/`)
    return data
  },

  /**
   * Get book inventory statistics
   */
  async getStats(): Promise<BookStats> {
    const { data } = await api.get<BookStats>('/books/stats/')
    return data
  },

  // ── Categories ──────────────────────────────────────────────────────────────

  /**
   * List all categories
   */
  async listCategories(params?: {
    search?: string
    ordering?: string
  }): Promise<Category[]> {
    const { data } = await api.get<Category[]>('/books/categories/', { params })
    return data
  },

  /**
   * Create category
   */
  async createCategory(name: string): Promise<Category> {
    const { data } = await api.post<Category>('/books/categories/', { name })
    return data
  },

  /**
   * Get category detail
   */
  async getCategory(id: string): Promise<Category> {
    const { data } = await api.get<Category>(`/books/categories/${id}/`)
    return data
  },

  /**
   * Update category
   */
  async updateCategory(id: string, name: string): Promise<Category> {
    const { data } = await api.patch<Category>(`/books/categories/${id}/`, { name })
    return data
  },

  /**
   * Delete category
   */
  async deleteCategory(id: string): Promise<void> {
    await api.delete(`/books/categories/${id}/`)
  },
}