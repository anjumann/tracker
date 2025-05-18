"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { List, UserStatistics } from "@/constant";
import { AnimatedDonutChart } from "@/components/ui/chart";
import { motion } from "framer-motion";
import * as AnimationPresets from "@/framer-presets/animation";

interface AnalyticsClientProps {
  stats: UserStatistics;
  activeLists: List[];
}

export function AnalyticsClient({ stats }: AnalyticsClientProps) {
  // Calculate completion percentage
  const completionPercentage = Math.round((stats.completedTasks / stats.totalTasks) * 100);
  
  // Priority distribution data for pie chart
  const priorityData = [
    { name: "High", value: stats.tasksPerPriority.high },
    { name: "Medium", value: stats.tasksPerPriority.medium },
    { name: "Low", value: stats.tasksPerPriority.low },
  ];
  
  // Chart configuration for the donut chart
  const chartConfig = {
    "chart-1": { label: "High" },
    "chart-2": { label: "Medium" },
    "chart-3": { label: "Low" }
  };
  
  return (
    <motion.div 
      variants={AnimationPresets.staggerContainer(0.2)}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Overall Completion */}
        <motion.div variants={AnimationPresets.slideUp}>
          <Card className="h-full overflow-hidden">
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
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Progress value={completionPercentage} className="h-2" />
                </motion.div>
                
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Average completion time: {stats.averageCompletionTime} days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Priority Distribution */}
        <motion.div variants={AnimationPresets.slideUp}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Priority Distribution</CardTitle>
              <CardDescription>Tasks by priority level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <AnimatedDonutChart 
                  data={priorityData} 
                  config={chartConfig}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
} 