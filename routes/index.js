const apiRouter = require('express').Router();
const jwt = require("jsonwebtoken");
//routers
const eventsRouter = require('./events')

apiRouter.use(async (req, res, next) => {

});

apiRouter.use('/events', eventsRouter)
module.exports = apiRouter