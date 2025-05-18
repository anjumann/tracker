// Enums
export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED'
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

// Interfaces
export interface List {
  id: string;
  title: string;
  description?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  userId: string;
  tasks?: Task[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  userId: string;
  listId: string;
}

export interface Analytics {
  id: string;
  event: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>; // Using Record for Json type
  createdAt: Date;
  
  // Relations
  userId: string;
}

export interface User {
  id?: string;
  ulid: string;
  name?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  
  // Relations
  lists?: List[];
  tasks?: Task[];
  analytics?: Analytics[];
}
