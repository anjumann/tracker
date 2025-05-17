"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CreateListDialog } from "@/components/sections/create-list-dialog";
import { CreateTaskDialog } from "@/components/sections/create-task-dialog";
import { Task, List } from "@/constant";
import { ViewToggle } from "./view-toggle";
import { TaskView } from "./task-view";

interface ListWithProgress extends List {
  progress: number;
}

interface TaskData {
  title: string;
  description?: string;
  priority: string;
  dueDate?: string;
  listId?: string;
  parentTaskId?: string;
}

interface HomeClientProps {
  listsWithProgress: ListWithProgress[];
  independentTasks: Task[];
  tasks: Task[];
}

export function HomeClient({ listsWithProgress, independentTasks, tasks }: HomeClientProps) {
  const [currentView, setCurrentView] = useState<"lists" | "tasks">("lists");
  
  // These functions would actually update state or call an API in a real app
  const handleCreateList = (title: string, description: string) => {
    console.log("Creating list:", { title, description });
  };

  const handleCreateTask = (data: TaskData) => {
    console.log("Creating task:", data);
  };

  return (
    <>
      {/* View Toggle */}
      <div className="mb-6 flex justify-center">
        <ViewToggle currentView={currentView} onViewChange={setCurrentView} />
      </div>

      {currentView === "lists" ? (
        <>
          {/* Lists Section */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Your Lists</h2>
              <CreateListDialog onCreateList={handleCreateList} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {listsWithProgress.map((list) => (
                <Card key={list.id} className="h-full">
                  <CardHeader>
                    <CardTitle>{list.title}</CardTitle>
                    <CardDescription>{list.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{list.progress}%</span>
                        </div>
                        <Progress value={list.progress} className="h-2" />
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Recent Tasks</h3>
                        <ul className="space-y-1">
                          {tasks
                            .filter(task => task.listId === list.id && !task.parentTaskId)
                            .slice(0, 3)
                            .map(task => (
                              <li key={task.id} className="text-sm flex items-center">
                                <span className={`w-3 h-3 rounded-full mr-2 ${
                                  task.priority === 'high' 
                                    ? 'bg-red-500' 
                                    : task.priority === 'medium' 
                                      ? 'bg-yellow-500' 
                                      : 'bg-green-500'
                                }`} />
                                <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                                  {task.title}
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link href={`/lists/${list.id}`}>View List</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Uncategorized Tasks */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Uncategorized</h2>
              <CreateTaskDialog onCreateTask={handleCreateTask} />
            </div>
            
            <Card>
              <CardContent className="pt-6">
                {independentTasks.length > 0 ? (
                  <ul className="space-y-2">
                    {independentTasks.map(task => (
                      <li key={task.id} className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${
                            task.priority === 'high' 
                              ? 'bg-red-500' 
                              : task.priority === 'medium' 
                                ? 'bg-yellow-500' 
                                : 'bg-green-500'
                          }`} />
                          <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                            {task.title}
                          </span>
                        </div>
                        <Badge variant={task.priority === 'high' ? "destructive" : task.priority === 'medium' ? "default" : "outline"}>
                          {task.priority}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-muted-foreground">No uncategorized tasks yet</p>
                )}
              </CardContent>
            </Card>
          </section>
        </>
      ) : (
        // Task View - shows all tasks across all lists
        <TaskView tasks={tasks} />
      )}
    </>
  );
} 