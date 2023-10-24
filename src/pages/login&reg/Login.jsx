import { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../components/GoogleLogin';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import LoadingButton from '../../components/LoadingButton';
const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    let from = location.state?.from?.pathname || "/";
    const { loginUser } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false)
    const onSubmit = data => {
        setLoading(true)
        loginUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Login Your Accout Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(from, { replace: true } || '/')
                setLoading(false)
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
        console.log(data)
    };


    return (
        <div className="min-h-screen h-full w-full pt-20 flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>
                    E_Class || login
                </title>
            </Helmet>
            <div className="relative mt-10 flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-cyan-700 to-cyan-500 bg-clip-border text-white shadow-lg shadow-cyan-500/40">
                    <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
                        Login
                    </h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4 p-6">
                        <div className="relative h-11 w-full min-w-[200px]">
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
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input
                                type='password'
                                {...register("password", { required: true})}
                                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                                />
                            <label
                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Password
                            </label>
                          
                        </div>
                    </div>
                    <div className="p-6 pt-0">
                        {
                            loading ? <LoadingButton></LoadingButton> : <button
                            className="block w-full mb-6 select-none rounded-lg bg-gradient-to-tr from-cyan-700 to-cyan-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="submit"
                            >
                                Login
                            </button>
                        }
                        <GoogleLogin></GoogleLogin>
                        <Link to='/register' className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
                            Do not have an account?
                            <span
                                className="ml-1 block font-sans text-sm font-bold leading-normal text-cyan-500 antialiased"
                                >
                                Sign up
                            </span>
                        </Link>
                    </div>
                </form>
            </div>

        </div>
    );
};

{/* <div className="max-w-md w-full space-y-8">
    <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r 
        from-purple-500 to-red-500 bg-clip-text text-transparent">Sign in to your account</h2>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="rounded-md shadow-sm -space-y-px">
            <div>
                <label htmlFor="email-address">Email address</label>
                <input name="email" type="email" {...register("email", { required: true })} className="my-input " placeholder="Email address" />

                {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}
            </div>
            <div>
                <label htmlFor="password" >Password</label>
                <input id="password" name="password" type="password" {...register("password", { required: true, minLength: 6})} className="my-input" placeholder="Password" />

                {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                {errors.password?.type === 'minLength' && <p className='text-red-500'>Password length must be 6 </p>}

            </div>
        </div>

        <div className="flex items-center justify-between">
            <div className="flex items-center">
               
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                   New to this website <Link className='text-purple-500 text-[17px] font-medium hover:text-purple-600 hover:underline' to='/register'>register</Link>
                </label>
            </div>

            <div className="text-sm">
                <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                    Forgot your password?
                </a>
            </div>
        </div>

        <div>
        <input type="submit" className="my-signInBtn cursor-pointer" value='login'/>
           
        </div>

        <div>
          <GoogleLogin></GoogleLogin>
        </div>
    </form>
</div> */}
export default Login;