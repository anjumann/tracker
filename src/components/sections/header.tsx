"use client";

import { APP_NAME } from "@/constant";
import { ModeToggle } from "@/components/sections/mode-toggle";
import Link from "next/link";
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { 
  ListChecks, 
  LucideCheckCircle, 
  PieChart, 
  PlusCircle 
} from "lucide-react";
import { CreateTaskDialog } from "./create-task-dialog";

interface TaskData {
  title: string;
  description?: string;
  priority: string;
  dueDate?: string;
  listId?: string;
  parentTaskId?: string;
}

export default function Header() {
  const handleCreateTask = (data: TaskData) => {
    console.log("Creating task from header:", data);
  };

  return (
    <header className="container mx-auto border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <ListChecks className="h-6 w-6" />
          <Link href="/" className="text-lg font-bold">
            {APP_NAME}
          </Link>
        </div>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/">
                  <LucideCheckCircle className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/analytics">
                  <PieChart className="mr-2 h-4 w-4" />
                  <span>Analytics</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center gap-2">
          <CreateTaskDialog 
            onCreateTask={handleCreateTask} 
            trigger={
              <Button size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Task
              </Button>
            }
          />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
} 