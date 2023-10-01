import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const PopularClass = () => {
    const [popularClasses, setPopularClasses] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/popularCls')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setPopularClasses(data)
            })
    }, [])

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 1024 },
            items: 4,
            slidesToSlide: 3
        },
        desktop: {
            breakpoint: { max: 1025, min: 768 },
            items: 3,
            slidesToSlide: 2
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 2,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };

    return (
        <div className='mt-8 md:mt-16 lg:mt-20 max-w-[1440px] px-3 md-px-6 lg:px-10 mx-auto '>
            <h2 className='text-2xl border-b-4 border-gray-400  mx-auto md:text-5xl mb-8 pb-3 w-fit text-gray-600 font-bold'>Our Popular Class</h2>

            <Carousel responsive={responsive} className=''>
                {
                    popularClasses.slice(0, 6).map(popularCls => <div key={popularCls._id} className='flex'>
                        <div className={`${popularCls.sets < 1 ? "bg-red-400" : 'bg-base-100 border-gray-200 '} card max-w-md w-full h-[400px] mr-4  border-2 `}>
                            <figure>
                                <img src={popularCls?.photo} className="rounded-t-lg w-full h-[200px]" />
                            </figure>
                            <div className="card-body m-0">
                                <h2 className=" uppercase text-lg font-medium text-gray-700">{popularCls.className}</h2>
                                <p>email: {popularCls.email}</p>
                                <p>Instructor Name: {popularCls.instructorName}</p>
                            </div>
                        </div>
                    </div>)
                }
            </Carousel>
        </div>
    );
};

export default PopularClass;