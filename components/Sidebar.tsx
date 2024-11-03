'use client'

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export function Sidebar() {
  return (
    <div className="h-screen w-64 border-r bg-background p-4 flex flex-col">
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Project Hub</h2>
      </div>
      <div className="flex flex-col gap-4">
        <Button className="w-full justify-start" asChild>
          <Link href="/new-project">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>
    </div>
  )
}
