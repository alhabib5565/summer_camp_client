import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './checkOutForm.css'
import { AuthContext } from '../provider/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';
import { ImSpinner9 } from 'react-icons/im'
import useSelectClass from '../hooks/useSelectClass';

const CheckoutForm = ({ closeModal, classData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [, refetch] = useSelectClass()
    const [processing, setProcessing] = useState(false)
    const [axiosSecure] = useAxiosSecure()
    const [err, setErr] = useState('')
    const [paymentSecret, setPaymentSecret] = useState('')
    const { user } = useContext(AuthContext)

    useEffect(() => {
        const price = classData?.price
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    // console.log(res.data.clientSecret)
                    setPaymentSecret(res.data.clientSecret)
                })
        }
    }, [])
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        setErr('')
        if (error) {
            console.log('[error]', error);
            setErr(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
        setProcessing(true)
        const { paymentIntent, error: cardPaymentError } = await stripe.confirmCardPayment(
            paymentSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'unknown',
                        email: user.email || 'anonymous'
                    },
                },
            },
        );
        if (cardPaymentError) {
            console.log('[error]', error);
            setErr(error.message)
        }
        console.log(paymentIntent)
        if (paymentIntent?.status === 'succeeded') {

            const enrollClssInfo = {
                ...classData,
                transeactionId: paymentIntent.id,
                date: new Date(),
                studentName: user?.displayName,
                studentEmail: user?.email
            }
            axiosSecure.post('/enrolled', enrollClssInfo)
                .then(res => {
                    setProcessing(false)
                    console.log(res.data)
                    if (res.data.insertedId) {
                        axiosSecure.delete(`/select/delete/${classData._id}`)
                            .then(res => {
                                toast.success('enrolled successfull')
                                refetch()
                            })

                        axiosSecure.patch(`/reduceSets/${classData.classId}`)
                            .then(res => console.log(res))
                    }
                    closeModal()
                })
                .catch(error => {
                    closeModal()
                    setProcessing(false)
                    console.log(error)
                })
        }
    };

    return (
        <>
            <ToastContainer></ToastContainer>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className='flex mt-2 justify-around'>
                    <button
                        type='button'
                        className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        disabled={!stripe || !paymentSecret || processing}
                        className='inline-flex justify-center rounded-md border border-transparent bg-cyan-100 px-4 py-2 text-sm font-medium text-cyan-900 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2'
                    >
                        {processing ? (
                            <ImSpinner9 className='m-auto animate-spin' size={24} />
                        ) : (
                            `Pay ${classData?.price}$`
                        )}
                    </button>
                </div>
                {
                    err && <p className='text-red-500'>{err}</p>
                }
            </form>
        </>
    );
};

export default CheckoutForm;
