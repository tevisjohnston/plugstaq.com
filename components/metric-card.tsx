'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MetricCardProps {
  name: string
  currentValue: number | null
  previousValue: number | null
  updatedAt?: string | null
  className?: string
}

// Gradient classes for different metric types
const getGradientClass = (metricName: string) => {
  const gradients: Record<string, string> = {
    '🖱 Clicks': 'from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30',
    '📥 Leads': 'from-green-500/20 to-green-600/20 hover:from-green-500/30 hover:to-green-600/30',
    '💸 Sales': 'from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30',
    '📬 Emails Sent': 'from-orange-500/20 to-orange-600/20 hover:from-orange-500/30 hover:to-orange-600/30',
    '📭 Emails Opened': 'from-cyan-500/20 to-cyan-600/20 hover:from-cyan-500/30 hover:to-cyan-600/30',
    '🔗 Links Clicked': 'from-indigo-500/20 to-indigo-600/20 hover:from-indigo-500/30 hover:to-indigo-600/30',
    '📊 Conversion Rate': 'from-pink-500/20 to-pink-600/20 hover:from-pink-500/30 hover:to-pink-600/30',
    '📧 Open Rate': 'from-teal-500/20 to-teal-600/20 hover:from-teal-500/30 hover:to-teal-600/30',
    '📩 Click Through Rate': 'from-yellow-500/20 to-yellow-600/20 hover:from-yellow-500/30 hover:to-yellow-600/30',
  }
  
  return gradients[metricName] || 'from-gray-500/20 to-gray-600/20 hover:from-gray-500/30 hover:to-gray-600/30'
}

const calculatePercentageChange = (current: number | null, previous: number | null): number | null => {
  if (current === null || previous === null || previous === 0) {
    return null
  }
  return ((current - previous) / previous) * 100
}

const formatValue = (value: number | null, metricName: string): string => {
  if (value === null) return 'N/A'
  
  // For percentage metrics, format as percentage
  if (metricName.includes('Rate') || metricName.includes('Conversion')) {
    return `${value.toFixed(2)}%`
  }
  
  // For large numbers, format with commas
  if (value >= 1000) {
    return value.toLocaleString('en-US', { maximumFractionDigits: 0 })
  }
  
  return value.toFixed(2)
}

export function MetricCard({ name, currentValue, previousValue, updatedAt, className }: MetricCardProps) {
  const percentageChange = calculatePercentageChange(currentValue, previousValue)
  const hasChange = percentageChange !== null
  const isPositive = hasChange && percentageChange > 0
  const isNegative = hasChange && percentageChange < 0
  
  const gradientClass = getGradientClass(name)

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]',
        'bg-gradient-to-br',
        gradientClass,
        'dark:border-border',
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex flex-col space-y-3">
          {/* Metric Name */}
          <div className="text-sm font-medium text-muted-foreground">
            {name}
          </div>
          
          {/* Current Value */}
          <div className="text-3xl font-bold text-foreground">
            {formatValue(currentValue, name)}
          </div>
          
          {/* Change Indicator */}
          {hasChange && (
            <div
              className={cn(
                'flex items-center gap-1 text-sm font-medium',
                isPositive && 'text-green-600 dark:text-green-400',
                isNegative && 'text-red-600 dark:text-red-400',
                !isPositive && !isNegative && 'text-muted-foreground'
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : isNegative ? (
                <TrendingDown className="h-4 w-4" />
              ) : null}
              <span>
                {isPositive ? '+' : ''}
                {percentageChange.toFixed(2)}%
              </span>
              <span className="text-xs text-muted-foreground">vs previous</span>
            </div>
          )}
          
          {/* Updated At */}
          {updatedAt && (
            <div className="text-xs text-muted-foreground">
              Updated {new Date(updatedAt).toLocaleString()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

