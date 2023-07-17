import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Instructors = () => {
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/instructor')
            return res.json()
        }
    })
    return (
        <div className='mx-auto max-w-7xl p-4'>
            <h2 className='text-2xl md:text-4xl text-purple-950 font-bold'>Our all <span className='text-purple-400'>Instructor </span>: <span>{users?.length}</span></h2>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 mt-10'>
                {
                    users.map(user => <div key={user._id} className="card max-w-md w-full mx-auto bg-base-100 shadow-xl border-2 border-purple-200 hover:-translate-y-2 duration-300 hover:bg-purple-100">
                        <figure className="p-7">
                            <img src={user?.photo} className="rounded-xl" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-gray-700">NAME: {user.name}</h2>
                            <p>email: {user.email}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Instructors;