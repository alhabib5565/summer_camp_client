import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';

const ManageClass = () => {
    const [feedback, setFeedback] = useState('')
    console.log(feedback)
    const [classes, setClasses] = useState([])
    useEffect(() => {
        fetch('https://12-assignment-server.vercel.app/allClass')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])

    const appvoeClass = (clss) => {
        fetch(`https://12-assignment-server.vercel.app/class/approve/${clss._id}`, {
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
            <div className="overflow-x-auto rounded m-3 bg-purple-100 mt-10">
                <table className="table">
                    <thead>
                        <tr>
                            <th> #</th>
                            <th>image</th>
                            <th> Instructor name</th>
                            <th>Class name</th>
                            <th>instructor email</th>
                            <th>Status</th>
                            <th>price</th>
                            <th>avilable sets</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map((clss, index) => <tr key={index}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img className='hover:scale-110 duration-200' src={clss?.photo} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td className='uppercase font-medium'>
                                    {clss?.instructorName}
                                </td>
                                <td className='uppercase font-medium'>
                                    {clss?.className}
                                </td>
                                <td>
                                    {clss?.email}
                                </td>
                                <td>
                                    {clss.status}
                                </td>
                                <td className='text-right'>$ <span className='text-purple-500'>{clss.price}</span> </td>
                                <td>{clss.sets}</td>
                                <td className='flex items-center gap-1'>

                                    <button disabled={clss.role === 'instructor'} onClick={() => window.my_modal_1.showModal()} title=' make instructor' className='btn btn-ghost btn-xs text-white hover:text-gray-700 bg-purple-500'>
                                        deny
                                    </button>

                                    <button disabled={clss.status === 'approve'}
                                        onClick={() => appvoeClass(clss)} className='btn btn-ghost btn-xs text-white hover:text-gray-700 bg-red-500'> approve</button>

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