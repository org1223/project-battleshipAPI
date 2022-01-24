const Users = require('../auth/auth-model')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../auth/auth-secrets')


async function checkSubmission(req ,res, next) {
    try{ 
      let users = []
        
      if (!req.body.username){
        next({status:422, message:'username required'})
      }else{
        users = await Users.findBy({username: req.body.username})
        if (!users.length){
          next()
        }else if(req.body.username.length > 10){
          next({status:422, message:'username cannot be longer than 10'})                
          
        }else{
          next({status:403, message: 'username taken'})
        }
      }
    }catch(err){
    next(err)
  }
}


async function checkLogin (req ,res, next){
    try{
        
        if(!req.body.user_id){
          next({status:400, message:'user_id required'})
  
        }else{
          const [userFromDB] = await Users.findBy({user_id: req.body.user_id})
          console.log(userFromDB)
          if(!userFromDB){
            next({status:404, message:'user not found'})
    
          }else if(userFromDB.user_id === req.body.user_id){
            next()
          }
        }
    }catch(err){
    next(err)
  }
}


function restrict (req, res, next) {

  if(!req.headers.authorization){
    next({status:401, message:'token required'})
  }else{
    const token = req.headers.authorization.slice(7) //for postman auth using Bearer token
    jwt.verify(token, JWT_SECRET, (err, decoded)=> {
      if(err){
        return next({status:404, message:'token not known'})
      }else{
        req.decoded = decoded
        next()
      }
    })
  }
};


module.exports={
    restrict,
    checkLogin,
    checkSubmission
}