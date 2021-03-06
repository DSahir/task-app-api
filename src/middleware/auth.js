const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req , res , next) =>{
    // console.log('auth middlewqre')
    // next()  //associate route handler to run

    try{
        // const token = req.header('Authorization')
        //console.log(token)
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        const user = await User.findOne({_id:decoded._id , 'tokens.token':token})
        if(!user){
            throw new Error('No such user found')
        }
        req.token = token
        req.user = user
        next()
    }catch(e){
        res.status(401).send({ error:'Please authenticate .'})
    }


}
module.exports = auth