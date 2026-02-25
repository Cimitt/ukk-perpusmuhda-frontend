'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { EllipsisVerticalIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import type { ColumnDef, PaginationState } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { transactionService } from '@/services'
import type { Transaction } from '@/types'

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'member_name',
    header: 'Member',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Avatar className='size-9'>
          <AvatarFallback className='text-xs'>
            {row.original.member_name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col text-sm'>
          <span className='font-medium'>{row.original.member_name}</span>
          <span className='text-muted-foreground text-xs'>{row.original.member_nis}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'book_title',
    header: 'Book',
    cell: ({ row }) => (
      <div className='flex flex-col'>
        <span className='font-medium'>{row.original.book_title}</span>
        <span className='text-muted-foreground text-xs'>{row.original.book_barcode}</span>
      </div>
    ),
  },
  {
    accessorKey: 'borrow_date',
    header: 'Borrow Date',
    cell: ({ row }) => (
      <span className='text-sm'>
        {format(new Date(row.original.borrow_date), 'dd MMM yyyy')}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status
      const isOverdue = row.original.is_overdue
      
      return (
        <Badge
          className={`
            rounded-sm px-2 py-0.5 text-xs capitalize
            ${status === 'borrowed' && !isOverdue ? 'bg-blue-500/10 text-blue-600' : ''}
            ${status === 'returned' ? 'bg-green-500/10 text-green-600' : ''}
            ${isOverdue ? 'bg-red-500/10 text-red-600' : ''}
          `}
        >
          {isOverdue ? 'Overdue' : status}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'borrow_scan_method',
    header: 'Scan Method',
    cell: ({ row }) => (
      <span className='text-xs text-muted-foreground'>
        {row.original.borrow_scan_method === 'scanner' ? '📷 Scanner' : '⌨️ Manual'}
      </span>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <RowActions transaction={row.original} />,
  },
]

function RowActions({ transaction }: { transaction: Transaction }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost' className='size-8 rounded-full'>
          <EllipsisVerticalIcon className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>View Details</DropdownMenuItem>
        {transaction.status === 'borrowed' && (
          <DropdownMenuItem>Process Return</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function RecentTransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })

  useEffect(() => {
    fetchTransactions()
  }, [])

  async function fetchTransactions() {
    try {
      setLoading(true)
      const data = await transactionService.list({
        ordering: '-created_at',
        page: 1,
      })
      setTransactions(data.results.slice(0, 10)) // Get latest 10
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: { pagination },
  })

  if (loading) return <RecentTransactionsTableSkeleton />

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='border rounded-md'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className='h-12'>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-24 text-center'>
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className='flex items-center justify-between pt-4'>
          <p className='text-sm text-muted-foreground'>
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              transactions.length
            )}{' '}
            of {transactions.length} entries
          </p>

          <div className='flex gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className='size-4' />
              Previous
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
              <ChevronRightIcon className='size-4' />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function RecentTransactionsTableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className='h-6 w-48' />
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className='flex items-center gap-4 border-b pb-3'>
              <Skeleton className='size-9 rounded-full' />
              <div className='flex-1 space-y-2'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-3 w-24' />
              </div>
              <Skeleton className='h-6 w-20' />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}