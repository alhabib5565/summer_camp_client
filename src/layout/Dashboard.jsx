import React, { useState } from 'react';
import { NavLink, Outlet } from "react-router-dom";
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import UserNavItem from '../dashboard/user/UserNavItem';
import { FaHome } from 'react-icons/fa';
import AdminNavItem from '../dashboard/admin/AdminNavItem';
import InstcNavItem from '../dashboard/instructors/InstcNavItem';
import useAdmin from '../hooks/useAdmin';
import useInstructor from '../hooks/useInstructor';
const Dashboard = () => {
  const [isAdmin] = useAdmin()
  const [isInstructor] = useInstructor()
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label htmlFor="my-drawer-2" className="btn text-lg drawer-button lg:hidden"><HiOutlineMenuAlt1></HiOutlineMenuAlt1></label>
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-cyan-800 text-lg text-white">
            {/* Sidebar content here */}
            {
              !isAdmin && !isInstructor && <><p className='text-2xl font-bold text-white'>user</p> <UserNavItem></UserNavItem></>
            }
            {
              isAdmin && <><p className='text-2xl font-bold text-white'>admin</p> <AdminNavItem></AdminNavItem></>
            }
            {
              isInstructor && <><p className='text-2xl font-bold text-white'>instructor</p> <InstcNavItem></InstcNavItem></>}
            <div className='divider'></div>

            <li>
              <NavLink to='/' className={({ isActive }) => isActive ? "text-slate-300" : ""}>
                <FaHome></FaHome> Home
              </NavLink>
            </li>

          </ul>

        </div>
      </div>
    </>
  );
};

export default Dashboard;