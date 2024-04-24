const express = require('express')
const server = express();
const bodyParser = require('body-parser')
// routers
const authRouter = require('./routes/auth')
const apiRouter = require('./routes')

// json body parser
server.use(bodyParser.json());

server.use('/auth', authRouter);
server.use('/api', apiRouter);

server.use('/', (req,res) => {
    res.send("Working")
});



module.exports = server;