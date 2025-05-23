const RecipeSkeleton = () => {
  return (
    <main className='w-full px-4 sm:px-6 md:px-10'>
      <section className='w-full flex justify-center'>
        <div className='w-full max-w-screen-xl mx-auto flex flex-col items-center'>

          {/* Title Skeleton */}
          <h1 className='text-2xl font-bold text-[#3a3535] py-10 text-center animate-pulse'>
            <span className='bg-gray-300 h-6 w-48 inline-block rounded'></span>
          </h1>

          {/* Main Card Skeleton */}
          <div className='flex flex-col md:flex-row items-start justify-between gap-6 bg-[#f0f0f0] md:w-[80vw] w-full shadow-lg p-6 rounded-xl animate-pulse'>
            <div className='w-full md:w-[50%] h-64 bg-gray-300 rounded-md'></div>

            <div className='flex-1 md:ml-6 space-y-4'>
              <div className='bg-gray-300 h-6 w-2/3 rounded'></div>
              <div className='bg-gray-200 h-4 w-32 rounded'></div>
              <div className='bg-gray-300 h-20 w-full rounded'></div>

              <div className='mt-6 space-y-4'>
                <div className='flex items-center space-x-2'>
                  <span className='bg-gray-300 h-4 w-20 rounded'></span>
                  <span className='bg-gray-300 h-4 w-12 rounded'></span>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className='bg-gray-300 h-4 w-20 rounded'></span>
                  <span className='bg-gray-300 h-4 w-12 rounded'></span>
                </div>
                <div className='bg-gray-300 h-10 w-40 rounded-md'></div>
              </div>
            </div>
          </div>

          {/* Ingredients & Steps Skeleton */}
          <div className='flex flex-col md:flex-row justify-between gap-6 md:w-[80vw] w-full mt-10 animate-pulse'>
            {/* Ingredients */}
            <div className='flex-1 space-y-4'>
              <div className='bg-gray-200 h-5 w-32 rounded'></div>
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className='bg-gray-300 h-4 w-3/4 rounded'></div>
              ))}
            </div>

            <div className='hidden md:block w-[2px] bg-[#eba51e]'></div>

            {/* Steps */}
            <div className='flex-1 space-y-4'>
              <div className='bg-gray-200 h-5 w-20 rounded'></div>
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className='bg-gray-300 h-4 w-11/12 rounded'></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default RecipeSkeleton;
