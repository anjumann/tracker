"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { CreateTaskDialog } from "@/components/sections/create-task-dialog";
import { getSubtasksForTask, Priority } from "@/constant";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  hasSubtasks: boolean;
}

interface Subtask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface TaskData {
  title: string;
  description: string;
  priority: Priority;
  listId?: string;
  parentTaskId?: string;
}

interface TaskClientProps {
  listId: string;
  tasks: Task[];
}

export function TaskClient({ listId, tasks }: TaskClientProps) {
  // State to track expanded tasks
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({});
  const [subtasks, setSubtasks] = useState<Record<string, Subtask[]>>({});
  const [loadingSubtasks, setLoadingSubtasks] = useState<Record<string, boolean>>({});

  // Toggle task expansion and load subtasks if needed
  const toggleTaskExpansion = async (taskId: string) => {
    const isCurrentlyExpanded = expandedTasks[taskId] || false;

    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));

    // If we're expanding and don't have subtasks loaded yet, fetch them
    if (!isCurrentlyExpanded && !subtasks[taskId]) {
      setLoadingSubtasks(prev => ({ ...prev, [taskId]: true }));

      try {
        const fetchedSubtasks = await getSubtasksForTask(taskId);
        setSubtasks(prev => ({ ...prev, [taskId]: fetchedSubtasks }));
      } catch (error) {
        console.error("Error fetching subtasks:", error);
      } finally {
        setLoadingSubtasks(prev => ({ ...prev, [taskId]: false }));
      }
    }
  };

  // These functions would actually update state or call an API in a real app
  const handleCreateTask = (data: TaskData) => {
    console.log("Creating task:", { ...data, listId });
  };

  const handleCreateSubtask = (data: TaskData) => {
    console.log("Creating subtask:", data);
  };

  return (
    <>
      <div className="px-6 py-8 space-y-6">
        <div className="flex items-center justify-between gap-4 my-6">
          <h2 className="text-2xl font-semibold">Tasks</h2>
          <CreateTaskDialog
            onCreateTask={handleCreateTask}
            listId={listId}
            trigger={
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            }
          />
        </div>

        {tasks.length > 0 ? (
          tasks.map((task, idx) => {
            const hasSubtasks = task.hasSubtasks;
            const isExpanded = expandedTasks[task.id] || false;
            const isLoading = loadingSubtasks[task.id] || false;
            const taskSubtasks = subtasks[task.id] || [];
            const isLast = idx === tasks.length - 1;

            return (
              <Card key={task.id} className={`overflow-hidden${isLast ? ' mb-8' : ''}`}>
                <div className="p-6 flex items-center justify-between gap-4 hover:bg-muted/50">
                  <div className="flex items-center gap-4">
                    <Checkbox id={`task-${task.id}`} checked={task.completed} />
                    <div>
                      <label
                        htmlFor={`task-${task.id}`}
                        className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                      >
                        {task.title}
                      </label>
                      {task.description && (
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge variant={
                      task.priority === 'high'
                        ? "destructive"
                        : task.priority === 'medium'
                          ? "default"
                          : "outline"
                    }>
                      {task.priority}
                    </Badge>

                    {hasSubtasks && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleTaskExpansion(task.id)}
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Subtasks */}
                {isExpanded && (
                  <div className="border-t pl-16 bg-muted/30">
                    {isLoading ? (
                      <div className="py-4 text-center text-sm text-muted-foreground">
                        Loading subtasks...
                      </div>
                    ) : taskSubtasks.length > 0 ? (
                      <>
                        {taskSubtasks.map(subtask => (
                          <div
                            key={subtask.id}
                            className="py-2 px-4 flex items-center justify-between gap-4 hover:bg-muted/50"
                          >
                            <div className="flex items-center gap-4">
                              <Checkbox
                                id={`subtask-${subtask.id}`}
                                checked={subtask.completed}
                              />
                              <label
                                htmlFor={`subtask-${subtask.id}`}
                                className={`text-sm ${subtask.completed ? "line-through text-muted-foreground" : ""}`}
                              >
                                {subtask.title}
                              </label>
                            </div>

                            <Badge variant={
                              subtask.priority === 'high'
                                ? "destructive"
                                : subtask.priority === 'medium'
                                  ? "default"
                                  : "outline"
                            }>
                              {subtask.priority}
                            </Badge>
                          </div>
                        ))}

                        <div className="py-2 px-4 border-t">
                          <CreateTaskDialog
                            onCreateTask={handleCreateSubtask}
                            listId={listId}
                            parentTaskId={task.id}
                            isSubtask
                          />
                        </div>
                      </>
                    ) : (
                      <div className="py-4 text-center text-sm text-muted-foreground">
                        No subtasks yet.
                        <div className="py-2 px-4">
                          <CreateTaskDialog
                            onCreateTask={handleCreateSubtask}
                            listId={listId}
                            parentTaskId={task.id}
                            isSubtask
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })
        ) : (
          <Card className="mb-8">
            <CardContent className="pt-8 text-center">
              <p className="text-muted-foreground">No tasks in this list yet.</p>
              <CreateTaskDialog
                onCreateTask={handleCreateTask}
                listId={listId}
                trigger={
                  <Button className="mt-6">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Task
                  </Button>
                }
              />
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
} 