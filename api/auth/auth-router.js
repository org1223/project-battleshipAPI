const router = require('express').Router();
const{checkLogin, checkLogout, checkSubmission, checkToken, checkRefreshToken} = require('../middleware/auth-middle')
const {BCRYPT_ROUNDS} = require('../../variableConfig')
const bcrypt = require('bcryptjs')
const Users = require('./auth-model')



router.post('/rtrauth', checkRefreshToken, (req, res, next)=> {
  try{
    const token = Users.createToken(req.body.user)
    res.status(201).json({token:token})
  }catch(err){
    next(err)
  }
})

router.post('/register', checkSubmission, async (req, res, next) => {
  
    try{
        const { username, password, user_id } = req.body
        const newUser = {
          user_id,  
          username,
          password: bcrypt.hashSync(password.toString(), ~~BCRYPT_ROUNDS)   
        }
      const created = await Users.add(newUser, req.body.user_id)
      const token = Users.createToken(req.body)
      const refreshToken = Users.refreshToken(req.body)
      res.status(201).json({username: created.username, token: token, refreshToken: refreshToken})
    }catch (err){
      next(err)
    }
});

router.post('/login', checkLogin, (req, res, next) => {

    try {
      const token = Users.createToken(req.user)
      const refreshToken = Users.refreshToken(req.user)
      res.status(200).json({username: req.user.username, token: token, refreshToken: refreshToken})
      
    }catch (err){
      next(err)
    }
});

router.post('/logout', checkLogout, (req, res, next) => {

    try {
      Users.revokeToken(req.body.token)
      res.status(200)
    }catch (err){
      next(err)
    }
});


module.exports = router;