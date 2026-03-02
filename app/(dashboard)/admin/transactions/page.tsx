'use client'

import { useEffect, useState } from 'react'
import {
  SearchIcon,
  DownloadIcon,
  ArrowUpRightIcon,
  ArrowDownLeftIcon,
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { transactionService } from '@/services/transactions'
import type { Transaction } from '@/types'

export default function AllTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')

  async function fetchTransactions() {
    try {
      setLoading(true)

      const data = await transactionService.list({
        search: search || undefined,
        status: statusFilter || undefined,
      })

      setTransactions(data.results)
    } catch (error) {
      console.error('Gagal mengambil transaksi', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [search, statusFilter])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Riwayat Transaksi
          </h1>
          <p className="text-muted-foreground text-sm">
            Audit semua aktivitas peminjaman dan pengembalian.
          </p>
        </div>

        <Button variant="outline" size="sm">
          <DownloadIcon className="mr-2 size-4" />
          Export Laporan
        </Button>
      </div>

      {/* Card */}
      <Card className="border-none shadow-sm shadow-slate-200/50">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4 border-b pb-6">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari member, judul buku..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-md text-sm focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant={!statusFilter ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setStatusFilter('')}
            >
              Semua
            </Button>

            <Button
              variant={statusFilter === 'borrowed' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setStatusFilter('borrowed')}
            >
              Dipinjam
            </Button>

            <Button
              variant={statusFilter === 'returned' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setStatusFilter('returned')}
            >
              Dikembalikan
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="pl-6">Tipe</TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Buku</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">
                  Petugas
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Tidak ada transaksi
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((trx) => (
                  <TableRow
                    key={trx.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Tipe */}
                    <TableCell className="pl-6">
                      {trx.status === 'borrowed' ? (
                        <div className="flex items-center gap-2 text-blue-600 font-medium text-xs">
                          <ArrowDownLeftIcon className="size-3" />
                          Pinjam
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-green-600 font-medium text-xs">
                          <ArrowUpRightIcon className="size-3" />
                          Kembali
                        </div>
                      )}
                    </TableCell>

                    {/* Member */}
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {trx.member_name}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          NIS: {trx.nis}
                        </span>
                      </div>
                    </TableCell>

                    {/* Buku */}
                    <TableCell className="text-sm italic text-slate-600">
                      "{trx.book_title}"
                    </TableCell>

                    {/* Tanggal */}
                    <TableCell className="text-xs text-slate-500">
                      {new Date(trx.created_at).toLocaleString()}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant={
                          trx.status === 'borrowed'
                            ? 'secondary'
                            : 'outline'
                        }
                        className="text-[10px] font-bold"
                      >
                        {trx.status === 'borrowed'
                          ? 'Sedang Dipinjam'
                          : 'Selesai'}
                      </Badge>
                    </TableCell>

                    {/* Petugas */}
                    <TableCell className="text-right pr-6 text-xs font-medium">
                      {trx.processed_by_name}
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