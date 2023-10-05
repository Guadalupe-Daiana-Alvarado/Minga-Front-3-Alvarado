import React, { useState } from 'react';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const Donation = () => {
    initMercadoPago('TEST-2410421729848611-092709-ce581bcdbfa708c7e036b26213b0b805-1492812698');
    const [preferenceId, setPreferenceId] = useState(false);
    const [amount, setAmount] = useState(0);
    const [paymentLink, setPaymentLink] = useState('');

    const handleDonation = async (selectedAmount) => {
        try {
            const response = await axios.post('http://localhost:8000/payments/create-order', {
                unit_price: selectedAmount
            });

            const paymentLink = response.data.init_point;
            const preferenceId = response.data.preferenceId;

            setPreferenceId(preferenceId);
            setPaymentLink(paymentLink);
            setAmount(selectedAmount);
        } catch (error) {
            console.error(error);
        }
    };

    const confirmPayment = () => {
        window.location.href = paymentLink;
    };

    return (
        <>
            {preferenceId === false ? (
                <div className='text-white h-screen flex flex-col justify-center items-center bg-hero bg-cover'>
                    <h1 className='text-[2rem] mb-[10%] pr-[2%] font-extrabold'>
                        Contribute to our devs
                    </h1>
                    <div className='flex flex-col sm:flex-row justify-center items-center gap-16'>
                        <div className="flex flex-col rounded-lg bg-rose md:max-w-xl md:flex-row">
                            <div className="flex flex-col justify-center items-center p-6">
                                <h5 className="mb-2 text-xl font-medium text-neutral-800">
                                    AR$1000 Donation
                                </h5>
                                <button className='w-[80%] bg-rose-400 text-white font-bold py-2 px-4 rounded-[2rem]'
                                    onClick={() => handleDonation(1000)}>
                                    Donate
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col rounded-lg bg-rose md:max-w-xl md:flex-row">
                            <div className="flex flex-col justify-center items-center p-6">
                                <h5
                                    className="mb-2 text-xl font-medium text-neutral-800">
                                    AR$5000 Donation
                                </h5>
                                <button className='w-[80%] bg-rose-400 text-white font-bold py-2 px-4 rounded-[2rem]'
                                    onClick={() => handleDonation(5000)}>
                                    Donate
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col rounded-lg bg-rose md:max-w-xl md:flex-row">
                            <div className="flex flex-col justify-center items-center p-6">
                                <h5 className="mb-2 text-xl font-medium text-neutral-800">
                                    AR$10000 Donation
                                </h5>
                                <button className='w-[80%] bg-rose-400 text-white font-bold py-2 px-4 rounded-[2rem]'
                                    onClick={() => handleDonation(10000)}>
                                    Donate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className=" flex flex-col text-black h-screen justify-center items-center bg-hero bg-no-repeat bg-cover">
                    <div className='bg-rose-500 bg-no-repeat bg-cover min-h-[50%] rounded-[2rem] flex flex-col justify-center items-center mx-4'>
                        <div className='flex flex-col items-center'>
                            <p className='text-center font-extrabold text-white text-[2rem] m-4'>
                                Are you sure you want to donate ${amount}?
                            </p>
                            <Wallet initialization={{ preferenceId: preferenceId, redirectMode: 'modal' }} />
                            <button className='transition duration-300 ease-in-out bg-white text-black font-bold py-2 px-4 rounded-[1rem]' onClick={() => setPreferenceId(false)}>Return</button>
                            <button className='transition duration-300 ease-in-out bg-rose-400 text-white font-bold py-2 px-4 rounded-[1rem]' onClick={confirmPayment}>Confirm Payment</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Donation;
