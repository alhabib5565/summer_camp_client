import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaTrashAlt } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useSelectClass from '../../hooks/useSelectClass';
import Loader from '../../components/Loader';
import PaymentModal from '../../components/PaymentModal';
const SelectedClass = () => {
    const [seleteClass, refetch, isLoading] = useSelectClass()
    const [axiosSecure] = useAxiosSecure()
    const [isOpen, setIsOpen] = useState(false)
    const closeModal = () => {
        setIsOpen(false)
    }
    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/select/delete/${id}`)
                    .then(res => {
                        console.log('deleted res', res.data);
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })

            }
        })
    }

    return (
        <div className='max-w-3xl mx-auto p-4'>
            <h2 className='text-2xl md:text-4xl my-4 font-bold'>Your Select Class:  <span className='text-purple-500 font-bold'>{seleteClass.length}</span></h2>
            {
                isLoading ? <Loader></Loader> :
                    <div className="overflow-x-auto rounded bg-purple-100">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th> #</th>
                                    <th>image</th>
                                    <th>Name</th>
                                    <th>price</th>
                                    <th>action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    seleteClass.map((sClas, index) => <tr key={index}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img className='hover:scale-110 duration-200' src={sClas?.photo} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {sClas?.className}
                                        </td>
                                        <td>$ {sClas.price}</td>
                                        <td className='flex items-center gap-4 '>
                                            <button onClick={() => handleDelete(sClas._id)} title='delete' className="btn bg-red-500 text-white duration-500 hover:text-gray-700 rounded-full">
                                                <FaTrashAlt className='text-lg'></FaTrashAlt>
                                            </button>
                                            <button onClick={() => setIsOpen(true)} className='btn btn-sm btn-warning'>
                                                Pay
                                            </button>

                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
            }
            <PaymentModal closeModal={closeModal} isOpen={isOpen}></PaymentModal>
        </div>
    );
};

export default SelectedClass;