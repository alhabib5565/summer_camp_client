import { Dialog, Transition } from '@headlessui/react'
import { loadStripe } from '@stripe/stripe-js';
import { Fragment } from 'react'
import CheckoutForm from './CheckOutForm'
import { Elements } from '@stripe/react-stripe-js';
// console.log(import.meta.env.VITE_Payment_gatweye_pk)
const stripePromise = loadStripe(`pk_test_51NUntjKaFaH6hCmewMemcyG2xE3D9K6N3ggBMjDG4aYqCRyu6h2EdMvQZ9GGNuI50E96X60CaEIxGIaiCY0doD6M00zddweWfP`);

const PaymentModal = ({ isOpen, classData, closeModal, handleDelete}) => {
    return (

        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Payment successful
                                    </Dialog.Title>
                                    <Elements stripe={stripePromise}>
                                        <CheckoutForm
                                            classData={classData}
                                            closeModal={closeModal}
                                            handleDelete={handleDelete}
                                        ></CheckoutForm>
                                    </Elements>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default PaymentModal;
