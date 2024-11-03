// components/ProjectCard.tsx
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Clock, Wand2, Briefcase } from 'lucide-react'

interface ProjectCardProps {
  project: {
    id: number
    title: string
    type: string
    progress: number
    lastUpdated: string
    tags: string[]
    thumbnail: string
    emotion: string
  }
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className="rounded-lg mb-2"
        />
        <CardTitle className="flex items-center gap-2">
          {project.type === 'magic' ? <Wand2 size={20} /> : <Briefcase size={20} />}
          {project.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 rounded-full h-2"
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock size={16} />
            {project.lastUpdated}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}