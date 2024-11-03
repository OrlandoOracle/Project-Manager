import React from 'react'
import { BarChart, TrendingUp, CheckCircle } from 'lucide-react'

interface ProjectProgress {
  id: string
  title: string
  progress: number
  tasksCompleted: number
  totalTasks: number
  status: 'on-track' | 'at-risk' | 'completed'
}

interface ProgressPanelProps {
  projects: ProjectProgress[]
}

const ProgressPanel = ({ projects }: ProgressPanelProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-500'
      case 'at-risk': return 'text-yellow-500'
      case 'completed': return 'text-primary'
      default: return 'text-gray-500'
    }
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div 
          key={project.id}
          className="bg-[#252525] rounded-lg p-4 hover:bg-[#303030] transition-colors"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-silver font-medium">{project.title}</h3>
            <span className={`flex items-center gap-1 ${getStatusColor(project.status)}`}>
              {project.status === 'completed' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <TrendingUp className="w-4 h-4" />
              )}
              <span className="text-sm capitalize">{project.status}</span>
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="w-full bg-[#1a1a1a] rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            
            <div className="flex justify-between text-sm text-silver/80">
              <div className="flex items-center gap-1">
                <BarChart className="w-4 h-4" />
                <span>{project.progress}% Complete</span>
              </div>
              <span>
                {project.tasksCompleted} / {project.totalTasks} Tasks
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProgressPanel
