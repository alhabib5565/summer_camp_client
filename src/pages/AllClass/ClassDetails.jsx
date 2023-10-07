import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CgCalendarDates } from "react-icons/cg"
import { FcBusinessman } from "react-icons/fc"
import { GrHistory, GrBookmark } from 'react-icons/gr'

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import { handleBookmark, remainingDays } from '../../utils/utils';
import { AuthContext } from '../../provider/AuthProvider';
import { Helmet } from 'react-helmet-async';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';

const ClassDetails = () => {
    const { id } = useParams()
    const [classDetails, setClassDetail] = useState({})
    const [isAdmin] = useAdmin()
    const [isInstructor] = useInstructor()

    const { user } = useContext(AuthContext)
    useEffect(() => {
        if (id) {
            axios(`${import.meta.env.VITE_API_URL}/classDetails/${id}`)
                .then(response => setClassDetail(response.data))
        }
    }, [id])

    return (
        <div className='w-full max-w-5xl mx-auto px-2 md-px-6 lg:px-10 pt-20'>
            <Helmet>
                <title>
                    E_Class || Class details
                </title>
            </Helmet>
            <div className="mt-20 mb-10 flex flex-col md:flex-row gap-6 border border-gray-400 p-2 md:p-4">
                <div className=' w-full md:w-1/2 flex flex-col justify-between'>
                    <img className='h-5/ w-full mb-4 grow' src={classDetails.classPhoto} alt="" />
                    {/* enroll start and end date medium device */}
                    <div className='hidden  md:flex gap-2 items-center w-full'>
                        <p className='w-full flex gap-1 items-center bg-cyan-500 text-white rounded p-1 text-sm'><CgCalendarDates /> Enroll start {moment(classDetails.enrollStartDate).format("MMM DD YY")}</p>
                        <p className='w-full flex gap-1 items-center bg-cyan-500 text-white rounded p-1 text-sm'><CgCalendarDates /> Enroll end {moment(classDetails.enrollEndDate).format("MMM DD YY")}</p>
                    </div>
                </div>
                <div className="w-full md:w-1/2 bg-white rounded-b flex flex-col justify-between leading-normal">
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
                    <div className='flex gap-2 items-center mb-2 md:hidden'>
                        <p className='flex gap-1 items-center bg-cyan-500 text-gray-200 rounded p-1 text-sm'><CgCalendarDates /> Enroll start {moment(classDetails.enrollStartDate).format("MMM DD YY")}</p>
                        <p className='flex gap-1 items-center bg-cyan-500 text-gray-200 rounded p-1 text-sm'><CgCalendarDates /> Enroll end {moment(classDetails.enrollEndDate).format("MMM DD YY")}</p>
                    </div>

                    <div className='flex flex-col md:flex-row md:items-center gap-0 md:gap-8 md:mb-2'>
                        <p className='text-lg font-medium'> category: {classDetails?.category?.value}</p>
                        <p className='text-lg font-medium'> available sets: {classDetails.sets}</p>
                    </div>
                    <div className='flex gap-2 items-center mb-2 w-full'>
                        <p className='w-full flex gap-1 items-center bg-cyan-200 text-gray-800 rounded p-1 font-medium'><FcBusinessman className='hidden md:block' />  {classDetails.enrolled} member enrolled</p>
                        <p className='w-full flex gap-1 items-center bg-cyan-200 text-gray-800 rounded p-1 font-medium'><FcBusinessman className='hidden md:block'></FcBusinessman>  {classDetails.sets - classDetails.enrolled} set remaining</p>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">${classDetails.price}</h3>
                    <div className='flex gap-2 items-center mb-2 w-full'>
                        <p className='mt-2 w-full flex gap-1 items-center bg-cyan-200 text-gray-800 rounded p-1 font-medium'><CgCalendarDates className='hidden sm:block' />
                            remaining date {remainingDays(classDetails.enrollStartDate, classDetails.enrollEndDate)}
                        </p>
                        <p className='mt-2 w-full flex gap-1 items-center bg-cyan-200 text-gray-800 rounded p-1 font-medium'><GrHistory className='hidden sm:block' />
                            {classDetails.duration}
                        </p>
                    </div>
                    <p className='text-gray-700 text-base'>{classDetails.description} </p>
                    {
                        remainingDays(classDetails.enrollStartDate, classDetails.enrollEndDate) >= 1 &&!isAdmin && !isInstructor && <button
                            onClick={() => handleBookmark(classDetails, user)}
                            className="mt-2 flex select-none items-center gap-3 rounded-lg bg-cyan-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            data-ripple-light="true"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                aria-hidden="true"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                ></path>
                            </svg>
                            Add to Bookmark
                        </button>
                    }


                </div>
            </div>
            <div className='mb-20'>
                <Accordion className='bg-gray-50'>
                    <h2 className='text-2xl p-2 md:p-4 font-medium text-white bg-cyan-500'>Questions and answer for students</h2>
                    {
                        classDetails?.QA?.map((singleQAPair, index) =>
                            <AccordionItem className='bg-cya\n-500 mb-2' key={index}>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        <span className='text-lg'>{singleQAPair.question}</span>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p className='text-cyan-700'>
                                        {singleQAPair.answer}
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>
                        )
                    }
                </Accordion>
            </div>
        </div>
    );
};

export default ClassDetails;