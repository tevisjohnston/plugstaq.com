import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MetricCard } from '@/components/metric-card'
import { DashboardControls } from '@/components/dashboard-controls'

export default async function DashboardPage() {
  const supabase = await createClient()

  // check authentication
  const { data: authData, error: authError } = await supabase.auth.getClaims()
  if (authError || !authData?.claims) {
    redirect('/auth/login')
  }

  // fetch metrics
  const { data: metrics, error } = await supabase
    .from('metrics')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    return (
      <div className="flex-1 w-full flex flex-col gap-12">
        <div className="w-full">
          <div className="bg-destructive/10 text-destructive text-sm p-3 px-5 rounded-md">
            Error loading metrics: {error.message}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your affiliate marketing metrics in real-time
        </p>
      </div>

      {/* Refresh Controls */}
      <DashboardControls />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics?.map((metric) => (
          <MetricCard
            key={metric.id}
            name={metric.name}
            currentValue={metric.current_value}
            previousValue={metric.previous_value}
            updatedAt={metric.updated_at}
          />
        ))}
      </div>

      {/* Empty State */}
      {(!metrics || metrics.length === 0) && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground text-lg">
            No metrics available yet.
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Data will appear here once webhook updates are received.
          </p>
        </div>
      )}
    </div>
  )
}

