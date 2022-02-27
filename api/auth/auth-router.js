const router = require('express').Router();
const{checkLogin, checkSubmission, restrict} = require('../middleware/auth-middle')
const {BCRYPT_ROUNDS} = require('./auth-secrets')
const bcrypt = require('bcryptjs')
const Users = require('./auth-model')


router.post('/register', checkSubmission, async (req, res, next) => {
  
    try{
        const { username, password } = req.body
        const newUser = {
            username,
            password: bcrypt.hashSync(password.toString(), BCRYPT_ROUNDS)
        }
        const created = await Users.add(newUser)
        res.status(201).json({message:{username: created.username, user_id: created.user_id}})
    }catch (err){
        next(err)
    }
});

router.post('/login', checkLogin, (req, res, next) => {

    try {
      const token = Users.createToken(req.body)
      res.status(200).json({username: req.user.username, user_id: req.user.user_id, token:token})
      
    }catch (err){
      next(err)
    }
});

router.post('/logout', checkLogin, (req, res, next) => {

    try {
      Users.logout(req.user.user_id)
      res.status(200).json({message:{username: req.user.username, user_id: req.user.user_id, old_token: req.body.token}})
    }catch (err){
      next(err)
    }
});


module.exports = router;