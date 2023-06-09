import React, { useRef, useState } from "react";
import { Typewriter } from 'react-simple-typewriter'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

export default function Banner() {
    return (
        <>
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
