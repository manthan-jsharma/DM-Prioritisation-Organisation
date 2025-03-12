import { Suspense } from "react";
import EmailList from "@/components/email-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Priority Inbox</h1>
        <p className="text-gray-500">
          Your direct messages, prioritized by importance
        </p>
      </div>

      <Tabs defaultValue="priority">
        <TabsList className="mb-4">
          <TabsTrigger value="priority">Priority</TabsTrigger>
          <TabsTrigger value="direct">Direct Messages</TabsTrigger>
          <TabsTrigger value="all">All Mail</TabsTrigger>
        </TabsList>

        <TabsContent value="priority" className="space-y-4">
          <Suspense fallback={<EmailListSkeleton />}>
            <EmailList />
          </Suspense>
        </TabsContent>

        <TabsContent value="direct">
          <p className="text-center py-8 text-gray-500">
            Direct messages view coming soon
          </p>
        </TabsContent>

        <TabsContent value="all">
          <p className="text-center py-8 text-gray-500">
            All mail view coming soon
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmailListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-start gap-4 p-4 border rounded-lg">
          <Skeleton className="h-6 w-6 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
