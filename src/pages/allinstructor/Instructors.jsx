import { useQuery } from '@tanstack/react-query';
import React from 'react';
import InstructorCard from './InstructorCard';

const Instructors = () => {
    const { data: instructors = [], refetch, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch('https://assignmenttwelv.vercel.app/instructor')
            return res.json()
        }
    })
    return (
        <div className='max-w-[1440px]  px-2 md-px-6 lg:px-10 mx-auto pt-20 '>
            <h2 className='mt-14 mb-8 text-2xl md:text-4xl text-purple-950 font-bold'>Our total instructor : <span>{instructors?.length}</span></h2>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                {
                    instructors.map((instructor, index) => <InstructorCard instructor={instructor} key={index}></InstructorCard>)
                }
            </div>
        </div>
    );
};

export default Instructors;