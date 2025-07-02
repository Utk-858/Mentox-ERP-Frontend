"use client"

import { useState, useEffect } from "react"
import {
  Users,
  Target,
  UserX,
  Clock,
  Moon,
  Calendar,
  TrendingUp,
  TrendingDown,
  type LucideIcon,
} from "lucide-react"


type ChangeData = {
  value: number
  type: "increase" | "decrease"
  label: string
}

type StatItem = {
  value: number
  change: ChangeData
}

type StatsData = {
  totalEmployees: StatItem
  onTime: StatItem
  absent: StatItem
  lateArrival: StatItem
  earlyDepartures: StatItem
  timeOff: StatItem
}

// Mock fallback data
const mockStatsData: StatsData = {
  totalEmployees: {
    value: 452,
    change: { value: 2, type: "increase", label: "new employees added" },
  },
  onTime: {
    value: 360,
    change: { value: 10, type: "decrease", label: "Less than yesterday" },
  },
  absent: {
    value: 30,
    change: { value: 3, type: "increase", label: "Increase than yesterday" },
  },
  lateArrival: {
    value: 62,
    change: { value: 3, type: "increase", label: "Increase than yesterday" },
  },
  earlyDepartures: {
    value: 6,
    change: { value: 10, type: "decrease", label: "Less than yesterday" },
  },
  timeOff: {
    value: 42,
    change: { value: 2, type: "increase", label: "Increase than yesterday" },
  },
}

interface StatsCardProps {
  title: string
  value: number
  change: ChangeData
  icon?: LucideIcon | null
  imageSrc?: string | null
}

function StatsCard({ title, value, change, icon: Icon, imageSrc }: StatsCardProps) {
  const isPositive = change.type === "increase"

  return (
    <div className="rounded-lg border p-8 shadow-sm bg-gray-50 w-full">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="text-3xl font-bold text-gray-900">{value}</div>
          <div className="space-y-1">
            <div className="text-base font-medium text-gray-700">{title}</div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              {isPositive ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={isPositive ? "text-green-600" : "text-red-600"}>
                {isPositive ? "+" : "-"}
                {change.value}%
              </span>
              <span>{change.label}</span>
            </div>
          </div>
        </div>

        <div className="rounded-full bg-purple-100 p-2 flex items-center justify-center">
          {Icon && <Icon className="h-5 w-5 text-[#702DFF]" />}
          {!Icon && imageSrc && (
            <img src={imageSrc} alt={title} className="h-5 w-5 object-contain" />
          )}
        </div>
      </div>
    </div>
  )
}

export default function StatsDashboard() {
  const [data, setData] = useState<StatsData>(mockStatsData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/stats")
      if (!response.ok) throw new Error("Failed to fetch stats")

      const apiData: StatsData = await response.json()
      setData(apiData)
    } catch (err) {
      console.warn("API fetch failed, using mock data:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
      setData(mockStatsData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 w-full rounded-lg bg-gray-100 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white w-full">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Employees"
            value={data.totalEmployees.value}
            change={data.totalEmployees.change}
            icon={Users}
            imageSrc={null}
          />
          <StatsCard
            title="On Time"
            value={data.onTime.value}
            change={data.onTime.change}
            icon={null}
            imageSrc="/material-symbols_avg-time-outline-sharp.png"
          />
          <StatsCard
            title="Absent"
            value={data.absent.value}
            change={data.absent.change}
            icon={null}
            imageSrc="/mdi_weather-time (1).png"
          />
          <StatsCard
            title="Late Arrival"
            value={data.lateArrival.value}
            change={data.lateArrival.change}
            icon={Clock}
            imageSrc={null}
          />
          <StatsCard
            title="Early Departures"
            value={data.earlyDepartures.value}
            change={data.earlyDepartures.change}
            icon={Moon}
            imageSrc={null}
          />
          <StatsCard
            title="Time-off"
            value={data.timeOff.value}
            change={data.timeOff.change}
            icon={Calendar}
            imageSrc={null}
          />
        </div>
      </div>
    </div>
  )
}
