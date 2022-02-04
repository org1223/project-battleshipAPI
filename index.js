const server = require('./api/core/server')

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`\n*** Battleship departed from port: ${port} ***\n`)
})