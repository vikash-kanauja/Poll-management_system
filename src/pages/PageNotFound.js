import React from "react";

const PageNotFound = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-12">
                <div className='bg-white p-8 max-w-lg mx-auto p-4'>
                    <div className='flex py-4 gap-4 justify-center  flex-col'>
                        <h3 className='text-2xl font-bold text-center text-red-600'>404 Error</h3>
                        <h1 className="text-center">Page Not Found</h1>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PageNotFound;