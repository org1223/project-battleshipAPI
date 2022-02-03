const router = require('express').Router();
const{checkLogin, checkSubmission, restrict} = require('../middleware/auth-middle')
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
      startStream(req.body)
      res.status(200).json({message:{username: user.username, user_id: user.user_id, token:token}})

    }catch (err){
      next(err)
    }
});


router.get('/stream', restrict, (req, res, next) => { // front end will have to implement SSE using New EventSource
  try{
    if(req.body.user_id){
      res.setHeader("Content-Type", "text/event-stream")
      setInterval(async()=> {
        const invites = await Users.checkIfInvites(req.body.user_id)
        console.log(invites)
        res.write(`user_id: ${req.body.user_id}`+` data: ${invites} `+"\n\n")
      }, 5000);
      
    }
  }catch(err){
    next(err)
  }
})

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