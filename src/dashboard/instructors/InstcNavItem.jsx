import React from 'react';
import { FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import {HiOutlineViewGridAdd} from 'react-icons/hi'
import {AiOutlineUser} from 'react-icons/ai'
const InstcNavItem = () => {
    return (
        <>
            <li className='w-full flex'>
                <NavLink
                    to='/dashboard/myClass'
                    className={({ isActive }) => isActive
                        ? "text-white bg-cyan-950 w-full transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"
                        : "w-full hover:bg-cyan-950 text-white transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"}
                >
                    <AiOutlineUser size={20}/> <span>My Class</span> 
                </NavLink>
            </li>
            <li className='w-full flex'>
                <NavLink
                    to='/dashboard/addClass'
                    className={({ isActive }) => isActive
                        ? "text-white bg-cyan-950 w-full transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"
                        : "w-full hover:bg-cyan-950 text-white transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"}
                >
                    <HiOutlineViewGridAdd size={20}/> <span>Add A Class</span> 
                </NavLink>
            </li>

        </>
    );
};

export default InstcNavItem;