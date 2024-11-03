import React, { useState } from 'react'
import Sidebar from './Sidebar'
import ProjectPanel from './panels/ProjectPanel'
import TaskPanel from './panels/TaskPanel'
import TimelinePanel from './panels/TimelinePanel'
import ProgressPanel from './panels/ProgressPanel'
import ProjectForm, { ProjectFormData } from './forms/ProjectForm'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Plus, MoreVertical } from 'lucide-react'

interface Panel {
  id: string
  title: string
  type: 'projects' | 'tasks' | 'timeline' | 'progress'
}

interface Project extends ProjectFormData {
  id: string
  tasksCompleted: number
  totalTasks: number
  progress: number
}

const Dashboard = () => {
  const [panels, setPanels] = useState<Panel[]>([
    { id: 'panel-1', title: 'Active Projects', type: 'projects' },
    { id: 'panel-2', title: 'Recent Tasks', type: 'tasks' },
    { id: 'panel-3', title: 'Timeline', type: 'timeline' },
    { id: 'panel-4', title: 'Progress Overview', type: 'progress' }
  ])
  const [projects, setProjects] = useState<Project[]>([])
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false)

  const handleCreateProject = (formData: ProjectFormData) => {
    const newProject: Project = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      tasksCompleted: 0,
      totalTasks: 0,
      progress: 0
    }
    setProjects([...projects, newProject])
  }

  const renderPanelContent = (type: string) => {
    switch (type) {
      case 'projects':
        return <ProjectPanel projects={projects} />
      case 'tasks':
        return <TaskPanel tasks={[]} />
      case 'timeline':
        return <TimelinePanel events={[]} />
      case 'progress':
        return <ProgressPanel projects={projects} />
      default:
        return null
    }
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return
    
    const items = Array.from(panels)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    
    setPanels(items)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-silver">Dashboard</h1>
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg text-white hover:bg-primary/90 transition-colors"
              onClick={() => setIsProjectFormOpen(true)}
            >
              <Plus className="w-5 h-5" />
              Add Project
            </button>
          </div>
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="dashboard" direction="horizontal">
              {(provided) => (
                <div 
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {panels.map((panel, index) => (
                    <Draggable key={panel.id} draggableId={panel.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-[#1e1e1e] rounded-lg p-6 shadow-lg"
                        >
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-silver">{panel.title}</h2>
                            <button className="text-silver hover:text-primary">
                              <MoreVertical className="w-5 h-5" />
                            </button>
                          </div>
                          {renderPanelContent(panel.type)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </main>

      <ProjectForm 
        isOpen={isProjectFormOpen}
        onClose={() => setIsProjectFormOpen(false)}
        onSubmit={handleCreateProject}
      />
    </div>
  )
}

export default Dashboard
