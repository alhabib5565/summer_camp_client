import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    const navitem = <>
        <li>
            <NavLink
                to='/'
                className={({ isActive }) =>
                    isActive ? "text-purple-300 bg-purple-600" : ""
                }
            >
                home
            </NavLink>
        </li>
       
        <li>
            <NavLink
                to='/login'
                className={({ isActive }) =>
                    isActive ? "text-purple-300 bg-purple-600" : ""
                }
            >
                login
            </NavLink>
        </li>
       
        <li>
            <NavLink
                to='/register'
                className={({ isActive }) =>
                    isActive ? "text-purple-300 bg-purple-600" : ""
                }
            >
                registers
            </NavLink>
        </li>
       
        <li><a>da 3</a></li>
    </>

    return (
        <div className='bg-purple-900 text-white'>
            <div className="navbar max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm uppercase dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navitem}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu uppercase menu-horizontal px-2">
                        {navitem}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;