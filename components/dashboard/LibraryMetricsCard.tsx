'use client'

import {
  BookOpenIcon,
  UsersIcon,
  RefreshCwIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  TrendingUpIcon,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { DashboardStats } from '@/types'

type LibraryMetricsCardProps = {
  stats: DashboardStats
  className?: string
}

export function LibraryMetricsCard({ stats, className }: LibraryMetricsCardProps) {
  const metricsData = [
    {
      icon: <UsersIcon className='size-5' />,
      title: 'Active Members',
      value: stats.members.total_active.toString(),
    },
    {
      icon: <BookOpenIcon className='size-5' />,
      title: 'Total Books',
      value: stats.books.total.toString(),
    },
    {
      icon: <CheckCircleIcon className='size-5' />,
      title: 'Available Books',
      value: stats.books.available.toString(),
    },
    {
      icon: <RefreshCwIcon className='size-5' />,
      title: 'Active Loans',
      value: stats.transactions.active_loans.toString(),
    },
    {
      icon: <AlertCircleIcon className='size-5' />,
      title: 'Overdue',
      value: stats.transactions.overdue.toString(),
    },
    {
      icon: <TrendingUpIcon className='size-5' />,
      title: 'Total Returned',
      value: stats.transactions.returned.toString(),
    },
  ]

  return (
    <Card className={className}>
      <CardContent className='space-y-4 pt-6'>
        <div className='flex flex-col gap-7'>
          <span className='text-lg font-semibold'>Library Metrics</span>
          
          <div className='flex items-center gap-3'>
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/logo/logo-square.png'
              className='size-10.5 rounded-lg'
              alt='logo'
            />
            <div className='flex flex-col gap-0.5'>
              <span className='text-xl font-medium'>PerpuSmuhda</span>
              <span className='text-muted-foreground text-sm'>Library Management System</span>
            </div>
          </div>

          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {metricsData.map((metric, index) => (
              <div key={index} className='flex items-center gap-3 rounded-md border px-4 py-3'>
                <Avatar className='size-9 rounded-sm'>
                  <AvatarFallback className='bg-primary/10 text-primary shrink-0 rounded-sm'>
                    {metric.icon}
                  </AvatarFallback>
                </Avatar>
                <div className='flex flex-col gap-0.5'>
                  <span className='text-muted-foreground text-sm font-medium'>{metric.title}</span>
                  <span className='text-xl font-semibold'>{metric.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function LibraryMetricsCardSkeleton() {
  return (
    <Card>
      <CardContent className='space-y-4 pt-6'>
        <div className='flex flex-col gap-7'>
          <Skeleton className='h-6 w-40' />
          
          <div className='flex items-center gap-3'>
            <Skeleton className='size-10.5 rounded-lg' />
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-6 w-32' />
              <Skeleton className='h-4 w-48' />
            </div>
          </div>

          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className='flex items-center gap-3 rounded-md border px-4 py-3'>
                <Skeleton className='size-9 rounded-sm' />
                <div className='flex flex-col gap-2'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-6 w-12' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}