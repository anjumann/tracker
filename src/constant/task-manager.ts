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
export const DUMMY_USERS: User[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    createdAt: new Date("2023-01-01"),
    settings: {
      theme: "light",
      notifications: true
    }
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    createdAt: new Date("2023-02-15"),
    settings: {
      theme: "dark",
      notifications: true
    }
  },
  {
    id: "user3",
    name: "Alex Johnson",
    email: "alex@example.com",
    createdAt: new Date("2023-03-22"),
    settings: {
      theme: "light",
      notifications: false
    }
  },
  {
    id: "user4",
    name: "Samantha Lee",
    email: "samantha@example.com",
    createdAt: new Date("2023-04-10"),
    settings: {
      theme: "dark",
      notifications: true
    }
  }
];

// For backward compatibility
export const DUMMY_USER = DUMMY_USERS[0];

export const DUMMY_LISTS: List[] = [
  // User 1 Lists
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
  },
  {
    id: "list4",
    title: "Shopping List",
    description: "Items to purchase",
    userId: "user1",
    createdAt: new Date("2023-05-20"),
    updatedAt: new Date("2023-06-22"),
    isArchived: false
  },
  
  // User 2 Lists
  {
    id: "list5",
    title: "Coding Projects",
    description: "Personal and professional coding projects",
    userId: "user2",
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-06-21"),
    isArchived: false
  },
  {
    id: "list6",
    title: "Fitness Goals",
    description: "Exercise routines and fitness tracking",
    userId: "user2",
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2023-06-19"),
    isArchived: false
  },
  {
    id: "list7",
    title: "Reading List",
    description: "Books to read and reading progress",
    userId: "user2",
    createdAt: new Date("2023-04-05"),
    updatedAt: new Date("2023-06-20"),
    isArchived: false
  },
  
  // User 3 Lists
  {
    id: "list8",
    title: "Travel Plans",
    description: "Upcoming trips and travel preparations",
    userId: "user3",
    createdAt: new Date("2023-05-01"),
    updatedAt: new Date("2023-06-21"),
    isArchived: false
  },
  {
    id: "list9",
    title: "Study Plan",
    description: "Academic and learning projects",
    userId: "user3",
    createdAt: new Date("2023-04-10"),
    updatedAt: new Date("2023-06-18"),
    isArchived: true
  },
  
  // User 4 Lists
  {
    id: "list10",
    title: "Marketing Campaign",
    description: "Tasks for upcoming marketing initiatives",
    userId: "user4",
    createdAt: new Date("2023-05-15"),
    updatedAt: new Date("2023-06-22"),
    isArchived: false
  },
  {
    id: "list11",
    title: "Home Organization",
    description: "Cleaning and organizing tasks",
    userId: "user4",
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-06-21"),
    isArchived: false
  }
];

