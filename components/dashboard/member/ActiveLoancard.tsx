import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CalendarIcon } from 'lucide-react'

interface ActiveLoanProps {
  title: string
  dueDate: string
  progress: number
  isOverdue?: boolean
}

export function ActiveLoanCard({ title, dueDate, progress, isOverdue }: ActiveLoanProps) {
  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex justify-between items-start">
        <div className="size-12 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400">
          IMG
        </div>
        <Badge variant={isOverdue ? "destructive" : "secondary"} className="text-[10px]">
          {isOverdue ? "Terlambat" : "Aktif"}
        </Badge>
      </div>
      
      <div>
        <h3 className="font-bold text-slate-900 truncate">{title}</h3>
        <div className="flex items-center gap-1.5 text-slate-500 mt-1">
          <CalendarIcon className="size-3" />
          <span className="text-[10px]">Kembali: {dueDate}</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
          <span className="text-slate-400">Sisa Waktu</span>
          <span className={isOverdue ? "text-red-500" : "text-primary"}>{progress}%</span>
        </div>
        <Progress value={progress} className={`h-1.5 ${isOverdue ? "[&>div]:bg-red-500" : ""}`} />
      </div>
    </div>
  )
}