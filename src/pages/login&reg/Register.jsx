import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
// toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import GoogleLogin from '../../components/GoogleLogin';
import { Helmet } from 'react-helmet-async';
import LoadingButton from '../../components/LoadingButton';
import { CgProfile } from 'react-icons/cg'
import { imageUpload } from '../../utils/utils';
const Register = () => {
    const navigate = useNavigate()
    const { userCreate, profileUpdate, logoutUser } = useContext(AuthContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')

    const onSubmit = data => {
        console.log(data)
        const password = data.password
        if (!imageUrl) {
            return toast.error("Please add image", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        setLoading(true)
        userCreate(data?.email, password)
            .then(result => {
                console.log(result.user)

                profileUpdate(data.name, data.photo)
                    .then(() => {
                        // console.log(result.user)
                        const savaUserData = { name: data.name, email: data.email, photo: imageUrl, role: 'student', whenYouRegister: new Date() }
                        fetch('https://assignmenttwelv.vercel.app/createUser', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(savaUserData)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data)
                                if (data.insertedId) {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Create Your Accout Successfully',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }
                                logoutUser()
                                setLoading(false)
                                navigate('/login')
                            })
                    })
                    .catch(error => {
                        console.log(error)
                        setLoading(false)
                    })
            })
            .catch(error => {
                console.log(error)
                Swal.fire({
                    title: 'Error!',
                    text: `${error?.message}`,
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
                setLoading(false)
            })
    };

    const handleImageUpload = (image) => {
        imageUpload(image)
            .then(data => {
                setImageUrl(data.display_url)
            })
    }

    const handleImageDrag = (e) => {
        e.preventDefault()
    }

    const handleImageDrop = (e) => {
        e.preventDefault()
        const image = e.dataTransfer.files[0];
        handleImageUpload(image)
    }

    return (
        <div className="min-h-screen h-full flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <ToastContainer />
            <Helmet>
                <title>E_Class || register</title>
            </Helmet>
            {/* <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r 
                    from-purple-500 to-red-500 bg-clip-text text-transparent">Create your account</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address">Name</label>
                            <input name="name" type="text" {...register("name")} className="my-input " placeholder="Your name" />
                        </div>

                        <div>
                            <label htmlFor="email-address">Photo URL</label>
                            <input name="email" type="text" {...register("photo")} className="my-input " placeholder="photo URL" />
                        </div>
                        <div>
                            <label htmlFor="email-address">Email address</label>
                            <input name="email" type="email" {...register("email", { required: true })} className="my-input " placeholder="Email address" />

                            {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}
                        </div>

                        <div>
                            <label htmlFor="password" >Password</label>
                            <input id="password" name="password" type="password" {...register("password", { required: true, minLength: 6 })} className="my-input" placeholder="Password" />

                            {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className='text-red-500'>Password length must be 6 </p>}

                        </div>

                        <div>
                            <label htmlFor="password" >Confirm Password</label>
                            <input name="password" type="password" {...register("ConfimPass", { required: true, minLength: 6 })} className="my-input" placeholder="Confirm Password" />

                            {errors.ConfimPass?.type === 'required' && <p className='text-red-500'>Confirm Password is required</p>}
                            {errors.ConfimPass?.type === 'minLength' && <p className='text-red-500'>Confirm Password length must be 6 </p>}
                        </div>
                    </div>

                    <div>
                        <label className="ml-2 text-sm text-gray-900">
                            New to this website <Link className='text-purple-500 text-[17px] font-medium hover:text-purple-600 hover:underline' to='/login'>login</Link>
                        </label>
                    </div>

                    <div>
                        <input type="submit" className="my-signInBtn" value='Register' />
                    </div>

                    <div>
                        <GoogleLogin></GoogleLogin>
                    </div>
                </form>
            </div> */}
            <div className="max-w-lg w-full relative mt-20 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-cyan-700 to-cyan-500 bg-clip-border text-white shadow-lg shadow-cyan-500/40">
                    <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
                        Register
                    </h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4 p-6">
                        <div className="relative h-11 w-full min-w-[200px]  ">
                            <input
                                {...register("email", { required: true })}
                                type='email'
                                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                            <label
                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Email
                            </label>
                            {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}
                        </div>
                        <div className="relative h-11 w-full min-w-[200px]  ">
                            <input
                                {...register("name", { required: true })}
                                type='text'
                                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                            <label
                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Name
                            </label>
                        </div>
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input
                                type='password'
                                {...register("password", { required: true, minLength: 6 })}
                                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                            <label
                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Password
                            </label>
                            {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className='text-red-500'>Password length must be 6 </p>}
                        </div>

                        <div
                            onDragOver={handleImageDrag}
                            onDrop={handleImageDrop}
                            className="flex items-center justify-center w-full mb-4">
                            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded cursor-pointer bg-[#F3F7F9]  hover:bg-gray-100">
                                {
                                    imageUrl ? <img className='w-full h-full p-3 rounded' src={imageUrl} alt="" /> : <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <span className='text-gray-500 dark:text-gray-400'><CgProfile size={40} /></span>
                                        <p className=" text-sm text-gray-500 ">Your Photo</p>
                                        <p className="mb-2 text-sm text-gray-500 "><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    </div>
                                }
                                <input onChange={(e) => handleImageUpload(e.target.files[0])} type="file" accept="image/*" className="hidden" />
                            </label>
                        </div>
                    </div>
                    <div className="p-6 pt-0">
                        {
                            loading ? <LoadingButton></LoadingButton> : <button
                                className="block w-full mb-6 select-none rounded-lg bg-gradient-to-tr from-cyan-700 to-cyan-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="submit"
                            >
                                Register
                            </button>
                        }
                        <GoogleLogin></GoogleLogin>
                        <Link to='/login' className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
                            Already have an account?
                            <span
                                className="ml-1 block font-sans text-sm font-bold leading-normal text-cyan-500 antialiased"
                            >
                                Log in
                            </span>
                        </Link>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Register;