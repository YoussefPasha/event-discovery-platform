import { EventGridSkeleton } from '@/components/ui/LoadingSkeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-6 w-96 bg-gray-200 rounded animate-pulse" />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="h-40 bg-gray-100 rounded animate-pulse" />
      </div>
      
      <EventGridSkeleton />
    </div>
  );
}

