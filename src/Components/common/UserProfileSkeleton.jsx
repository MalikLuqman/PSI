import React from "react";

export default function UserProfileSkeleton() {
  return (
    <div className="bg-gray-100 px-4 py-4 shadow-sm sm:rounded-xl md:col-span-2 animate-pulse">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-6">
          {/* <div className="flex items-center justify-between">
            <div>
              <div className="h-4 bg-gray-300 rounded w-48"></div>
              <div className="mt-1 h-3 bg-gray-200 rounded w-64"></div>
            </div>
            <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          </div> */}
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <div className="relative w-32 h-32 bg-gray-200 rounded-full"></div>
            </div>
            <div className="sm:col-span-2">
              <div className="h-3 bg-gray-300 rounded w-32"></div>
              <div className="mt-2 h-10 bg-gray-200 rounded"></div>
            </div>
            <div className="sm:col-span-2">
              <div className="h-3 bg-gray-300 rounded w-32"></div>
              <div className="mt-2 h-10 bg-gray-200 rounded"></div>
            </div>
            <div className="col-span-full">
              <div className="h-3 bg-gray-300 rounded w-48"></div>
              <div className="mt-2 h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-2">
            <div className="h-10 w-24 bg-gray-300 rounded-full"></div>
            <div className="h-10 w-24 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-900/10 pb-12 space-y-2 py-4">
        <div className="h-4 bg-gray-300 rounded w-48"></div>
        <div className="mt-1 h-3 bg-gray-200 rounded w-64"></div>
        <div className="flex items-center gap-4 mt-4">
          <div>
            <div className="h-3 bg-gray-300 rounded w-32"></div>
            <div className="mt-2 h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="mt-6 h-10 w-36 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
