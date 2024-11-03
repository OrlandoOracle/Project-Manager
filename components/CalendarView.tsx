// components/CalendarView.tsx
import React from 'react'
import { 
  ChevronLeft, 
  ChevronRight, 
  Wand2, 
  Briefcase,
  Clock
} from 'lucide-react'
import { Card } from './ui/card'

interface CalendarViewProps {
  projects: Array<{
    id: number
    title: string
    type: 'magic' | 'business'
    status: string
    progress: number
    lastUpdated: string
  }>
}

const CalendarView: React.FC<CalendarViewProps> = ({ projects }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(date)
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  // Generate calendar grid data
  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)
  const days = Array(35).fill(null).map((_, index) => {
    const dayNumber = index - firstDayOfMonth + 1
    if (dayNumber > 0 && dayNumber <= daysInMonth) {
      return dayNumber
    }
    return null
  })

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-[#1E1E1E] p-6">
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">{formatDate(currentDate)}</h2>
            <div className="flex gap-4">
              <button 
                onClick={previousMonth}
                className="p-2 hover:bg-[#2D2D2D] rounded-lg transition-colors"
              >
                <ChevronLeft className="text-[#C0C0C0]" />
              </button>
              <button 
                onClick={nextMonth}
                className="p-2 hover:bg-[#2D2D2D] rounded-lg transition-colors"
              >
                <ChevronRight className="text-[#C0C0C0]" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-4">
            {/* Weekday Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-[#C0C0C0] font-medium py-2">
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {days.map((day, index) => (
              <div
                key={index}
                className={`min-h-[120px] p-2 rounded-lg border border-[#2D2D2D] ${
                  day ? 'bg-[#2D2D2D]' : 'bg-transparent'
                }`}
              >
                {day && (
                  <>
                    <div className="text-[#C0C0C0] mb-2">{day}</div>
                    <div className="space-y-1">
                      {projects.filter(project => {
                        // Here you can add logic to display projects on specific dates
                        // For now, let's just show them on random days
                        return day % 7 === project.id % 7
                      }).map(project => (
                        <div
                          key={project.id}
                          className="text-xs p-1 rounded bg-[#4169E1] text-white flex items-center gap-1"
                        >
                          {project.type === 'magic' ? 
                            <Wand2 size={10} /> : 
                            <Briefcase size={10} />
                          }
                          <span className="truncate">{project.title}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default CalendarView