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

async function login(user_id){
   return await db('user').where('user_id', user_id).select('is_logged').update({is_logged: 1}).returning('*');
}

async function logout(user_id){
    return await db('user').where('user_id', user_id).select('is_logged').update({is_logged: 0}).returning('*');
 }

function find() {
    return db('user').select('user_id', 'username')
}

async function findOnline(id) {
    const online = await db('user').whereNot('user_id', id).andWhere('is_logged', true).first()
    if(!online){
        return false
    }else{
        return online
    }
}

function findBy(filter) {
    return db('user').where(filter)
}

async function findById(id) {
    const user = await db('user').select('username', 'user_id')
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
    findOnline,
    login,
    logout,
}