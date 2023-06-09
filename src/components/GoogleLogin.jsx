import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const GoogleLogin = () => {
    const { googleLogin } = useContext(AuthContext)
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result.user)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Login With Google ',
                    showConfirmButton: false,
                    timer: 1500
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
            })
    };
    return (
        <button onClick={handleGoogleLogin} type="button" className="my-googleBtn">
            <FaGoogle></FaGoogle> Sign in with Google
        </button>
    );
};

export default GoogleLogin;