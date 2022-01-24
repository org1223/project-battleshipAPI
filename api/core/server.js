const express = require('express');
const authRouter = require('../auth/auth-router');
const coreRouter = require('../core/core-router')
const{restrict} = require('../middleware/auth-middle')

const server = express();
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/core', coreRouter); //needs coreRouter // only logged-in users should have access!


server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
});


module.exports = server;
