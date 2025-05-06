"use client";

export const AddressSkeleton = () => (
  <div className="space-y-4">
    <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
    <div className="space-y-3">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="p-4 border rounded-lg">
          <div className="flex justify-between">
            <div className="space-y-2 w-full">
              <div className="h-5 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="flex gap-4">
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              </div>
            </div>
            <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
