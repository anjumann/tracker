// Define types based on PRD

export type Priority = 'high' | 'medium' | 'low';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  settings: UserSettings;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
}

export interface List {
  id: string;
  title: string;
  description?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  completed: boolean;
  listId?: string; // Optional, for independent tasks
  userId: string;
  parentTaskId?: string; // For subtasks
  hasSubtasks: boolean;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface UserStatistics {
  userId: string;
  totalTasks: number;
  completedTasks: number;
  tasksPerPriority: Record<Priority, number>;
  completionRatePerDay: Record<string, number>;
  activeListIds: string[];
  averageCompletionTime: number;
}

// Dummy Data
export const DUMMY_USER: User = {
  id: "user1",
  name: "John Doe",
  email: "john@example.com",
  createdAt: new Date("2023-01-01"),
  settings: {
    theme: "light",
    notifications: true
  }
};

export const DUMMY_LISTS: List[] = [
  {
    id: "list1",
    title: "Work Projects",
    description: "Tasks related to current work projects",
    userId: "user1",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-06-20"),
    isArchived: false
  },
  {
    id: "list2",
    title: "Personal Goals",
    description: "Personal development tasks and goals",
    userId: "user1",
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-06-18"),
    isArchived: false
  },
  {
    id: "list3",
    title: "Home Renovation",
    description: "Tasks for home improvement projects",
    userId: "user1",
    createdAt: new Date("2023-03-05"),
    updatedAt: new Date("2023-06-15"),
    isArchived: false
  }
];

export const DUMMY_TASKS: Task[] = [
  // Work Projects tasks
  {
    id: "task1",
    title: "Finalize Q3 Report",
    description: "Complete the quarterly financial report",
    priority: "high",
    completed: false,
    listId: "list1",
    userId: "user1",
    hasSubtasks: true,
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-06-20")
  },
  {
    id: "subtask1-1",
    title: "Gather financial data",
    priority: "medium",
    completed: true,
    listId: "list1",
    userId: "user1",
    parentTaskId: "task1",
    hasSubtasks: false,
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-06-10"),
    completedAt: new Date("2023-06-10")
  },
  {
    id: "subtask1-2",
    title: "Create executive summary",
    priority: "medium",
    completed: false,
    listId: "list1",
    userId: "user1",
    parentTaskId: "task1",
    hasSubtasks: false,
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-06-20")
  },
  {
    id: "task2",
    title: "Client Presentation",
    description: "Prepare slides for client meeting",
    priority: "high",
    completed: false,
    listId: "list1",
    userId: "user1",
    hasSubtasks: true,
    createdAt: new Date("2023-06-05"),
    updatedAt: new Date("2023-06-19")
  },
  {
    id: "subtask2-1",
    title: "Design mockups",
    priority: "medium",
    completed: true,
    listId: "list1",
    userId: "user1",
    parentTaskId: "task2",
    hasSubtasks: false,
    createdAt: new Date("2023-06-05"),
    updatedAt: new Date("2023-06-15"),
    completedAt: new Date("2023-06-15")
  },
  
  // Personal Goals tasks
  {
    id: "task3",
    title: "Learn TypeScript",
    description: "Complete TypeScript course",
    priority: "medium",
    completed: false,
    listId: "list2",
    userId: "user1",
    hasSubtasks: true,
    createdAt: new Date("2023-06-02"),
    updatedAt: new Date("2023-06-18")
  },
  {
    id: "subtask3-1",
    title: "Finish basics module",
    priority: "low",
    completed: true,
    listId: "list2",
    userId: "user1",
    parentTaskId: "task3",
    hasSubtasks: false,
    createdAt: new Date("2023-06-02"),
    updatedAt: new Date("2023-06-10"),
    completedAt: new Date("2023-06-10")
  },
  {
    id: "subtask3-2",
    title: "Complete advanced topics",
    priority: "medium",
    completed: false,
    listId: "list2",
    userId: "user1",
    parentTaskId: "task3",
    hasSubtasks: false,
    createdAt: new Date("2023-06-10"),
    updatedAt: new Date("2023-06-18")
  },
  
  // Home Renovation tasks
  {
    id: "task4",
    title: "Kitchen Remodel",
    description: "Plan and execute kitchen renovation",
    priority: "low",
    completed: false,
    listId: "list3",
    userId: "user1",
    hasSubtasks: true,
    createdAt: new Date("2023-06-03"),
    updatedAt: new Date("2023-06-15")
  },
  {
    id: "subtask4-1",
    title: "Get contractor quotes",
    priority: "medium",
    completed: true,
    listId: "list3",
    userId: "user1",
    parentTaskId: "task4",
    hasSubtasks: false,
    createdAt: new Date("2023-06-03"),
    updatedAt: new Date("2023-06-12"),
    completedAt: new Date("2023-06-12")
  },
  {
    id: "subtask4-2",
    title: "Select materials",
    priority: "low",
    completed: false,
    listId: "list3",
    userId: "user1",
    parentTaskId: "task4",
    hasSubtasks: false,
    createdAt: new Date("2023-06-12"),
    updatedAt: new Date("2023-06-15")
  },
  
  // Independent task (not part of any list)
  {
    id: "task5",
    title: "Schedule dentist appointment",
    priority: "medium",
    completed: false,
    userId: "user1",
    hasSubtasks: false,
    createdAt: new Date("2023-06-10"),
    updatedAt: new Date("2023-06-10")
  }
];

export const DUMMY_STATISTICS: UserStatistics = {
  userId: "user1",
  totalTasks: 11,
  completedTasks: 4,
  tasksPerPriority: {
    "high": 2,
    "medium": 6,
    "low": 3
  },
  completionRatePerDay: {
    "2023-06-10": 2,
    "2023-06-12": 1,
    "2023-06-15": 1
  },
  activeListIds: ["list1", "list2", "list3"],
  averageCompletionTime: 7.5 // in days
};

// Helper functions to work with the data
export const getTasksForList = async (listId: string): Promise<Task[]> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return DUMMY_TASKS.filter(task => task.listId === listId && !task.parentTaskId);
};

export const getSubtasksForTask = async (taskId: string): Promise<Task[]> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return DUMMY_TASKS.filter(task => task.parentTaskId === taskId);
};

export const getIndependentTasks = async (): Promise<Task[]> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return DUMMY_TASKS.filter(task => !task.listId && !task.parentTaskId);
};

export const calculateListProgress = async (listId: string): Promise<number> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 100));
  const tasksInList = DUMMY_TASKS.filter(task => task.listId === listId);
  if (tasksInList.length === 0) return 0;
  
  const completedTasks = tasksInList.filter(task => task.completed).length;
  return Math.round((completedTasks / tasksInList.length) * 100);
}; 