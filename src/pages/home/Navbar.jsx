import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';

const Navbar = () => {
    const { logoutUser, user } = useContext(AuthContext)
    const [isAdmin] = useAdmin()
    const [isInstructor] = useInstructor()
    const handleLogout = () => {
        logoutUser()
            .then(() => {
                Swal.fire(
                    'Good job!',
                    'logOut your account ',
                    'success'
                )
            })
            .catch(error => {
                console.log(error)
                Swal.fire({
                    title: 'Error!',
                    text: `${error.message}`,
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            })
    }

    const navitem = <>
        <li className='hover:text-slate-400'>
            <NavLink
                to='/'
                className={({ isActive }) =>
                    isActive ? "text-slate-300" : ""
                }
            >
                home
            </NavLink>
        </li>

        <li className='hover:text-slate-400'>
            <NavLink
                to='/register'
                className={({ isActive }) =>
                    isActive ? "text-slate-300" : ""
                }
            >
                register
            </NavLink>
        </li>

        <li className='hover:text-slate-400'>
            <NavLink
                to='/instructor'
                className={({ isActive }) =>
                    isActive ? "text-slate-300" : ""
                }
            >
                instructor
            </NavLink>
        </li>

       {/*  {
            regularUser && <li className='hover:text-slate-400'>
                <NavLink
                    to='/dashboard/userHome'
                    className={({ isActive }) =>
                        isActive ? "text-slate-300" : ""
                    }
                >
                    dashboard
                </NavLink>
            </li>
        } */}

        {
            isInstructor && <li className='hover:text-slate-400'>
                <NavLink
                    to='/dashboard/myClass'
                    className={({ isActive }) =>
                        isActive ? "text-slate-300" : ""
                    }
                >
                    dashboard
                </NavLink>
            </li>
        }

        {
            isAdmin && <li className='hover:text-slate-400'>
                <NavLink
                    to='/dashboard/adminHome'
                    className={({ isActive }) =>
                        isActive ? "text-slate-300" : ""
                    }
                >
                    dashboard
                </NavLink>
            </li>
        }

        {
            user ? <>
                <button className='my-button ' onClick={handleLogout}>logout</button>
                <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 hover:scale-105 duration-100">
                        <img title={user.displayName} src={user.photoURL} />
                    </div>
                </div>
            </>
                : <li className='hover:text-slate-400'>
                    <NavLink
                        to='/login'
                        className={({ isActive }) =>
                            isActive ? "text-slate-300" : ""
                        }
                    >
                        login
                    </NavLink>
                </li>

        }
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
                    <ul className="items-center gap-5 uppercase menu-horizontal px-2">
                        {navitem}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Navbar;