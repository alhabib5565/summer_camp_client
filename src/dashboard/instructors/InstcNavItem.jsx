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
   
        </>
    );
};

export default InstcNavItem;