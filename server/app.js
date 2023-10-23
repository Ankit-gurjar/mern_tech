const mongoose = require(`mongoose`);
const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });

require("./db/connection");

app.use(express.json());
// const User = require('./modles/userschema');

//linked the route files
app.use(require("./router/auth"));

const PORT = process.env.PORT || 5000;

// Middelware

const middleware = (req, res, next) => {
    console.log(`Hello my middleware`);
    next();
};

app.get("/", (req, res) => {
    res.send(`Hello world`);
});
app.get("/home", (req, res) => {
    res.send(`Hello world home`);
});
app.get("/aboutme", middleware, (req, res) => {
    res.send(`Hello world aboutme`);
});
app.get("/login", (req, res) => {
    res.send(`Hello world login`);
});

app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`);
});
console.log("hii");