export const DUMMY_TASKS: Task[] = [
  // User 1 - Work Projects tasks
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
  {
    id: "task6",
    title: "Team Performance Reviews",
    description: "Complete annual reviews for team members",
    priority: "high",
    completed: false,
    listId: "list1",
    userId: "user1",
    hasSubtasks: false,
    createdAt: new Date("2023-06-15"),
    updatedAt: new Date("2023-06-22")
  },
  
  // User 1 - Personal Goals tasks
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
  {
    id: "task7",
    title: "Daily Meditation",
    description: "Practice mindfulness for 10 minutes daily",
    priority: "low",
    completed: true,
    listId: "list2",
    userId: "user1",
    hasSubtasks: false,
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-06-21"),
    completedAt: new Date("2023-06-21")
  },
  
  // User 1 - Home Renovation tasks
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
  {
    id: "task8",
    title: "Paint Living Room",
    description: "Select color and paint living room walls",
    priority: "medium",
    completed: false,
    listId: "list3",
    userId: "user1",
    hasSubtasks: false,
    createdAt: new Date("2023-06-10"),
    updatedAt: new Date("2023-06-20")
  },
  
  // User 1 - Shopping List
  {
    id: "task9",
    title: "Grocery Shopping",
    description: "Weekly grocery shopping",
    priority: "medium",
    completed: true,
    listId: "list4",
    userId: "user1",
    hasSubtasks: true,
    createdAt: new Date("2023-06-15"),
    updatedAt: new Date("2023-06-22"),
    completedAt: new Date("2023-06-22")
  },
  {
    id: "subtask9-1",
    title: "Fruits and Vegetables",
    priority: "medium",
    completed: true,
    listId: "list4",
    userId: "user1",
    parentTaskId: "task9",
    hasSubtasks: false,
    createdAt: new Date("2023-06-15"),
    updatedAt: new Date("2023-06-22"),
    completedAt: new Date("2023-06-22")
  },
  {
    id: "subtask9-2",
    title: "Dairy and Meat",
    priority: "high",
    completed: true,
    listId: "list4",
    userId: "user1",
    parentTaskId: "task9",
    hasSubtasks: false,
    createdAt: new Date("2023-06-15"),
    updatedAt: new Date("2023-06-22"),
    completedAt: new Date("2023-06-22")
  },
  
  // User 1 - Independent task
  {
    id: "task5",
    title: "Schedule dentist appointment",
    priority: "medium",
    completed: false,
    userId: "user1",
    hasSubtasks: false,
    createdAt: new Date("2023-06-10"),
    updatedAt: new Date("2023-06-10")
  },
  
  // User 2 - Coding Projects
  {
    id: "task10",
    title: "Build Personal Website",
    description: "Create portfolio website with React",
    priority: "high",
    completed: false,
    listId: "list5",
    userId: "user2",
    hasSubtasks: true,
    createdAt: new Date("2023-05-20"),
    updatedAt: new Date("2023-06-21")
  },
  {
    id: "subtask10-1",
    title: "Design UI mockups",
    priority: "medium",
    completed: true,
    listId: "list5",
    userId: "user2",
    parentTaskId: "task10",
    hasSubtasks: false,
    createdAt: new Date("2023-05-20"),
    updatedAt: new Date("2023-06-01"),
    completedAt: new Date("2023-06-01")
  },
  {
    id: "subtask10-2",
    title: "Implement responsive layout",
    priority: "high",
    completed: false,
    listId: "list5",
    userId: "user2",
    parentTaskId: "task10",
    hasSubtasks: false,
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-06-15")
  },
  {
    id: "task11",
    title: "Learn GraphQL",
    description: "Complete GraphQL tutorials and build sample project",
    priority: "medium",
    completed: false,
    listId: "list5",
    userId: "user2",
    hasSubtasks: false,
    createdAt: new Date("2023-06-10"),
    updatedAt: new Date("2023-06-20")
  },
  
  // User 2 - Fitness Goals
  {
    id: "task12",
    title: "Weekly Run",
    description: "Run 5K three times per week",
    priority: "high",
    completed: true,
    listId: "list6",
    userId: "user2",
    hasSubtasks: false,
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-06-21"),
    completedAt: new Date("2023-06-21")
  },
  {
    id: "task13",
    title: "Meal Prep",
    description: "Prepare healthy meals for the week",
    priority: "medium",
    completed: false,
    listId: "list6",
    userId: "user2",
    hasSubtasks: false,
    createdAt: new Date("2023-06-15"),
    updatedAt: new Date("2023-06-20")
  },
  
  // User 2 - Reading List
  {
    id: "task14",
    title: "Design Patterns Book",
    description: "Read 'Design Patterns: Elements of Reusable Object-Oriented Software'",
    priority: "low",
    completed: false,
    listId: "list7",
    userId: "user2",
    hasSubtasks: false,
    createdAt: new Date("2023-05-15"),
    updatedAt: new Date("2023-06-20")
  },
  
  // User 3 - Travel Plans
  {
    id: "task15",
    title: "Book Japan Flights",
    description: "Research and book flights for Japan trip",
    priority: "high",
    completed: true,
    listId: "list8",
    userId: "user3",
    hasSubtasks: true,
    createdAt: new Date("2023-05-10"),
    updatedAt: new Date("2023-06-01"),
    completedAt: new Date("2023-06-01")
  },
  {
    id: "subtask15-1",
    title: "Compare flight prices",
    priority: "high",
    completed: true,
    listId: "list8",
    userId: "user3",
    parentTaskId: "task15",
    hasSubtasks: false,
    createdAt: new Date("2023-05-10"),
    updatedAt: new Date("2023-05-25"),
    completedAt: new Date("2023-05-25")
  },
  {
    id: "subtask15-2",
    title: "Book selected flight",
    priority: "high",
    completed: true,
    listId: "list8",
    userId: "user3",
    parentTaskId: "task15",
    hasSubtasks: false,
    createdAt: new Date("2023-05-25"),
    updatedAt: new Date("2023-06-01"),
    completedAt: new Date("2023-06-01")
  },
  {
    id: "task16",
    title: "Create Japan Itinerary",
    description: "Plan daily activities for Japan trip",
    priority: "medium",
    completed: false,
    listId: "list8",
    userId: "user3",
    hasSubtasks: false,
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-06-21")
  },
  
  // User 3 - Study Plan
  {
    id: "task17",
    title: "Machine Learning Course",
    description: "Complete online ML course on Coursera",
    priority: "high",
    completed: false,
    listId: "list9",
    userId: "user3",
    hasSubtasks: false,
    createdAt: new Date("2023-04-15"),
    updatedAt: new Date("2023-06-18")
  },
  
  // User 4 - Marketing Campaign
  {
    id: "task18",
    title: "Social Media Strategy",
    description: "Develop strategy for Q3 social media campaign",
    priority: "high",
    completed: false,
    listId: "list10",
    userId: "user4",
    hasSubtasks: true,
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-06-22")
  },
  {
    id: "subtask18-1",
    title: "Audience analysis",
    priority: "high",
    completed: true,
    listId: "list10",
    userId: "user4",
    parentTaskId: "task18",
    hasSubtasks: false,
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-06-15"),
    completedAt: new Date("2023-06-15")
  },
  {
    id: "subtask18-2",
    title: "Content calendar",
    priority: "medium",
    completed: false,
    listId: "list10",
    userId: "user4",
    parentTaskId: "task18",
    hasSubtasks: false,
    createdAt: new Date("2023-06-15"),
    updatedAt: new Date("2023-06-22")
  },
  
  // User 4 - Home Organization
  {
    id: "task19",
    title: "Declutter Garage",
    description: "Sort and organize items in the garage",
    priority: "low",
    completed: false,
    listId: "list11",
    userId: "user4",
    hasSubtasks: false,
    createdAt: new Date("2023-06-10"),
    updatedAt: new Date("2023-06-21")
  },
  {
    id: "task20",
    title: "Organize Digital Files",
    description: "Clean up and organize computer files and folders",
    priority: "medium",
    completed: true,
    listId: "list11",
    userId: "user4",
    hasSubtasks: false,
    createdAt: new Date("2023-06-05"),
    updatedAt: new Date("2023-06-20"),
    completedAt: new Date("2023-06-20")
  }
];

