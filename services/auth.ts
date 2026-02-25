// services/auth.ts - Authentication API calls

import api from '@/lib/axios'
import type {
  User,
  LoginCredentials,
  LoginResponse,
  RegisterData,
  CreateUserData,
  ChangePasswordData,
  DashboardStats,
} from '@/types'

export const authService = {
// login
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/login/', credentials)
    
    // Store tokens
    if (data.access) {
      localStorage.setItem('access_token', data.access)
    }
    if (data.refresh) {
      localStorage.setItem('refresh_token', data.refresh)
    }
    
    return data
  },

// logout
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout/')
    } finally {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }
  },

// register
  async register(data: RegisterData): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/register/', data)
    
    if (response.data.access) {
      localStorage.setItem('access_token', response.data.access)
    }
    if (response.data.refresh) {
      localStorage.setItem('refresh_token', response.data.refresh)
    }
    
    return response.data
  },

// refresh token
  async refreshToken(refresh: string): Promise<{ access: string; refresh?: string }> {
    const { data } = await api.post('/auth/token/refresh/', { refresh })
    return data
  },

// get current user
  async getCurrentUser(): Promise<User> {
    const { data } = await api.get<User>('/auth/me/')
    return data
  },

// update current profile
  async updateCurrentUser(updates: Partial<User>): Promise<User> {
    const { data } = await api.patch<User>('/auth/me/', updates)
    return data
  },

// change pass
  async changePassword(passwords: ChangePasswordData): Promise<{ detail: string }> {
    const { data } = await api.post('/auth/change-password/', passwords)
    return data
  },

// admin

// get dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    const { data } = await api.get<DashboardStats>('/auth/dashboard/')
    return data
  },

// list user
  async listUsers(params?: { role?: string }): Promise<User[]> {
    const { data } = await api.get<User[]>('/auth/users/', { params })
    return data
  },

// create user
  async createUser(userData: CreateUserData): Promise<User> {
    const { data } = await api.post<User>('/auth/users/', userData)
    return data
  },

// user detail
  async getUser(id: number): Promise<User> {
    const { data } = await api.get<User>(`/auth/users/${id}/`)
    return data
  },

// update user
  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const { data } = await api.patch<User>(`/auth/users/${id}/`, updates)
    return data
  },

// delete user
  async deleteUser(id: number): Promise<void> {
    await api.delete(`/auth/users/${id}/`)
  },

// check user authenticated
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false
    return !!localStorage.getItem('access_token')
  },

// get stored token
  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('access_token')
  },

// get refresh token
  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('refresh_token')
  },
}