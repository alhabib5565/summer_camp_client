import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { FaTrashAlt } from 'react-icons/fa';
const MyClass = () => {
    const [classes, setClasses] = useState([])
    const { user } = useContext(AuthContext)
    useEffect(() => {
        fetch(`http://localhost:5000/class/${user?.email}`)
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])
    // fetch('')
    return (
        <div className='max-w-3xl mx-auto mt-12'>
            <h2 className='text-2xl font-medium'>Hi! <span className='text-purple-500 font-bold'>{user.displayName}</span></h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th> #</th>
                            <th>image</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map((clas, index) => <tr>
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
                                <td className='flex items-center gap-4 '>
                                    <button className='btn btn-ghost btn-sm text-white hover:text-gray-700 bg-purple-500'> update</button>
                                    <button title='delete' className="btn bg-red-500 text-white duration-500 hover:text-gray-700 rounded-full">
                                        <FaTrashAlt className='text-lg'></FaTrashAlt>
                                    </button>

                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyClass;