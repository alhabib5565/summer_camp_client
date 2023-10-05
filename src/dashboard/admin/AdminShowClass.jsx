import React, { useEffect, useState } from 'react';
import ShareModal from '../../components/ShareModal';
import { CgCalendarDates } from "react-icons/cg"
import axios from 'axios';
import moment from 'moment';
const AdminShowClass = ({ isOpen, setIsOpen, id }) => {
    const [classDetails, setClassDetail] = useState({})
    useEffect(() => {
        if (id) {
            axios(`${import.meta.env.VITE_API_URL}/classDetails/${id}`)
                .then(response => setClassDetail(response.data))
        }
    }, [id])
    return (
            <ShareModal width='max-w-3xl' isOpen={isOpen} setIsOpen={setIsOpen} title='Class details'>
                <div className="w-full max-w-full">
                    <img className='h-56 w-full' src={classDetails.classPhoto} alt="" />
                    <div className="border border-gray-400 bg-white rounded-b flex flex-col justify-between leading-normal">
                        <div className='p-4'>
                            {/* instructor avater */}
                            <div className="flex items-center mb-6">
                                <img className="w-16 h-16 rounded-full mr-4" src={classDetails.instructorPhoto} alt="Avatar of Jonathan Reinink" />
                                <div className="text-sm">
                                    <p className="text-gray-900 leading-none font-medium">{classDetails.instructorName}</p>
                                    <p className="text-gray-600">added {moment(classDetails.whenAddClass).format("MMM DD YYYY")}</p>
                                    <p className="text-gray-600">{classDetails.instructorEmail}</p>
                                </div>
                            </div>
                            <div className="text-gray-900 font-bold text-xl mb-2">{classDetails.className}</div>

                            {/* start date and end date */}                    
                                <div className='flex gap-2 items-center mb-2'>
                                    <p className='flex gap-1 items-center bg-cyan-600 text-gray-200 rounded p-1 text-sm'><CgCalendarDates /> Enroll start {moment(classDetails.enrollStartDate).format("MMM DD YY")}</p>
                                    <p className='flex gap-1 items-center bg-cyan-600 text-gray-200 rounded p-1 text-sm'><CgCalendarDates /> Enroll end {moment(classDetails.enrollEndDate).format("MMM DD YY")}</p>
                                </div>

                            <div className='flex flex-col md:flex-row md:items-center gap-0 md:gap-8 mb-2'>
                                <p className='text-lg font-medium'> category: {classDetails?.category?.value}</p>
                                <p className='text-lg font-medium'> available sets: {classDetails.sets}</p>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">${classDetails.price}</h3>

                            <p className='text-gray-700 text-base'>{classDetails.description} </p>
                        </div>

                    </div>
                </div>
            </ShareModal>
    );
};

export default AdminShowClass;