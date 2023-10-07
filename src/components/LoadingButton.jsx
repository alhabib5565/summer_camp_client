import React from 'react';
import { ImSpinner9 } from 'react-icons/im'

const LoadingButton = () => {
    return (
        <div>
            <button
                disabled={true}
                className="block w-full mb-6 select-none rounded-lg cursor-not-allowed bg-gray-200 py-3 px-6 text-center align-middle font-bold text-gray-600 shadow-md transition-all opacity-50"
                type="submit"
            >
                <ImSpinner9 className='animate-spin mx-auto'/>
            </button>
        </div>
    );
};

export default LoadingButton;