'use client'

import {
  BookOpenIcon,
  UsersIcon,
  RefreshCwIcon,
  AlertCircleIcon,
  TrendingUpIcon,
  ClockIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  CheckCircle2Icon,
  RotateCcwIcon,
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useDashboard } from '@/hooks/useDashboard'
import { BorrowTrendCard, BorrowTrendCardSkeleton } from '@/components/dashboard/TransactionTren'
import { RecentTransactionsTable, RecentTransactionsTableSkeleton } from '@/components/dashboard/RecentTransactionsTable'

// stat card component
function StatCard({
  title, value, sub, subPositive, icon, accent, delay = 0,
}: {
  title: string; value: number | string; sub: string
  subPositive?: boolean; icon: React.ReactNode; accent: string; delay?: number
}) {
  return (
    <div
      className='group relative overflow-hidden rounded-2xl bg-white border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5'
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`absolute -top-6 -right-6 size-24 rounded-full opacity-10 blur-2xl ${accent}`} />
      <div className='flex items-start justify-between'>
        <div className={`inline-flex items-center justify-center rounded-xl p-2.5 ${accent} bg-opacity-10`}>
          <span className='opacity-80'>{icon}</span>
        </div>
        <ArrowUpRightIcon className='size-4 text-slate-300 group-hover:text-slate-400 transition-colors' />
      </div>
      <div className='mt-4'>
        <p className='text-xs font-medium uppercase tracking-widest text-slate-400'>{title}</p>
        <p className='mt-1 text-3xl font-bold text-slate-900 tabular-nums'>{Number(value).toLocaleString('id-ID')}</p>
      </div>
      <div className='mt-3 flex items-center gap-1.5'>
        {subPositive !== undefined && (
          subPositive
            ? <ArrowUpRightIcon className='size-3 text-emerald-500' />
            : <ArrowDownRightIcon className='size-3 text-red-400' />
        )}
        <span className={`text-xs font-medium ${subPositive === true ? 'text-emerald-600' : subPositive === false ? 'text-red-500' : 'text-slate-400'}`}>
          {sub}
        </span>
      </div>
    </div>
  )
}

// quick metric card for middle row
function QuickMetric({ label, value, icon, color }: {
  label: string; value: number; icon: React.ReactNode; color: string
}) {
  return (
    <div className='flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 hover:bg-slate-100 transition-colors'>
      <div className={`rounded-lg p-2 ${color}`}>{icon}</div>
      <div className='flex-1 min-w-0'>
        <p className='text-xs text-slate-500 truncate'>{label}</p>
        <p className='text-sm font-semibold text-slate-900 tabular-nums'>{value.toLocaleString('id-ID')}</p>
      </div>
    </div>
  )
}

