
import { Helmet } from 'react-helmet-async';
import useEnrolledCls from '../../hooks/useEnrolledCls';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';

const EnroledClass = () => {
    const {user} = useContext(AuthContext)
    const [enrolledCls, isLoading] = useEnrolledCls()
    console.log(enrolledCls)
    return (
        <div className='max-w-3xl mx-auto mt-12'>
            <Helmet>
                <title>sport camp || my enrolled class</title>
            </Helmet>
            <h2 className='text-2xl my-4 font-medium'>Hi! <span className='text-purple-500 font-bold'>{user?.displayName}.</span> Your enrolled class:  <span className='text-purple-500 font-bold'>{enrolledCls.length}</span></h2>
            {
                isLoading ? <Loader></Loader> : <div className="overflow-x-auto bg-purple-100">
                    <table className="table">
                        <thead>
                            <tr>
                                <th> #</th>
                                <th>image</th>
                                <th>Class Name</th>
                                <th>Instructor Name</th>
                                <th>Instructor Email</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                enrolledCls.map((clas, index) => <tr key={index}>
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
                                    <td>{clas.instructorName}</td>
                                    <td>{clas.email}</td>
                                    <td>$ {clas.price}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
};

export default EnroledClass;