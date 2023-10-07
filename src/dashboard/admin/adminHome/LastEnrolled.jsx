import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { Link } from 'react-router-dom'


const LastEnrolled = () => {
    const [axiosSecure] = useAxiosSecure()
    const [lastEnrolled, setLastEnrolled] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axiosSecure.get(`https://assignmenttwelv.vercel.app/lastEnroled`)
            .then(res => {
                setLastEnrolled(res.data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false)
            });
    }, []);
    return (
        <div className="bg-white w-full h-full pb-4">
            <h3 className="font-semibold text-base  px-4 py-3">Last enrolled class</h3>
            <table className="w-full mx-auto overflow-x-auto">
                <thead className="justify-between">
                    <tr className="bg-[#34A0A4]">
                        <th className="px-4 py-2">
                            <span className="text-gray-100 font-semibold">Instructor Name</span>
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
                        lastEnrolled?.map(clss => <tr key={clss._id} className="bg-white border-b-2 border-gray-200">

                            <td className="pl-4 py-2 font-semibold">
                                <span>{clss.instructorName}</span>
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
            <p className='mt-10 flex justify-center'>
                <Link to='/dashboard/totalEnrolledClass' className="w-fit px-4 py-2 font-medium rounded border-2 border-cyan-500 hover:bg-cyan-600 hover:text-white duration-300 text-cyan-400">Show All</Link>
            </p>
        </div>

    )
}

export default LastEnrolled

