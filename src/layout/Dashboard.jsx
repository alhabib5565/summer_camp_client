import React, { useState } from 'react';
import { NavLink, Outlet } from "react-router-dom";
import { HiBookOpen, HiLibrary, HiUserGroup } from 'react-icons/hi'
import UserNavItem from '../dashboard/user/UserNavItem';
import { IoIosArrowForward } from 'react-icons/io';
import AdminNavItem from '../dashboard/admin/AdminNavItem';
import InstcNavItem from '../dashboard/instructors/InstcNavItem';
import useAdmin from '../hooks/useAdmin';
import useInstructor from '../hooks/useInstructor';
const Dashboard = () => {
  const [isAdmin] = useAdmin()
  const [isInstructor] = useInstructor()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <>

      {/* <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          Page content here
          <label htmlFor="my-drawer-2" className="btn text-lg drawer-button lg:hidden"><HiOutlineMenuAlt1></HiOutlineMenuAlt1></label>
          <Outlet></Outlet>
        </div>
        <div className="drawer-side overflow-y-auto">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-cyan-800 text-lg text-white">
            Sidebar content here
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
      </div> */}

      <div className='flex'>
        <div className='w-72 bg-cyan-800 overflow-y-auto fixed h-full min-h-screen hidden lg:block z-10'>
          <ul className='mt-10 flex flex-col gap-2'>
            {
              !isAdmin && !isInstructor && <><p className='text-2xl font-bold text-white'>user</p> <UserNavItem></UserNavItem></>
            }
            {
              isAdmin && <><p className='text-2xl font-bold text-white'>admin</p> <AdminNavItem></AdminNavItem></>
            }
            {
              isInstructor && <><p className='text-2xl font-bold text-white'>instructor</p> <InstcNavItem></InstcNavItem></>
            }
            <div className='divider'></div>
            <li className='w-full flex'>
              <NavLink to='/' className={({ isActive }) => isActive
                ? "text-white w-full transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"
                : "w-full  hover:bg-cyan-950  text-white transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"}>
                <HiLibrary size={20} /> Home
              </NavLink>
            </li>
            <li className='w-full flex'>
              <NavLink to='/allClass' className={({ isActive }) => isActive
                ? "text-white w-full transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"
                : "w-full  hover:bg-cyan-950  text-white transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"}>
                <HiBookOpen size={20} /> All Class
              </NavLink>
            </li>
            <li className='w-full flex'>
              <NavLink to='/instructor' className={({ isActive }) => isActive
                ? "text-white w-full transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"
                : "w-full  hover:bg-cyan-950  text-white transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"}>
                <HiUserGroup size={20} /> Instructors
              </NavLink>
            </li>
          </ul>
        </div>
        <div onClick={() => setSidebarOpen(!sidebarOpen)} className={`${sidebarOpen && 'ml-72'} mt-5 fixed w-10 h-10 flex justify-center items-center rounded-full cursor-pointer lg:hidden bg-cyan-800 text-gray-300`}>
          <IoIosArrowForward className={`${sidebarOpen ? 'rotate-180 duration-300' : ''}`} />
        </div>
        {
          sidebarOpen && <div className='w-72 duration-500 bg-cyan-800 overflow-y-auto fixed h-full min-h-screen lg:hidden z-10'>
            <ul className='mt-10 flex flex-col gap-2'>
              {
                !isAdmin && !isInstructor && <><p className='text-2xl font-bold text-white'>user</p> <UserNavItem></UserNavItem></>
              }
              {
                isAdmin && <><p className='text-2xl font-bold text-white'>admin</p> <AdminNavItem></AdminNavItem></>
              }
              {
                isInstructor && <><p className='text-2xl font-bold text-white'>instructor</p> <InstcNavItem></InstcNavItem></>
              }
              <div className='divider'></div>
              <li className='w-full flex'>
                <NavLink to='/' className={({ isActive }) => isActive
                  ? "text-white w-full transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"
                  : "w-full  hover:bg-cyan-950  text-white transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"}>
                  <HiLibrary size={20} /> Home
                </NavLink>
              </li>
              <li className='w-full flex'>
                <NavLink to='/allClass' className={({ isActive }) => isActive
                  ? "text-white w-full transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"
                  : "w-full  hover:bg-cyan-950  text-white transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"}>
                  <HiBookOpen size={20} /> All Class
                </NavLink>
              </li>
              <li className='w-full flex'>
                <NavLink to='/instructor' className={({ isActive }) => isActive
                  ? "text-white w-full transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"
                  : "w-full  hover:bg-cyan-950  text-white transition-all duration-300 ease-in-out px-4 py-2 flex items-center gap-4"}>
                  <HiUserGroup size={20} /> Instructors
                </NavLink>
              </li>
            </ul>
          </div>
        }
        <div className='w-full flex-1 lg:ml-72'>
          <div className='px-2 md:px-4'>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;