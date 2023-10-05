import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const NoData = ({title, subTitle, link, linkName}) => {
    return (
        <div className='text-center'>
            <h2 className='text-2xl md:text-4xl font-bold '>{title}</h2>
            <p className='py-3 text-lg'>{subTitle}</p>
            <Link  className='group flex items-center gap-2 justify-center text-gray-200 px-2 py-1 font-medium bg-cyan-600 duration-300 rounded' to={link}>{linkName} <BsArrowRight size={20} className='group-hover:translate-x-2 duration-300' /></Link>
        </div>
    );
};

export default NoData;