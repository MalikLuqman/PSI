import React from "react";

const ProductDetailLoaderSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-300 rounded w-48 mb-4"></div>

      {/* Book Details Skeleton */}
      <div className="mt-2 shadow-lg rounded-lg p-4 bg-gray-200 border border-gray-300">
        <h3 className="h-6 bg-gray-300 w-32 mb-4 rounded"></h3>

        <div className="space-y-2">
          <div className="h-4 bg-gray-300 w-40 rounded"></div>
          <div className="h-4 bg-gray-300 w-32 rounded"></div>
          <div className="h-4 bg-gray-300 w-36 rounded"></div>
          <div className="h-4 bg-gray-300 w-36 rounded"></div>
          <div className="h-4 bg-gray-300 w-36 rounded"></div>
          <div className="h-4 bg-gray-300 w-36 rounded"></div>
        </div>
      </div>

      {/* Credits Skeleton */}
      <div className="h-6 bg-gray-300 w-28 mt-4 rounded"></div>

      {/* Highlights Skeleton */}
      <div className="mt-4">
        <p className="h-5 bg-gray-300 w-24 rounded"></p>
        <ul className="mt-2 space-y-2">
          <li className="h-4 bg-gray-300 w-32 rounded"></li>
          <li className="h-4 bg-gray-300 w-40 rounded"></li>
          <li className="h-4 bg-gray-300 w-36 rounded"></li>
        </ul>
      </div>

      {/* Purchase Button Skeleton */}
      {/* {role == 2 && (
        <div className="mt-6">
          <div className="h-10 bg-gray-300 w-32 rounded"></div>
        </div>
      )} */}
    </div>
  );
};

export default ProductDetailLoaderSkeleton;
