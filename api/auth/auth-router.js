const router = require('express').Router();
const{checkLogin, checkSubmission, restrict} = require('../middleware/auth-middle')
const {BCRYPT_ROUNDS} = require('../../variableConfig')
const bcrypt = require('bcryptjs')
const Users = require('./auth-model')




router.post('/register', checkSubmission, async (req, res, next) => {
  
    try{
        const { username, password, user_id } = req.body
        const newUser = {
          user_id,  
          username,
          password: bcrypt.hashSync(password.toString(), BCRYPT_ROUNDS)   
        }
      const created = await Users.add(newUser, req.body.user_id)
      const token = Users.createToken(req.body)
      res.setHeader('Access-Control-Allow-Credentials',true);
      res.cookie('jwt', token, {httpOnly: true, maxAge: (360 * 60,000) })
      console.log(created)
      res.status(201).json({username: created.username, user_id: created.user_id})
    }catch (err){
      next(err)
    }
});

router.post('/login', checkLogin, (req, res, next) => {

    try {
      const token = Users.createToken(req.body) 
      res.setHeader('Access-Control-Allow-Credentials',true);
      res.cookie('jwt', token, {httpOnly: false, maxAge: (360 * 60,000) })
      res.status(200).json({username: req.user.username, user_id: req.user.user_id,})
      
    }catch (err){
      next(err)
    }
});

router.post('/logout', checkLogin, (req, res, next) => {

    try {
      res.cookie('jwt', '', {maxAge : 1})
      res.status(200).json({message:'OK'})

    }catch (err){
      next(err)
    }
});


module.exports = router;