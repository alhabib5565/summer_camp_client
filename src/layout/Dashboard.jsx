import React from 'react';
import {Outlet} from "react-router-dom";
import {HiOutlineMenuAlt1} from 'react-icons/hi'
const Dashboard = () => {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content fle flex-col items-center justify-center">
          {/* Page content here */}
          <label htmlFor="my-drawer-2" className="btn text-lg drawer-button lg:hidden"><HiOutlineMenuAlt1></HiOutlineMenuAlt1></label>
            <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-purple-400 text-lg text-white">
            {/* Sidebar content here */}
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
          </ul>

        </div>
      </div>
    </>
  );
};

export default Dashboard;