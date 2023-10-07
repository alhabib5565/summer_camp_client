import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ClassCard from '../AllClass/ClassCard';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

const PopularClass = () => {
    const [popularClasses, setPopularClasses] = useState([])
    useEffect(() => {
        fetch('https://assignmenttwelv.vercel.app/popularCls')
            .then(res => res.json())
            .then(data => setPopularClasses(data))
    }, [])

    return (
        <div className='w-full min-h-screen h-full bg-[#F6F7FA] py-10 md:py-16 mt-10 md:mt-20'>
            <div className=' max-w-[1440px]  px-2 md-px-6 lg:px-10 mx-auto '>
                <div className='max-w-lg mx-auto text-center mb-10'>
                    <h2 className='leading-10 text-2xl mx-auto md:text-4xl mb-3 w-fit text-[#0B1C39] font-bold'>Explore Our <br />Popular Classes</h2>
                    <p className='text-lg leading-8 text-[#626a77]'>Jeffrey crikey victoria sponge mush spiffing super arse over tit matie boy smashing. The little rotter off his nut codswallop.!</p>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 xl:grid-cols-3 mt-10'>
                    {
                        popularClasses.slice(0, 6).map((popularCls, index) => <ClassCard key={index} clss={popularCls}></ClassCard>)
                    }
                </div>
                <p className='mt-8 w-fit mx-auto'>
                    <Link className='group flex items-center gap-2 justify-center text-gray-200 px-3 py-2 font-medium bg-cyan-600 duration-300 rounded' to='/allClass'>Show more class <BsArrowRight size={20} className='group-hover:translate-x-2 duration-300' /></Link>
                </p>
            </div>
        </div>
    );
};

export default PopularClass;