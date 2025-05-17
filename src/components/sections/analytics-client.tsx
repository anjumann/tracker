"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { List, UserStatistics } from "@/constant";

// Simple colored boxes for the chart legend since we're having issues with the Chart component
function PriorityDistributionChart({ data }: { data: { name: string; value: number; color: string }[] }) {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  
  return (
    <div className="space-y-4">
      <div className="flex h-40 w-full">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="h-full"
            style={{
              backgroundColor: item.color,
              width: `${(item.value / total) * 100}%`,
            }}
          />
        ))}
      </div>
      
      <div className="flex flex-col gap-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="h-3 w-3" style={{ backgroundColor: item.color }} />
            <span className="text-sm">
              {item.name}: {item.value} tasks ({Math.round((item.value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface AnalyticsClientProps {
  stats: UserStatistics;
  activeLists: List[];
}

export function AnalyticsClient({ stats, activeLists }: AnalyticsClientProps) {
  // Calculate completion percentage
  const completionPercentage = Math.round((stats.completedTasks / stats.totalTasks) * 100);
  
  // Priority distribution data for pie chart
  const priorityData = [
    { name: "High", value: stats.tasksPerPriority.high, color: "#ef4444" },
    { name: "Medium", value: stats.tasksPerPriority.medium, color: "#eab308" },
    { name: "Low", value: stats.tasksPerPriority.low, color: "#22c55e" },
  ];
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Overall Completion */}
        <Card>
          <CardHeader>
            <CardTitle>Task Completion</CardTitle>
            <CardDescription>Overall completion status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Completed</span>
                <span>{stats.completedTasks} / {stats.totalTasks} tasks ({completionPercentage}%)</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
              
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Average completion time: {stats.averageCompletionTime} days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Priority Distribution</CardTitle>
            <CardDescription>Tasks by priority level</CardDescription>
          </CardHeader>
          <CardContent>
            <PriorityDistributionChart data={priorityData} />
          </CardContent>
        </Card>
      </div>
      
      {/* Active Lists */}
      <Card>
        <CardHeader>
          <CardTitle>Active Lists</CardTitle>
          <CardDescription>Your most active project lists</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeLists.map(list => {
              // Get random activity level for demo purposes (between 40-100%)
              const activityLevel = Math.floor(Math.random() * (100 - 40) + 40);
              
              return (
                <div key={list.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{list.title}</span>
                    <span>Activity: {activityLevel}%</span>
                  </div>
                  <Progress value={activityLevel} className="h-1.5" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
} 