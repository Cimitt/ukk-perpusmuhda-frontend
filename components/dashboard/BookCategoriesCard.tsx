'use client'

import { Pie, PieChart, Cell, Legend, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { BookStats } from '@/types'

type BookCategoriesCardProps = {
  stats: BookStats
  className?: string
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(var(--accent))',
  'hsl(var(--muted))',
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7c7c',
]

export function BookCategoriesCard({ stats, className }: BookCategoriesCardProps) {
  const chartData = stats.by_category.map((item, index) => ({
    name: item.name,
    value: item.count,
    fill: COLORS[index % COLORS.length],
  }))

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Books by Category</CardTitle>
        <p className='text-sm text-muted-foreground'>
          Total: {stats.total} books in {stats.by_category.length} categories
        </p>
      </CardHeader>
      <CardContent className='flex justify-center'>
        <PieChart width={300} height={300}>
          <Pie
            data={chartData}
            cx={150}
            cy={150}
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill='#8884d8'
            dataKey='value'
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </CardContent>
    </Card>
  )
}

export function BookCategoriesCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className='h-6 w-40' />
        <Skeleton className='h-4 w-56' />
      </CardHeader>
      <CardContent className='flex justify-center'>
        <Skeleton className='size-75 rounded-full' />
      </CardContent>
    </Card>
  )
}