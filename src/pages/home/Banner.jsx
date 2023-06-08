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
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">

                        <div className="space-y-6">
                            <h3 className="text-2xl text-white md:text-4xl font-bold">
                                <Typewriter
                                    cursor
                                    cursorColor={'#A020F0'}
                                    cursorBlinking
                                    delaySpeed={1000}
                                    deleteSpeed={25}

                                    typeSpeed={75}
                                    words={[
                                        'Welcome to',
                                        `Summmer camp Schoole`,
                                        `Discover The Hero 
                                        Within You`,
                                    ]}
                                />
                            </h3>
                            <button class="bg-purple-700 mx-auto fixed hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-full transition duration-300  hover:-translate-y-1">
                                enroll now
                            </button>
                        </div>
                    </div>

                </SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
        </>
    );
}
