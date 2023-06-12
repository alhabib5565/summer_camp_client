import axios from 'axios';
import React, { useState } from 'react';
import { RiAdminFill } from 'react-icons/ri';
import instructor from '../../assets/instructor.webp'
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
const ManageUser = () => {
    const [disable, setdisable] = useState(false)
    const [users, setUsers] = useState([])
    useState(() => {
        axios.get('https://12-assignment-server.vercel.app/allUser')
            .then(data => setUsers(data.data))
    }, [])

    const makeInstructor = (user) => {
        fetch(`https://12-assignment-server.vercel.app/users/instructor/${user._id}`, {
            method: 'PATCH',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({role: 'instructor'})
        })
        .then(res => res.json())
        .then(data => {
            toast.success(`create instructor ${user.name}`)
            console.log(data)
        })
    }

    const makeAdmin = (user) => {
        fetch(`https://12-assignment-server.vercel.app/users/admin/${user._id}`, {
            method: 'PUT',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({role: 'admin'})
        })
        .then(res => res.json())
        .then(data => {
            toast.success(`crete admin ${user.name}`)
            console.log(data)
        })
    }
    return (
        <div className='max-w-4xl mx-auto p-4'>
            <ToastContainer>
                
            </ToastContainer>
            <Helmet>
                <title>sport camp || manage user</title>
            </Helmet>
            <h2 className='text-2xl md:text-4xl text-purple-950 font-bold'>Our All <span className='text-purple-400'>User </span>: <span>{users?.length}</span></h2>

            <div className="overflow-x-auto rounded bg-purple-100 mt-10">
                <table className="table">
                    <thead>
                        <tr>
                            <th> #</th>
                            <th>image</th>
                            <th>Name</th>
                            <th>email</th>
                            <th>Status</th>
                            <th>action</th>
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
                                    <button disabled={user.role === 'instructor'} onClick={() => makeInstructor(user)} title=' make instructor' className="btn bg-gray-400 text-white duration-500 hover:text-gray-700 rounded-full">
                                        <img className='w-5' src={instructor} alt="" />
                                    </button>
                                    <button disabled={user.role === 'admin'} onClick={() => makeAdmin(user)} title='make admin' className="btn bg-red-500 text-white duration-500 hover:text-gray-700 rounded-full">
                                        <RiAdminFill className='text-lg'></RiAdminFill>
                                    </button>

                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;