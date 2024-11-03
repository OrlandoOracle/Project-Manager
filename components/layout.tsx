import React from 'react'
import { cn } from "@/lib/utils"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div className={cn(
      "min-h-screen bg-background text-secondary",
      "flex flex-col",
      inter.className,
      className
    )}>
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
