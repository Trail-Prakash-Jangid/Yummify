import React from 'react'

const Blogsskeli = () => {
 const miniSkeletons = Array(4).fill(0); // Display 3 mini blog loaders

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      {/* Left - Featured Blog Skeleton */}
      <div className="md:col-span-2 bg-white rounded-lg  shadow-lg p-4">
        <div className="rounded-lg w-full h-64 bg-gray-300 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </div>

      {/* Right - Mini Blog Skeletons */}
      <div className="space-y-4">
        {miniSkeletons.map((_, index) => (
          <div key={index} className="flex gap-4 bg-white rounded-lg shadow-md p-3 items-center">
            <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-20"></div>
              {/* <div className="h-3 bg-gray-300 rounded w-20"></div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blogsskeli