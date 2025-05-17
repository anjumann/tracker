import { DUMMY_LISTS, DUMMY_TASKS, getIndependentTasks, calculateListProgress } from "@/constant";
import { APP_NAME } from "@/constant";
import { HomeClient } from "@/components/sections/home-client";
import { Suspense } from "react";

export default async function Home() {
  // Get independent tasks not associated with any list
  const independentTasks = await getIndependentTasks();
  
  // Pre-calculate progress for all lists
  const listsWithProgress = await Promise.all(
    DUMMY_LISTS.map(async (list) => ({
      ...list,
      progress: await calculateListProgress(list.id)
    }))
  );
  
  // Get all tasks including subtasks for the all tasks view
  const allTasks = DUMMY_TASKS;
  
  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{APP_NAME} Dashboard</h1>
        <p className="text-muted-foreground">Manage your tasks and projects in one place</p>
      </header>

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