// hero
function HeroBanner({ stats }: { stats: any }) {
  const loanRate = stats.books.total > 0
    ? Math.round((stats.transactions.active_loans / stats.books.total) * 100)
    : 0

  return (
    <div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-6 text-white shadow-lg shadow-indigo-200'>
      <div className='absolute -top-10 -right-10 size-48 rounded-full bg-white/5' />
      <div className='absolute top-8 -right-4 size-28 rounded-full bg-white/5' />
      <div className='absolute -bottom-8 left-1/3 size-36 rounded-full bg-white/5' />

      <div className='relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <div className='flex items-center gap-2 mb-2'>
            <div className='size-2 rounded-full bg-emerald-400 animate-pulse' />
            <span className='text-xs font-medium text-indigo-200 uppercase tracking-widest'>System Active</span>
          </div>
          <h2 className='text-2xl font-bold'>PerpuSmuhda Library</h2>
          <p className='mt-1 text-sm text-indigo-200'>
            {stats.transactions.active_loans} buku sedang dipinjam dari {stats.books.total} koleksi
          </p>
        </div>
        <div className='shrink-0 flex flex-col items-center gap-1'>
          <div className='relative size-20'>
            <svg className='size-20 -rotate-90' viewBox='0 0 36 36'>
              <circle cx='18' cy='18' r='15.9' fill='none' stroke='rgba(255,255,255,0.15)' strokeWidth='3' />
              <circle
                cx='18' cy='18' r='15.9' fill='none' stroke='#34d399' strokeWidth='3'
                strokeDasharray={`${loanRate} ${100 - loanRate}`} strokeLinecap='round'
                className='transition-all duration-1000'
              />
            </svg>
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
              <span className='text-lg font-bold'>{loanRate}%</span>
            </div>
          </div>
          <span className='text-xs text-indigo-200'>Loan Rate</span>
        </div>
      </div>

      <div className='relative mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4'>
        {[
          { label: 'Dikembalikan', value: stats.transactions.returned, icon: <CheckCircle2Icon className='size-3' /> },
          { label: 'Terlambat', value: stats.transactions.overdue, icon: <ClockIcon className='size-3' /> },
          { label: 'Kategori', value: stats.books.categories, icon: <BookOpenIcon className='size-3' /> },
        ].map((item) => (
          <div key={item.label} className='text-center'>
            <div className='flex items-center justify-center gap-1 text-indigo-300 mb-0.5'>
              {item.icon}
              <span className='text-xs'>{item.label}</span>
            </div>
            <p className='text-xl font-bold tabular-nums'>{item.value.toLocaleString('id-ID')}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// book availability card with horizontal bar
function BookAvailabilityCard({ stats }: { stats: any }) {
  const availablePct = stats.books.total > 0
    ? Math.round((stats.books.available / stats.books.total) * 100) : 0

  return (
    <div className='rounded-2xl bg-white border border-slate-100 p-5 shadow-sm space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-semibold text-slate-800'>Ketersediaan Buku</h3>
        <span className='text-xs text-slate-400'>{stats.books.total} total</span>
      </div>
      <div className='flex h-3 overflow-hidden rounded-full bg-slate-100'>
        <div className='bg-emerald-400 transition-all duration-1000' style={{ width: `${availablePct}%` }} />
        <div className='bg-amber-400 transition-all duration-1000' style={{ width: `${100 - availablePct}%` }} />
      </div>
      <div className='flex items-center justify-between text-xs'>
        <div className='flex items-center gap-1.5'>
          <span className='size-2 rounded-full bg-emerald-400 inline-block' />
          <span className='text-slate-600'>Tersedia <strong>{stats.books.available}</strong></span>
        </div>
        <div className='flex items-center gap-1.5'>
          <span className='size-2 rounded-full bg-amber-400 inline-block' />
          <span className='text-slate-600'>Dipinjam <strong>{stats.books.unavailable}</strong></span>
        </div>
      </div>
    </div>
  )
}

// member status card 
function MemberStatusCard({ stats }: { stats: any }) {
  const total = stats.members.total_active + stats.members.total_inactive
  const activePct = total > 0 ? Math.round((stats.members.total_active / total) * 100) : 0

  return (
    <div className='rounded-2xl bg-white border border-slate-100 p-5 shadow-sm space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-semibold text-slate-800'>Status Anggota</h3>
        <span className='text-xs text-slate-400'>{total} total</span>
      </div>
      <div className='flex items-center gap-4'>
        <div className='relative shrink-0 size-16'>
          <svg className='size-16 -rotate-90' viewBox='0 0 36 36'>
            <circle cx='18' cy='18' r='14' fill='none' stroke='#f1f5f9' strokeWidth='4' />
            <circle
              cx='18' cy='18' r='14' fill='none' stroke='#6366f1' strokeWidth='4'
              strokeDasharray={`${activePct * 0.879} ${100 - activePct * 0.879}`}
              strokeLinecap='round'
            />
          </svg>
          <div className='absolute inset-0 flex items-center justify-center'>
            <span className='text-xs font-bold text-slate-700'>{activePct}%</span>
          </div>
        </div>
        <div className='space-y-2 flex-1'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1.5'>
              <span className='size-2 rounded-full bg-indigo-500 inline-block' />
              <span className='text-xs text-slate-600'>Aktif</span>
            </div>
            <span className='text-xs font-semibold text-slate-800'>{stats.members.total_active}</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1.5'>
              <span className='size-2 rounded-full bg-slate-200 inline-block' />
              <span className='text-xs text-slate-600'>Tidak Aktif</span>
            </div>
            <span className='text-xs font-semibold text-slate-800'>{stats.members.total_inactive}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// skeleton
function DashboardSkeleton() {
  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <Skeleton className='h-8 w-40' />
        <Skeleton className='h-4 w-64' />
      </div>
      <Skeleton className='h-44 w-full rounded-2xl' />
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className='h-32 rounded-2xl' />
        ))}
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className='h-28 rounded-2xl' />
        ))}
      </div>
      <div className='grid gap-6 lg:grid-cols-5'>
        <div className='lg:col-span-3'><BorrowTrendCardSkeleton /></div>
        <div className='lg:col-span-2'><Skeleton className='h-64 rounded-2xl' /></div>
      </div>
      <RecentTransactionsTableSkeleton />
    </div>
  )
}

