import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Register = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleRegister = async () => {

        if (!phoneNumber || !otp) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter both phone number and OTP.',
            });
            return;
        }

        try {
            const response = await fetch('https://sms-br8w.onrender.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, otp }),
            });

            console.log(response);

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'User registered successfully.',
                }).then((result) => {
                    if (result.isConfirmed) {
                        setPhoneNumber('');
                        setOtp('');
                    }
                });
            } else {
                // const data = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error registering user',
                });
            }
        } catch (error) {
            console.error('Error registering user:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error registering user',
            });
        }
    };

    return (
        <div className="bg-gray-100 mt-4 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4 font-montserrat">User Registration</h2>
                <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring focus:border-blue-500"
                />
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleOtpChange}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring focus:border-blue-500"
                />
                <button
                    onClick={handleRegister}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Register;
