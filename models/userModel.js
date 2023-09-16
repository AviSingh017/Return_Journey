const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    phonenumber: {type: Number, required: true},
    otp: {type: Number}
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = {UserModel};