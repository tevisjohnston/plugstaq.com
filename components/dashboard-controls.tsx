'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import { refreshMetrics } from '@/app/dashboard/actions'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function DashboardControls() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [autoRefreshEnabled] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  // auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefreshEnabled) return

    const interval = setInterval(() => {
      startTransition(async () => {
        await refreshMetrics()
        router.refresh()
        setLastRefresh(new Date())
      })
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [autoRefreshEnabled, router])

  const handleManualRefresh = () => {
    startTransition(async () => {
      await refreshMetrics()
      router.refresh()
      setLastRefresh(new Date())
    })
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={handleManualRefresh}
        disabled={isPending}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <RefreshCw className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
        {isPending ? 'Refreshing...' : 'Refresh'}
      </Button>
      <div className="text-sm text-muted-foreground">
        {autoRefreshEnabled && (
          <span>Auto-refreshing every 30s</span>
        )}
        {lastRefresh && (
          <span className="ml-2">
            • Last refresh: {lastRefresh.toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  )
}

