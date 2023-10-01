import React from 'react';

const Card = ({}) => {
    return (
        <div key={clas._id} className={`${clas.sets < 1 ? "bg-red-400" : 'bg-base-100 border-purple-200 hover:-translate-y-2 duration-300 hover:bg-purple-100'} card max-w-md w-full mx-auto shadow-xl border-2 `}>
            <figure className="p-7">
                <img src={clas?.photo} className="rounded-xl w-full h-[210px]" />
            </figure>
            <div className="card-body m-0">
                <h2 className=" uppercase text-lg font-medium text-gray-700">NAME: <span className='text-purple-700'>{clas.className}</span></h2>
                <p>email: {clas.email}</p>
                <p>Instructor Name: {clas.instructorName}</p>
                <div className='flex justify-between'>
                    <p>Price: {clas.price}</p>
                    <p>Sets: {clas.sets}</p>
                </div>
                <button disabled={clas.sets < 1} onClick={() => handleSeletClass(clas)} className='my-signInBtn'>Select</button>
            </div>
        </div>
    );
};

export default Card;