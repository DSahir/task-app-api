const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
// router.get('/test' , (req, res)=>{
//     res.send('From new file dummy.')
// })


router.post('/user',async (req , res)=>{
    // console.log(req.body)
    // res.send('testing')
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user , token })
    }catch(e){
        res.status(400).send(e)
    }
 
})
router.post('/user/login' , async (req , res)=>{
    try{
        const user = await User.findbyCredentials(req.body.email , req.body.password)
        const token = await user.generateAuthToken()
        // res.send({user: user.getPublicProfile() , token})
        res.send({user: user , token})
        //res.send(user)
    }catch(e){
        res.status(400).send()
    }
})

router.post('/user/logout',auth,async (req,res)=>{
    try{
        req.user.tokens = req.user.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send()
    }
})
router.post('/user/logoutall', auth , async(req ,res)=>{
    try{
        req.user.tokens = [] 
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

//2nd argu is middlew
// router.get('/user' , auth ,async (req , res)=>{
//     try{
//         const user = await User.find({})
//         res.send(user)
//     }catch(e){
//         res.status(400).send()
//     }
// })
router.get('/user/me' , auth ,async (req , res)=>{
    try{
        res.send(user)
    }catch(e){
        res.status(400).send()
    }
})
//:id is express route hansler
// router.get('/user/:id' ,async (req, res)=>{
//     const _id= req.params.id
//     //console.log(req.params)
    
//     try{
//         const user = await User.findById(_id )
//         if(!user){
//             return res.status(404).send()
//         }
//         res.status(200).send(user)
//     }catch(e){
//         res.status(500).send(e)
//     } 
// })

//update by id
// router.patch('/user/:id' , async(req,res)=>{
//     const upd = Object.keys(req.body)
//     const allowedkeys=['name' ,  'age','email','password']
//     const isvalid = upd.every((upd)=> allowedkeys.includes(upd))    
//     if(!isvalid){
//         return res.status(400).send('Invalid update')
//     }
//     try{
//     const user = User.findById(req.params.id)
//     upd.ForEach((element) => user[element] = req.body[element])
//     await user.save()
    
//     //const user = await User.findByIdAndUpdate(req.params.id , req.body,{new:true , runValidators:true})
//     if(!user){
//             return res.status(404).send()
//     }
//         res.status(200).send(user)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })


router.patch('/user/me',auth , async(req,res)=>{
    const upd = Object.keys(req.body)
    const allowedkeys=['name' ,  'age','email','password']
    const isvalid = upd.every((upd)=> allowedkeys.includes(upd))    
    if(!isvalid){
        return res.status(400).send('Invalid update')
    }
    try{
        upd.ForEach((element) => req.user[element] = req.body[element])
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
        
})

// router.delete('/user/:id' ,async(req, res)=>{
router.delete('/user/me',auth ,async(req, res)=>{
    try{

        // const user = await User.findByIdAndDelete(req.params.id)
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send()
        //  }
        await req.user.remove()
        // res.status(200).send(user)
        res.status(200).send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})



module.exports = router