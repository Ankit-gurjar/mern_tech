const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const router = express.Router();

require("../db/connection");
const User = require("../modles/userschema");

router.get("/", (req, res) => {
    res.send("called fro router");
});

// using promises
// router.post("/register", (req, res) => {
//     const { name, email_Id, mobile_Number, password, cpassword } = req.body;

//     if (!name || !email_Id || !mobile_Number || !password || !cpassword) {
//         return res.status(422).json({ error: `some fields are empty` });
//     }
//     User.findOne({ email_Id: email_Id }).then((userExist) => {
//         if (userExist) {
//             return res.status(422).json({ error: "User alredy exist" });
//         }

//         const user = new User({ name, email_Id, mobile_Number, password, cpassword });
//         user.save().then(() => {
//             res.status(201).json({ message: "User registerde successFully" });
//         }).catch((err) => res.status(500).json({ error: "Failed to register" }));
//     }).catch((err) => { console.log(err); });
// });


router.post("/register", async (req, res) => {
    const { name, email_Id, mobile_Number, password, cpassword } = req.body;
    if (!name || !email_Id || !mobile_Number || !password || !cpassword) {
        return res.status(422).json({ error: 'Some Fields are empty' });
    }

    try {
        const userExist = await User.findOne({ email_Id: email_Id });
        if (userExist) {
            return res.status(422).json({ error: 'User already Exist' });
        }
        else if(password != cpassword){
            return res.status(422).json({ error: 'Password didnt match' });
        }
        const user = new User({ name, email_Id, mobile_Number, password, cpassword });
        await user.save();
        res.status(201).json({ message: "User registered Successfully" });
    } catch (err) {
        console.log(err);
    }
});


//login route
router.post("/signin", async (req, res) => {
    const { email_Id, password } = req.body;
    if (!email_Id || !password) {
        return res.status(422).json({ error: "Fill details" });
    }
    try {
        const userExist = await User.findOne({ email_Id: email_Id });
        const isMatch=await bcrypt.compare(password,userExist.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid Credientials" });
        }
        const token = userExist.generateAuthToken();
        res.cookie("jwtoken",token),{
            expires:new Date(Date.now()+258920000),
            httpOnly:true
        };
        res.json({ message: "User Login SucessFully" });

    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
