import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import { BiLoaderCircle } from 'react-icons/bi'
import { CgCalendarDates } from "react-icons/cg"
import moment from 'moment';
import AdminShowClass from './AdminShowClass';
import DenyFeedback from './DenyFeedback';
import useAllClass from '../../hooks/useApproveClass';

const ManageClass = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [denyFeedbackModalOpen, setDenyFeedbackModalOpen] = useState(false)
    const [id, setId] = useState('')
    const [classes, , refetch] = useAllClass()


    const appvoeClass = (clss) => {
        fetch(`https://assignmenttwelv.vercel.app/class/approve/${clss._id}`, {
            method: 'PATCH',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({ status: 'approve' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success(`approve class successfully`)
                    refetch()
                }
                console.log(data)
            })
    }

    const openClassDetailsModal = (id) => {
        setId(id)
        setIsOpen(true)
    }
    const denyFeedback = (id) => {
        setDenyFeedbackModalOpen(true)
        setId(id)
    }

    return (
        <div className='p-4'>
            <h2 className=' text-2xl md:text-4xl text-gray-950 font-bold mb-5'>Our totall class {classes?.length}</h2>
            <ToastContainer></ToastContainer>
            <Helmet>
                <title>E_Class || Manage - Class by admin</title>
            </Helmet>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                {
                    classes.map((clss, index) => <div key={index} className="max-w-sm w-full lg:max-w-full">
                        <img className='h-48 w-full' src={clss.classPhoto} alt="" />
                        <div className="border border-gray-400 bg-white rounded-b flex flex-col justify-between leading-normal">
                            <div className='p-4'>
                                {/* instructor avater */}
                                <div className="flex items-center mb-6">
                                    <img className="w-10 h-10 rounded-full mr-4" src={clss.instructorPhoto} alt="Avatar of Jonathan Reinink" />
                                    <div className="text-sm">
                                        <p className="text-gray-900 leading-none">{clss.instructorName}</p>
                                        <p className="text-gray-600">{moment(clss.whenAddClass).format("MMM DD YYYY")}</p>
                                    </div>
                                </div>
                                <div className="text-gray-900 font-bold text-xl mb-2">{clss.className}</div>
                                {/* start date and end date */}
                                {
                                    clss.enrollStartDate && clss.enrollEndDate &&
                                    <div className='flex flex-col md:flex-row gap-2 items-center mb-4'>
                                        <p className='w-full flex gap-1 items-center bg-cyan-600 text-gray-200 rounded p-1 text-sm'><CgCalendarDates /> Enroll start {moment(clss.enrollStartDate).format("MMM DD YY")}</p>
                                        <p className='w-full flex gap-1 items-center bg-cyan-600 text-gray-200 rounded p-1 text-sm'><CgCalendarDates /> Enroll end {moment(clss.enrollEndDate).format("MMM DD YY")}</p>
                                    </div>
                                }

                                {/* class approv or deny button */}
                                <div className='flex justify-between items-center'>
                                    <button disabled={clss.status === 'approve'} onClick={() => denyFeedback(clss._id)} title=' make instructor' className='btn btn-ghost btn-xs text-white hover:text-gray-700 bg-cyan-500'>
                                        deny
                                    </button>

                                    <button disabled={clss.status === 'approve'}
                                        onClick={() => appvoeClass(clss)} className='btn btn-ghost btn-xs text-white hover:text-gray-700 bg-yellow-500'> approve
                                    </button>
                                </div>
                            </div>
                            <hr className='border-[1px]' />
                            <div className="px-4 py-3 w-full text-center">
                                <button onClick={() => openClassDetailsModal(clss._id)} className="px-4 py-2 mx-auto font-medium rounded border-2 border-cyan-500 hover:bg-cyan-600 hover:text-white duration-300 text-cyan-400">View Details</button>
                            </div>
                        </div>
                    </div>)
                }
                <AdminShowClass isOpen={isOpen} setIsOpen={setIsOpen} id={id}></AdminShowClass>
                <DenyFeedback id={id} denyFeedbackModalOpen={denyFeedbackModalOpen} setDenyFeedbackModalOpen={setDenyFeedbackModalOpen}></DenyFeedback>
            </div>
        </div>
    );
};

export default ManageClass;