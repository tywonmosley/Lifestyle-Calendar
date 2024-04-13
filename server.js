const express = require('express')
const server = express();

server.use('/', (req,res) => {
    res.send("Working")
})


module.exports = server;