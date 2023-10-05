import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const UpdateClass = () => {
    const navigate = useNavigate()
    // const id = params.
    const { id } = useParams()
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false)

    const onSubmit = (data) => {
        console.log(data)
        const { className, classPhoto, price, sets, duration, enrollEndDate, enrollStartDate, classType, } = data
        const updateClas = { className, classPhoto, price, sets, duration, enrollEndDate, enrollStartDate, classType }
console.log(updateClas)
        fetch(`http://localhost:5000/updateClas/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateClas)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    Swal.fire(
                        'Updated!',
                        ' update a Class.',
                        'success'
                    )
                    navigate('/dashboard/myClass')
                }
            })
    }
    const [classDetails, setClassDetail] = useState({})
    useEffect(() => {
        if (id) {
            axios(`${import.meta.env.VITE_API_URL}/classDetails/${id}`)
                .then(response => setClassDetail(response.data))
        }
    }, [id])
    const durations = ["4 Week", "5 Week", "6 Week", "7 Week", "8 Week", "9 Week", "10 Week", "11 Week", "12 Week", "13 Week", "14 Week", "15 Week", "16 Week", "17 Week", "18 Week", "19 Week", "10 Week"];

    return (
        <div className='bg-[#F3F4F6] py-10 w-full h-full flex justify-center items-center'>
            <div className='max-w-3xl mx-auto p-4 lg:p-8 bg-white'>
                <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="clasName" className="block mb-1  font-medium text-gray-600">
                            Class Name
                        </label>
                        <input
                            type="text"
                            defaultValue={classDetails.className}
                            {...register('className', { required: true })} placeholder='class name'
                            className="w-full  px-1 sm:px-2 md:px-3 py-1 bg-[#F3F4F6] text-gray-800 border-2  focus:outline-gray-400  rounded-md "
                        />
                    </div>
                    <div>
                        <label htmlFor="photoURL" className="block mb-1  font-medium text-gray-600">
                            Class Photo
                        </label>
                        <input
                            type="url"
                            defaultValue={classDetails.classPhoto}
                            {...register('classPhoto')} placeholder='class image'
                            className="w-full  px-1 sm:px-2 md:px-3 py-1 bg-[#F3F4F6] text-gray-800 border-2  focus:outline-gray-400  rounded-md "
                        />
                    </div>

                    {/* available sets and price */}
                    <div className='flex flex-col md:flex-row gap-3'>
                        <div className='w-full'>
                            <label htmlFor="price" className="block mb-1  font-medium text-gray-600">
                                Price
                            </label>
                            <input
                                type="number"
                                defaultValue={classDetails.price}
                                {...register('price', { required: true })} placeholder='price'
                                className="w-full  px-1 sm:px-2 md:px-3 py-1 bg-[#F3F4F6] text-gray-800 border-2  focus:outline-gray-400  rounded-md "
                            />
                        </div>

                        <div className='w-full'>
                            <label htmlFor="sets" className="block mb-1  font-medium text-gray-600">
                                Available Sets
                            </label>
                            <input
                                type="number"
                                defaultValue={classDetails.sets}
                                {...register('sets', { required: true })} placeholder='sets'
                                className="w-full  px-1 sm:px-2 md:px-3 py-1 bg-[#F3F4F6] text-gray-800 border-2  focus:outline-gray-400  rounded-md "
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="Class type" className="block mb-1  font-medium text-gray-600">
                            Class type
                        </label>
                        <select
                            className="w-full  px-1 sm:px-2 md:px-3 py-1 bg-[#F3F4F6] text-gray-800 border-2  focus:outline-gray-400  rounded-md"
                            {...register("classType", { required: true })}
                        >
                            <option value='Online'> Online</option>
                            <option value="Offline"> Offline</option>
                        </select>
                    </div>
                    {/* enroll start date and end date */}
                    <div className='flex flex-col md:flex-row gap-3'>
                        <div className='w-full'>
                            <label htmlFor="price" className="block mb-1  font-medium text-gray-600">
                                Enroll start date
                            </label>
                            <input
                                defaultValue={classDetails.enrollStartDate}
                                type="date"
                                {...register('enrollStartDate', { required: true })} placeholder='Enroll start date'
                                className="w-full  px-1 sm:px-2 md:px-3 py-1 bg-[#F3F4F6] text-gray-800 border-2  focus:outline-gray-400  rounded-md "
                            />
                        </div>

                        <div className='w-full'>
                            <label htmlFor="sets" className="block mb-1  font-medium text-gray-600">
                                Enroll end date
                            </label>
                            <input
                                type="date"
                                defaultValue={classDetails.enrollEndDate}
                                {...register('enrollEndDate', { required: true })} placeholder='Enroll end date'
                                className="w-full  px-1 sm:px-2 md:px-3 py-1 bg-[#F3F4F6] text-gray-800 border-2  focus:outline-gray-400  rounded-md "
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="Duration" className="block mb-1  font-medium text-gray-600">
                            Duration
                        </label>
                        <select
                            className="w-full  px-1 sm:px-2 md:px-3 py-1 bg-[#F3F4F6] text-gray-800 border-2  focus:outline-gray-400  rounded-md"
                            {...register("duration", { required: true })}
                        >
                            {durations.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}

                        </select>
                    </div>

                    {
                    loading ? <p
                        className="w-full p-3 mt-5 text-center font-medium text-gray-400 transition duration-200 rounded shadow-md bg-gray-200 cursor-not-allowed"
                    >
                        <TbFidgetSpinner className="m-auto animate-spin" size={24} />
                    </p>
                        : <button
                            type='submit'
                            className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-cyan-500"
                        >
                            Add A Class
                        </button>
                }
                </form>
            </div>
        </div>
    );
};

export default UpdateClass;