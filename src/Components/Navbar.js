import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/reducers/authSlice';
import navItems from '../utils/navItems.json'
import { FaUserCircle } from "react-icons/fa";
import { getUser, logout } from '../redux/reducers/authSlice'
// const Navbar = ({ isAdmin, user, onLogout }) => {
const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [showLogoutMenu, setShowLogoutMenu] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    console.log(user?.roleId, "user?.roleId");
    const navigate = useNavigate()
    // console.log(user.roleId,"user");

    useEffect(() => {
        dispatch(getUser());
    }, []);

    const toggleMenu = () => {
        console.log(isOpen, "isopen");
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (

        <nav className="bg-gray-800 relative">
            <div className="max-w-8xl mx-auto px-4 sm:px-2 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {user?.roleId && <ul className={`${isOpen ? ' absolute top-full bg-gray-700 left-0 right-0 px-0 pt-2 pb-3 font-semibold sm:px-3 flex items-baseline space-x-4 flex-col border-t ' : ' hidden md:block md:ml-10 md:flex md:space-x-4'}`}>
                        <li className="text-white font-semibold pl-4">
                            <NavLink to="/poll" className="text-white font-semibold">Polls</NavLink>
                        </li>
                        {user?.roleId === 2 && navItems.map((item, index) => {
                            return (
                                <li key={index} className='text-white font-semibold  ' >
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive ? "text-gray-500" : "text-white"
                                        }
                                        key={index}
                                        to={item.path}
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>}

                    <div
                        className="flex items-center relative gap-2 md:mr-18"
                        onClick={() => {
                            setShowLogoutMenu(!showLogoutMenu)
                        }}>
                        {/* <div className=" text-white flex gap-2 md:text-4xl cursor-pointer hidden md:block"> */}
                        <div className='flex text-3xl gap-2 text-white flex '>
                            <div className='flex items-center'>
                                <FaUserCircle />
                            </div>

                            <div className=''>
                                <h1 className="text-xs xl:text-base ">{`${user?.firstName} ${user?.lastName}`}</h1>
                                <p className="text-xs xl:text-base ">{user?.email}</p>
                            </div>
                        </div>
                        {showLogoutMenu && (
                            <button className='absolute bg-red-800 w-[90%] right-0 top-[123%] xl:top-[100%] rounded m-2 p-1 '>
                                <p className='text-white  hover:text-red-500 m-0	' onClick={handleLogout}>Logout</p>
                            </button>
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
        </nav>
    );
}

export default Navbar;

