import React from "react";

export default function BookGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:gap-x-8 xl:grid-cols-3 px-6 py-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md animate-pulse"
        >
          {/* Image Section */}
          <div className="aspect-w-4 aspect-h-3 bg-gray-200 sm:aspect-none sm:h-64">
            <div className="h-full w-full bg-gray-300"></div>
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col space-y-2 p-4">
            {/* Title */}
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>

            {/* Description */}
            <div className="flex gap-x-2">
              <div className="h-3 bg-gray-300 rounded w-1/3"></div>
              <div className="h-3 bg-gray-300 rounded w-1/3"></div>
            </div>

            {/* Book Condition Badge */}
            <div className="flex items-center">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>

            {/* Footer Section */}
            <div className="flex flex-1 flex-col justify-end">
              <div className="h-5 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
