import React, { useState } from 'react';
import Swal from 'sweetalert2';

const GenerateOTP = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpGenerated, setOtpGenerated] = useState(false);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleGenerateOTP = async () => {

    if (!phoneNumber) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please enter a valid phone number.',
        });
        return;
      }

    try {
      const response = await fetch('http://localhost:7700/generateOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phoneNumber}),
      });

      if(response.ok){
        setOtpGenerated(true);
        Swal.fire({
            icon: 'success',
            title: 'OTP Sent',
            text: 'OTP has been sent successfully.',
          });
      } 
      else{
        // const data = await response.json();
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error generating OTP',
          });
      }
    } 
    catch(error){
      console.error('Error generating OTP:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error generating OTP',
      });
    }
  };

  return (
    <>
    <h1 className="mt-8 text-2xl font-semibold flex mb-4 font-montserrat items-center justify-center">Return Journey Assignment</h1>
    <div className="bg-gray-100 mt-8 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 font-montserrat">Generate OTP</h2>
        <input
          type="tel"
          placeholder="Enter phone number with country code"
          value={phoneNumber}
          required
          onChange={handlePhoneNumberChange}
          className="w-full py-2 px-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          onClick={handleGenerateOTP}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Generate OTP
        </button>

        {otpGenerated && <p className="mt-4 text-green-500">OTP generated successfully!</p>}
      </div>
    </div>
  </>
  );
};

export default GenerateOTP;
