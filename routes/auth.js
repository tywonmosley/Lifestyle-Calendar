const authRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//models
const { checkUserDetails, createUser, getUser } = require("../db/user");
//path --> /auth/register
authRouter.post("/register", async (req, res) => {
  try {
    //get user data from req.body
  const user = req.body;
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
 const newUser =  await createUser({...user, password: hashPassword})
  //make JWT
  const token = jwt.sign({id: newUser.user_id}, process.env.JWT || "ILiveLife")
  //send of response of user added in db, JWT
  res.status(201).send({message:"done-zoe", token});  
  } catch (error) {
    res.status(500).send({error, message:"Could not register user"});
  }
});

//login
authRouter.post('/login', async (req,res) => {
  try {
    // username/password from req.body
    const { username, password } = req.body;
    // get user by username
    const user = await getUser(username);
    // compare passewor from request with saved hasged password
    const comparePassword = await bcrypt.compare(password, user?.password || "123")
    //check if user exists and password matach
    if(!user || !comparePassword) {
      return res.status(401).send({message: "Invalid login credentials"});
    }
    //create token to send
    const token = jwt.sign({id: user.user_id}, process.env.JWT || "ILiveLife")
    //send response --> token, message: "Your are logged in"
    res.send({ message: "Your are logged in", token });
  } catch (error) {res.status(500).send({error, message:"Could not login user"});
    
  }
});

module.exports = authRouter;
