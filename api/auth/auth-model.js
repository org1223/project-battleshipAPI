const db = require('../../data/dbConfig')
const jwt = require('jsonwebtoken')
const {JWT_SECRET, JWT_REFRESH} = require('../../variableConfig')

function createToken(user){
 
    const payload = {
      user_id: user.user_id,
    }
    const options = {
        expiresIn: '15m'               // needs work
    }
    return jwt.sign(payload, JWT_SECRET, options)
}

async function refreshToken(user){
    
    const payload = {
        user_id: user.user_id,
    }
    const options = {
        expiresIn: '1d'
    }
    const token = jwt.sign(payload, JWT_REFRESH, options)
    await db.insert({value:token, token_id:user.user_id}).into('token')
    return token
}

async function revokeToken(token){
    await db('token').del().where('refresh_token', token)
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

function find(table, item, condition) {
    return db(table).select(item, condition)         
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
    refreshToken,
    revokeToken
}