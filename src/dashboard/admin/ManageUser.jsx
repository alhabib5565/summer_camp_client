import axios from 'axios';
import React, { useState } from 'react';
import { RiAdminFill } from 'react-icons/ri';
import instructor from '../../assets/instructor.webp'
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import useAllUser from '../../hooks/useAllUser';
const ManageUser = () => {
    const [users, refetch] = useAllUser()

    const makeInstructor = (user) => {
        fetch(`https://assignmenttwelv.vercel.app/users/instructor/${user._id}`, {
            method: 'PATCH',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({ role: 'instructor' })
        })
            .then(res => res.json())
            .then(data => {
                toast.success(`create instructor ${user.name}`)
                refetch()
                console.log(data)
            })
    }

    const makeAdmin = (user) => {
        fetch(`https://assignmenttwelv.vercel.app/users/admin/${user._id}`, {
            method: 'PUT',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({ role: 'admin' })
        })
            .then(res => res.json())
            .then(data => {
                toast.success(`crete admin ${user.name}`)
                refetch()
                console.log(data)
            })
    }
    return (
        <div className='bg-gray-100 w-full min-h-screen h-full'>
            <ToastContainer />
            <Helmet>
                <title>E_Class || manage user</title>
            </Helmet>
            <div className='max-w-4xl mx-auto p-4 '>
                <h2 className='text-2xl md:text-4xl text-cyan-950 font-bold mt-10 text-center'>Our All <span className='text-cyan-400'>User </span>: <span>{users?.length}</span></h2>

                <div className="overflow-x-auto rounded bg-white mt-5">
                    <table className="table">
                        <thead className="justify-between">
                            <tr className="bg-cyan-600">
                                <th className="px-4 py-2">
                                    <span className="text-gray-100 font-semibold">#</span>
                                </th>
                                <th className="px-4 py-2">
                                    <span className="text-gray-100 font-semibold whitespace-nowrap">image</span>
                                </th>
                                <th className="px-4 py-2">
                                    <span className="text-gray-100 font-semibold whitespace-nowrap">Name</span>
                                </th>
                                <th className="px-4 py-2">
                                    <span className="text-gray-100 font-semibold">Email</span>
                                </th>
                                <th className="px-4 py-2">
                                    <span className="text-gray-100 font-semibold">Status</span>
                                </th>
                                <th className="px-4 py-2">
                                    <span className="text-gray-100 font-semibold">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr key={index}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img className='hover:scale-110 duration-200' src={user?.photo} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user?.name}
                                    </td>
                                    <td>
                                        {user?.email}
                                    </td>
                                    <td>{user?.role}</td>
                                    <td className='flex items-center gap-4 '>
                                        <button
                                            disabled={user.role === 'instructor'}
                                            onClick={() => makeInstructor(user)}
                                            className={`inline-flex items-center px-2 py-1 whitespace-nowrap text-white  text-xs font-medium rounded-md ${user.role === 'instructor' ? 'bg-gray-300 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-700'}`}>
                                            Make Instructor
                                        </button>
                                        <button
                                            disabled={user.role === 'admin'}
                                            onClick={() => makeAdmin(user)}
                                            className={`inline-flex items-center px-2 py-1 whitespace-nowrap text-white text-xs font-medium rounded-md ${user.role === 'admin' ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}>
                                            Make Admin
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUser;