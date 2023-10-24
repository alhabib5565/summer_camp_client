// import React, { useContext, useState } from 'react';
import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';
//new import
import { FaBars, FaTimes } from 'react-icons/fa'
import useSelectClass from '../../hooks/useSelectClass';
import logo from '../../assets/E_Class_logo.png'
const Navbar = () => {
    const { logoutUser, user } = useContext(AuthContext)
    const [isAdmin] = useAdmin()
    const [isInstructor] = useInstructor()
    const [seleteClass] = useSelectClass()
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
    const [menuOpen, setMenuOpen] = useState(false)

    const naviItems = [
        // { id: 1, name: 'register', linkName: 'register' },
        { id: 1, name: 'home', linkName: '/' },
        { id: 2, name: 'instructor', linkName: '/instructor' },
        { id: 3, name: 'all Class', linkName: '/allClass' },
    ]

    const dashboard_link = <>
        {
            isAdmin
                ? <span className='text-gray-300 cursor-pointer  font-medium uppercase hover:text-white hover:scale-105 duration-300'>
                    <NavLink
                        to='/dashboard/adminHome'
                        className={({ isActive }) =>
                            isActive ? "text-cyan-300" : ""
                        }
                    >
                        dashboard
                    </NavLink>
                </span>
                : isInstructor
                    ? <span className='text-gray-300 cursor-pointer  font-medium uppercase hover:text-white hover:scale-105 duration-300'>
                        <NavLink
                            to='/dashboard/myClass'
                            className={({ isActive }) =>
                                isActive ? "text-cyan-300" : ""
                            }
                        >
                            dashboard
                        </NavLink>
                    </span>
                    : <span className='text-gray-300 cursor-pointer  font-medium uppercase hover:text-white hover:scale-105 duration-300'>
                        <NavLink
                            to='/dashboard/selectedClass'
                            className={({ isActive }) =>
                                isActive ? "text-cyan-300" : ""
                            }
                        >
                            dashboard
                        </NavLink>
                    </span>
        }
    </>

    return (

        <div className='bg-cyan-950 fixed z-50 h-20 w-full border-b-[1px] hover:shadow-xl border-gray-300 shadow-lg'>
            <div className='max-w-[1440px] px-3 md-px-6 lg:px-10 mx-auto h-full flex justify-between items-center text-white'>
                <Link to='/'>
                    {/* <h2 className='text-2xl lg:text-4xl font-signature font-bold'>E Class</h2>
                     */}
                    <img className='w-[150px] h-full' src={logo} alt="" />
                </Link>


                <ul className='hidden md:flex items-center gap-4 lg:gap-7'>
                    {
                        naviItems.map(navItem => <li key={navItem.id} className='text-gray-300 cursor-pointer  font-medium uppercase hover:text-white hover:scale-105 duration-300'>
                            <NavLink
                                to={navItem.linkName}
                                className={({ isActive }) =>
                                    isActive ? "text-cyan-400" : ""
                                }
                            >
                                {navItem.name}
                            </NavLink>
                        </li>)
                    }
                </ul>

                {
                    user
                        ? <div className='hidden md:flex gap-3 items-center'>
                            {
                                !isAdmin && !isInstructor &&
                                <label tabIndex={0} className="btn btn-ghost btn-circle">
                                    <Link to='dashboard/selectedClass' className="indicator">
                                        <svg className="h-5 w-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinejoin="round" strokeWidth="1" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                        </svg>

                                        {
                                            seleteClass.length > 0 ? <span className="badge badge-sm indicator-item">{seleteClass.length}</span>
                                                : <span className="badge badge-sm indicator-item">0</span>
                                        }
                                    </Link>
                                </label>
                            }
                            {dashboard_link}
                            <button onClick={handleLogout} className="my-googleBtn bg-white">Log Out</button>
                            <img className='w-12 h-12 rounded-full border-2 border-cyan-300 p-[1px]' src={`${user?.photoURL}`} alt="" />
                        </div>
                        : <span className='text-gray-300 cursor-pointer  font-medium uppercase hover:text-white hover:scale-105 duration-300'>
                            <NavLink
                                to='/login'
                                className={({ isActive }) =>
                                    isActive ? "text-cyan-300" : ""
                                }
                            >
                                login
                            </NavLink>
                        </span>
                }

                <div onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer  text-gray-300 md:hidden">
                    {
                        menuOpen ? <FaTimes size={30}></FaTimes> : <FaBars size={30}></FaBars>
                    }
                </div>

                {
                    menuOpen && <ul className='absolute top-20 box-border bg-cyan-950 w-full md:w-[50vw] rounded-xl py-6 right-0'>
                        {
                            user ? <div className='flex px-6 mb-3 flex-col gap-3 items-center'>
                                <img className='w-16 h-16 rounded-full border-2 border-cyan-300 p-[1px]' src={`${user?.photoURL}`} alt="" />
                                <p>{user?.displayName}</p>
                                <button onClick={handleLogout} className=" my-googleBtn bg-white">Log Out</button>
                                {dashboard_link}
                            </div>
                                : <Link nClick={() => setMenuOpen(false)} to='/login'>
                                    <li className='text-gray-300 cursor-pointer  font-medium uppercase px-6 py-3 hover:bg-cyan-800  duration-300'>
                                        login
                                    </li>
                                </Link>
                        }
                        {
                            naviItems.map(navItem => <Link key={navItem.id} onClick={() => setMenuOpen(false)} to={navItem.linkName}>
                                <li className=' text-gray-300 cursor-pointer  font-medium uppercase px-6 py-3 hover:bg-cyan-800  duration-300'>
                                    {navItem.name}
                                </li>
                            </Link>)
                        }
                        {
                            user && !isAdmin && !isInstructor && <Link onClick={() => setMenuOpen(false)} to='dashboard/selectedClass'>
                                <li className='flex items-center gap-4 justify-between text-gray-300 cursor-pointer  font-medium uppercase px-6 py-3 hover:bg-cyan-800  duration-300'>
                                    Bookmark <span>{seleteClass.length}</span>
                                </li>
                            </Link>
                        }
                        {
                            user && <p className='px-6'>{dashboard_link}</p>
                        }
                    </ul>
                }
            </div>
        </div>
    );
};

export default Navbar;