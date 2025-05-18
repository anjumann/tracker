import { DUMMY_STATISTICS, DUMMY_LISTS } from "@/constant";
import { Suspense } from "react";
import { AnalyticsClient } from "@/components/sections/analytics-client";

export default async function AnalyticsPage() {
  // Select a specific user's statistics (using user1 as an example)
  const stats = DUMMY_STATISTICS["user1"];
  
  // Get active lists
  const activeLists = DUMMY_LISTS.filter(list => stats.activeListIds.includes(list.id));
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>
      
      <Suspense fallback={<div>Loading analytics...</div>}>
        <AnalyticsClient stats={stats} activeLists={activeLists} />
      </Suspense>
    </div>
  );
} 