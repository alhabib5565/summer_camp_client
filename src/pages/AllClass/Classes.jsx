import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ClassCard from './ClassCard';
import Loader from '../../components/Loader';
import { HiOutlineArrowSmRight, HiOutlineArrowSmLeft } from 'react-icons/hi'
const Classes = () => {
    const [classes, setClasses] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(0)
    const [lengthOfApproveClass, setLengthOfApproveClass] = useState(0)

    useEffect(() => {
        axios.get(`https://assignmenttwelv.vercel.app/approveClass?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`)
            .then(data => setClasses(data.data))
    }, [currentPage, itemsPerPage])

    useEffect(() => {
        axios.get(`https://assignmenttwelv.vercel.app/approveClassNumber`)
            .then(data => setLengthOfApproveClass(data.data.totalApproveClass))
    }, [])

    const totalPage = Math.ceil(lengthOfApproveClass / itemsPerPage)

    const pageNumbers = [...Array(totalPage).keys()]
    const options = [3, 4, 6]
    const handleSelectChange = (event) => {
        setItemsPerPage(event.target.value)
        setCurrentPage(0)
    }
    const nextPage = () => {
        const currentActivePage = totalPage - 1 === currentPage
        const newPage = currentActivePage ? 0 : currentPage + 1
        setCurrentPage(newPage)
    }
    const previousPage = () => {
        const currentActivePage =  currentPage === 0
        const newPage = currentActivePage ?totalPage - 1 :  currentPage - 1
        setCurrentPage(newPage)
    }
    return (
        <div className='pt-20  max-w-[1440px] px-2 md:px-6 lg:px-10 mx-auto mb-20'>
            <Helmet>
                <title>E_Class || classes</title>
            </Helmet>
            {
                classes.length < 1 ? <Loader></Loader> : <>
                    <h2 className='text-2xl uppercase text-center md:text-4xl text-yellow-950 font-bold mt-8 '>Our totall class {lengthOfApproveClass}</h2>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 xl:grid-cols-3 mt-10'>
                        {
                            classes.map((clss, index) => <ClassCard key={index} clss={clss}></ClassCard>)
                        }
                    </div>
                    <div className='flex justify-center items-center gap-4 mt-10'>
                        <button
                            onClick={previousPage}
                            className="bg-gray-200 text-gray-600 mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-gray-100 p-0 text-sm transition duration-300 ease-in-out hover:bg-cyan-500 hover:text-white"
                        >
                            <span className="material-icons text-sm"><HiOutlineArrowSmLeft size={20} /></span>
                        </button>
                        {
                            pageNumbers.map((pageNumber) => <button
                                key={pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                                className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full p-0 text-lg font-medium shadow-md shadow-cyan-500/20 transition duration-150 ease-in-out ${currentPage === pageNumber ? 'bg-cyan-500 text-white' : "bg-gray-200 text-gray-600"}`}
                            >
                                <span className="material-icons text-sm">{pageNumber}</span>
                            </button>
                            )
                        }
                        <button
                            onClick={nextPage}
                            className="bg-gray-200 text-gray-600 mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-gray-100 p-0 text-sm transition duration-300 ease-in-out hover:bg-cyan-500 hover:text-white"
                        >
                            <span className="material-icons text-sm"><HiOutlineArrowSmRight size={20} /></span>
                        </button>
                        <select
                            onChange={handleSelectChange}
                            className=" px-1 sm:px-2 md:px-3 py-1 bg-gray-200 text-gray-600 border-2  focus:outline-gray-400  rounded-md"
                        >
                            {options.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}

                        </select>
                    </div>
                </>
            }
        </div >
    );
};

export default Classes;