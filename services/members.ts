import api from '@/lib/axios'
import type {
  Member,
  MemberDetail,
  CreateMemberData,
  MemberStats,
  Transaction,
  PaginatedResponse,
} from '@/types'

export const memberService = {
  /**
   * List all members with optional filters
   */
  async list(params?: {
    search?: string
    grade?: string
    is_active?: boolean
    ordering?: string
    page?: number
  }): Promise<PaginatedResponse<Member>> {
    const { data } = await api.get<PaginatedResponse<Member>>('/members/', { params })
    return data
  },

  /**
   * Create new member
   */
  async create(memberData: CreateMemberData): Promise<Member> {
    const formData = new FormData()
    formData.append('nis', memberData.nis)
    formData.append('name', memberData.name)
    formData.append('email', memberData.email)
    formData.append('password', memberData.password)
    formData.append('grade', memberData.grade)
    if (memberData.photo) {
      formData.append('photo', memberData.photo)
    }

    const { data } = await api.post<Member>('/members/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },

  /**
   * Get member detail with statistics
   */
  async get(id: string): Promise<MemberDetail> {
    const { data } = await api.get<MemberDetail>(`/members/${id}/`)
    return data
  },

  /**
   * Update member
   */
  async update(id: string, updates: Partial<CreateMemberData>): Promise<Member> {
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

    const { data } = await api.patch<Member>(`/members/${id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },

  /**
   * Deactivate member (soft delete)
   */
  async deactivate(id: string): Promise<{ detail: string }> {
    const { data } = await api.delete(`/members/${id}/`)
    return data
  },

  /**
   * Get member's borrow history
   */
  async getBorrowHistory(id: string): Promise<{
    member: MemberDetail
    transactions: Transaction[]
  }> {
    const { data } = await api.get(`/members/${id}/history/`)
    return data
  },

  /**
   * Get member statistics
   */
  async getStats(): Promise<MemberStats> {
    const { data } = await api.get<MemberStats>('/auth/members/stats/')
    return data
  },
}