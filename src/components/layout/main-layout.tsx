"use client"

import { Sidebar } from './sidebar'
import { GrokAssistant } from './grok-assistant'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="ecl-main-content">
        <div className="h-full overflow-auto p-6">
          {children}
        </div>
      </main>

      <GrokAssistant />
    </div>
  )
}