import React from 'react';

export const FeaturedBlogSkeleton = () => (
  <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-4 animate-pulse">
    <div className="w-full h-64 bg-gray-300 rounded-lg mb-4"></div>
    <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
    <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-24"></div>
  </div>
);

export const MiniBlogSkeleton = () => (
  <div className="flex gap-4 bg-white rounded-lg shadow-md p-3 items-center animate-pulse">
    <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
    <div className="flex-1 space-y-2">
      <div className="h-3 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-3 bg-gray-300 rounded w-1/3"></div>
    </div>
  </div>
);
