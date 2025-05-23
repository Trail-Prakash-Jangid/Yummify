import React from 'react'

const Skeleton = () => {
    // Show 5 skeleton cards

    return (
        <>
            <div className="px-2 sm:px-3 animate-pulse">
                <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col h-full">
                    <div className="w-full h-55 sm:h-56 bg-gray-300"></div>
                    <div className="p-2 flex flex-col justify-between h-full">
                        <div className="h-6 bg-gray-300 rounded mb-4"></div>
                        <div className="h-10 bg-gray-300 rounded-full mx-auto w-3/4"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Skeleton