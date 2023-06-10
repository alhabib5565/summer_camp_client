import React from 'react';
import { NavLink } from 'react-router-dom';

const InstcNavItem = () => {
    return (
        <>
             <li>
                <NavLink to='/dashboard/addClass' className={({ isActive }) => isActive ? "text-slate-300" : ""}>
                    Add A Class
                </NavLink>
            </li>
   
             <li>
                <NavLink to='/dashboard/myClass' className={({ isActive }) => isActive ? "text-purple-800" : ""}>
                    My Class
                </NavLink>
            </li>
   
        </>
    );
};

export default InstcNavItem;