const bcrypt = require("bcrypt");
const twilio = require("twilio");
const {UserModel} = require("../models/userModel");
const ipinfo = require("ipinfo");
require("dotenv").config();

const client = twilio(process.env.twilio_Accountsid, process.env.twilio_Auth_Token);

const generateOTP = async (req, res) => {
    const {phoneNumber} = req.body;

    const otp = Math.floor(1000 + Math.random() * 9000);

    await UserModel.findOneAndUpdate({phoneNumber}, {otp}, {upsert: true});

    client.messages.create({
        body: `Your OTP for registration is: ${otp}`,
        from: process.env.twilio_Phone_Number,
        to: phoneNumber
    })
        .then(() => {
            res.send({ "Status":200, "msg":'OTP sent successfully'});
        })
        .catch(error => {
            res.send({"Status":500, "msg":'Error sending OTP', "Error":error});
        });
};

const registerUser = async (req, res) => {
    const { phoneNumber, otp } = req.body;

    const user = await UserModel.findOne({ phoneNumber, otp });
    if (!user) {
        return res.send({"Status":400, "Error":"Invalid OTP"});
    }

    const userIpAddress = req.ip;

    ipinfo(userIpAddress, async (error, details) => {
        if (error) {
            console.log({'Error':error});
            return res.send({"Status":400, "Error":"Error validating IP address"});
        }

        if (details.ip !== '::ffff:127.0.0.1') {
            return res.send({"Status":404, "Error":"User IP address is not allowed"});
        }

        const hashedPhoneNumber = bcrypt.hashSync(phoneNumber, 7);

        const newUser = new UserModel({
            phoneNumber: hashedPhoneNumber,
            ipAddress: userIpAddress
        });

        await newUser.save();
        res.status(200).send('User registered successfully.');
    });
};

module.exports = {generateOTP, registerUser};
