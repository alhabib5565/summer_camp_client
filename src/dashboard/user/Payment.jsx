import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../components/CheckOutForm';
import { Elements} from '@stripe/react-stripe-js';

const Payment = () => {
    const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
    return (
        <div>
            <Elements  stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;