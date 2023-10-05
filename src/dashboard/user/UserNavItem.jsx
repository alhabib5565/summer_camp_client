import React from 'react';
import { FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { FiShield } from 'react-icons/fi'
import { HiOutlineBadgeCheck } from "react-icons/hi"
// import { HiWindow } from 'react-icons/hi'
const UserNavItem = () => {
    return (
        <>
            <li className='w-full flex'>
                <NavLink
                    to='/dashboard/userHome'
                    className={({ isActive }) => isActive
                        ? "text-white bg-cyan-950 w-full transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"
                        : "w-full hover:bg-cyan-950 text-white transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"}
                >
                    <FaHome size={20} /> <span>User Home</span>
                </NavLink>
            </li>
            <li className='w-full flex'>
                <NavLink
                    to='/dashboard/selectedClass'
                    className={({ isActive }) => isActive
                        ? "text-white bg-cyan-950 w-full transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"
                        : "w-full hover:bg-cyan-950 text-white transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"}
                >
                    <HiOutlineBadgeCheck size={20} /> <span>Selected Class</span>
                </NavLink>
            </li>
            <li className='w-full flex'>
                <NavLink
                    to='/dashboard/selectedClass'
                    className={({ isActive }) => isActive
                        ? "text-white bg-cyan-950 w-full transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"
                        : "w-full hover:bg-cyan-950 text-white transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"}
                >
                    <FiShield size={20} /> <span>Selected Class</span>
                </NavLink>
            </li>
        </>
    );
};

export default UserNavItem;