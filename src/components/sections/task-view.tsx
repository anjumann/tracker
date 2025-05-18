import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { DUMMY_LISTS, Task } from "@/constant";
import { CreateTaskDialog } from "./create-task-dialog";

interface TaskViewProps {
  tasks: Task[];
}

export function TaskView({ tasks }: TaskViewProps) {
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");
  
  // Handle creating a new task
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreateTask = (data: any) => {
    console.log("Creating task:", data);
  };
  
  // Function to get list title by id
  const getListTitle = (listId?: string) => {
    if (!listId) return null;
    const list = DUMMY_LISTS.find(list => list.id === listId);
    return list?.title;
  };
  
  // Apply filters and sorting
  const filteredAndSortedTasks = tasks
    // Filter by priority
    .filter(task => {
      if (filterPriority === "all") return true;
      return task.priority === filterPriority;
    })
    // Sort tasks
    .sort((a, b) => {
      switch (sortBy) {
        case "priority":
          // High -> Medium -> Low
          const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case "date":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "list":
          // Group by list
          const aList = a.listId || "uncategorized";
          const bList = b.listId || "uncategorized";
          return aList.localeCompare(bList);
        default:
          return 0;
      }
    });
  
  return (
    <section className="mb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-2xl font-semibold">All Tasks</h2>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center">
            <span className="text-sm mr-2">Filter:</span>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm mr-2">Sort:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="list">List</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <CreateTaskDialog onCreateTask={handleCreateTask} />
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Tasks ({filteredAndSortedTasks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAndSortedTasks.length > 0 ? (
            <ul className="space-y-2">
              {filteredAndSortedTasks.map(task => (
                <li key={task.id} className="flex items-center justify-between p-3 hover:bg-muted rounded-md border border-gray-100 dark:border-gray-800">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${
                        task.priority === 'high' 
                          ? 'bg-red-500' 
                          : task.priority === 'medium' 
                            ? 'bg-yellow-500' 
                            : 'bg-green-500'
                      }`} />
                      <span className={task.completed ? "line-through text-muted-foreground" : "font-medium"}>
                        {task.title}
                      </span>
                    </div>
                    
                    {task.description && (
                      <p className="text-sm text-muted-foreground ml-5">{task.description}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {task.listId && (
                      <Badge variant="outline" className="mr-1">
                        {getListTitle(task.listId)}
                      </Badge>
                    )}
                    
                    <Badge variant={
                      task.priority === 'high' 
                        ? "destructive" 
                        : task.priority === 'medium' 
                          ? "default" 
                          : "outline"
                    }>
                      {task.priority}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted-foreground py-4">No tasks match your filters</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
} 