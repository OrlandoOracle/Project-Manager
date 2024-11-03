export const mockProjects = [
  {
    id: '1',
    title: 'Website Redesign',
    progress: 75,
    dueDate: '2024-03-15',
    priority: 'high',
    status: 'active',
    tasksCompleted: 15,
    totalTasks: 20
  },
  {
    id: '2',
    title: 'Mobile App Development',
    progress: 45,
    dueDate: '2024-04-01',
    priority: 'medium',
    status: 'on-track',
    tasksCompleted: 8,
    totalTasks: 15
  },
  {
    id: '3',
    title: 'Marketing Campaign',
    progress: 90,
    dueDate: '2024-02-28',
    priority: 'low',
    status: 'completed',
    tasksCompleted: 12,
    totalTasks: 12
  }
]

export const mockTasks = [
  {
    id: '1',
    title: 'Design Homepage Mockup',
    dueDate: '2024-02-20',
    priority: 'high',
    status: 'in-progress',
    projectName: 'Website Redesign'
  },
  {
    id: '2',
    title: 'Implement User Authentication',
    dueDate: '2024-02-25',
    priority: 'medium',
    status: 'pending',
    projectName: 'Mobile App Development'
  },
  {
    id: '3',
    title: 'Create Social Media Posts',
    dueDate: '2024-02-18',
    priority: 'low',
    status: 'completed',
    projectName: 'Marketing Campaign'
  }
]

export const mockTimelineEvents = [
  {
    id: '1',
    title: 'Project Launch',
    date: '2024-03-01',
    type: 'milestone',
    projectName: 'Website Redesign'
  },
  {
    id: '2',
    title: 'Client Review',
    date: '2024-02-25',
    type: 'meeting',
    projectName: 'Mobile App Development'
  },
  {
    id: '3',
    title: 'Campaign End',
    date: '2024-02-28',
    type: 'deadline',
    projectName: 'Marketing Campaign'
  }
]
