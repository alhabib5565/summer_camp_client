import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
// import {PiSpinnerBold} from 
import {BiLoaderCircle} from 'react-icons/bi'
const ManageClass = () => {
    const [feedback, setFeedback] = useState('')
    const [classes, setClasses] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/allClass')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])

    const appvoeClass = (clss) => {
        fetch(`http://localhost:5000/class/approve/${clss._id}`, {
            method: 'PATCH',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({ status: 'approve' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success(`approve your class`)
                }
                console.log(data)
            })
    }

    return (
        <div>
            <h2 className='text-2xl md:text-4xl text-purple-950 font-bold'>Our all <span className='text-purple-400'>Approve </span> Class: <span>{classes?.length}</span></h2>
            <ToastContainer></ToastContainer>
            <Helmet>
                <title>sport camp || manage class</title>
            </Helmet>
            {/* Open the modal using ID.showModal() method */}
            <dialog id="my_modal_1" className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4"> why the Class was denied</p>
                    <textarea onChange={() => setFeedback(value)} className="textarea textarea-bordered w-full" placeholder="Bio"></textarea>
                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">submit feedback</button>
                        <button className="btn">Close</button>
                    </div>
                </form>
            </dialog>
            <div className="overflow-x-aut rounded m-3 bg-gray-100 mt-10">
                <table className="w-full mx-auto overflow-x-auto">
                    <thead className='justify-between'>
                        <tr className='bg-cyan-700 text-white'>
                            <th className="px-4 py-2">
                                <span className="text-gray-100 font-semibold">#</span>
                            </th>
                            <th className="px-4 hidden md:block py-2">
                                <span className="text-gray-100 font-semibold">Image</span>
                            </th>
                            <th className="px-4 py-2">
                                <span className="text-gray-100 font-semibold">Instructor name</span>
                            </th>
                            <th className="px-4 py-2">
                                <span className="text-gray-100 font-semibold">Class name</span>
                            </th>
                            <th className="px-4 py-2">
                                <span className="text-gray-100 font-semibold">instructor email</span>
                            </th>
                            <th className="px-4 py-2">
                                <span className="text-gray-100 font-semibold">Status</span>
                            </th>
                            <th className="px-4 py-2">
                                <span className="text-gray-100 font-semibold">price</span>
                            </th>
                            <th className="px-4 py-2">
                                <span className="text-gray-100 font-semibold"> Sets</span>
                            </th>
                            <th className="px-4 py-2">
                                <span className="text-gray-100 font-semibold">action</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-gray-200'>
                        {
                            classes.map((clss, index) => <tr key={index} className='bg-white border-b-2 border-gray-200'>
                                <td>
                                    {index + 1}
                                </td>

                                <td className="hidden pl-4 md:pl-8 py-2 md:flex flex-row  items-center">
                                    <img
                                        className="h-8 w-8 rounded-full object-cover"
                                        src={clss?.photo}
                                        alt=""
                                    />
                                </td>
                                <td className='pl-4 md:pl-8'>
                                    <span className="text-center ml-2 font-">{clss?.instructorName}</span>
                                </td>
                                <td className='pl-4 md:pl-8'>
                                    <span className="text-center ml-2 font-">{clss?.className}</span>
                                </td>
                                <td className='pl-4 md:pl-8'>
                                    <span className="text-center">{clss?.email}</span>
                                </td>
                                <td className='pl-4 md:pl-8'>
                                    {
                                        clss.status === 'pending' ? <span className='flex items-center justify-center rounded-md border border-transparent bg-cyan-100 px-2 py-1 text-sm font-medium text-cyan-900 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2'>
                                            <span>{clss.status}</span> <span className='animate-spin'><BiLoaderCircle/></span>
                                        </span>
                                            : <span>{clss.status}</span>
                                    }
                                </td>

                                <td className='pl-4 md:pl-8'>
                                    $<span className='text-cyan-700'>{clss.price}</span>
                                </td>
                                <td className='text-center'>{clss.sets}</td>
                                <td className='flex items-center justify-center gap-2'>

                                    <button disabled={clss.role === 'instructor'} onClick={() => window.my_modal_1.showModal()} title=' make instructor' className='btn btn-ghost btn-xs text-white hover:text-gray-700 bg-cyan-500'>
                                        deny
                                    </button>

                                    <button disabled={clss.status === 'approve'}
                                        onClick={() => appvoeClass(clss)} className='btn btn-ghost btn-xs text-white hover:text-gray-700 bg-yellow-500'> approve</button>

                                    {/* <button disabled={clss.role === 'admin'} onClick={() => makeAdmin(clss)} title='make admin' className='btn btn-ghost btn-xs text-white hover:text-gray-700 bg-purple-500'>
                                  pending
                                  </button> */}
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClass;