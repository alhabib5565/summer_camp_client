import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import PaymentModal from '../../components/PaymentModal';

const SelectTable = ({index, sClas, handleDelete}) => {
    const [isOpen, setIsOpen] = useState(false)
    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <>
            <tr key={index}>
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
            </tr>
            <PaymentModal classData={sClas} closeModal={closeModal} isOpen={isOpen}></PaymentModal>
        </>
    );
};

export default SelectTable;