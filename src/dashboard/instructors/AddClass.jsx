import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import { TbFidgetSpinner } from "react-icons/tb"
import CreatableSelect from 'react-select/creatable';
import AddClassQ_A from './AddClassQ_A';
import { ToastContainer, toast } from 'react-toastify';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

const AddClass = () => {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null);
    // question modal 
    const [QA, setQA] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    const onSubmit = data => {
        if (QA.length < 1) {
            return toast.error('please add question and answer')
        }
        setLoading(true)
        console.log(data)
        const { className, classType, photo, price, sets, description, enrollEndDate, enrollStartDate, duration } = data
        const savaClass = {
            className,
            instructorEmail: user.email,
            instructorName: user.displayName,
            instructorPhoto: user.photoURL,
            classPhoto: photo,
            price,
            sets,
            description,
            enrollEndDate,
            enrollStartDate,
            enrolled: 0,
            status: "pending",
            whenAddClass: new Date(),
            category: selectedOption,
            classType,
            duration,
            QA
        }
        console.log(savaClass)
        fetch('https://assignmenttwelv.vercel.app/saveClass', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(savaClass)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire(
                        'Good job!',
                        'class added successfully',
                        'success'
                    )
                    // reset()
                    // setQA([])
                    setLoading(false)
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setLoading(false)
            });
    };
    const durations = ["4 Week", "5 Week", "6 Week", "7 Week", "8 Week", "9 Week", "10 Week", "11 Week", "12 Week", "13 Week", "14 Week", "15 Week", "16 Week", "17 Week", "18 Week", "19 Week", "10 Week"];

    const category = [
        { value: 'Language Learning', label: 'Language Learning' },
        { value: 'Programming', label: 'Programming' },
        { value: 'Math & Logic', label: 'Math & Logic' },
        { value: 'Computer Science', label: 'Computer Science' },
        { value: 'Business', label: 'Business' },
        { value: 'Arts & Humanities', label: 'Arts & Humanities' },
    ];
    return (
        <div className='bg-[#F3F4F6] py-10 w-full h-full flex justify-center items-center'>
            <ToastContainer />
            <form className='space-y-4 max-w-4xl w-full  bg-white p-2 md:p-6 lg:p-10' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="clasName" className="block mb-1  font-bold text-gray-600">
                        Class Name
                    </label>
                    <input
                        type="text"
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
                        {...register('photo', { required: true })} placeholder='class image'
                        className="w-full  px-1 sm:px-2 md:px-3 py-1 bg-[#F3F4F6] text-gray-800 border-2  focus:outline-gray-400  rounded-md "
                    />
                </div>
                <div className='w-full mb-4'>
                    <label htmlFor="Speaks" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"> Speaks Language</label>
                    <CreatableSelect
                        required
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={category}
                    />
                </div>
                <div className='flex flex-col md:flex-row gap-3'>
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
                </div>
                {/* available sets and price */}
                <div className='flex flex-col md:flex-row gap-3'>
                    <div className='w-full'>
                        <label htmlFor="price" className="block mb-1  font-medium text-gray-600">
                            Price
                        </label>
                        <input
                            type="number"
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
                            {...register('sets', { required: true })} placeholder='sets'
                            className="w-full  px-1 sm:px-2 md:px-3 py-1 bg-[#F3F4F6] text-gray-800 border-2  focus:outline-gray-400  rounded-md "
                        />
                    </div>
                </div>
                {/* enroll start date and end date */}
                <div className='flex flex-col md:flex-row gap-3'>
                    <div className='w-full'>
                        <label htmlFor="price" className="block mb-1  font-medium text-gray-600">
                            Enroll start date
                        </label>
                        <input
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
                            {...register('enrollEndDate', { required: true })} placeholder='Enroll end date'
                            className="w-full  px-1 sm:px-2 md:px-3 py-1 bg-[#F3F4F6] text-gray-800 border-2  focus:outline-gray-400  rounded-md "
                        />
                    </div>
                </div>

                <div className="w-full">
                    <label
                        htmlFor="description"
                        className="block mb-1 font-medium text-gray-600"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        className=" w-full h-32  px-1 sm:px-2 md:px-3 py-1 bg-white text-gray-800 border-2  focus:outline-cyan-600  rounded-md"
                        {...register('description', { required: true })}
                        placeholder="Write class description..."
                    ></textarea>
                </div>
                <div className="space-y-1 text-sm">
                    {
                        QA.length > 0 ? <Accordion className='bg-gray-50'>
                            <h2 className='text-2xl p-2 md:p-4 font-medium text-white bg-cyan-500'>Questions and answer for students</h2>
                            {
                                QA.map((singleQAPair, index) =>
                                    <AccordionItem className='bg-cya\n-500 mb-2' key={index}>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                <span className='text-lg'>{singleQAPair.question}</span>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <p>
                                                {singleQAPair.answer}
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                )
                            }
                        </Accordion>
                            : <div className="flex justify-center items-center w-full mx-auto  border-gray-300 rounded-md border-4 border-dotted py-3">
                                <div onClick={() => setIsOpen(true)} className="bg-cyan-500 text-white border w-fit rounded font-semibold cursor-pointer p-1 px-3 hover:bg-cyan-500">
                                    <span className="uppercase">add questions and answer</span>
                                </div>
                            </div>
                    }
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
            <AddClassQ_A QA={QA} setQA={setQA} isOpen={isOpen} setIsOpen={setIsOpen}></AddClassQ_A>
        </div>
    );
};

export default AddClass;