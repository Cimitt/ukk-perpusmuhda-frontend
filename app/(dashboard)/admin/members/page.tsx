import { PlusIcon, SearchIcon, FilterIcon, MoreVerticalIcon, MailIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function MembersPage() {
  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Library Members</h1>
          <p className='text-muted-foreground text-sm'>Manage and monitor student and staff memberships.</p>
        </div>
        <Button className='bg-primary shadow-sm'>
          <PlusIcon className='mr-2 size-4' /> Add New Member
        </Button>
      </div>

      <Card className='border-none shadow-sm shadow-slate-200/50'>
        <CardHeader className='flex flex-col sm:flex-row items-center gap-4 border-b pb-6'>
          <div className='relative flex-1 w-full'>
            <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
            <input 
              placeholder='Search by name, NIS, or email...' 
              className='w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all'
            />
          </div>
          <div className='flex gap-2 w-full sm:w-auto'>
            <Button variant='outline' size='sm' className='flex-1 sm:flex-none'>
              <FilterIcon className='mr-2 size-4' /> Filter
            </Button>
            <Button variant='outline' size='sm' className='flex-1 sm:flex-none'>
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent className='p-0'>
          <Table>
            <TableHeader className='bg-slate-50/50'>
              <TableRow>
                <TableHead className='pl-6'>Member</TableHead>
                <TableHead>ID Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Active Loans</TableHead>
                <TableHead className='text-right pr-6'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i} className='hover:bg-slate-50/50 transition-colors cursor-pointer group'>
                  <TableCell className='pl-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <Avatar className='size-9 border'>
                        <AvatarFallback className='text-xs bg-primary/5 text-primary font-bold'>AM</AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col'>
                        <span className='font-medium text-sm text-slate-900'>Ahmad Maulana</span>
                        <span className='text-xs text-muted-foreground'>ahmad@example.com</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className='text-sm font-mono text-slate-600'>202400{i}12</TableCell>
                  <TableCell>
                    <Badge className='bg-green-50 text-green-700 border-green-200 shadow-none'>Active</Badge>
                  </TableCell>
                  <TableCell className='text-sm font-medium'>2 Books</TableCell>
                  <TableCell className='text-right pr-6'>
                    <Button variant='ghost' size='icon' className='size-8 rounded-full'>
                      <MoreVerticalIcon className='size-4' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}