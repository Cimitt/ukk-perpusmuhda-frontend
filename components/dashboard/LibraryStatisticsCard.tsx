'use client'

import { BookOpenIcon, UsersIcon, TrendingUpIcon, AlertCircleIcon } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type StatisticsCardProps = {
  icon: ReactNode
  value: string | number
  title: string
  subtitle: string
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

export function LibraryStatisticsCard({ 
  icon, 
  value, 
  title, 
  subtitle, 
  trend = 'neutral',
  className 
}: StatisticsCardProps) {
  return (
    <Card className={cn('gap-4', className)}>
      <CardHeader className='flex items-center'>
        <div className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-md'>
          {icon}
        </div>
        <span className='text-2xl font-semibold'>{value}</span>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <span className='font-semibold'>{title}</span>
        <p className='flex items-center gap-2'>
          <span className='text-sm text-muted-foreground'>{subtitle}</span>
        </p>
      </CardContent>
    </Card>
  )
}

export function LibraryStatisticsCardSkeleton() {
  return (
    <Card className='gap-4'>
      <CardHeader className='flex items-center'>
        <Skeleton className='size-10 rounded-md' />
        <Skeleton className='h-8 w-20' />
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <Skeleton className='h-5 w-32' />
        <Skeleton className='h-4 w-40' />
      </CardContent>
    </Card>
  )
}