import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { Helmet } from 'react-helmet-async'
// import useAxiosSecure from '../../../hooks/useAxiosSecure'


const TotalEnrolled = () => {
    const [axiosSecure] = useAxiosSecure()
    const [totalEnrolled, setTotalEnrolled] = useState()
    useEffect(() => {
        axiosSecure.get(`https://assignmenttwelv.vercel.app/totalEnroled`)
            .then(res => {
                setTotalEnrolled(res.data) 
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
    console.log(totalEnrolled)
    return (
        <div className='w-full h-full min-h-screen flex justify-center items-center bg-[#F3F4F6]'>
            <Helmet>
            <title>E_Class || Total enrolled</title>
            </Helmet>
            <div className="bg-white max-w-4xl mx-auto w-full p-4">
                <h3 className="font-semibold text-xl text-center  px-4 py-3">Total enrolled class</h3>
                <table className="w-full mx-auto overflow-x-auto">
                    <thead className="justify-between">
                        <tr className="bg-[#34A0A4]">
                            <th className="px-4 py-2">
                                <span className="text-gray-100 font-semibold">Instructor Name</span>
                            </th>
                            <th className="px-4 py-2">
                                <span className="text-gray-100 font-semibold">Instructor Email</span>
                            </th>

                            <th className="px-4 py-2">
                                <span className="text-gray-100 font-semibold">Student Name</span>
                            </th>

                            <th className="px-4 py-2">
                                <span className="text-gray-100 font-semibold">Student Email</span>
                            </th>
                            <th className="px-4 py-2">
                                <span className="text-gray-100 font-semibold">Class Name</span>
                            </th>

                        </tr>
                    </thead>
                    <tbody className="bg-gray-200">
                        {
                            totalEnrolled?.map(clss => <tr key={clss._id} className="bg-white border-b-2 border-gray-200">

                                <td className="pl-4 py-2">
                                    <span>{clss.instructorName}</span>
                                </td>
                                <td className='pl-4'>
                                    <span className="text-center ml-2">{clss.instructorEmail}</span>
                                </td>

                                <td className="pl-4 py-2">
                                    <span>{clss.studentEmail}</span>
                                </td>
                                <td className="pl-4 py-2">
                                    <span>{clss.studentName}</span>
                                </td>
                                <td className="pl-4 py-2">
                                    <span>{clss.className}</span>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default TotalEnrolled

