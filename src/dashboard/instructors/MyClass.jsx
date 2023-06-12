import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const MyClass = () => {
    // const [classes, setClasses] = useState([])
    const { user, loading } = useContext(AuthContext)
    // useEffect(() => {
    //     fetch(`http://localhost:5000/class/${user?.email}`)
    //         .then(res => res.json())
    //         .then(data => setClasses(data))
    // }, [])
    const token = localStorage.getItem('jwt_token')
    const { data: classes = [], isLoading, refetch } = useQuery({
        queryKey: ['class', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/class/${user?.email}`, {
                headers: {
                    authrization: `bearer ${token}`
                }
            })
            return res.json()
        }
    })

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/removeClas/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                ' deleted a Class.',
                                'success'
                            )
                            refetch()
                        }
                    })
            }
        })

    }

    return (
        <div className='max-w-3xl mx-auto mt-12'>
               <Helmet>
                <title>sport camp || my class</title>
            </Helmet>
            <h2 className='text-2xl font-medium'>Hi! <span className='text-purple-500 font-bold'>{user?.displayName}</span></h2>
            <div className="overflow-x-auto bg-purple-100">
                <table className="table">
                    <thead>
                        <tr>
                            <th> #</th>
                            <th>image</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Total Enrolled</th>
                            <th>Feedback</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map((clas, index) => <tr key={index}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img className='hover:scale-110 duration-200' src={clas?.photo} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {clas?.className}
                                </td>
                                <td>{clas?.status}</td>
                                <td>Enrolled</td>
                                <td>No Feedback</td>
                                <td className='flex items-center gap-4 '>
                                    <Link to={`/dashboard/updateClass/${clas._id}`}><button className='btn btn-ghost btn-sm text-white hover:text-gray-700 bg-purple-500'> update</button></Link>
                                    <button onClick={() => handleDelete(clas._id)} title='delete' className="btn bg-red-500 text-white duration-500 hover:text-gray-700 rounded-full">
                                        <FaTrashAlt className='text-lg'></FaTrashAlt>
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

export default MyClass;