import React from 'react'

const Skeleton = () => {
    const skeletons = Array(4).fill(0); // Show 5 skeleton cards

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex space-x-4 overflow-x-auto px-2 sm:px-3">
                {skeletons.map((_, index) => (
                    <div key={index} className="min-w-[250px] sm:min-w-[280px]">
                        <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col h-full animate-pulse">
                            <div className="w-full h-55 sm:h-60 bg-gray-300"></div>
                            <div className="p-2 flex flex-col justify-between h-full">
                                <div className="h-6 bg-gray-300 rounded mx-auto w-30 "></div>
                                <div className="bg-gray-300 rounded-full h-10 w-32 mx-auto"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Skeleton