// page
export default function DashboardPage() {
  const { dashboardStats, loading, error, refetch } = useDashboard()

  if (error) {
    return (
      <div className='space-y-6'>
        <div>
          <h1 className='text-2xl font-bold'>Dashboard</h1>
          <p className='text-muted-foreground text-sm'>PerpuSmuhda Library System</p>
        </div>
        <Alert variant='destructive'>
          <AlertCircleIcon className='size-4' />
          <AlertTitle>Gagal memuat dashboard</AlertTitle>
          <AlertDescription className='flex items-center justify-between mt-1'>
            <span>{error}</span>
            <button onClick={refetch} className='flex items-center gap-1 text-sm underline hover:no-underline'>
              <RotateCcwIcon className='size-3' /> Coba lagi
            </button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (loading || !dashboardStats) return <DashboardSkeleton />

  const s = dashboardStats

  return (
    <div className='space-y-6'>

      {/* header */}
      <div className='flex items-start justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight text-slate-900'>Dashboard</h1>
          <p className='text-sm text-muted-foreground mt-0.5'>
            Selamat datang — berikut ringkasan perpustakaan hari ini.
          </p>
        </div>
        <button
          onClick={refetch}
          className='flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm hover:bg-slate-50 transition-colors'
        >
          <RotateCcwIcon className='size-3' /> Refresh
        </button>
      </div>

      {/* hero */}
      <HeroBanner stats={s} />

      {/* 4 stat cards */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard title='Anggota Aktif' value={s.members.total_active}
          sub={`${s.members.total_inactive} tidak aktif`}
          icon={<UsersIcon className='size-4 text-indigo-600' />} accent='bg-indigo-500' delay={0} />
        <StatCard title='Total Buku' value={s.books.total}
          sub={`${s.books.available} tersedia`} subPositive={true}
          icon={<BookOpenIcon className='size-4 text-violet-600' />} accent='bg-violet-500' delay={75} />
        <StatCard title='Peminjaman Aktif' value={s.transactions.active_loans}
          sub={`${s.transactions.returned} dikembalikan`}
          icon={<RefreshCwIcon className='size-4 text-sky-600' />} accent='bg-sky-500' delay={150} />
        <StatCard title='Buku Terlambat' value={s.transactions.overdue}
          sub='Perlu ditindaklanjuti'
          subPositive={s.transactions.overdue === 0 ? undefined : false}
          icon={<AlertCircleIcon className='size-4 text-rose-600' />} accent='bg-rose-500' delay={225} />
      </div>

      {/* middle row */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <div className='space-y-2'>
          <QuickMetric label='Total Transaksi' value={s.transactions.total}
            icon={<TrendingUpIcon className='size-3.5 text-indigo-600' />} color='bg-indigo-50' />
          <QuickMetric label='Buku Tidak Tersedia' value={s.books.unavailable}
            icon={<BookOpenIcon className='size-3.5 text-amber-600' />} color='bg-amber-50' />
          <QuickMetric label='Kategori Buku' value={s.books.categories}
            icon={<ClockIcon className='size-3.5 text-slate-500' />} color='bg-slate-100' />
        </div>
        <BookAvailabilityCard stats={s} />
        <MemberStatusCard stats={s} />
      </div>

      {/* bottom: trend chart (wider) + recent table */}
      <div className='grid gap-6 lg:grid-cols-5'>
        <div className='lg:col-span-3'>
          <BorrowTrendCard />
        </div>
        <div className='lg:col-span-2'>
          <RecentTransactionsTable />
        </div>
      </div>

    </div>
  )
}