import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateClass = () => {
    const navigate = useNavigate()
    // const id = params.
    const {id} = useParams()
    const {user} = useContext(AuthContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit =(data) =>{
        console.log(data)
        const {className, photo, price, sets} = data
        const updateClas = {className, photo, price, sets}

        fetch(`http://localhost:5000/updateClas/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateClas)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount > 0){
                Swal.fire(
                    'Deleted!',
                    ' deleted a Class.',
                    'success'
                  )
                  navigate('/dashboard/myClass')
            }
        })
    }
    return (
        <div className='max-w-3xl mx-auto p-4 lg-p-0'>
            <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="clasName" className="block text-purple-900 font-bold mb-2">
                        Class Name
                    </label>
                    <input
                        type="text"
                        {...register('className', { required: true })} placeholder='class name'
                        className="border border-purple-400 px-3 py-2 w-full rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="photoURL" className="block text-purple-900 font-bold mb-2">
                        Class Photo
                    </label>
                    <input
                        type="url"
                        {...register('photo')} placeholder='class image'
                        className="border border-purple-400 px-3 py-2 w-full rounded-md"
                    />
                </div>

                <div className='flex flex-col md:flex-row gap-3'>
                    <div className='w-full'>
                        <label htmlFor="price" className="block text-purple-900 font-bold mb-2">
                            Price
                        </label>
                        <input
                            type="number"
                            {...register('price')} placeholder='price'
                            className="border border-purple-400 px-3 py-2 w-full rounded-md"
                        />
                    </div>

                    <div className='w-full'>
                        <label htmlFor="sets" className="block text-purple-900 font-bold mb-2">
                            Available Sets
                        </label>
                        <input
                            type="number"
                            {...register('sets')} placeholder='sets'
                            className="border border-purple-400 px-3 py-2 w-full rounded-md"
                        />
                    </div>
                </div>

                <div className='flex flex-col md:flex-row gap-3'>
                    <div className='w-full'>
                        <label htmlFor="email" className="block text-purple-900 font-bold mb-2">
                            email
                        </label>
                        <input
                            defaultValue={user?.email}
                            type="email"
                            {...register('email')}
                            className="border border-purple-400 px-3 py-2 w-full rounded-md"
                        />
                    </div>

                    <div className='w-full'>
                        <label htmlFor="name" className="block text-purple-900 font-bold mb-2">
                            Instructor Name
                        </label>
                        <input
                            defaultValue={user?.displayName}
                            type="text"
                            {...register('instructorName')}
                            className="border border-purple-400 px-3 py-2 w-full rounded-md"
                        />
                    </div>
                </div>

                {/* Add more form fields here */}
                <input type="submit" className='my-signInBtn' value='Add A Class' />
            </form>
        </div>
    );
};

export default UpdateClass;