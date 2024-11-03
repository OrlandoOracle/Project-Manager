import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Task {
  id: string
  title: string
  description: string
  progress: number
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  attachments: string[]
  status: 'pending' | 'in-progress' | 'completed'
}

const MainApp = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const router = useRouter()

  const handleEdit = (taskId: string) => {
    const taskToEdit = tasks.find(task => task.id === taskId)
    if (taskToEdit) {
      setSelectedTask(taskToEdit)
      setIsDialogOpen(true)
    }
  }

  const handleDelete = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const handleProgressUpdate = (taskId: string, progress: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, progress } : task
    ))
  }

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Math.random().toString(36).substr(2, 9)
    }
    setTasks([...tasks, task])
  }

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ))
    setIsDialogOpen(false)
    setSelectedTask(null)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Project Manager</h1>
        <Button onClick={() => setIsDialogOpen(true)}>Add New Task</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map(task => (
          <div key={task.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{task.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${
                task.priority === 'high' ? 'bg-red-100 text-red-800' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {task.priority}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-2">{task.description}</p>
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${task.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                <span>{task.progress}% Complete</span>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleEdit(task.id)}>
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(task.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
            <DialogDescription>
              {selectedTask ? 'Update the task details below' : 'Enter the task details below'}
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" defaultValue={selectedTask?.title} />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input id="description" defaultValue={selectedTask?.description} />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input type="date" id="dueDate" defaultValue={selectedTask?.dueDate} />
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                className="w-full border rounded-md p-2"
                defaultValue={selectedTask?.priority}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedTask ? 'Update Task' : 'Add Task'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MainApp
