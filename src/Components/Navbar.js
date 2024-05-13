import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import navItems from '../utils/navItems.json'
import { FaUserCircle } from "react-icons/fa";
import { getUser, logout } from '../redux/reducers/authSlice'
import { ADMIN_ID } from '../utils/constantValue';
import LogoutPopup from './LogoutPopup';

const Navbar =  () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showLogoutMenu, setShowLogoutMenu] = useState(false)
    const userData = useSelector(state => state.auth.user)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getUser());
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };
 
    return (
        userData && (<nav className="bg-gray-800 relative">
            <div className="max-w-8xl mx-auto px-4 sm:px-2 lg:px-8">
                <div className="flex items-center justify-between h-12 xl:h-14 2xl:h-20">
                    <ul className={`${isOpen ? ' absolute top-full bg-gray-700 left-0 right-0 px-0 pt-0 pb-0 font-semibold sm:px-3 flex items-baseline space-x-4 flex-col border-t ' : ' hidden md:block  md:ml-5 md:flex gap-4 md:space-x-4  xl:text-lg 2xl:text-2xl'}`}>
                        <li className="text-white font-semibold pl-4 md:pl-0 border-b md:border-0 w-full md:w-max py-1  " style={{ marginLeft: '0px' }} >
                            <NavLink to="/polling" className={({ isActive }) => isActive ? "text-gray-500 ml-0" : "text-white"}>Polls</NavLink>
                        </li>
                        {userData?.roleId === ADMIN_ID && navItems.map((item, index) => {
                            return (
                                <li key={index} className="text-white font-semibold border-b pl-4 md:pl-4 py-1 w-full md:border-0 md:w-max lg:pl-6 xl:pl-10 " style={{ marginLeft: '0px' }} >
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive ? "text-gray-500 ml-0" : "text-white"
                                        }
                                        key={index}
                                        to={item.path}
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>

                    <div
                        className="flex items-center relative gap-2 md:mr-18 md:mr-5 cursor-pointerr"
                        onClick={() => {
                            setShowLogoutMenu(!showLogoutMenu)
                        }}>
                        <div className='flex text-3xl gap-2 2xl:gap-4 text-white flex '>
                            <div className='flex items-center'>
                                <FaUserCircle className='xl:text-4xl 2xl:text-5xl' />
                            </div>
                                 
                            <div className=''>
                                <h1 className="text-xs lg:text-xs xl:text-sm 2xl:text-xl">{`${userData?.firstName} ${userData?.lastName}`}</h1>
                                <p className="text-xs xl:text-sm 2xl:text-xl">{userData?.email}</p>
                            </div>
                        </div>
                        {showLogoutMenu && (
                            <LogoutPopup handleLogout={handleLogout}/>
                        )}
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={toggleMenu} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out">
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>)
    );
}

export default Navbar;
