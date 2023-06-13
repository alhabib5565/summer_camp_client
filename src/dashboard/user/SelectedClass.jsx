import React, { useContext, useEffect} from 'react';
import { AuthContext } from '../../provider/AuthProvider';
const SelectedClass = () => {
    const { user } = useContext(AuthContext)
    console.log(user)
    useEffect(() => {
        fetch(`https://assignmenttwelv.vercel.app/mySelectClass?email=${user?.email}`)
        .then(res => res.json())
        .then(data => console.log(data))
    },[user])
    return (
        <div className='max-w-4xl mx-auto p-4'>
            seleted class
            <div className="overflow-x-auto rounded bg-purple-100">
                <table className="table">
                    <thead>
                        <tr>
                            <th> #</th>
                            <th>image</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Total Enrolled</th>
                            <th>Feedback</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {
                            classes.map((clas, index) => <tr key={index}>
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
                                <td>Enrolled</td>
                                <td>No Feedback</td>
                                <td className='flex items-center gap-4 '>
                                    <Link to={`/dashboard/updateClass/${clas._id}`}><button className='btn btn-ghost btn-sm text-white hover:text-gray-700 bg-purple-500'> update</button></Link>
                                    <button onClick={() => handleDelete(clas._id)} title='delete' className="btn bg-red-500 text-white duration-500 hover:text-gray-700 rounded-full">
                                        <FaTrashAlt className='text-lg'></FaTrashAlt>
                                    </button>

                                </td>
                            </tr>)
                        }
                    </tbody> */}
                </table>
            </div>
        </div>
    );
};

export default SelectedClass;