const authRouter = require('express').Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
//Mmodels
const { checkUserDetails } = require("../db/user")
//register
authRouter.post('/register', async (req,res) =>{
//get user data from req.body
const user = req.body
//check that username and email are not takin in db
//hash the password
//add user to db
await checkUserDetails(user.username, user.email);
//make JWT
//send of response of user added in db, JWT
});

//login
// authRouter.post('/login', (req,res) =>{
// });

module.exports = authRouter;