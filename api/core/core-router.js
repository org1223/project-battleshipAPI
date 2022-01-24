const router = require('express').Router();
const Users = require('../auth/auth-model')



router.get('/online',async (req, res, next) => {
    try{
        const [defender] = await Users.findBy({user_id: req.body.user_id})
        const challenger = await Users.findOnline(req.body.user_id);
        if(challenger){
            res.status(200).json({message:`match made with defender: ${defender.username} and challenger: ${challenger.username}`})
        }
    }catch(err){
        next(err)
    }
})




module.exports = router;