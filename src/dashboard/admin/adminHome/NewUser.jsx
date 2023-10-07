import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { Link } from 'react-router-dom'


const NewUser = () => {
    const [axiosSecure] = useAxiosSecure()
    const [newUser, setNewUsers] = useState()
    useEffect(() => {
        axiosSecure.get(`https://assignmenttwelv.vercel.app/lastJoinUser`)
            .then(res => {
                setNewUsers(res.data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div className="bg-white w-full pb-4 h-full">
            <h3 className="font-semibold text-base  px-4 py-3">New users</h3>
            <table className="w-full mx-auto overflow-x-auto">
                <thead className="justify-between">
                    <tr className="bg-[#34A0A4]">
                        <th className="px-4 py-2">
                            <span className="text-gray-100 font-semibold">Image</span>
                        </th>
                        <th className="px-4 py-2">
                            <span className="text-gray-100 font-semibold">Name</span>
                        </th>

                        <th className="px-4 py-2">
                            <span className="text-gray-100 font-semibold">Email</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-200">
                    {
                        newUser?.slice(0, 5).map(user => <tr key={user._id} className="bg-white border-b-2 border-gray-200">
                            <td className="pl-4 md:pl-8 py-2 flex flex-row items-center">
                                <img
                                    className="h-8 w-8 rounded-full object-cover"
                                    src={user.photo}
                                    alt=""
                                />
                            </td>
                            <td className='pl-4 md:pl-8'>
                                <span className="text-center ml-2 font-semibold">{user.name}</span>
                            </td>

                            <td className="pl-4 md:pl-8 py-2">
                                <span>{user.email}</span>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            <p className='mt-10 flex justify-center'>
                <Link to='/dashboard/manageUser' className="w-fit px-4 py-2 font-medium rounded border-2 border-cyan-500 hover:bg-cyan-600 hover:text-white duration-300 text-cyan-400">Show All User</Link>
            </p>
        </div>

    )
}

export default NewUser