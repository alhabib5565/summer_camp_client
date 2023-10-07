import React from 'react';
import {MdOutlineManageAccounts} from 'react-icons/md'
import {BiBookAlt} from 'react-icons/bi'
import { FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const AdminNavItem = () => {
    return (
        <>

            <li className='w-full flex'>
                <NavLink
                    to='/dashboard/adminHome'
                    className={({ isActive }) => isActive
                        ? "text-white bg-cyan-950 w-full transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"
                        : "w-full hover:bg-cyan-950 text-white transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"}
                >
                    <FaHome size={20}/> <span>Admin Home</span> 
                </NavLink>
            </li>
            <li className='w-full flex'>
                <NavLink
                    to='/dashboard/manageUser'
                    className={({ isActive }) => isActive
                        ? "text-white bg-cyan-950 w-full transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"
                        : "w-full hover:bg-cyan-950 text-white transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"}
                >
                    <MdOutlineManageAccounts size={20}/> <span>Manage User</span> 
                </NavLink>
            </li>
            <li className='w-full flex'>
                <NavLink
                    to='/dashboard/manageClass' 
                    className={({ isActive }) => isActive
                        ? "text-white bg-cyan-950 w-full transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"
                        : "w-full hover:bg-cyan-950 text-white transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"}
                >
                    <BiBookAlt size={20}/> <span>Manage Class</span> 
                </NavLink>
            </li>
            <li className='w-full flex'>
                <NavLink
                    to='/dashboard/totalEnrolledClass' 
                    className={({ isActive }) => isActive
                        ? "text-white bg-cyan-950 w-full transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"
                        : "w-full hover:bg-cyan-950 text-white transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"}
                >
                    <BiBookAlt size={20}/> <span>Total Enrolled Class</span> 
                </NavLink>
            </li>
        </>
    );
};

export default AdminNavItem;