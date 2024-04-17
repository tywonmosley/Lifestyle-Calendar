const authRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//Mmodels
const { checkUserDetails, createUser } = require("../db/user");
//path --> /auth/register
authRouter.post("/register", async (req, res) => {
  //get user data from req.body
  const user = req.body;
  console.log("req.body --->", user);
  //check that username and email are not takin in db
  const checkNameandEmail = await checkUserDetails(user.username, user.email);
  // if they are taken --> send error response
  if (checkNameandEmail) {
    return res.status(409).send({
      message: "Username or Email is already taken.",
    });
  }
  //hash the password
  const hashPassword = await bcrypt.hash(
    user.password,
    parseInt(process.env.SALT || 5)
  );
  //add user to db
 const newUser =  await createUser(user)
  //make JWT
  //send of response of user added in db, JWT
  res.end();
});

//login
// authRouter.post('/login', (req,res) =>{
// });

module.exports = authRouter;
