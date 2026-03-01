'use client'

import { useState, useEffect } from 'react'
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { TrendingUpIcon, TrendingDownIcon, MinusIcon, Loader2Icon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import axiosInstance from '@/lib/axios'

interface TrendPoint {
  date: string
  label: string
  borrowed: number
  returned: number
}

interface TrendSummary {
  total_borrowed: number
  total_returned: number
  net_active: number
}

interface TrendResponse {
  days: number
  start_date: string
  end_date: string
  summary: TrendSummary
  data: TrendPoint[]
}

// tooltip
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null

  return (
    <div className='rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-lg shadow-slate-200/60'>
      <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400'>{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={`${entry.dataKey}-${i}`} className='flex items-center gap-2 text-sm'>
          <span
            className='inline-block size-2 rounded-full'
            style={{ background: entry.color }}
          />
          <span className='text-slate-600'>{entry.name === 'borrowed' ? 'Dipinjam' : 'Dikembalikan'}:</span>
          <span className='font-semibold text-slate-900'>{entry.value}</span>
        </div>
      ))}
      {payload.length === 2 && (
        <div className='mt-2 border-t border-slate-100 pt-2 flex items-center gap-2 text-xs'>
          <span className='text-slate-400'>Selisih:</span>
          <span className={`font-semibold ${
            payload[0].value - payload[1].value > 0
              ? 'text-indigo-600'
              : payload[0].value - payload[1].value < 0
              ? 'text-emerald-600'
              : 'text-slate-500'
          }`}>
            {payload[0].value - payload[1].value > 0 ? '+' : ''}
            {payload[0].value - payload[1].value}
          </span>
        </div>
      )}
    </div>
  )
}


