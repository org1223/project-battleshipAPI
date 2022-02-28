const Users = require('../auth/auth-model')
const jwt = require('jsonwebtoken')
const {JWT_SECRET, JWT_REFRESH} = require('../../variableConfig')
const bcrypt = require('bcryptjs')

async function checkSubmission(req ,res, next) {
  try{ 
      let users = []
      let pass 
    if(req.body.password && req.body.username){
      pass = req.body.password
      if (pass.length <= 3){
        next({status:422, message:"Password must be longer than 3 chars"})
      }else{
        users = await Users.findBy({username: req.body.username})
        if (!users.length){ 
          next()
        }else{
          next({status:403, message: 'username taken'})
        }
      }
    }else{
      next({status:422, message:'username and password required'})
    } 
  }catch (err) {
    next(err)
  }
}


async function checkLogin (req ,res, next){
    try{
        if(!req.body.password || !req.body.username){
          next({status:400, message:'username and password required'})
        }else{
          const [userFromDB] = await Users.findBy({username: req.body.username})
          console.log(userFromDB)
          if(!userFromDB){
            next({status:404, message:'user not found'})
    
          }else if(bcrypt.compareSync(req.body.password.toString(), userFromDB.password)){
            req.user = {username: userFromDB.username, user_id: userFromDB.user_id}
            next()
          }else{
          next({status:400, message:'invalid credentials'})
          }
        }
    }catch(err){
    next(err)
  }
}

function checkToken (req, res, next) {

  if(!req.headers.authorization){
    next({status:401, message:'Token required'})
  }else{
    const token = req.headers.authorization.split(' ')[1] //for Bearer token
    jwt.verify(token, JWT_SECRET, (err, decoded)=> {
      if(err){
        return next({status:403, message:'Invalid token'})
      }else{
        req.decoded = decoded
        next()
      }
    })
  }
};

function checkRefreshToken (req, res, next){
  if(!req.headers.authorization){
    next({status:401, message:'Token required'})
  }else{
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, JWT_REFRESH, (err, decoded) => {
      if(err){
        return next({status:403, message:'Invalid token'})
      }else{
      req.decoded = decoded
      next()
      }
    })
  }
}

function checkLogout (req ,res , next){
  
  const token = Users.find('token', 'refresh_token', req.body.token)
  if(token){
    next()
  }else{
    next({status:403, message:'Invalid token' })
  }
}



module.exports={
    checkToken,
    checkLogin,
    checkLogout,
    checkSubmission,
    checkRefreshToken
}