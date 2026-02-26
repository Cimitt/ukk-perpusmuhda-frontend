'use client'

import {
  BookOpenIcon,
  UsersIcon,
  RefreshCwIcon,
  StarIcon,
  MessageSquareIcon,
  BarChart3Icon,
  SettingsIcon,
  HomeIcon,
  ScanBarcodeIcon,
  TrendingUpIcon,
  ClockIcon,
  AlertCircleIcon,
  LanguagesIcon,
  BookmarkIcon,
  LibraryIcon,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

import ProfileDropdown from '@/components/shadcn-studio/blocks/dropdown-profile'
import { usePathname } from 'next/navigation'
import { useDashboard } from '@/hooks/useDashboard'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { dashboardStats } = useDashboard()

  // Get breadcrumb from pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  const breadcrumbs = pathSegments.map((segment, index) => ({
    label: segment.charAt(0).toUpperCase() + segment.slice(1),
    href: '/' + pathSegments.slice(0, index + 1).join('/'),
    isLast: index === pathSegments.length - 1,
  }))

  return (
    <div className='flex min-h-dvh w-full'>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            {/* Logo / Brand */}
            <SidebarGroup>
              <div className='flex items-center gap-3 px-4 py-4'>
                <div className='flex size-10 items-center justify-center rounded-lg bg-primary'>
                  <LibraryIcon className='size-6 text-primary-foreground' />
                </div>
                <div className='flex flex-col'>
                  <span className='text-lg font-semibold'>PerpuSmuhda</span>
                  <span className='text-xs text-muted-foreground'>Library System</span>
                </div>
              </div>
            </SidebarGroup>

            <Separator />

            {/* Main Navigation */}
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/admin/dashboard'}>
                      <a href='/admin/dashboard'>
                        <HomeIcon />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Library Management */}
            <SidebarGroup>
              <SidebarGroupLabel>Library Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/members')}>
                      <a href='/admin/members'>
                        <UsersIcon />
                        <span>Members</span>
                      </a>
                    </SidebarMenuButton>
                    {dashboardStats && (
                      <SidebarMenuBadge className='bg-primary/10 rounded-full'>
                        {dashboardStats.members.total_active}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/books')}>
                      <a href='/admin/books'>
                        <BookOpenIcon />
                        <span>Books</span>
                      </a>
                    </SidebarMenuButton>
                    {dashboardStats && (
                      <SidebarMenuBadge className='bg-primary/10 rounded-full'>
                        {dashboardStats.books.total}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/categories')}>
                      <a href='/admin/categories'>
                        <BookmarkIcon />
                        <span>Categories</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Transactions */}
            <SidebarGroup>
              <SidebarGroupLabel>Transactions</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/admin/transactions'}>
                      <a href='/admin/transactions'>
                        <RefreshCwIcon />
                        <span>All Transactions</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/admin/transactions/borrow'}>
                      <a href='/admin/transactions/borrow'>
                        <ScanBarcodeIcon />
                        <span>Borrow Book</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/admin/transactions/return'}>
                      <a href='/admin/transactions/return'>
                        <TrendingUpIcon />
                        <span>Return Book</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/admin/transactions/overdue'}>
                      <a href='/admin/transactions/overdue'>
                        <AlertCircleIcon />
                        <span>Overdue</span>
                      </a>
                    </SidebarMenuButton>
                    {dashboardStats && dashboardStats.transactions.overdue > 0 && (
                      <SidebarMenuBadge className='bg-destructive text-destructive-foreground rounded-full'>
                        {dashboardStats.transactions.overdue}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Community */}
            <SidebarGroup>
              <SidebarGroupLabel>Community</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/reviews')}>
                      <a href='/admin/reviews'>
                        <MessageSquareIcon />
                        <span>Reviews</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/favorites')}>
                      <a href='/admin/favorites'>
                        <StarIcon />
                        <span>Favorites</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Reports & Settings */}
            <SidebarGroup>
              <SidebarGroupLabel>System</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/reports')}>
                      <a href='/admin/reports'>
                        <BarChart3Icon />
                        <span>Reports</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/settings')}>
                      <a href='/admin/settings'>
                        <SettingsIcon />
                        <span>Settings</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className='flex flex-1 flex-col'>
          {/* Header */}
          <header className='bg-card sticky top-0 z-50 border-b'>
            <div className='mx-auto flex w-full items-center justify-between gap-6 px-4 py-2 sm:px-6'>
              <div className='flex items-center gap-4'>
                <SidebarTrigger className='[&_svg]:size-5!' />
                <Separator orientation='vertical' className='hidden h-4! sm:block' />
                <Breadcrumb className='hidden sm:block'>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href='/admin/dashboard'>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    {breadcrumbs.map((crumb, index) => (
                      <div key={index} className='flex items-center'>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          {crumb.isLast ? (
                            <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                      </div>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className='flex items-center gap-1.5'>
                <ProfileDropdown
                  trigger={
                    <Button variant='ghost' size='icon' className='size-9.5'>
                      <Avatar className='size-9.5 rounded-md'>
                        <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png' />
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                    </Button>
                  }
                />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
            {children}
          </main>

          {/* Footer */}
          <footer>
            <div className='text-muted-foreground mx-auto flex size-full max-w-7xl items-center justify-between gap-3 border-t px-4 py-4 max-sm:flex-col sm:gap-6 sm:px-6'>
              <p className='text-sm text-balance max-sm:text-center'>
                {`© ${new Date().getFullYear()}`}{' '}
                <span className='text-primary font-medium'>PerpuSmuhda</span> - Library Management
                System
              </p>
              <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                <ClockIcon className='size-3' />
                <span>Version 1.0.0</span>
              </div>
            </div>
          </footer>
        </div>
      </SidebarProvider>
    </div>
  )
}