function SummaryPill({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) {
  return (
    <div className='flex flex-col items-center gap-0.5'>
      <span className={`text-xl font-bold tabular-nums ${color}`}>
        {value.toLocaleString('id-ID')}
      </span>
      <span className='text-xs text-slate-400'>{label}</span>
    </div>
  )
}

export function BorrowTrendCard() {
  const [days, setDays] = useState<7 | 30>(7)
  const [data, setData] = useState<TrendResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axiosInstance.get<TrendResponse>(
          `/transactions/trend/?days=${days}`
        )
        setData(res.data)
      } catch (e: any) {
        setError(e?.response?.data?.detail || 'Gagal memuat data tren')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [days])

  // Trend direction based on first half vs second half
  const getTrend = () => {
    if (!data?.data || data.data.length < 4) return 'flat'
    const mid = Math.floor(data.data.length / 2)
    const firstHalf = data.data.slice(0, mid).reduce((s, d) => s + d.borrowed, 0)
    const secondHalf = data.data.slice(mid).reduce((s, d) => s + d.borrowed, 0)
    if (secondHalf > firstHalf * 1.1) return 'up'
    if (secondHalf < firstHalf * 0.9) return 'down'
    return 'flat'
  }

  const trend = getTrend()

  // Use short labels for 30-day (every 5th label)
  const chartData = data?.data.map((point, i) => ({
    ...point,
    displayLabel: days === 30 ? (i % 5 === 0 ? point.label : '') : point.label,
  }))

  return (
    <div className='rounded-2xl bg-white border border-slate-100 p-5 shadow-sm'>

      {/* ── Header ── */}
      <div className='flex flex-wrap items-start justify-between gap-3 mb-5'>
        <div>
          <div className='flex items-center gap-2'>
            <h3 className='text-sm font-semibold text-slate-800'>Tren Peminjaman</h3>
            {!loading && trend === 'up' && (
              <span className='inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600'>
                <TrendingUpIcon className='size-3' /> Naik
              </span>
            )}
            {!loading && trend === 'down' && (
              <span className='inline-flex items-center gap-0.5 rounded-full bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-500'>
                <TrendingDownIcon className='size-3' /> Turun
              </span>
            )}
            {!loading && trend === 'flat' && (
              <span className='inline-flex items-center gap-0.5 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500'>
                <MinusIcon className='size-3' /> Stabil
              </span>
            )}
          </div>
          <p className='mt-0.5 text-xs text-slate-400'>
            {days === 7 ? '7 hari terakhir' : '30 hari terakhir'}
            {data && ` · ${data.start_date} – ${data.end_date}`}
          </p>
        </div>

        {/* Toggle 7 / 30 days */}
        <div className='flex items-center gap-1 rounded-lg bg-slate-100 p-1'>
          {([7, 30] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                days === d
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {d}H
            </button>
          ))}
        </div>
      </div>

      {/* ── summary pills ── */}
      {!loading && data && (
        <div className='flex items-center justify-around rounded-xl bg-slate-50 py-3 mb-5'>
          <SummaryPill
            label='Total Dipinjam'
            value={data.summary.total_borrowed}
            color='text-indigo-600'
          />
          <div className='h-8 w-px bg-slate-200' />
          <SummaryPill
            label='Total Dikembalikan'
            value={data.summary.total_returned}
            color='text-emerald-600'
          />
          <div className='h-8 w-px bg-slate-200' />
          <SummaryPill
            label='Belum Kembali'
            value={data.summary.net_active}
            color={data.summary.net_active > 0 ? 'text-amber-600' : 'text-slate-500'}
          />
        </div>
      )}

      {/* ── chart ── */}
      {loading ? (
        <div className='flex flex-col gap-3'>
          <div className='flex items-end gap-1 h-48'>
            {Array.from({ length: days === 7 ? 7 : 12 }).map((_, i) => (
              <Skeleton
                key={i}
                className='flex-1 rounded-t-md'
                style={{ height: `${30 + Math.random() * 70}%` }}
              />
            ))}
          </div>
          <div className='flex justify-between'>
            {Array.from({ length: days === 7 ? 7 : 6 }).map((_, i) => (
              <Skeleton key={i} className='h-3 w-8' />
            ))}
          </div>
        </div>
      ) : error ? (
        <div className='flex h-48 items-center justify-center rounded-xl bg-rose-50 text-sm text-rose-500'>
          {error}
        </div>
      ) : (
        <ResponsiveContainer width='100%' height={220}>
          <ComposedChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id='borrowGrad' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#6366f1' stopOpacity={0.15} />
                <stop offset='95%' stopColor='#6366f1' stopOpacity={0} />
              </linearGradient>
              <linearGradient id='returnGrad' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#10b981' stopOpacity={0.12} />
                <stop offset='95%' stopColor='#10b981' stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray='3 3'
              stroke='#f1f5f9'
              vertical={false}
            />

            <XAxis
              dataKey='displayLabel'
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              interval={0}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />

            <Legend
              iconType='circle'
              iconSize={8}
              formatter={(value) =>
                value === 'borrowed' ? 'Dipinjam' : 'Dikembalikan'
              }
              wrapperStyle={{ fontSize: 12, color: '#64748b', paddingTop: 12 }}
            />

            {/* bars for returned (subtle background) */}
            <Bar
              dataKey='returned'
              fill='#d1fae5'
              radius={[3, 3, 0, 0]}
              maxBarSize={days === 7 ? 28 : 12}
            />

            {/* lines on top — borrowed uses fill for area effect */}
            <Line
              type='monotone'
              dataKey='borrowed'
              stroke='#6366f1'
              strokeWidth={2.5}
              fill='url(#borrowGrad)'
              dot={{ fill: '#6366f1', r: days === 7 ? 4 : 2, strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
            />
            <Line
              type='monotone'
              dataKey='returned'
              stroke='#10b981'
              strokeWidth={2}
              strokeDasharray='4 3'
              dot={{ fill: '#10b981', r: days === 7 ? 3 : 2, strokeWidth: 0 }}
              activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

// skeleton
export function BorrowTrendCardSkeleton() {
  return (
    <div className='rounded-2xl bg-white border border-slate-100 p-5 shadow-sm space-y-4'>
      <div className='flex justify-between'>
        <Skeleton className='h-5 w-36' />
        <Skeleton className='h-8 w-20 rounded-lg' />
      </div>
      <Skeleton className='h-14 w-full rounded-xl' />
      <div className='flex items-end gap-1 h-48'>
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className='flex-1 rounded-t-md' style={{ height: `${40 + i * 8}%` }} />
        ))}
      </div>
    </div>
  )
}