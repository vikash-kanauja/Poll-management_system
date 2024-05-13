import React from 'react'

const LogoutPopup = ({handleLogout}) => {
    return (
        
            <button className='absolute bg-red-800 w-[80%] right-0 top-[125%] xl:top-[114%] 2xl:top-[122%] rounded-b m-0 p-1 '>
                <p className='text-white  hover:text-red-500 mt-0 xl:m-1 2xl:text-3xl' onClick={handleLogout}>Logout</p>
            </button>
        
    )
}

export default LogoutPopup
