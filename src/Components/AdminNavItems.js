import React from "react";
import { NavLink } from "react-router-dom";

const AdminNavItem = ({ item, index }) => {
    return (
        <li className="text-white font-semibold border-b pl-4 md:pl-4 py-1 w-full md:border-0 md:w-max lg:pl-6 xl:pl-10" style={{ marginLeft: '0px' }}>
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
};

export default AdminNavItem;
