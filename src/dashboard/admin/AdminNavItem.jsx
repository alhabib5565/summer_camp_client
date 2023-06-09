import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNavItem = () => {
    return (
        <>
            <li>
                <NavLink to='/dashboard/adminHome' className={({ isActive }) => isActive ? "text-slate-300" : ""}>
                    home
                </NavLink>
            </li>

            <li>
                <NavLink to='/dashboard/manageClass' className={({ isActive }) => isActive ? "text-slate-300" : ""}>
                    Manage Class
                </NavLink>
            </li>

            <li>
                <NavLink to='/dashboard/manageUser' className={({ isActive }) => isActive ? "text-slate-300" : ""}>
                    Manage User
                </NavLink>
            </li>
        </>
    );
};

export default AdminNavItem;