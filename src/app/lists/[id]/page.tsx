import { Suspense } from "react";
import { DUMMY_LISTS, getTasksForList, calculateListProgress } from "@/constant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Edit, Trash } from "lucide-react";
import { TaskClient } from "@/components/sections/task-client";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function ListDetailPage({ params }: Props) {
  const listId = params.id;
  // Find the list by ID
  const list = DUMMY_LISTS.find((list) => list.id === listId);
  if (!list) {
    // Handle missing list server-side
    return <div>List not found</div>;
  }
  // Get all top-level tasks for this list
  const tasks = getTasksForList(listId);
  // Calculate progress
  const progress = calculateListProgress(listId);

  return (
    <div className="container mx-auto py-4 px-2 md:px-6">
      {/* Header: Title, Description, Actions */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-3">
        <div>
          <h1 className="text-3xl font-bold mb-0.5">{list.title}</h1>
          <p className="text-muted-foreground text-base leading-tight">{list.description}</p>
        </div>
        <div className="flex gap-1 self-start md:self-auto">
          <Button variant="outline" size="sm">
            <Edit className="mr-1 h-4 w-4" />
            Edit List
          </Button>
          <Button variant="destructive" size="sm">
            <Trash className="mr-1 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Progress Section */}
      <Card className="mb-4 w-full">
        <CardHeader className="py-2 px-4">
          <CardTitle className="text-lg">Progress</CardTitle>
        </CardHeader>
        <CardContent className="py-2 px-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Completion</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Tasks Section */}
      <div className="mb-2">
     
        <Suspense fallback={<div>Loading...</div>}>
          <TaskClient listId={listId} tasks={tasks} />
        </Suspense>
      </div>
    </div>
  );
} 