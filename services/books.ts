import api from '@/lib/axios'
import type {
  Book,
  Category,
  CreateBookData,
  BookStats,
  PaginatedResponse,
} from '@/types'

export const bookService = {
  // books

  // list books
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

  // create book
  async create(bookData: CreateBookData): Promise<Book> {
  const formData = new FormData()
  
  // Required fields
  formData.append('barcode_number', bookData.barcode_number)
  formData.append('title', bookData.title)
  formData.append('category', String(bookData.category))
  formData.append('author', bookData.author)
  formData.append('publisher', bookData.publisher)
  formData.append('year_published', String(bookData.published_year))
  
  // Optional fields - only append if they have values
  if (bookData.isbn && bookData.isbn.trim()) {
    formData.append('isbn', bookData.isbn)
  }
  if (bookData.description && bookData.description.trim()) {
    formData.append('description', bookData.description)
  }
  if (bookData.stock !== undefined && bookData.stock !== null) {
    formData.append('stock', String(bookData.stock))
  }
  if (bookData.cover_image) {
    formData.append('cover_image', bookData.cover_image)
  }

  // Debug log
  console.log('FormData contents:')
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value)
  }

  const { data } = await api.post<Book>('/books/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
},

  // get book detail
  async get(id: number): Promise<Book> {
    const { data } = await api.get<Book>(`/books/${id}/`)
    return data
  },

  // update book
  async update(id: number, updates: Partial<CreateBookData>): Promise<Book> {
    const formData = new FormData()

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        !(typeof value === 'string' && value.trim() === '')
      ) {
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

  // delete book
  async delete(id: number): Promise<void> {
    await api.delete(`/books/${id}/`)
  },

  // Get book by barcode number
  async getByBarcode(barcodeNumber: string): Promise<Book> {
    const { data } = await api.get<Book>(`/books/barcode/${barcodeNumber}/`)
    return data
  },

  // Regenerate barcode for a book (admin action)
  async regenerateBarcode(id: number): Promise<{
    detail: string
    barcode_image?: string
  }> {
    const { data } = await api.post(`/books/${id}/regenerate-barcode/`)
    return data
  },

  // stats
  async getStats(): Promise<BookStats> {
    const { data } = await api.get<BookStats>('/books/stats/')
    return data
  },

  // category

  // list categories
  async listCategories(params?: {
    search?: string
    ordering?: string
  }): Promise<Category[]> {
    const { data } = await api.get<Category[]>('/books/categories/', { params })
    return Array.isArray(data) ? data : []
  },

  // create category
  async createCategory(name: string): Promise<Category> {
    const { data } = await api.post<Category>('/books/categories/', { name })
    return data
  },

  // get category detail
  async getCategory(id: number): Promise<Category> {
    const { data } = await api.get<Category>(`/books/categories/${id}/`)
    return data
  },

  //  update category
  async updateCategory(id: number, name: string): Promise<Category> {
    const { data } = await api.patch<Category>(`/books/categories/${id}/`, { name })
    return data
  },

  // delete category
  async deleteCategory(id: number): Promise<void> {
    await api.delete(`/books/categories/${id}/`)
  },
}