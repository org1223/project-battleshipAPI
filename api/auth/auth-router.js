const router = require('express').Router();
const{checkLogin, checkSubmission} = require('../middleware/auth-middle')
const Users = require('./auth-model')

router.post('/register', checkSubmission, async (req, res, next) => {
  
    try{
        const { username, password } = req.body
        const newUser = {
            username,
            password: bcrypt.hashSync(password, BCRYPT_ROUNDS),
        }
        const created = await Users.add(newUser)
        res.status(201).json({message:{username: created.username, id: created.id}})

    }catch (err){
        next(err)
    }
});

router.post('/login', checkLogin, (req, res, next) => {

    try {
      const token = Users.createToken(req.body)
      const username = req.body.username
      res.status(200).json({message: `Welcome, ${username}`, token:token})

    }catch (err){
      next(err)
    }
});


module.exports = router;