export const DUMMY_STATISTICS: Record<string, UserStatistics> = {
  "user1": {
    userId: "user1",
    totalTasks: 19,
    completedTasks: 7,
    tasksPerPriority: {
      "high": 4,
      "medium": 10,
      "low": 5
    },
    completionRatePerDay: {
      "2023-06-10": 2,
      "2023-06-12": 1,
      "2023-06-15": 1,
      "2023-06-21": 1,
      "2023-06-22": 2
    },
    activeListIds: ["list1", "list2", "list3", "list4"],
    averageCompletionTime: 7.5 // in days
  },
  "user2": {
    userId: "user2",
    totalTasks: 7,
    completedTasks: 2,
    tasksPerPriority: {
      "high": 3,
      "medium": 3,
      "low": 1
    },
    completionRatePerDay: {
      "2023-06-01": 1,
      "2023-06-21": 1
    },
    activeListIds: ["list5", "list6", "list7"],
    averageCompletionTime: 10 // in days
  },
  "user3": {
    userId: "user3",
    totalTasks: 5,
    completedTasks: 3,
    tasksPerPriority: {
      "high": 4,
      "medium": 1,
      "low": 0
    },
    completionRatePerDay: {
      "2023-05-25": 1,
      "2023-06-01": 2
    },
    activeListIds: ["list8", "list9"],
    averageCompletionTime: 12 // in days
  },
  "user4": {
    userId: "user4",
    totalTasks: 5,
    completedTasks: 2,
    tasksPerPriority: {
      "high": 2,
      "medium": 2,
      "low": 1
    },
    completionRatePerDay: {
      "2023-06-15": 1,
      "2023-06-20": 1
    },
    activeListIds: ["list10", "list11"],
    averageCompletionTime: 9 // in days
  }
};

// For backward compatibility
export { DUMMY_STATISTICS as USER_STATISTICS };

// Helper functions to work with the data
export const getTasksForList = (listId: string): Task[] => {
  return DUMMY_TASKS.filter(task => task.listId === listId && !task.parentTaskId);
};

export const getSubtasksForTask = (taskId: string): Task[] => {
  return DUMMY_TASKS.filter(task => task.parentTaskId === taskId);
};

export const getIndependentTasks = (): Task[] => {
  return DUMMY_TASKS.filter(task => !task.listId && !task.parentTaskId);
};

export const calculateListProgress = (listId: string): number => {
  const tasksInList = DUMMY_TASKS.filter(task => task.listId === listId);
  if (tasksInList.length === 0) return 0;
  
  const completedTasks = tasksInList.filter(task => task.completed).length;
  return Math.round((completedTasks / tasksInList.length) * 100);
};

export const getUserStats = (userId: string): UserStatistics => {
  return DUMMY_STATISTICS[userId] || {
    userId,
    totalTasks: 0,
    completedTasks: 0,
    tasksPerPriority: { high: 0, medium: 0, low: 0 },
    completionRatePerDay: {},
    activeListIds: [],
    averageCompletionTime: 0
  };
};

export const getListsForUser = (userId: string): List[] => {
  return DUMMY_LISTS.filter(list => list.userId === userId);
};

export const getTasksForUser = (userId: string): Task[] => {
  return DUMMY_TASKS.filter(task => task.userId === userId);
};