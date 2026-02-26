'use client'

import {
  BookOpenIcon,
  StarIcon,
  MessageSquareIcon,
  SettingsIcon,
  HomeIcon,
  ClockIcon,
  BookmarkIcon,
  LibraryIcon,
  HeartIcon,
  BookCheckIcon,
  RssIcon,
  SearchIcon,
  UserCircleIcon,
} from 'lucide-react'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
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

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Simulasi data user (Bisa diambil dari global state/hook)
  const userStats = {
    activeLoans: 2,
    unreadNotifications: 3
  }

  const pathSegments = pathname.split('/').filter(Boolean)
  const breadcrumbs = pathSegments.map((segment, index) => ({
    label: segment.charAt(0).toUpperCase() + segment.slice(1),
    href: '/' + pathSegments.slice(0, index + 1).join('/'),
    isLast: index === pathSegments.length - 1,
  }))

  return (
    <div className='flex min-h-dvh w-full'>
      <SidebarProvider>
        <Sidebar collapsible='icon'>
          <SidebarContent>
            {/* Logo / Brand */}
            <SidebarGroup>
              <div className='flex items-center gap-3 px-4 py-4'>
                <div className='flex size-10 items-center justify-center rounded-lg bg-primary'>
                  <LibraryIcon className='size-6 text-primary-foreground' />
                </div>
                <div className='flex flex-col overflow-hidden'>
                  <span className='text-lg font-semibold truncate'>PerpuSmuhda</span>
                  <span className='text-xs text-muted-foreground'>Student Portal</span>
                </div>
              </div>
            </SidebarGroup>

            <Separator />

            {/* Main Navigation */}
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/members/dashboard'}>
                      <a href='/members/dashboard'>
                        <HomeIcon />
                        <span>Home</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/members/books'}>
                      <a href='/members/books'>
                        <SearchIcon />
                        <span>Browse Catalog</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* My Activity */}
            <SidebarGroup>
              <SidebarGroupLabel>My Activity</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/members/loans')}>
                      <a href='/members/loans'>
                        <BookCheckIcon />
                        <span>Active Loans</span>
                      </a>
                    </SidebarMenuButton>
                    {userStats.activeLoans > 0 && (
                      <SidebarMenuBadge className='bg-primary/10 rounded-full'>
                        {userStats.activeLoans}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/members/favorites')}>
                      <a href='/members/favorites'>
                        <HeartIcon />
                        <span>My Favorites</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/members/history')}>
                      <a href='/members/history'>
                        <ClockIcon />
                        <span>Reading History</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Community & Reviews */}
            <SidebarGroup>
              <SidebarGroupLabel>Community</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/members/feeds'}>
                      <a href='/members/feeds'>
                        <RssIcon />
                        <span>Review Feeds</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/members/my-reviews')}>
                      <a href='/members/my-reviews'>
                        <MessageSquareIcon />
                        <span>My Reviews</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Account Settings */}
            <SidebarGroup className='mt-auto'>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/members/profile')}>
                      <a href='/members/profile'>
                        <UserCircleIcon />
                        <span>Profile Card</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/members/settings')}>
                      <a href='/members/settings'>
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
                      <BreadcrumbLink href='/members/dashboard'>Home</BreadcrumbLink>
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

              <div className='flex items-center gap-2'>
                <div className='mr-2 hidden flex-col items-end sm:flex'>
                  <span className='text-xs font-semibold'>robe del rey</span>
                  <span className='text-[10px] text-muted-foreground'>Student - X RPL 1</span>
                </div>
                <ProfileDropdown
                  trigger={
                    <Button variant='ghost' size='icon' className='size-9.5 rounded-full ring-1 ring-border'>
                      <Avatar className='size-9.5'>
                        <AvatarImage src='https://github.com/shadcn.png' />
                        <AvatarFallback>P</AvatarFallback>
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
            <div className='text-muted-foreground mx-auto flex size-full max-w-7xl items-center justify-center gap-3 border-t px-4 py-6 sm:px-6'>
              <p className='text-xs text-muted-foreground'>
                © {new Date().getFullYear()} PerpuSmuhda Student Portal
              </p>
            </div>
          </footer>
        </div>
      </SidebarProvider>
    </div>
  )
}