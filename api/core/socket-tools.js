
const Users = require('../auth/auth-model')
const Match = require('./core-model')

module.exports = {
  start: function (io) {

    // io.use(( socket, next )=> {      // jwt verification needs to be implemented 
    //   if(socket.handshake.query){
    //     jwt.verify(socket.handshake.query, JWT_SECRET, (err, decoded) => {
    //       if(err) return next(new Error('Auth error/Invalid token'));
    //       socket.decoded = decoded
    //       next();
    //     });
    //   }else{
    //     next(new Error('No token found'));
    //   }
    // })


    io.on('connection', (socket) => {
      
      socket.on('msg', (msg) => {
        console.log(msg)
      })
    })
    
            
     
  }
}