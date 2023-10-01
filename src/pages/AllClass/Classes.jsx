import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';

const Classes = () => {
    const [classes, setClasses] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useContext(AuthContext)
    console.log(classes)
    useEffect(() => {
        axios.get('http://localhost:5000/approveClass')
            .then(data => setClasses(data.data))
    }, [])
    const handleSeletClass = clas => {
        console.log(clas);
        if (user && user.email) {
            const { className, price, photo, _id, instructorName} = clas
            const selectClass = { classId: _id, className, photo,instructorName, price,  email: user.email }
            fetch('http://localhost:5000/select', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(selectClass)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.insertedId) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Add to bookmark',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please login to select a class',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }
    return (
        <div className='pt-20  max-w-[1440px] px-3 md-px-6 lg:px-10 mx-auto'>
            <Helmet>
                <title>sport camp || classes</title>
            </Helmet>
            <h2 className='text-2xl uppercase text-center md:text-4xl text-yellow-950 font-bold mt-8 md:mt-16 lg:mt-24'>Our totall class {classes?.length}</h2>

            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 mt-10'>
                {
                    classes.map(clas => <div key={clas._id} className={`${clas.sets < 1 ? "bg-red-400": 'bg-base-100 border-gray-200 hover:-translate-y-2 duration-300 hover:bg-yellow-50'} card max-w-md w-full mx-auto shadow-xl border-2 `}>
                        <figure className="p-7">
                            <img src={clas?.photo} className="rounded-xl w-full h-[210px]" />
                        </figure>
                        <div className="card-body m-0">
                            <h2 className=" uppercase text-lg font-medium text-gray-700">Name:{clas.className}</h2>
                            <p>email: {clas.email}</p>
                            <p>Instructor Name: {clas.instructorName}</p>
                            <div className='flex justify-between'>
                                <p>Price: {clas.price}</p>
                                <p>Sets: {clas.sets}</p>
                            </div>
                            <button disabled={clas.sets < 1} onClick={() => handleSeletClass(clas)} className='my-signInBtn'>Select</button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Classes;