import React, { useEffect, useState } from 'react';

const ManageClass = () => {
    const [classes, setClasses] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/allClass')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])
    return (
        <div>
            manage class

            <div className="overflow-x-auto rounded m-3 bg-gray-100 mt-10">
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
                                  
                                  <button disabled={clss.role === 'instructor'} onClick={() => makeInstructor(clss)} title=' make instructor' className='btn btn-ghost btn-xs text-white hover:text-gray-700 bg-purple-500'> 
                                      deny
                                  </button>

                                  <button disabled={clss.role === 'instructor'} onClick={() => makeInstructor(clss)} title=' make instructor' className='btn btn-ghost btn-xs text-white hover:text-gray-700 bg-red-500'> update</button>

                                  <button disabled={clss.role === 'admin'} onClick={() => makeAdmin(clss)} title='make admin' className='btn btn-ghost btn-xs text-white hover:text-gray-700 bg-purple-500'>
                                  pending
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

export default ManageClass;