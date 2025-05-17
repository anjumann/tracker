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
              ? "Add a subtask to break down your work into smaller steps."
              : "Create a new task to track your work."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                placeholder="Enter task title"
                required
              />
            </div>

            {!isSubtask && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="col-span-3"
                  placeholder="Optional task description"
                />
              </div>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Select
                value={priority}
                onValueChange={(value) => setPriority(value as Priority)}
              >
                <SelectTrigger id="priority" className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!isSubtask && !listId && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="list" className="text-right">
                  List
                </Label>
                <Select
                  value={selectedListId}
                  onValueChange={setSelectedListId}
                >
                  <SelectTrigger id="list" className="col-span-3">
                    <SelectValue placeholder="Select a list (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="independent">Independent Task</SelectItem>
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
            <Button type="submit">Create {isSubtask ? "Subtask" : "Task"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 