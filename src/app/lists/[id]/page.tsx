import { Suspense } from "react";
import { DUMMY_LISTS, getTasksForList, calculateListProgress } from "@/constant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Edit, Trash } from "lucide-react";
import { TaskClient } from "@/components/sections/task-client";

interface ListDetailPageProps {
  params: {
    id: string;
  };
}


export default  function ListDetailPage({ params }: ListDetailPageProps) {
  const listId = params.id;
  
  // Find the list by ID
  const list = DUMMY_LISTS.find(list => list.id === listId);
  
  if (!list) {
    // Handle missing list server-side
    return <div>List not found</div>;
  }

  // Get all top-level tasks for this list
  const tasks =  getTasksForList(listId);
  
  // Calculate progress
  const progress =  calculateListProgress(listId);
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{list.title}</h1>
          <p className="text-muted-foreground">{list.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit List
          </Button>
          <Button variant="destructive" size="sm">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
      
      {/* Progress Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completion</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      {/* Tasks Section */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Tasks</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <TaskClient listId={listId} tasks={tasks} />
        </Suspense>
      </div>
    </div>
  );
} 