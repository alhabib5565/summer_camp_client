import React from 'react';
import { NavLink } from 'react-router-dom';

const UserNavItem = () => {
    return (
        <>
            <li>
                <NavLink to='/dashboard/userHome' className={({ isActive }) => isActive ? "text-slate-300" : ""}>
                    home
                </NavLink>
            </li>

            <li>
                <NavLink to='/dashboard/selectedClass' className={({ isActive }) => isActive ? "text-slate-300" : ""}>
                    Selected Class
                </NavLink>
            </li>

            <li>
                <NavLink to='/dashboard/payment' className={({ isActive }) => isActive ? "text-slate-300" : ""}>
                    payment
                </NavLink>
            </li>

            <li>
                <NavLink to='/dashboard/enrolled' className={({ isActive }) => isActive ? "text-slate-300" : ""}>
                    Enrolled Classes
                </NavLink>
            </li>

        </>
    );
};

export default UserNavItem;