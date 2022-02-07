const httpServer = require('./server')
const io = require('socket.io')(httpServer, { cors: { origin: '*'}}) //might not need universal cors
const {JWT_SECRET} = require('../auth/auth-secrets')
const ioJwt = require('socketio-jwt')


io.sockets
    .on("connect", ioJwt.authorize({
        secret:JWT_SECRET,
        timeout: 15000 // 15 second timeout, send that jwt quick boi
    })).on('auth', function (socket){

    })// NEEDS WORK BADLY - "i'll be bak"- waylay
    
    
    socket.on("findOnline", (info) => {
        try{

            const players = await Users.findOthers(info.user_id);        
            if(players){
                socket.emit({message:{...players}})
            }
        }catch(err){
            console.error(err)             
        }
    })