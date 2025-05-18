"use client"
import { DUMMY_LISTS, DUMMY_TASKS, getIndependentTasks, calculateListProgress } from "@/constant";
import { HomeClient } from "@/components/sections/home-client";
import { Suspense } from "react";
import { CreateTaskDialog } from "@/components/sections/create-task-dialog";
import { Button } from "@/components/ui";
import { PlusCircle } from "lucide-react";

export default function Home() {
  // Get independent tasks not associated with any list
  const independentTasks = getIndependentTasks();
  
  // Pre-calculate progress for all lists
  const listsWithProgress = DUMMY_LISTS.map((list) => ({
    ...list,
    progress: calculateListProgress(list.id)
  }));
  
  // Get all tasks including subtasks for the all tasks view
  const allTasks = DUMMY_TASKS;

  interface TaskData {
    title: string;
    description?: string;
    priority: string;
    dueDate?: string;
    listId?: string;
    parentTaskId?: string;
  }
  
  
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">   
        <header>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your tasks and projects in one place</p>
        </header>

        <CreateTaskDialog 
          onCreateTask={(data: TaskData)=>{console.log(data)}} 
          trigger={
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Task
            </Button>
          }
        />
      </div>
      
      
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <HomeClient 
          listsWithProgress={listsWithProgress} 
          independentTasks={independentTasks} 
          tasks={allTasks} 
        />
      </Suspense>
    </div>
  );
}
