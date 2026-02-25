'use client'

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

type BorrowReturnStats = {
  borrowed: number
  returned: number
}

type BorrowReturnComparisonCardProps = {
  stats?: BorrowReturnStats | null
  className?: string
}

// Warna sesuai tema ShadCN / Tailwind
const COLORS = ['hsl(var(--primary))', 'hsl(var(--success))']

export function BorrowReturnComparisonCard({
  stats,
  className,
}: BorrowReturnComparisonCardProps) {
  if (!stats) {
    return <BorrowReturnComparisonCardSkeleton />
  }

  const chartData = [
    { name: 'Borrowed', value: stats.borrowed },
    { name: 'Returned', value: stats.returned },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Borrow vs Return</CardTitle>
        <p className='text-sm text-muted-foreground'>
          Comparison of total borrowings and returns
        </p>
      </CardHeader>

      <CardContent className='flex justify-center'>
        <PieChart width={250} height={250}>
          <Pie
            data={chartData}
            dataKey='value'
            nameKey='name'
            cx='50%'
            cy='50%'
            outerRadius={80}
            fill='#8884d8'
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`${value}`, '']} />
          <Legend verticalAlign='bottom' height={36} />
        </PieChart>
      </CardContent>
    </Card>
  )
}

export function BorrowReturnComparisonCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className='h-6 w-48' />
        <Skeleton className='h-4 w-56' />
      </CardHeader>
      <CardContent>
        <Skeleton className='h-62.5 w-full' />
      </CardContent>
    </Card>
  )
}