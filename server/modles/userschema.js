const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email_Id: {
        type: String,
        required: true,
    },
    mobile_Number: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            requires: true
        }
    }]
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    try {
        let newToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: newToken });
        await this.save();
        return newToken;
    } catch (err) {
        console.log(err);
    }
}


const USER = mongoose.model("USER", userSchema);

module.exports = USER;
