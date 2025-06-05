import React from 'react'
import { ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom' 

interface DashboardCardProps {
  title: string
  href: string
  bgColor: string
  textColor?: string
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  href, 
  bgColor, 
  textColor = "text-white" 
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(href) 
  }

  return (
    <button
      onClick={handleClick}
      className={`w-full ${bgColor} ${textColor} rounded-2xl p-3 flex items-center justify-between hover:opacity-90 transition-opacity`}
    >
      <span className="text-base font-semibold">{title}</span>
      <ExternalLink className="w-5 h-5" />
    </button>
  )
}

const DidYouKnowCard: React.FC = () => {
  return (
    <div className="bg-purple-200 rounded-2xl p-5 text-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-center">Did You Know?</h3>
      
      <div className="flex justify-center mb-4">
        <img 
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=100&fit=crop&auto=format"
          alt="Holy Bible"
          className="w-32 h-20 object-cover rounded-lg"
        />
      </div>
      
      <p className="text-sm text-center leading-relaxed">
        The Bible is sold all over the world, which makes it the most sold book there is! At an estimate, there are 5 billion printed copies of it around the world.
      </p>
    </div>
  )
}

export default function LibraryDashboard() {
  const dashboardItems = [
    {
      title: "Issued Books",
      href: "/library/issued-books",
      bgColor: "bg-[#702DFF]"
    },
    {
      title: "Reserved Books", 
      href: "/library/reserved-books",
      bgColor: "bg-[#702DFF]"
    },
    {
      title: "Fines",
      href: "/library/fines", 
      bgColor: "bg-[#702DFF]"
    }
  ]

  return (
    <div className="mx-auto w-full max-w-xs space-y-4 p-4">
      {dashboardItems.map((item, index) => (
        <DashboardCard
          key={index}
          title={item.title}
          href={item.href}
          bgColor={item.bgColor}
        />
      ))}
      
      <DidYouKnowCard />
    </div>
  )
}
