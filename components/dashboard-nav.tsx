'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LogoutButton } from '@/components/logout-button'
import { LayoutDashboard, Users } from 'lucide-react'

export function DashboardNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Leads',
      href: '/leads',
      icon: Users,
    },
  ]

  return (
    <div className="flex gap-5 items-center font-semibold">
      <Link href="/dashboard" className="text-lg font-bold">
        PlugStaq
      </Link>
      <div className="flex items-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </div>
      <div className="ml-auto">
        <LogoutButton />
      </div>
    </div>
  )
}

