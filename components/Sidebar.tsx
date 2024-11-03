import React from 'react'
import Link from 'next/link'
import { Home, Layout, Calendar, Settings } from 'lucide-react'

interface NavItem {
  icon: React.ReactNode
  label: string
  href: string
  color?: string
}

const navItems: NavItem[] = [
  {
    icon: <Home className="w-5 h-5" />,
    label: 'Dashboard',
    href: '/',
  },
  {
    icon: <Layout className="w-5 h-5" />,
    label: 'Projects',
    href: '/projects',
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    label: 'Calendar',
    href: '/calendar',
  },
  {
    icon: <Settings className="w-5 h-5" />,
    label: 'Settings',
    href: '/settings',
  },
]

export default function Sidebar() {
  return (
    <div className="w-64 bg-[#1a1a1a] h-screen fixed left-0 top-0 p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-silver">Project Hub</h1>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#303030] text-silver transition-colors"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
