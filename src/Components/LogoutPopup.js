import React from 'react'

const LogoutPopup = ({ handleLogout }) => {
    return (
        <button className='absolute bg-red-800 w-[80%] right-0 top-[125%] xl:top-[116%] 2xl:top-[115%] rounded-b m-0 p-1 '>
            <p className='text-white  hover:text-black mt-0 xl:m-1 2xl:text-xl' onClick={handleLogout}>Logout</p>
        </button>
    )
}

export default LogoutPopup
