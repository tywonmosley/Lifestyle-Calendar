const eventsRouter = require("express").Router();
const jwt = require("jsonwebtoken");

//GET /api/events
eventsRouter.get('/', async (req, res) => {
res.end();
})

module.exports = eventsRouter;