import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import PaymentModal from '../../components/PaymentModal';

const SelectTable = ({ index, sClas, handleDelete }) => {
    const [isOpen, setIsOpen] = useState(false)
    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <>
            <tr className="bg-white border-b-2 border-gray-200">
                <td className='px-4 py-2'>
                    <span className="text-center ml-2 font-semibold">{index}</span>
                </td>
                <td className='px-4 py-2'>
                    <span className="text-center ml-2 font-semibold whitespace-nowrap">{sClas?.instructorName}</span>
                </td>
                <td className='px-4 py-2'>
                    <span className="text-center ml-2 font-semibold whitespace-nowrap">{sClas?.className}</span>
                </td>
                <td className="px-4 py-2">
                    <span>$ {sClas.price}</span>
                </td>
                <td className="px-4 py-2 flex items-center gap-4">

                    <button onClick={() => handleDelete(sClas._id)} className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                    </button>
                    <button onClick={() => setIsOpen(true)} className='btn btn-sm btn-warning'>
                        Pay
                    </button>
                </td>
            </tr>
            <PaymentModal classData={sClas} closeModal={closeModal} isOpen={isOpen}></PaymentModal>
        </>
    );
};

export default SelectTable;

{/* <div className="bg-white w-full">
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
                <span className="text-gray-100 font-semibold">Country</span>
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
                    <span>{user.countryName ? user.countryName : 'not available'}</span>
                </td>
                <td className="pl-4 md:pl-8 py-2">
                    <span>{user.email}</span>
                </td>
            </tr>)
        }
    </tbody>
</table>
</div> */}
