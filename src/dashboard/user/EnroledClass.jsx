
import { Helmet } from 'react-helmet-async';
import useEnrolledCls from '../../hooks/useEnrolledCls';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import NoData from '../../components/NoData';
import moment from 'moment';

const EnroledClass = () => {
    const { user } = useContext(AuthContext)
    const [enrolledCls, isLoading] = useEnrolledCls()
    // console.log(enrolledCls)
    return (
        <div className='max-w-4xl w-full mx-auto mt-12'>
            <Helmet>
                <title>E_Class || my enrolled class</title>
            </Helmet>
            {
                enrolledCls.length < 1 ? <NoData title='You did not enroll any class' subTitle={'Please enroll'} link='allClass' linkName='Find Class'></NoData> :
                    <>
                        <h2 className='text-2xl md:text-4xl my-4 font-bold text-center'>Hi! <span className='text-cyan-500 font-bold'>{user?.displayName}.</span> Your enrolled class:  <span className='text-cyan-500 font-bold'>{enrolledCls.length}</span></h2>
                        {
                            isLoading ? <Loader></Loader> :
                            <div className="overflow-x-auto rounded bg-cyan-100">
                                <table className="table">
                                    <thead className="justify-between">
                                        <tr className="bg-cyan-600">
                                            <th className="px-4 py-2">
                                                <span className="text-gray-100 font-semibold">#</span>
                                            </th>
                                            <th className="px-4 py-2">
                                                <span className="text-gray-100 font-semibold whitespace-nowrap">Class Name</span>
                                            </th>
                                            <th className="px-4 py-2">
                                                <span className="text-gray-100 font-semibold whitespace-nowrap">Instructor Name</span>
                                            </th>
                                            <th className="px-4 py-2">
                                                <span className="text-gray-100 font-semibold whitespace-nowrap">Instructor Email</span>
                                            </th>
                                            <th className="px-4 py-2">
                                                <span className="text-gray-100 font-semibold whitespace-nowrap">Enroll Date</span>
                                            </th>
                                            <th className="px-4 py-2">
                                                <span className="text-gray-100 font-semibold">Price</span>
                                            </th>
                                            <th className="px-4 py-2">
                                                <span className="text-gray-100 font-semibold"></span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            enrolledCls.map((enrollClss, index) =>
                                                <tr key={index} className="bg-white border-b-2 border-gray-200 py-4">
                                                    <td className='px-4 py-2'>
                                                        <span className="text-center ml-2 font-semibold">{index}</span>
                                                    </td>
                                                    <td className='px-4 py-2'>
                                                        <span className="text-center ml-2 font-semibold whitespace-nowrap">{enrollClss?.className}</span>
                                                    </td>
                                                    <td className='px-4 py-2'>
                                                        <span className="text-center ml-2 font-semibold whitespace-nowrap">{enrollClss?.instructorName}</span>
                                                    </td>
                                                    <td className='px-4 py-2'>
                                                        <span className="text-center ml-2 font-semibold whitespace-nowrap">{enrollClss?.instructorEmail}</span>
                                                    </td>
                                                    <td className='px-4 py-2'>
                                                        <span className="text-center ml-2 font-semibold whitespace-nowrap">
                                                        {moment(enrollClss.date).format("MMM DD YY")}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <span className='text-center ml-2 font-semibold whitespace-nowrap'>$ {enrollClss.price}</span>
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <p>
                                                            <Link to={`/class/${enrollClss.classId}`} className="w-fit px-3 my-4 py-1 mx-auto font-medium rounded border-2 border-cyan-500 hover:bg-cyan-600 hover:text-white duration-300 text-cyan-400">View Details</Link>
                                                        </p>
                                                    </td>

                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                                </div>
                        }
                    </>
            }
        </div>
    );
};

export default EnroledClass;