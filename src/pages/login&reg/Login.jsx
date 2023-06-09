import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../components/GoogleLogin';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    let from = location.state?.from?.pathname || "/";
    const {loginUser} = useContext(AuthContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
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
              navigate(from, {replace: true})
        })
        .catch(error => {
            console.log(error)
            Swal.fire({
                title: 'Error!',
                text: `${error?.message}`,
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        })
    };


    return (
        <div className="min-h-[calc(100vh-68px)] flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
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
                    <input type="submit" className="my-signInBtn" value='login'/>
                       
                    </div>

                    <div>
                      <GoogleLogin></GoogleLogin>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;