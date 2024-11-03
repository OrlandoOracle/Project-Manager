// components/MainApp.tsx
'use client'

import React, { useState } from 'react'
import { 
  LayoutDashboard, 
  Calendar, 
  Lightbulb, 
  Home, 
  Plus, 
  Mic, 
  Video, 
  Star, 
  Wand2, 
  Briefcase, 
  Clock,
  Edit2,
  Trash2,
  Archive  // Added Archive here
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Alert, AlertDescription } from './ui/alert'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

interface Project {
  id: number
  title: string
  type: 'magic' | 'business'
  category: 'project' | 'area' | 'resource' | 'archive'
  status: 'active' | 'in-progress' | 'completed'
  progress: number
  lastUpdated: string
  tags: string[]
  thumbnail: string
  emotion: string
}

const MainApp = () => {
  const [currentView, setCurrentView] = useState('dashboard')
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('projects')
    return savedProjects ? JSON.parse(savedProjects) : [
      {
        id: 1,
        title: "New Card Routine",
        type: "magic",
        status: "active",
        progress: 65,
        lastUpdated: "2 days ago",
        tags: ["#CloseUp", "#Cards"],
        thumbnail: "/api/placeholder/400/200",
        emotion: "🔥",
        category: "project"
      }
    ]
  })

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'areas', label: 'Areas', icon: LayoutDashboard },
    { id: 'resources', label: 'Resources', icon: Lightbulb },
    { id: 'archives', label: 'Archives', icon: Archive }
  ]

  const [isEditMode, setIsEditMode] = useState(false)
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  React.useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects))
  }, [projects])

  const handleAddOrUpdateProject = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!currentProject?.title.trim()) return

    if (isEditMode && currentProject) {
      setProjects(prev => prev.map(p => 
        p.id === currentProject.id ? {
          ...currentProject,
          lastUpdated: 'Just updated'
        } : p
      ))
    } else {
      setProjects(prev => [...prev, {
        ...currentProject!,
        id: Date.now(),
        status: 'active',
        progress: 0,
        lastUpdated: 'Just now',
        tags: [],
        thumbnail: '/api/placeholder/400/200',
        emotion: '🎯',
        category: 'project'
      }])
    }

    setCurrentProject(null)
    setIsEditMode(false)
    setDialogOpen(false)
  }

  const handleEdit = (project: Project) => {
    setCurrentProject(project)
    setIsEditMode(true)
    setDialogOpen(true)
  }

  const handleDelete = (projectId: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== projectId))
    }
  }

  const handleProgressUpdate = (projectId: number, newProgress: number) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? {
        ...p,
        progress: Math.min(100, Math.max(0, newProgress))
      } : p
    ))
  }

  return (
    <div className="flex h-screen bg-[#121212]">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-[#1E1E1E] border-r border-[#2D2D2D] h-full p-4">
        <div className="flex items-center gap-2 mb-8">
          <LayoutDashboard className="text-[#4169E1]" />
          <h1 className="text-xl font-bold text-white">Project Hub</h1>
        </div>
        
        <nav className="space-y-2">
          {navigationItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === item.id 
                  ? 'bg-[#4169E1] text-white' 
                  : 'text-[#C0C0C0] hover:bg-[#2D2D2D]'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-[#2D2D2D] rounded-lg">
          <h3 className="font-medium mb-2 text-[#C0C0C0]">Quick Stats</h3>
          <div className="space-y-2 text-sm text-white">
            <div className="flex justify-between">
              <span>Active Projects:</span>
              <span className="font-medium">{projects.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Due This Week:</span>
              <span className="font-medium">
                {projects.filter(p => p.status === 'active').length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {currentView === 'dashboard' ? (
          <div className="p-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">My Projects</h1>
                <button
                  onClick={() => {
                    setIsEditMode(false)
                    setCurrentProject({
                      id: 0,
                      title: '',
                      type: 'magic',
                      status: 'active',
                      progress: 0,
                      lastUpdated: '',
                      tags: [],
                      thumbnail: '',
                      emotion: '',
                      category: 'project'
                    })
                    setDialogOpen(true)
                  }}
                  className="flex items-center gap-2 bg-[#4169E1] hover:bg-[#3558BC] text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus size={20} />
                  Add Project
                </button>
              </div>

              {/* Dialog for Adding/Editing Project */}
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="bg-[#1E1E1E] text-white border border-[#2D2D2D]">
                  <DialogHeader>
                    <DialogTitle>{isEditMode ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddOrUpdateProject} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#C0C0C0]">Title</label>
                      <input
                        type="text"
                        value={currentProject?.title || ''}
                        onChange={(e) => setCurrentProject(prev => prev ? {...prev, title: e.target.value} : null)}
                        className="w-full p-2 bg-[#2D2D2D] border border-[#4169E1] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#4169E1]"
                        placeholder="Project title"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#4169E1] hover:bg-[#3558BC] text-white p-2 rounded transition-colors"
                    >
                      {isEditMode ? 'Update Project' : 'Create Project'}
                    </button>
                  </form>
                </DialogContent>
              </Dialog>

              {/* Display of Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                  <Card key={project.id} className="bg-[#1E1E1E] border-[#2D2D2D] hover:border-[#4169E1] transition-colors">
                    <CardHeader>
                      <img 
                        src={project.thumbnail} 
                        alt={project.title}
                        className="rounded-lg mb-2"
                      />
                      <div className="flex justify-between items-start">
                        <CardTitle className="flex items-center gap-2 text-white">
                          {project.type === 'magic' ? <Wand2 size={20} className="text-[#4169E1]" /> : <Briefcase size={20} className="text-[#4169E1]" />}
                          {project.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <span key={tag} className="bg-[#2D2D2D] text-[#C0C0C0] text-sm px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white">Other Views Coming Soon</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default MainApp