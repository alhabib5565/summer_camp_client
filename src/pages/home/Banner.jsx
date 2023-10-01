
import React, { useState } from 'react';
import { Helmet } from "react-helmet-async";
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi'
const Banner = () => {
    const slideImage = [
        {
            url: "https://i.ibb.co/QrP0Htx/education-banner-2.jpg",
            title: `Education is the best key success in your life`,
            subTitle: 'wellcome to online education'
        },
        {
            url: "https://i.ibb.co/nDVfXnJ/education-banner-3.jpg",
            title: 'Education is the backbone of a nation',
            subTitle: 'wellcome to online organization'
        },
        { 
            url: "https://i.ibb.co/rdw68jp/education-banner-1.jpg",
            title: 'Education is the best key success in your life',
            subTitle: 'wellcome to online education'
         },
    ]

    const [currentImage, setCurrentImage] = useState(0)

    const previousSlideImage = () => {
        const firstSlideImage = currentImage === 0
        const newSlideImage = firstSlideImage ? slideImage.length - 1 : currentImage - 1
        setTimeout(() => {
            setCurrentImage(newSlideImage);
        }, 100);
    }
    const nextSlideImage = () => {
        const lastSlideImage = currentImage === slideImage.length - 1
        const newSlideImage = lastSlideImage ? 0 : currentImage + 1
        setTimeout(() => {
            setCurrentImage(newSlideImage);
        }, 100);
    }

    setTimeout(() => {
        previousSlideImage()
    }, 5000);

    return (
        <div className='w-full  min-h-[calc(100vh-100px)] h-screen relative group pt-20'>
            <Helmet>
                <title>sport camp || home</title>
            </Helmet>
            <div
                className='w-full h-full bg-cover bg-center duration-500'
                style={{ backgroundImage: `url(${slideImage[currentImage].url})` }}>
                <div className='bg-cyan-900 bg-opacity-50 h-full w-full flex items-center justify-center duration-500'>
                    <div className="px-2 my-10 space-y-3 md:space-y-6 text-center max-w-3xl">
                        <h3 className="text-sm md:text-2xl uppercase text-gray-300 font-bold">
                            {slideImage[currentImage].subTitle}
                        </h3>
                        <h2 className="text-2xl text-gray-300 md:text-5xl lg:text-6xl leading-10 font-bold">
                        {slideImage[currentImage].title}
                        </h2>
                        <button className=" border-[3px] border-white  mx-auto hover:bg-yellow-500 text-lg text-gray-100 font-bold py-2 px-6 rounded-full transition duration-300 ">
                            our classes
                        </button>
                    </div>
                </div>

            </div>

            <div onClick={previousSlideImage} className="absolute top-1/2 left-10 group-hover:left-5 hover:bg-yellow-500 duration-500 opacity-0 group-hover:opacity-100 -translate-y-1/ z-10 bg-cyan-950 bg-opacity-70 rounded-full border-2 text-white h-12 w-12 flex justify-center items-center cursor-pointer ">
                <HiOutlineArrowNarrowLeft size={25} />
            </div>
            <div onClick={nextSlideImage} className="absolute top-1/2 right-10 group-hover:right-5 hover:bg-yellow-500 duration-500 opacity-0 group-hover:opacity-100 -translate-y-1/ z-10 bg-cyan-950 bg-opacity-70 rounded-full border-2 text-white h-12 w-12 flex justify-center items-center cursor-pointer">
                <HiOutlineArrowNarrowRight size={25} />
            </div>
        </div>
    );
};

export default Banner;


/* import React, { useRef, useState } from "react";
import { Typewriter } from 'react-simple-typewriter'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import { Helmet } from "react-helmet-async";

export default function Banner() {
    return (
        <>
           <Helmet>
                <title>sport camp || home</title>
            </Helmet>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                <SwiperSlide className="relative">
                    <div>
                        <img className=" w-full" src="https://www.signupgenius.com/cms/images/groups/30-Fun-Summer-Camp-Games-for-Kids-1260x630.png" alt="" />
                    </div>
                    <div className="w-full h-full bg-black bg-opacity-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -4">

                        <div className="space-y-3 md:space-y-6 max-w-7xl mx-auto mt-10 md:mt-20">
                            <h3 className="text-2xl text-white md:text-4xl font-bold">
                                <Typewriter
                                    cursor
                                    cursorColor={'#A020F0'}
                                    cursorBlinking
                                    delaySpeed={1000}
                                    loop={0}
                                    deleteSpeed={25}
                                    typeSpeed={75}
                                    words={[
                                        'Hello World',
                                        'Welcome to',
                                        `Summmer camp School`,
                                    ]}
                                />
                            </h3>
                            <h2 className="text-2xl text-white md:text-4xl font-bold">
                                Discover The <span className="tex-2xl md:text-5xl bg-gradient-to-r from-purple-500 to-red-500 bg-clip-text text-transparent">Hero Within You</span>
                            </h2>
                            <button className="bg-purple-700 mx-auto fixed hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-full transition duration-300  hover:-translate-y-1">
                                enroll now
                            </button>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="relative">
                    <div>
                        <img className=" w-full" src="https://www.signupgenius.com/cms/images/groups/30-Fun-Summer-Camp-Games-for-Kids-1260x630.png" alt="" />
                    </div>
                    <div className="w-full h-full bg-black bg-opacity-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -4">

                        <div className="space-y-3 md:space-y-6 max-w-7xl mx-auto mt-10 md:mt-20">
                            <h3 className="text-2xl text-white md:text-4xl font-bold">
                                <Typewriter
                                    cursor
                                    cursorColor={'#A020F0'}
                                    cursorBlinking
                                    delaySpeed={1000}
                                    loop={0}
                                    deleteSpeed={25}
                                    typeSpeed={75}
                                    words={[
                                        'Hello World',
                                        'Welcome to',
                                        `Summmer camp School`,
                                    ]}
                                />
                            </h3>
                            <h2 className="text-2xl text-white md:text-4xl font-bold">
                                Discover The <span className="tex-2xl md:text-5xl bg-gradient-to-r from-purple-500 to-red-500 bg-clip-text text-transparent">Hero Within You</span>
                            </h2>
                            <button className="my-button">
                                enroll now
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
 */