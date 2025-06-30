import type React from "react"
import { useEffect, useState } from "react"
import Sidebar from "@/components/SidebarStudent"
import SearchTop from "@/components/SearchBar"
import AttendanceCard from "../components/Librarian/AttendanceCard"
import StatsCard from "../components/Librarian/StatsCard"
import { Book, IndianRupee, Cloud } from "lucide-react"
import DateTimeCard from "../components/Librarian/DateTimeCard"
import ActionButtons from "../components/Librarian/ActionButtons"
import DailyBookActivityChart from "@/components/Areachart"
import BarChartCard from "../components/Librarian/BarChartCard"
import BookList from "../components/Librarian/BookList"
import BooksIssued from "../components/Librarian/BookIssued"
import OverdueBookList from "../components/Librarian/OverdueBookList"


interface StatData {
  title: string
  value: number
  statLabel: string
  statChange: string
  isPositive: boolean
  icon: React.ReactElement
}

const MOCK_STATS: StatData[] = [
  {
    title: "Total Book Issued",
    value: 352,
    statLabel: "new books added!",
    statChange: "+2",
    isPositive: true,
    icon: <Book size={20} />,
  },
  {
    title: "Total Fine Collected",
    value: 360,
    statLabel: "Less than yesterday",
    statChange: "-10%",
    isPositive: false,
    icon: <IndianRupee size={20} />,
  },
  {
    title: "Pending Fines",
    value: 30,
    statLabel: "Increase than yesterday",
    statChange: "+3%",
    isPositive: false,
    icon: <Cloud size={20} />,
  },
]

const LibraryLibrarian: React.FC = () => {
  const [stats, setStats] = useState<StatData[]>([])

  useEffect(() => {
    fetch("/api/library-stats")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch")
        return res.json()
      })
      .then((data) => {
        interface ApiStatData {
          title: string
          value: number
          statLabel: string
          statChange: string
          isPositive: boolean
          icon: string
        }

        const withIcons = (data as ApiStatData[]).map((item) => {
          let icon: React.ReactElement
          switch (item.icon) {
            case "book":
              icon = <Book size={20} />
              break
            case "rupee":
              icon = <IndianRupee size={20} />
              break
            case "cloud":
              icon = <Cloud size={20} />
              break
            default:
              icon = <Book size={20} />
          }
          return { ...item, icon }
        })
        setStats(withIcons)
      })
      .catch(() => setStats(MOCK_STATS))
  }, [])

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar - Fixed/Sticky */}
      <div className="sticky top-0 h-screen hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Top Search Bar */}
        <div className="w-full px-4 sm:px-6 py-4">
          <div className="relative flex w-full justify-center z-10 text-center mt-8 mb-2">
            <SearchTop />
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 px-4 sm:px-6 py-4">
          <div className="flex flex-col gap-6">
            {/* First Row */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="lg:col-span-1">
                <AttendanceCard />
              </div>

              {/* Stats Cards Container */}
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <StatsCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    statLabel={stat.statLabel}
                    statChange={stat.statChange}
                    isPositive={stat.isPositive}
                    icon={stat.icon}
                  />
                ))}
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              <DateTimeCard />
              <div className="ml-0 xl:ml-[-4rem]"><ActionButtons /></div>
              
              {/* Bar Chart - Only shows on XL screens in this row */}
              <div className="hidden xl:block w-full">
                <BarChartCard />
              </div>
            </div>

            {/* Bar Chart Row - Shows on small and tablet screens only */}
            <div className="w-full xl:hidden">
              <BarChartCard />
            </div>

            {/* Third Row */}
            <div className="w-full">
              <DailyBookActivityChart />
            </div>

            {/* Fourth Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <BookList />
              <BooksIssued />
            </div>

            {/* Fifth Row */}
            <div className="w-full">
              <OverdueBookList />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default LibraryLibrarian