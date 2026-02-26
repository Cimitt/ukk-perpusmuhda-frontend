import { AlertCircleIcon, BellIcon, MailIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function OverduePage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold tracking-tight'>Overdue Monitoring</h1>
        <Button variant='destructive' size='sm' className='shadow-lg shadow-red-100'>
          <BellIcon className='mr-2 size-4' /> Remind All
        </Button>
      </div>

      <div className='grid gap-4 md:grid-cols-3'>
        <Card className='bg-red-50 border-red-100'>
          <CardContent className='p-6'>
            <p className='text-xs font-bold text-red-600 uppercase tracking-widest'>Critical Overdue</p>
            <h3 className='text-3xl font-bold text-red-900 mt-1'>12 <span className='text-sm font-normal text-red-500'>Books</span></h3>
          </CardContent>
        </Card>
        {/* free space */}
      </div>

      <div className='space-y-3'>
        {[1, 2, 3].map((i) => (
          <Card key={i} className='border-none shadow-sm hover:ring-1 ring-red-200 transition-all group'>
            <CardContent className='p-4 flex flex-col md:flex-row md:items-center justify-between gap-4'>
              <div className='flex items-start gap-4'>
                <div className='size-12 rounded-lg bg-slate-100 flex-shrink-0 flex items-center justify-center font-bold text-slate-400'>
                  BK
                </div>
                <div>
                  <h4 className='font-bold text-slate-900 leading-none'>Fisika Dasar Vol. {i}</h4>
                  <p className='text-xs text-muted-foreground mt-1'>Member: <span className='font-medium text-slate-700'>Budi Raharjo</span> (NIS: 129033)</p>
                  <div className='flex gap-2 mt-2'>
                    <Badge variant='outline' className='text-[10px] py-0 border-red-200 text-red-600'>Late {i * 5} Days</Badge>
                    <Badge variant='outline' className='text-[10px] py-0 border-slate-200 text-slate-600'>Fine: Rp {i * 5000}</Badge>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Button variant='ghost' size='sm' className='text-xs'>View Details</Button>
                <Button size='sm' className='text-xs bg-slate-900'>
                  <MailIcon className='mr-2 size-3' /> Remind
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}