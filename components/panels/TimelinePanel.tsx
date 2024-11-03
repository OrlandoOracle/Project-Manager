import React from 'react'
import { Calendar, ArrowRight } from 'lucide-react'

interface TimelineEvent {
  id: string
  title: string
  date: string
  type: 'milestone' | 'deadline' | 'meeting'
  projectName: string
}

interface TimelinePanelProps {
  events: TimelineEvent[]
}

const TimelinePanel = ({ events }: TimelinePanelProps) => {
  const getEventTypeStyles = (type: string) => {
    switch (type) {
      case 'milestone':
        return 'bg-primary text-white'
      case 'deadline':
        return 'bg-red-500 text-white'
      case 'meeting':
        return 'bg-yellow-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div 
          key={event.id}
          className="bg-[#252525] rounded-lg p-4 hover:bg-[#303030] transition-colors"
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${getEventTypeStyles(event.type)}`}>
              <Calendar className="w-4 h-4" />
            </div>
            
            <div className="flex-1">
              <h4 className="text-silver font-medium mb-1">{event.title}</h4>
              <p className="text-sm text-silver/60">{event.projectName}</p>
              <div className="mt-2 flex items-center gap-2 text-sm text-silver/80">
                <span>{event.date}</span>
                <ArrowRight className="w-4 h-4" />
                <span className="capitalize">{event.type}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TimelinePanel
