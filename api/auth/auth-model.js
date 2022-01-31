const db = require('../../data/dbConfig')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../auth/auth-secrets')

function createToken(user){
 
    const payload = {
      user_id: user.user_id,
      username: user.username
    }
    const options = {
      expiresIn: '1d'
    }
    const result = jwt.sign(payload, JWT_SECRET , options)
    return result
}

async function login(user_id){ //could be combined with logout model
   return await db('user').where('user_id', user_id).select('is_logged').update({is_logged: 1});
}

async function logout(user_id){
    return await db('user').where('user_id', user_id).select('is_logged').update({is_logged: 0});
}

async function findOthers (id) {
    const others = await db('user').whereNot('user_id', id)
    if(!others){
        return "no players found :("
    }else{
        return others
    }
}

async function endMatch(id) {// probably will be removed
    //const player = await db('user').where('user_id', id).update({is_in_match: 0})
    console.log(player)
}

function find() {
    return db('user').select('user_id', 'username')
}

function findBy(filter) {
    return db('user').where(filter)
}

async function findById(id) {
    const user = await db('user').select('*')
    .where('user_id', id)
    .first()
    return user
}

async function add(user) {
    const [id] = await db('user').insert(user)
    return findById(id)
}

module.exports = {
    add,
    find,
    findBy,
    findById,
    createToken,
    findOthers,
    login,
    logout,
    endMatch
}