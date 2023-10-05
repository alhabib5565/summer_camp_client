import moment from 'moment';
import React, { useContext } from 'react';
import { CgCalendarDates } from 'react-icons/cg';
import { FcBusinessman } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { handleBookmark } from '../../utils/utils';
import { AuthContext } from '../../provider/AuthProvider';
import useSelectClass from '../../hooks/useSelectClass';

const ClassCard = ({ clss }) => {
    const { user } = useContext(AuthContext)
    const [, refetch] = useSelectClass()
    const addBookmark = (clss) => {
        handleBookmark(clss, user)
        refetch()
    }
    return (
        <div className="max-w-lg w-full h-full mx-auto hover:shadow-xl shadow-cyan-500 duration-200">
            <img className='h-48 w-full' src={clss.classPhoto} alt="" />
            <div className="border border-gray-400 bg-white rounded-b flex flex-col justify-between leading-normal">
                <div className='p-2 md:p-4'>
                    {/* instructor avater */}
                    <div className="flex items-center mb-4">
                        <img className="w-10 h-10 rounded-full mr-4" src={clss.instructorPhoto} alt="Avatar of Jonathan Reinink" />
                        <div className="text-sm">
                            <p className="text-gray-900 font-medium leading-none">{clss.instructorName}</p>
                            <p className="text-gray-600">Class added {moment(clss.whenAddClass).format("MMM DD YYYY")}</p>
                        </div>
                    </div>
                    <div className="text-gray-900 font-bold text-xl mb-2">{clss.className}</div>
                    {/* start date and end date */}
                    {
                        clss.enrollStartDate && clss.enrollEndDate &&
                        <div className='flex flex-col md:flex-row gap-2 items-center mb-2'>
                            <p className='w-full flex gap-1 items-center bg-cyan-600 text-gray-200 rounded p-1 text-sm'><CgCalendarDates /> Enroll start {moment(clss.enrollStartDate).format("MMM DD YY")}</p>
                            <p className='w-full flex gap-1 items-center bg-cyan-600 text-gray-200 rounded p-1 text-sm'><CgCalendarDates /> Enroll end {moment(clss.enrollEndDate).format("MMM DD YY")}</p>
                        </div>
                    }

                    <div className='flex flex-col md:flex-row md:items-center gap-0 md:gap-8'>
                        <p className='text-lg font-medium'> category: {clss?.category?.value}</p>
                        <p className='text-lg font-medium'> sets: {clss.sets}</p>
                    </div>
                    <div className='flex gap-2 items-center mb-2 w-full'>
                        <p className='w-full flex gap-1 items-center bg-cyan-200 text-gray-800 rounded p-1 font-medium'><FcBusinessman className='hidden sm:block' />  {clss.enrolled} member enrolled</p>
                        <p className='w-full flex gap-1 items-center bg-cyan-200 text-gray-800 rounded p-1 font-medium'><FcBusinessman className='hidden sm:block' />  {clss.sets - clss.enrolled} set remaining</p>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white ">${clss.price}</h3>

                </div>
                <hr className='border-[1px]' />
                <div className="px-4 py-3 w-full flex justify-center items-center gap-2 text-cyan-500">
                    <p>
                        <Link to={`/class/${clss._id}`} className="w-fit px-4 py-2 mx-auto font-medium rounded border-2 border-cyan-500 hover:bg-cyan-600 hover:text-white duration-300 text-cyan-400">View Details</Link>
                    </p>
                    <svg onClick={() => addBookmark(clss)} className="h-12 w-12 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinejoin="round" strokeWidth="1" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;