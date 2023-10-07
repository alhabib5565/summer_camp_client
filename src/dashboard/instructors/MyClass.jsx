import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BsArrowRight } from "react-icons/bs"
import NoData from '../../components/NoData';
const MyClass = () => {

    const { user, loading } = useContext(AuthContext)
    const token = localStorage.getItem('jwt_token')
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['class', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await fetch(`https://assignmenttwelv.vercel.app/class/${user?.email}`, {
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
            text: "You won't to delete this class!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://assignmenttwelv.vercel.app/removeClas/${id}`, {
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
    console.log(classes)
    return (
        <div className=' mx-auto mt-12'>
            <Helmet>
                <title>E_Class || Your - class</title>
            </Helmet>
            {
                classes.length < 1 ?
                    <NoData link={'/dashboard/addClass'} linkName={'Add Now'} subTitle='Please add clsss' title='You have no class'></NoData>
                    : <>
                        <h2 className='text-2xl font-medium'>Hi! <span className='text-cyan-500 font-bold'>{user?.displayName}</span></h2>
                        <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
                            {
                                classes.map(clas => <div key={clas._id} className="relative mb-4 flex flex-col w-full max-w-[48rem] md:flex-row rounded-xl bg-gray-100 bg-clip-border text-gray-700 shadow-md">
                                    <div className="relative m-0 w-full md:w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
                                        <img
                                            src={clas.classPhoto}
                                            alt="image"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="p-2 md-4 w-full">
                                        <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-cyan-500 antialiased">
                                            {clas.category.value}
                                        </h6>
                                        <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                            {clas.className}
                                        </h4>
                                        {
                                            clas.feedback ? <>
                                                <h3 className='font-medium'>Feedback</h3>
                                                <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                                                    {clas.feedback}
                                                </p>
                                            </>
                                                : <p className='mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased'>No Feedback No FeedbackNo FeedbackNo FeedbackNo FeedbackNo FeedbackNo FeedbackNo Feedback</p>
                                        }
                                        <div className='flex items-center justify-end w-full gap-4 '>
                                            <Link to={`/dashboard/updateClass/${clas._id}`}>
                                                <button className="inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-md">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Edit
                                                </button>
                                            </Link>

                                            <button onClick={() => handleDelete(clas._id)} className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                    </>
            }
        </div>
    );
};

export default MyClass;
{/* <div className="overflow-x-auto bg-purple-100">
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
                classes?.map((clas, index) => <tr key={index}>
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
                    <td>{clas.enrolled + 4}</td>
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
</div> */}