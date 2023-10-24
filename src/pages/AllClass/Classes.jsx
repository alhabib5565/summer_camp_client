import axios from 'axios';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ClassCard from './ClassCard';
import Loader from '../../components/Loader';
import { HiOutlineArrowSmRight, HiOutlineArrowSmLeft } from 'react-icons/hi'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const Classes = () => {
    const [classes, setClasses] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(0)
    const [lengthOfApproveClass, setLengthOfApproveClass] = useState(0)
    const [searchText, setSearchText] = useState('')
    const inputRef = useRef(null);
    const getInputValue = () => {
        const value = inputRef.current.value;
        console.log('Input Value:', value);
        setSearchText(value)
    };
console.log(searchText)
    const [categories, setCategories] = useState(["All Category"])
    // console.log(categories)
    useEffect(() => {
        axios.get(`http://localhost:5000/allCategory`)
            .then(data => setCategories(data.data))
    }, [])
    const [selected, setSelected] = useState(categories[0])

    useEffect(() => {
        // axios.get(`https://assignmenttwelv.vercel.app/approveClass?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&category=${selected}`)
        axios.get(`http://localhost:5000/approveClass?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&category=${selected}`)
            .then(data => setClasses(data.data))
    }, [currentPage, itemsPerPage, selected])

    useEffect(() => {
        axios.get(`https://assignmenttwelv.vercel.app/approveClassNumber`)
            .then(data => setLengthOfApproveClass(data.data.totalApproveClass))
    }, [])

    // pagination
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
        const currentActivePage = currentPage === 0
        const newPage = currentActivePage ? totalPage - 1 : currentPage - 1
        setCurrentPage(newPage)
    }

    return (
        <div className='pt-20  max-w-[1440px] px-2 md:px-6 lg:px-10 mx-auto mb-20'>
            <Helmet>
                <title>E_Class || classes</title>
            </Helmet>

            {
                classes.length < 1 ? <Loader></Loader> : <>
                    <h2 className='text-2xl uppercase text-center md:text-4xl text-yellow-950 font-bold my-8 '>Our totall class {lengthOfApproveClass}</h2>

                    <div className='px-2 hover:shadow-md duration-300 border-gray-300 rounded-md border-2 md:px-6 py-3 w-full flex justify-between items-center bg-gray-100'>

                        <div className="z-10 w-72">
                            <Listbox value={selected} onChange={setSelected}>
                                <div className="relative">
                                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-cyan-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-cyan-300 sm:text-sm">
                                        <span className="block truncate">{selected}</span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </Listbox.Button>
                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {categories.map((category, categoryIdx) => (
                                                <Listbox.Option
                                                    key={categoryIdx}
                                                    className={`relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 hover:bg-cyan-100 hover:text-cyan-900 ${selected === category && 'bg-cyan-100'}`}
                                                    value={category}
                                                >
                                                    <>
                                                        <span
                                                            className='block truncate font-normal'
                                                        >
                                                            {category}
                                                        </span>
                                                        {selected === category ? (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-600">
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </Listbox>
                        </div>
                        <div className=" relative mx-auto text-gray-600">
                            <input
                                ref={inputRef}
                                className="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none"
                                type="search"
                                name="search"
                                placeholder="Search"
                            />
                            <button onClick={getInputValue} type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 mr-4">
                                <svg
                                    className="text-gray-600 h-4 w-4 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    version="1.1"
                                    id="Capa_1"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 56.966 56.966"
                                    style={{ enableBackground: 'new 0 0 56.966 56.966' }}
                                    xmlSpace="preserve"
                                    width="512px"
                                    height="512px"
                                >
                                    <path
                                        d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 xl:grid-cols-3 mt-10'>
                        {
                            classes.map((clss, index) => <ClassCard key={index} clss={clss}></ClassCard>)
                        }
                    </div>
                    {
                        selected === 'All Category' && <div className='flex justify-center items-center gap-4 mt-10'>
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
                    }
                </>
            }
        </div >
    );
};

export default Classes;