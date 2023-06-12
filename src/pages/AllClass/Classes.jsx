import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const Classes = () => {
    const [classes, setClasses] = useState([])
    useEffect(() => {
        axios.get('https://12-assignment-server.vercel.app/allClass')
            .then(data => setClasses(data.data))
    }, [])
    return (
        <div className='mt-8 md:mt-16 lg:mt-24 p-4 max-w-7xl mx-auto'>
               <Helmet>
                <title>sport camp || classes</title>
            </Helmet>
            <h2 className='text-2xl md:text-4xl text-purple-950 font-bold'>Our all <span className='text-purple-400'>Approve </span> Class: <span>{classes?.length}</span></h2>

            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 mt-10'>
                {
                    classes.map(clas => <div key={clas._id} className="card max-w-md w-full mx-auto bg-base-100 shadow-xl border-2 border-purple-200 hover:-translate-y-2 duration-300 hover:bg-purple-100">
                        <figure className="p-7">
                            <img src={clas?.photo} className="rounded-xl w-full h-[210px]" />
                        </figure>
                        <div className="card-body m-0">
                            <h2 className=" uppercase text-lg font-medium text-gray-700">NAME: <span className='text-purple-700'>{clas.className}</span></h2>
                            <p>email: {clas.email}</p>
                            <div className='flex justify-between'>
                                <p>Price: {clas.price}</p>
                                <p>Sets: {clas.sets}</p>
                            </div>
                            <button className='my-signInBtn'>Select</button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Classes;