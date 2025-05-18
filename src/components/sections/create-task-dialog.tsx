"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DUMMY_LISTS } from "@/constant";
import { Priority } from "@/constant/task-manager";
import { Plus } from "lucide-react";

interface CreateTaskDialogProps {
  onCreateTask?: (data: {
    title: string;
    description: string;
    priority: Priority;
    listId?: string;
    parentTaskId?: string;
  }) => void;
  listId?: string;
  parentTaskId?: string;
  isSubtask?: boolean;
  trigger?: React.ReactNode;
}

export function CreateTaskDialog({
  onCreateTask,
  listId,
  parentTaskId,
  isSubtask = false,
  trigger,
}: CreateTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [selectedListId, setSelectedListId] = useState(listId || "independent");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onCreateTask?.({
        title,
        description,
        priority,
        listId: isSubtask ? listId : selectedListId === "independent" ? undefined : selectedListId,
        parentTaskId: isSubtask ? parentTaskId : undefined,
      });
      setTitle("");
      setDescription("");
      setPriority("medium");
      if (!isSubtask) setSelectedListId(listId || "independent");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant={isSubtask ? "ghost" : "default"} size={isSubtask ? "sm" : "default"}>
            <Plus className={`${isSubtask ? "h-3 w-3 mr-1" : "h-4 w-4 mr-2"}`} />
            {isSubtask ? "Add Subtask" : "Add Task"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isSubtask ? "Create Subtask" : "Create Task"}</DialogTitle>
          <DialogDescription>
            {isSubtask
              ? "Break down your big tasks into bite-sized pieces. Small steps lead to big wins!"
              : "Ready to conquer your day? Add a new task and take one step closer to your goals!"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="title" className="text-sm font-medium text-muted-foreground">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What awesome thing are you planning to do?"
                required
              />
            </div>

            {!isSubtask && (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="description" className="text-sm font-medium text-muted-foreground">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add some details to help your future self remember what this is all about"
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="priority" className="text-sm font-medium text-muted-foreground">
                Priority
              </Label>
              <Select
                value={priority}
                onValueChange={(value) => setPriority(value as Priority)}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="How important is this?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High - Needs attention ASAP!</SelectItem>
                  <SelectItem value="medium">Medium - Important but can wait</SelectItem>
                  <SelectItem value="low">Low - No rush, whenever you get to it</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!isSubtask && !listId && (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="list" className="text-sm font-medium text-muted-foreground">
                  List
                </Label>
                <Select
                  value={selectedListId}
                  onValueChange={setSelectedListId}
                >
                  <SelectTrigger id="list">
                    <SelectValue placeholder="Where should this task live?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="independent">Independent Task - Free as a bird!</SelectItem>
                    {DUMMY_LISTS.map((list) => (
                      <SelectItem key={list.id} value={list.id}>
                        {list.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">
              {isSubtask ? "Add Subtask" : "Let's Do This!"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 