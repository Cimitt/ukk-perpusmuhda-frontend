'use client'

import { BookOpenIcon, UsersIcon, RefreshCwIcon, AlertCircleIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useDashboard } from '@/hooks/useDashboard'
import { LibraryStatisticsCard, LibraryStatisticsCardSkeleton } from '@/components/dashboard/LibraryStatisticsCard'
import { LibraryMetricsCard, LibraryMetricsCardSkeleton } from '@/components/dashboard/LibraryMetricsCard'
import { BorrowReturnComparisonCard, BorrowReturnComparisonCardSkeleton } from '@/components/dashboard/MembersByGradeCard'
import { BookCategoriesCard, BookCategoriesCardSkeleton } from '@/components/dashboard/BookCategoriesCard'
import { RecentTransactionsTable, RecentTransactionsTableSkeleton } from '@/components/dashboard/RecentTransactionsTable'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'

const dummyBorrowReturnStats = {
  borrowed: 125,
  returned: 98,
}

export default function DashboardPage() {
  const { dashboardStats, memberStats, bookStats, transactionStats, loading, error, refetch } = useDashboard()

  if (error) {
    return (
      <div className='space-y-6'>
        <div>
          <h1 className='text-3xl font-bold'>Dashboard</h1>
          <p className='text-muted-foreground mt-2'>Welcome to PerpuSmuhda Library System</p>
        </div>
        
        <Alert variant='destructive'>
          <AlertCircleIcon className='size-4' />
          <AlertTitle>Error Loading Dashboard</AlertTitle>
          <AlertDescription className='flex items-center justify-between'>
            <span>{error}</span>
            <button 
              onClick={refetch}
              className='text-sm underline hover:no-underline'
            >
              Retry
            </button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (loading || !dashboardStats || !memberStats || !bookStats || !transactionStats) {
    return <DashboardSkeleton />
  }

  return (
    <div className='space-y-6'>
      {/* header */}
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
        <p className='text-muted-foreground mt-2'>
          Overview of your library management system
        </p>
      </div>

      {/* stats grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <LibraryStatisticsCard
          icon={<UsersIcon className='size-4' />}
          value={dashboardStats.members.total_active}
          title='Active Members'
          subtitle={`${dashboardStats.members.total_inactive} inactive`}
        />
        <LibraryStatisticsCard
          icon={<BookOpenIcon className='size-4' />}
          value={dashboardStats.books.total}
          title='Total Books'
          subtitle={`${dashboardStats.books.available} available`}
        />
        <LibraryStatisticsCard
          icon={<RefreshCwIcon className='size-4' />}
          value={dashboardStats.transactions.active_loans}
          title='Active Loans'
          subtitle={`${dashboardStats.transactions.returned} returned`}
        />
        <LibraryStatisticsCard
          icon={<AlertCircleIcon className='size-4' />}
          value={dashboardStats.transactions.overdue}
          title='Overdue Books'
          subtitle='Need attention'
        />
      </div>

      <LibraryMetricsCard stats={dashboardStats} />

      {/* chart */}
      <div className='grid gap-6 lg:grid-cols-2'>
        <BorrowReturnComparisonCard stats={dummyBorrowReturnStats}/>
        <BookCategoriesCard stats={bookStats} />
      </div>

      {/* table */}
      <RecentTransactionsTable />

      {/* stats */}
      <div className='grid gap-4 md:grid-cols-3'>
        <Card className='p-6'>
          <div className='space-y-2'>
            <p className='text-sm font-medium text-muted-foreground'>Barcode Scanner</p>
            <p className='text-3xl font-bold'>{transactionStats.scan_methods.scanner}</p>
            <p className='text-xs text-muted-foreground'>transactions via scanner</p>
          </div>
        </Card>
        
        <Card className='p-6'>
          <div className='space-y-2'>
            <p className='text-sm font-medium text-muted-foreground'>Manual Input</p>
            <p className='text-3xl font-bold'>{transactionStats.scan_methods.manual_input}</p>
            <p className='text-xs text-muted-foreground'>transactions via manual</p>
          </div>
        </Card>
        
        <Card className='p-6'>
          <div className='space-y-2'>
            <p className='text-sm font-medium text-muted-foreground'>Total Fines</p>
            <p className='text-3xl font-bold'>
              Rp {transactionStats.total_fine_collected.toLocaleString('id-ID')}
            </p>
            <p className='text-xs text-muted-foreground'>collected from overdue</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Header Skeleton */}
      <div className='space-y-2'>
        <Skeleton className='h-9 w-48' />
        <Skeleton className='h-5 w-96' />
      </div>

      {/* Statistics Cards Skeleton */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <LibraryStatisticsCardSkeleton key={i} />
        ))}
      </div>

      {/* Main Metrics Skeleton */}
      <LibraryMetricsCardSkeleton />

      {/* Charts Skeleton */}
      <div className='grid gap-6 lg:grid-cols-2'>
        <BorrowReturnComparisonCardSkeleton />
        <BookCategoriesCardSkeleton />
      </div>

      {/* Table Skeleton */}
      <RecentTransactionsTableSkeleton />

      {/* Bottom Cards Skeleton */}
      <div className='grid gap-4 md:grid-cols-3'>
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className='p-6'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-9 w-20' />
              <Skeleton className='h-3 w-32' />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}