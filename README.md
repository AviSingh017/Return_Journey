# Registration System with Phone Number Verification and IP Address Validation

This project implements a registration system that includes phone number verification using Twilio, OTP (One-Time Password) generation, and IP address validation. The system is built using the following technologies:

## Features

| Feature                                     | Description                                                             |
|--------------------------------------------- |------------------------------------------------------------------------ |
| Phone Number Verification                   | Users enter a phone number and receive an OTP for verification.         |
| OTP Generation and Expiry                   | OTP is generated and valid for 5 minutes.                               |
| IP Address Validation                        | User registration is allowed only for users from India (IND).          |

## Tech Stack

| Technology    | Description                            |
|-------------- |----------------------------------------|
| React         | Frontend framework for UI development. |
| Node.js       | Backend runtime environment.          |
| Express       | Web application framework for Node.js. |
| MongoDB       | Database for storing user data.        |
| Twilio        | SMS service for OTP generation.        |
| ipinfo        | IP address validation and location info.|
| bcrypt        | Hashing user phoneNumber while registration. |

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/registration-system.git
   
2. Install dependencies for both the frontend (React) and backend (Node.js):
   ```bash  
   cd registration-system/frontend
   npm install

   cd ../backend
   npm install
   
3. Configure Twilio and ipinfo API credentials:

  Create a Twilio account and obtain the Account SID and Auth Token.
   - Sign up for an ipinfo account and obtain the API key.
   - Set up environment variables:

  In the backend directory, create a .env file with the following content and fill in the appropriate values:
   ```bash  
   TWILIO_ACCOUNT_SID=<YOUR_TWILIO_ACCOUNT_SID>
   TWILIO_AUTH_TOKEN=<YOUR_TWILIO_AUTH_TOKEN>
   TWILIO_PHONE_NUMBER=<YOUR_TWILIO_PHONE_NUMBER>

   # MongoDB configuration
   MONGO_URI=mongodb://localhost:27017/registration_system
```
4. Start the frontend and backend servers:
   ```bash
   # Start the frontend (React)
   cd frontend
   npm start

   # Start the backend (Node.js and Express)
   cd ../backend
   npm start

# Usage
- Access the application at http://localhost:3000 in your web browser.
- Enter your phone number for verification.
- Click "Generate OTP" to receive a one-time password via SMS.
- Enter the received OTP within the given time frame (5 minutes).
- Complete the registration process with a valid IP address (restricted to IND).

# Contributing
Contributions are welcome! Feel free to open an issue or create a pull request.




