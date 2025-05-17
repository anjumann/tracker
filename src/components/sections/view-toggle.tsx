import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutGrid, ListChecks } from "lucide-react";

interface ViewToggleProps {
  currentView: "lists" | "tasks";
  onViewChange: (view: "lists" | "tasks") => void;
}

export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <Tabs defaultValue={currentView} onValueChange={(value) => onViewChange(value as "lists" | "tasks")}>
      <TabsList className="grid w-full max-w-xs grid-cols-2">
        <TabsTrigger value="lists"> <LayoutGrid />Lists View</TabsTrigger>
        <TabsTrigger value="tasks"> <ListChecks />Tasks View</TabsTrigger>
      </TabsList>
    </Tabs>
  )
} 