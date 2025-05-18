"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DUMMY_LISTS } from "@/constant";
import { Priority } from "@/constant/task-manager";
import { Plus } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [comboboxOpen, setComboboxOpen] = useState(false);
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
      setDialogOpen(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="title" className="text-xs font-medium text-muted-foreground">
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
                <Label htmlFor="description" className="text-xs font-medium text-muted-foreground">
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
              <Label htmlFor="priority" className="text-xs font-medium text-muted-foreground">
                Priority
              </Label>
              <ToggleGroup
                type="single"
                value={priority}
                onValueChange={(value) => value && setPriority(value as Priority)}
                className="w-full"
                aria-label="Select priority"
              >
                <ToggleGroupItem value="high" className="flex-1" aria-label="High priority">
                  High
                </ToggleGroupItem>
                <ToggleGroupItem value="medium" className="flex-1" aria-label="Medium priority">
                  Medium
                </ToggleGroupItem>
                <ToggleGroupItem value="low" className="flex-1" aria-label="Low priority">
                  Low
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {!isSubtask && !listId && (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="list" className="text-xs font-medium text-muted-foreground">
                  List
                </Label>
                <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={comboboxOpen}
                      className="w-full justify-between"
                      type="button"
                    >
                      {selectedListId
                        ? (selectedListId === "independent"
                            ? "Independent Task - Free as a bird!"
                            : DUMMY_LISTS.find((list) => list.id === selectedListId)?.title)
                        : "Where should this task live?"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search lists..." />
                      <CommandList>
                        <CommandEmpty>No list found.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem
                            value="independent"
                            onSelect={() => {
                              setSelectedListId("independent");
                              setComboboxOpen(false);
                            }}
                          >
                            Independent Task - Free as a bird!
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                selectedListId === "independent" ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                          {DUMMY_LISTS.map((list) => (
                            <CommandItem
                              key={list.id}
                              value={list.id}
                              onSelect={() => {
                                setSelectedListId(list.id);
                                setComboboxOpen(false);
                              }}
                            >
                              {list.title}
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  selectedListId === list.id ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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