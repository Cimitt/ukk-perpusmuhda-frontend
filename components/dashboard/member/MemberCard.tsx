import { QrCode } from 'lucide-react'

export function MemberCard({ name, nis, className }: { name: string, nis: string, className?: string }) {
  return (
    <div className={`w-full max-w-sm bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl ${className}`}>
      {/* Dekorasi Background */}
      <div className="absolute -top-10 -right-10 size-40 bg-primary/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 flex flex-col h-full justify-between gap-8">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">E-Library Member</p>
            <h2 className="text-2xl font-bold mt-1 tracking-tight italic">ROBOOK</h2>
          </div>
          <div className="bg-white p-2 rounded-xl">
            <QrCode className="size-12 text-slate-900" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold tracking-wide">{name}</h3>
          <p className="text-xs text-slate-400 font-mono mt-1">{nis}</p>
        </div>
      </div>
    </div>
  )
}