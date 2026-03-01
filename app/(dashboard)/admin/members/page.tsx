'use client'

import { useState, useEffect, useRef } from 'react'
import {
  SearchIcon,
  MoreVerticalIcon,
  XIcon,
  KeyRoundIcon,
  ShieldOffIcon,
  EyeIcon,
  EyeOffIcon,
  FilterIcon,
  ChevronDownIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { memberService } from '@/services/members'
import type { Member } from '@/types'

// Helper to get member initials for avatar fallback
function getInitials(member: Member) {
  const name = member.full_name || [member.first_name, member.last_name].filter(Boolean).join(' ')
  if (!name) return (member.nis?.[0] ?? '?').toUpperCase()
  const parts = name.trim().split(' ')
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

function getFullName(member: Member) {
  return member.full_name || [member.first_name, member.last_name].filter(Boolean).join(' ') || member.nis
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

// Deactivate member modal
function DeactivateModal({
  member,
  onClose,
  onConfirm,
  loading,
}: {
  member: Member
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
      <div className='w-full max-w-sm rounded-2xl bg-white shadow-2xl'>
        <div className='flex items-center justify-between border-b px-6 py-4'>
          <h2 className='text-base font-semibold text-slate-900'>Nonaktifkan Member</h2>
          <button
            onClick={onClose}
            className='rounded-full p-1 text-slate-400 hover:bg-slate-100 transition-colors'
          >
            <XIcon className='size-4' />
          </button>
        </div>
        <div className='space-y-4 px-6 py-5'>
          <div className='flex items-start gap-3 rounded-lg bg-red-50 p-3'>
            <ShieldOffIcon className='mt-0.5 size-4 text-red-500 shrink-0' />
            <p className='text-sm text-red-700'>
              Akun <span className='font-semibold'>{getFullName(member)}</span> akan dinonaktifkan.
              Member tidak dapat login hingga diaktifkan kembali oleh admin.
            </p>
          </div>
          <div className='flex justify-end gap-2'>
            <Button variant='outline' size='sm' onClick={onClose}>
              Batal
            </Button>
            <Button
              size='sm'
              disabled={loading}
              onClick={onConfirm}
              className='bg-red-600 hover:bg-red-700 text-white gap-1.5'
            >
              <ShieldOffIcon className='size-3.5' />
              {loading ? 'Memproses...' : 'Nonaktifkan'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// reset password modal
function ResetPasswordModal({
  member,
  onClose,
}: {
  member: Member
  onClose: () => void
}) {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 8) {
      setError('Password minimal 8 karakter.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await memberService.resetPassword(member.id, password)
      setSuccess(true)
    } catch (err: any) {
      setError(err?.response?.data?.detail ?? 'Gagal mereset password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
      <div className='w-full max-w-sm rounded-2xl bg-white shadow-2xl'>
        <div className='flex items-center justify-between border-b px-6 py-4'>
          <div>
            <h2 className='text-base font-semibold text-slate-900'>Reset Password</h2>
            <p className='text-xs text-muted-foreground mt-0.5'>{getFullName(member)}</p>
          </div>
          <button
            onClick={onClose}
            className='rounded-full p-1 text-slate-400 hover:bg-slate-100 transition-colors'
          >
            <XIcon className='size-4' />
          </button>
        </div>

        <div className='px-6 py-5'>
          {success ? (
            <div className='space-y-4'>
              <div className='rounded-lg bg-green-50 p-3 text-sm text-green-700'>
                ✓ Password berhasil direset. Informasikan password baru kepada member.
              </div>
              <div className='flex justify-end'>
                <Button size='sm' onClick={onClose}>
                  Tutup
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-4'>
              {error && (
                <p className='rounded-md bg-red-50 px-3 py-2 text-sm text-red-600'>{error}</p>
              )}
              <div className='space-y-1'>
                <label className='text-xs font-medium text-slate-600'>Password Baru</label>
                <div className='relative'>
                  <input
                    type={show ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Min. 8 karakter'
                    className='w-full rounded-lg border border-slate-200 px-3 py-2 pr-10 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
                  />
                  <button
                    type='button'
                    onClick={() => setShow((v) => !v)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600'
                  >
                    {show ? <EyeOffIcon className='size-4' /> : <EyeIcon className='size-4' />}
                  </button>
                </div>
              </div>
              <div className='flex justify-end gap-2'>
                <Button type='button' variant='outline' size='sm' onClick={onClose}>
                  Batal
                </Button>
                <Button type='submit' size='sm' disabled={loading} className='gap-1.5'>
                  <KeyRoundIcon className='size-3.5' />
                  {loading ? 'Menyimpan...' : 'Reset Password'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

// Dropdown for member actions (reset password, deactivate)
function ActionDropdown({
  member,
  onDeactivate,
  onResetPassword,
}: {
  member: Member
  onDeactivate: (m: Member) => void
  onResetPassword: (m: Member) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className='relative inline-block'>
      <Button
        variant='ghost'
        size='icon'
        className='size-8 rounded-full'
        onClick={() => setOpen((v) => !v)}
      >
        <MoreVerticalIcon className='size-4' />
      </Button>

      {open && (
        <div className='absolute right-0 z-50 mt-1 w-48 rounded-lg border border-slate-100 bg-white py-1 shadow-lg'>
          <button
            className='flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors'
            onClick={() => {
              setOpen(false)
              onResetPassword(member)
            }}
          >
            <KeyRoundIcon className='size-3.5 text-slate-400' />
            Reset Password
          </button>
          {member.is_active && (
            <button
              className='flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors'
              onClick={() => {
                setOpen(false)
                onDeactivate(member)
              }}
            >
              <ShieldOffIcon className='size-3.5 text-red-400' />
              Nonaktifkan
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// drowpdown filter status
const STATUS_OPTIONS = [
  { label: 'Semua Status', value: '' },
  { label: 'Aktif', value: 'true' },
  { label: 'Tidak Aktif', value: 'false' },
]

function FilterDropdown({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = STATUS_OPTIONS.find((o) => o.value === value) ?? STATUS_OPTIONS[0]

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className='relative'>
      <button
        onClick={() => setOpen((v) => !v)}
        className='flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors'
      >
        <FilterIcon className='size-3.5 text-slate-400' />
        {selected.label}
        <ChevronDownIcon className='size-3.5 text-slate-400' />
      </button>
      {open && (
        <div className='absolute left-0 z-50 mt-1 w-40 rounded-lg border border-slate-100 bg-white py-1 shadow-lg'>
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`flex w-full items-center px-3 py-2 text-sm transition-colors ${
                opt.value === value
                  ? 'bg-primary/5 text-primary font-medium'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const [deactivateTarget, setDeactivateTarget] = useState<Member | null>(null)
  const [deactivateLoading, setDeactivateLoading] = useState(false)
  const [resetTarget, setResetTarget] = useState<Member | null>(null)

  // Fetch
  const fetchMembers = async (q?: string, status?: string) => {
    setLoading(true)
    try {
      const params: Record<string, any> = {}
      if (q) params.search = q
      if (status !== '') params.is_active = status
      const res = await memberService.list(params)
      setMembers(res.results)
      setTotal(res.count)
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  // Debounced search + filter
  useEffect(() => {
    const t = setTimeout(() => fetchMembers(search, statusFilter), 400)
    return () => clearTimeout(t)
  }, [search, statusFilter])

  // Deactivate
  const handleDeactivateConfirm = async () => {
    if (!deactivateTarget) return
    setDeactivateLoading(true)
    try {
      await memberService.deactivate(deactivateTarget.id)
      setMembers((prev) =>
        prev.map((m) =>
          m.id === deactivateTarget.id ? { ...m, is_active: false } : m
        )
      )
      setDeactivateTarget(null)
    } catch {
      alert('Gagal menonaktifkan member.')
    } finally {
      setDeactivateLoading(false)
    }
  }

  const activeCount = members.filter((m) => m.is_active).length
  const inactiveCount = members.filter((m) => !m.is_active).length

  return (
    <div className='space-y-6'>
      {/* Modals */}
      {deactivateTarget && (
        <DeactivateModal
          member={deactivateTarget}
          onClose={() => setDeactivateTarget(null)}
          onConfirm={handleDeactivateConfirm}
          loading={deactivateLoading}
        />
      )}
      {resetTarget && (
        <ResetPasswordModal
          member={resetTarget}
          onClose={() => setResetTarget(null)}
        />
      )}

      {/* Page Header */}
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>Library Members</h1>
        <p className='text-muted-foreground text-sm'>
          Kelola akun, status, dan akses seluruh anggota perpustakaan.
        </p>
      </div>

      {/* Stats Strip */}
      <div className='grid grid-cols-3 gap-3'>
        {[
          { label: 'Total Member', value: total, color: 'text-slate-900' },
          { label: 'Aktif', value: activeCount, color: 'text-green-600' },
          { label: 'Tidak Aktif', value: inactiveCount, color: 'text-red-500' },
        ].map((s) => (
          <Card key={s.label} className='border-none shadow-sm shadow-slate-200/50'>
            <CardContent className='px-5 py-4'>
              <p className='text-xs text-muted-foreground'>{s.label}</p>
              <p className={`text-2xl font-bold mt-0.5 ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Card */}
      <Card className='border-none shadow-sm shadow-slate-200/50'>
        <CardHeader className='flex flex-col sm:flex-row items-center gap-3 border-b pb-5'>
          {/* Search */}
          <div className='relative flex-1 w-full'>
            <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Cari nama, NIS, atau email...'
              className='w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all'
            />
          </div>
          {/* Status Filter */}
          <FilterDropdown value={statusFilter} onChange={setStatusFilter} />
        </CardHeader>

        <CardContent className='p-0'>
          <Table>
            <TableHeader className='bg-slate-50/50'>
              <TableRow>
                <TableHead className='pl-6'>Member</TableHead>
                <TableHead>NIS</TableHead>
                <TableHead>No. HP</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bergabung</TableHead>
                <TableHead className='text-right pr-6'>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className='py-12 text-center text-sm text-muted-foreground'>
                    Memuat data...
                  </TableCell>
                </TableRow>
              ) : members.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className='py-12 text-center text-sm text-muted-foreground'>
                    Tidak ada member ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                members.map((member) => (
                  <TableRow
                    key={member.id}
                    className={`hover:bg-slate-50/50 transition-colors ${!member.is_active ? 'opacity-60' : ''}`}
                  >
                    {/* Member */}
                    <TableCell className='pl-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <Avatar className='size-9 border'>
                          {member.photo && (
                            <AvatarImage src={member.photo} alt={getFullName(member)} />
                          )}
                          <AvatarFallback className='text-xs bg-primary/5 text-primary font-bold'>
                            {getInitials(member)}
                          </AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                          <span className='font-medium text-sm text-slate-900'>
                            {getFullName(member)}
                          </span>
                          <span className='text-xs text-muted-foreground'>{member.email}</span>
                        </div>
                      </div>
                    </TableCell>

                    {/* NIS */}
                    <TableCell className='text-sm font-mono text-slate-600'>
                      {member.nis ?? '-'}
                    </TableCell>

                    {/* Phone */}
                    <TableCell className='text-sm text-slate-600'>
                      {member.phone || '-'}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      {member.is_active ? (
                        <Badge className='bg-green-50 text-green-700 border-green-200 shadow-none'>
                          Aktif
                        </Badge>
                      ) : (
                        <Badge className='bg-slate-100 text-slate-500 border-slate-200 shadow-none'>
                          Tidak Aktif
                        </Badge>
                      )}
                    </TableCell>

                    {/* Joined */}
                    <TableCell className='text-sm text-slate-500'>
                      {formatDate(member.created_at)}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className='text-right pr-6'>
                      <ActionDropdown
                        member={member}
                        onDeactivate={setDeactivateTarget}
                        onResetPassword={setResetTarget}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}