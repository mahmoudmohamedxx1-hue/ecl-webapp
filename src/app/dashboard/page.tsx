import { MainLayout } from '@/components/layout/main-layout'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Building2, Calculator, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'

// Mock data - would come from Supabase in production
const workspaces = [
  {
    id: '1',
    name: 'National Bank of Egypt',
    description: 'Commercial banking portfolio - Q4 2025 ECL calculations',
    portfolioCount: 3,
    lastActivity: '2 hours ago',
    status: 'active'
  },
  {
    id: '2', 
    name: 'Commercial International Bank',
    description: 'SME lending portfolio analysis',
    portfolioCount: 5,
    lastActivity: '1 day ago',
    status: 'active'
  },
  {
    id: '3',
    name: 'Banque Misr',
    description: 'Corporate and retail lending ECL framework',
    portfolioCount: 2,
    lastActivity: '3 days ago',
    status: 'pending'
  }
]

const stats = [
  {
    title: 'Active Workspaces',
    value: '3',
    icon: Building2,
    change: '+2 this month'
  },
  {
    title: 'ECL Calculations',
    value: '12',
    icon: Calculator,
    change: '+4 completed'
  },
  {
    title: 'Total ECL Amount',
    value: 'EGP 2.4M',
    icon: TrendingUp,
    change: '+12% from Q3'
  },
  {
    title: 'Review Pending',
    value: '5',
    icon: Users,
    change: '2 urgent'
  }
]

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">ECL Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Monitor and manage your IFRS 9 Expected Credit Loss calculations
            </p>
          </div>
          <Button asChild>
            <Link href="/workspaces/new">
              <Plus className="h-4 w-4 mr-2" />
              New Workspace
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Workspaces Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Your Workspaces</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workspaces.map((workspace) => (
              <Card key={workspace.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{workspace.name}</CardTitle>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      workspace.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {workspace.status}
                    </div>
                  </div>
                  <CardDescription>
                    {workspace.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{workspace.portfolioCount} portfolios</span>
                    <span>Updated {workspace.lastActivity}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/workspaces/${workspace.id}`}>
                      View Workspace
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}