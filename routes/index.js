const apiRouter = require("express").Router();
const jwt = require("jsonwebtoken");
//routers
const eventsRouter = require("./events");

apiRouter.use(async (req, res, next) => {
  try {
    //"Bearer eoijnknisdf12332"
    const prefix = "Bearer ";
    //get Authorization header
    const auth = req.header("Authorization");
    //split "Bearer" and Token
    const token = auth.slice(prefix.length);
    //verify token

    next();
  } catch (error) {

  }
});

apiRouter.use("/events", eventsRouter);
module.exports = apiRouter;
