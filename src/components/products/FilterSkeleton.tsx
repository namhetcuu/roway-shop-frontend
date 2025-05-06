// components/filter/FilterSkeleton.tsx
"use client";

import Skeleton from "@mui/material/Skeleton";


export const FilterSkeleton = () => {
  return (
    <div className="hidden md:block w-64 flex-shrink-0 p-2">
      <div className="sticky top-24 space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <Skeleton className="h-6 w-1/2 bg-gray-200 rounded mb-2" />
            <div className="space-y-2">
              {[...Array(4)].map((_, j) => (
                <Skeleton key={j} className="h-4 w-full bg-gray-100 rounded" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};