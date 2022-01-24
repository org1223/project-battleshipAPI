const router = require('express').Router();
const{checkLogin, checkSubmission} = require('../middleware/auth-middle')
const Users = require('./auth-model')

router.post('/register', checkSubmission, async (req, res, next) => {
  
    try{
        const { username } = req.body
        const newUser = {
            username,
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
      const user = req.body
      Users.login(user.user_id)
      res.status(200).json({message:{username: user.username, user_id: user.user_id, token:token}})

    }catch (err){
      next(err)
    }
});

router.post('/logout', checkLogin, (req, res, next) => {

    try {
      const user = req.body
      Users.logout(user.user_id)
      res.status(200).json({message:{username: user.username, user_id: user.user_id, old_token: user.token}})

    }catch (err){
      next(err)
    }
});


module.exports = router;