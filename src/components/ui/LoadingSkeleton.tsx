import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface LoadingSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
}

export function LoadingSkeleton({ 
  className, 
  variant = 'rectangular',
  ...props 
}: LoadingSkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200',
        {
          'h-4 rounded': variant === 'text',
          'rounded-full': variant === 'circular',
          'rounded-lg': variant === 'rectangular',
        },
        className
      )}
      {...props}
    />
  );
}

export function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
      <LoadingSkeleton className="h-48 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <LoadingSkeleton className="h-4 w-20" variant="text" />
        <LoadingSkeleton className="h-6 w-3/4" variant="text" />
        <LoadingSkeleton className="h-4 w-full" variant="text" />
        <LoadingSkeleton className="h-4 w-2/3" variant="text" />
        <div className="flex items-center justify-between pt-2">
          <LoadingSkeleton className="h-4 w-24" variant="text" />
          <LoadingSkeleton className="h-4 w-20" variant="text" />
        </div>
      </div>
    </div>
  );
}

export function EventGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function EventDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <LoadingSkeleton className="h-96 w-full" />
        <LoadingSkeleton className="h-8 w-2/3" variant="text" />
        <LoadingSkeleton className="h-6 w-full" variant="text" />
        <LoadingSkeleton className="h-6 w-full" variant="text" />
        <LoadingSkeleton className="h-6 w-3/4" variant="text" />
        <div className="flex gap-4 pt-4">
          <LoadingSkeleton className="h-10 w-32" />
          <LoadingSkeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;

