import React, { useState } from 'react';
import ShareModal from '../../components/ShareModal';
import axios from 'axios';
import { toast } from 'react-toastify';

const DenyFeedback = ({ denyFeedbackModalOpen, setDenyFeedbackModalOpen, id }) => {
    const [loading, setLoading] = useState(false)
    const [feedbackValue, setFeedbackValue] = useState('')
    const submitFeedback = () => {
        fetch(`${import.meta.env.VITE_API_URL}/class/feedback/${id}`, {
            method: 'PATCH',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({ feedback: feedbackValue })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success(`send feedback successfull`)
                    setDenyFeedbackModalOpen(false)
                }
                console.log(data)
            })
    }

    return (
        <ShareModal isOpen={denyFeedbackModalOpen} setIsOpen={setDenyFeedbackModalOpen} title='Have a suggestion?'>
            <div className="w-full">
                <label
                    htmlFor="description"
                    className="block mb-1 font-medium text-gray-600"
                >
                    Please provided your valueble feedback
                </label>
                <textarea
                    id="description"
                    onChange={(event) => setFeedbackValue(event.target.value)}
                    className=" w-full h-32  px-1 sm:px-2 md:px-3 py-1 bg-white text-gray-800 border-2  focus:outline-cyan-600  rounded-md"
                    placeholder="Write now..."
                ></textarea>
                {
                    loading ? <p
                        className="w-full p-3 mt-5 text-center font-medium text-gray-400 transition duration-200 rounded shadow-md bg-gray-200 cursor-not-allowed"
                    >
                        <TbFidgetSpinner className="m-auto animate-spin" size={24} />
                    </p>
                        : <button
                            onClick={submitFeedback}
                            className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-cyan-500"
                        >
                            Send feedback
                        </button>
                }
            </div>
        </ShareModal>
    );
};

export default DenyFeedback;