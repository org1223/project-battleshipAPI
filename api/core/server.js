const express = require('express');
const authRouter = require('../auth/auth-router');
const coreRouter = require('../core/core-router')

const server = express();
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/core', authRouter.restrict, coreRouter); // only logged-in users should have access!

module.exports = server;
