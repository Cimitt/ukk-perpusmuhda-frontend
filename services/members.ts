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
  // list
  async list(params?: {
    search?: string
    grade?: string
    is_active?: boolean | string
    ordering?: string
    page?: number
  }): Promise<PaginatedResponse<Member>> {
    const { data } = await api.get<PaginatedResponse<Member>>('/auth/members/', { params })
    return data
  },

  // create
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
    const { data } = await api.post<Member>('/auth/members/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },

  // get detail
  async get(id: string): Promise<MemberDetail> {
    const { data } = await api.get<MemberDetail>(`/auth/members/${id}/`)
    return data
  },

  // update
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
    const { data } = await api.patch<Member>(`/auth/members/${id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },

  // deactivate
  async deactivate(id: string): Promise<{ detail: string }> {
    const { data } = await api.delete(`/auth/members/${id}/`)
    return data
  },

  // reset pw
  async resetPassword(id: string, new_password: string): Promise<{ detail: string }> {
    const { data } = await api.post(`/auth/users/${id}/reset-password/`, { new_password })
    return data
  },

  // get borrow history
  async getBorrowHistory(id: string): Promise<{
    member: MemberDetail
    transactions: Transaction[]
  }> {
    const { data } = await api.get(`/auth/members/${id}/history/`)
    return data
  },

  // get member stat
  async getStats(): Promise<MemberStats> {
    const { data } = await api.get<MemberStats>('/auth/members/stats/')
    return data
  },
}