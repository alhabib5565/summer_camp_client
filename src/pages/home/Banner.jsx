
import { useState } from 'react';
import { Helmet } from "react-helmet-async";
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom';
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

    // setTimeout(() => {
    //     previousSlideImage()
    // }, 5000);

    return (
        <div className='w-full  min-h-[calc(100vh-100px)] h-screen relative group pt-20'>
            <Helmet>
                <title>E_Class || Home - page</title>
            </Helmet>
            <div
                className='w-full h-full bg-cover bg-center duration-500'
                style={{ backgroundImage: `url(${slideImage[currentImage].url})` }}>
                <div className='bg-cyan-900 bg-opacity-50 h-full w-full flex items-center justify-center duration-500'>
                    <div className="px-2 my-10 space-y-3 md:space-y-6 text-center max-w-3xl">
                        <h3 className="text-sm md:text-2xl uppercase text-gray-100 font-bold">
                            {slideImage[currentImage].subTitle}
                        </h3>
                        <h2 className="text-2xl text-gray-100 md:text-5xl lg:text-6xl leading-10 font-bold">
                            {slideImage[currentImage].title}
                        </h2>
                        <p>
                            <Link to='/allClass' className=" border-[3px] border-white  mx-auto hover:bg-cyan-500 text-lg text-gray-100 font-bold py-2 px-6 rounded-full transition duration-300 ">
                                our classes
                            </Link>
                        </p>
                    </div>
                </div>

            </div>

            <div onClick={previousSlideImage} className="absolute top-1/2 left-10 group-hover:left-5 hover:bg-cyan-500 duration-500 opacity-0 group-hover:opacity-100 -translate-y-1/ z-10 bg-cyan-950 bg-opacity-70 rounded-full border-2 text-white h-12 w-12 flex justify-center items-center cursor-pointer ">
                <HiOutlineArrowNarrowLeft size={25} />
            </div>
            <div onClick={nextSlideImage} className="absolute top-1/2 right-10 group-hover:right-5 hover:bg-cyan-500 duration-500 opacity-0 group-hover:opacity-100 -translate-y-1/ z-10 bg-cyan-950 bg-opacity-70 rounded-full border-2 text-white h-12 w-12 flex justify-center items-center cursor-pointer">
                <HiOutlineArrowNarrowRight size={25} />
            </div>
        </div>
    );
};

export default Banner;