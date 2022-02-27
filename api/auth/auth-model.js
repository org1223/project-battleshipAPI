const db = require('../../data/dbConfig')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../../variableConfig')

function createToken(user){
 
    const payload = {
      user_id: user.user_id,
    }
    const options = {
      expiresIn: '1d'               // needs work
    }
    return jwt.sign(payload, JWT_SECRET , options)
}

async function findOthers (id) {
    const others = await db('user').whereNot('user_id', id)
    if(!others){
        return "no players found :("                //will probably be removed in favor of socket
    }else{
        return others
    }
}

    // all below are pending SSL and postgress changes *subject to change*

function find() {
    return db('user').select('user_id', 'username')         
}

function findBy(filter) {
    return db('user').where(filter)
}

async function findById(uuid) {
    const user = await db('user').select('*')
    .where('user_id', uuid)
    .first()
    return user
}

async function add(user, uuid) {
    await db('user').insert(user)
    return findById(uuid)
}

module.exports = {
    add,
    find,
    findBy,
    findById,
    createToken,
    findOthers,
}