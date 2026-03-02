export type UserRole = 'ADMIN' | 'STAFF' | 'MEMBER'
export type BookStatus = 'available' | 'unavailable'
export type TransactionStatus = 'borrowed' | 'returned' | 'overdue'
export type ScanMethod = 'scanner' | 'manual_input'
export type CorrectAnswer = 'A' | 'B' | 'C' | 'D'

// ── Auth ──────────────────────────────────────────────────────────────────────
export interface User {
  id: number
  email: string
  username: string
  full_name: string
  role: UserRole
  date_joined: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  user: User
  access: string
  refresh: string
}

export interface RegisterData {
  email: string
  username: string
  first_name: string
  last_name: string
  password1: string
  password2: string
  role?: UserRole
}

export interface CreateUserData {
  email: string
  username: string
  full_name: string
  password: string
  role: UserRole
}

export interface ChangePasswordData {
  old_password: string
  new_password1: string
  new_password2: string
}

export interface DashboardStats {
  members: {
    total_active: number
    total_inactive: number
  }
  books: {
    total: number
    available: number
    unavailable: number
    categories: number
  }
  transactions: {
    total: number
    active_loans: number
    overdue: number
    returned: number
  }
}

// ── Members ───────────────────────────────────────────────────────────────────
export interface Member {
  id: string
  nis: string
  name: string
  first_name: string
  last_name: string
  full_name: string
  phone?: number
  email: string
  grade: string
  photo?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface MemberDetail extends Member {
  total_borrowed: number
  active_loans: number
  overdue_loans: number
  total_reviews: number
  total_favorites: number
}

export interface CreateMemberData {
  nis: string
  name: string
  email: string
  password: string
  grade: string
  photo?: File
}

export interface MemberStats {
  total_active: number
  total_inactive: number
  by_grade: Array<{ grade: string; count: number }>
}

// ── Books ─────────────────────────────────────────────────────────────────────
export interface Category {
  id: number
  name: string
  book_count: number
  created_at: string
}

export interface Book {
  id: number
  barcode_number: string
  barcode_image?: string
  isbn?: string
  title: string
  category: number
  category_name: string
  author: string
  publisher: string
  published_year: number
  cover_image?: string
  description: string
  stock: number
  status: BookStatus
  average_rating?: number
  review_count: number
  favorite_count: number
  created_at: string
  updated_at: string
}

export interface CreateBookData {
  barcode_number: string
  title: string
  category: number
  author: string
  publisher: string
  published_year: number
  cover_image?: File
  description?: string
  stock?: number
  isbn?: string
}

export interface BookStats {
  total: number
  available: number
  unavailable: number
  by_category: Array<{ name: string; count: number }>
}

// ── Transactions ──────────────────────────────────────────────────────────────
export interface Transaction {
  id: string
  member: string
  member_name: string
  member_nis: string
  book: string
  book_title: string
  book_author: string
  book_barcode: string
  borrow_date: string
  return_due_date?: string
  actual_return_date?: string
  status: TransactionStatus
  borrow_barcode: string
  borrow_scan_method: ScanMethod
  return_barcode?: string
  return_scan_method?: ScanMethod
  fine_per_day: number
  fine_total: number
  notes: string
  processed_by_name: string
  is_overdue: boolean
  overdue_days: number
  created_at: string
  updated_at: string
}

export interface BorrowBookData {
  barcode_number: string
  member_id: string
  return_due_date?: string
  scan_method?: ScanMethod
  fine_per_day?: number
  notes?: string
  processed_by?: string
}

export interface ReturnBookData {
  barcode_number: string
  member_id: string
  scan_method?: ScanMethod
  notes?: string
  processed_by?: string
}

export interface ReturnBookResponse {
  detail: string
  fine_total: number
  overdue_days: number
  transaction: Transaction
}

export interface TransactionStats {
  total: number
  active_loans: number
  overdue: number
  returned: number
  scan_methods: {
    scanner: number
    manual_input: number
  }
  total_fine_collected: number
}

// ── Reviews ───────────────────────────────────────────────────────────────────
export interface Review {
  id: string
  member: string
  member_name: string
  member_nis: string
  book: string
  book_title: string
  rating: number
  review_text: string
  created_at: string
  updated_at: string
}

export interface CreateReviewData {
  member: string
  book: string
  rating: number
  review_text: string
}

export interface BookReviewsResponse {
  average_rating: number
  total_reviews: number
  rating_distribution: Record<string, number>
  reviews: Review[]
}

// ── Favorites ─────────────────────────────────────────────────────────────────
export interface Favorite {
  id: string
  member: string
  member_name: string
  book: string
  book_title: string
  book_author: string
  book_barcode: string
  book_cover?: string
  book_status: BookStatus
  notes: string
  created_at: string
}

export interface CreateFavoriteData {
  member: string
  book: string
  notes?: string
}

export interface ToggleFavoriteData {
  member_id: string
  book_id: string
  notes?: string
}

export interface ToggleFavoriteResponse {
  action: 'added' | 'removed'
  detail: string
  favorite?: Favorite
}

export interface MemberFavoritesResponse {
  member: string
  total_favorites: number
  favorites: Favorite[]
}

// ── Pagination ────────────────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  count: number
  next?: string
  previous?: string
  results: T[]
}

// ── API Error ─────────────────────────────────────────────────────────────────
export interface APIError {
  detail?: string
  error?: string
  [key: string]: any
}