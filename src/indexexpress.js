const app = require('./app')

// const express = require('express')
// require('./db/mongoose')
// const multer = require('multer')


// // const User = require('./models/user')
// // const Task = require('./models/tasks')

// const { ObjectID } = require('mongodb')
// const { update, findById } = require('./models/user')

// const userRouter = require('./routers/user')
// const taskRouter = require('./routers/task')

// const upload = multer({
//     dest:'images'
// })
// app.post('/upload')
// const app = express()
//middleware
// app.use((req,res ,next)=>{
//     console.log(req.method , req.path)
//     next()
// })
// app.use((req,res ,next)=>{
//     if (   req.method === 'GET'){
//         res.send('get req are disabled')
//     }else{
//         next()
//     }
// })
// app.use((req,res,next)=>{
//     if(req){
//         res.status(503).send('Site under maintainance')
// })

// app.use(express.json())
// app.use(userRouter)
// app.use(taskRouter)

// const router = new express.Router()
// router.get('/test' , (req ,res)=>{
//     res.send('This is dummy.')
// })

// app.use(router)



// app.post('/user',async (req , res)=>{
//     // console.log(req.body)
//     // res.send('testing')
//     const user = new User(req.body)

//     try {
//         await user.save()
//         res.status(201).send(user)
//     }catch(e){
//         res.status(400).send(e)
//     }
 
// })

// app.get('/user' ,async (req , res)=>{
//     try{
        
//         const user = await User.find({})
//         res.send(user)
//     }catch(e){
//         res.status(400).send()
//     }
// })

// //:id is express route hansler
// app.get('/user/:id' ,async (req, res)=>{
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
  
// } )
// //udate by id
// app.patch('/user/:id' , async(req,res)=>{
//     const upd = Object.keys(req.body)
//     const allowedkeys=['name' ,  'age','email','password']
//     const isvalid = upd.every((upd)=> allowedkeys.includes(upd))    
//     if(!isvalid){
//         return res.status(400).send('Invalid update')
//     }
//     try{
//     const user = await User.findByIdAndUpdate(req.params.id , req.body,{new:true , runValidators:true})
//     if(!user){
//             return res.status(404).send()
//     }
//         res.status(200).send(user)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })

// app.delete('/user/:id' , async(req, res)=>{
//     try{

//         const user = await User.findByIdAndDelete(req.params.id)
//         if(!user){
//             return res.status(404).send()
//     }
//         res.status(200).send(user)
//     }catch(e){
//         res.status(500).send(e)
//     }
// // })

// app.post('/task' , async (req , res)=>{
//     const task = new Task(req.body)
//     try{
//         await task.save()
//         res.status(201).send(task)
//     }catch(e){
//         res.status(400).send(e)
//     }
// })

// app.get('/task' ,async (req , res)=>{
//    try{
//        const task = await Task.find({})
//        res.status(200).send(task)
//    }catch(e){
//        res.status(404).send(e)
//    }
// })
// app.get('/task/:id' ,async (req , res)=>{
//     const _id = req.params.id
//     try{
//         const task = await Task.findById(_id)
//        if(!task){
//            return res.status(404).send()
//        }
//         res.status(200).send(task)
//     }catch(e){
//         res.status(500).send()
//     }
// })
// app.patch('/task/:id' , async (req , res)=>{
//     const upt = Object.keys(req.body)
//     const allowedkeys = ['description ' , 'completed']
//     const isvalid = upt.every((x)=>allowedkeys.includes(x))

//     if(!isvalid){
//         return res.status(404).send('invalid setup')
//     }
//     try{
//     const task =await Task.findByIdAndUpdate(req.params.id , req.body , {new : true , runValidators:true})

//     if(!task){
//         return res.status(404).send()
//     }

//     res.status(200).send(task)

//     }catch(e){
//         res.status(500).send()
//     }

// })
// app.delete('/task/:id' , async (req , res)=>{
//     try{
//        const task = await Task.findByIdAndDelete(req.params.id) 
//       if(!task){
//             return res.status(404).send()
//         } 
//         res.status(200).send(task)
//    }catch(e){
//        res.status(500).send(e)
//    }
// })

const port = process.env.PORT

app.listen(port , ()=>{
    console.log('Server is on port' + port)
})

// const User = require('./models/user')
// const Task = require('./models/tasks')
// const main = async () =>{
//     // const task = await Task.findById('')
//     // await task.populate('owner')    //entire profile of associated user
//     // console.log(task.owner)

//     const user = await User.findById('')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// // const bcrypt = require('bcryptjs')

// const myfun = async()=>{
//     const pw = 'red12345!'
//     const hashpw = await bcrypt.hash(pw , 8)
//     console.log(pw)
//     console.log(hashpw)
//     const match = await bcrypt.compare('red12345!' , hashpw)
//     console.log(match)
// }
// myfun()

// const jwt = require('jsonwebtoken')
// const myfun = async () =>{
//     const token = jwt.sign({_id : 'asd123'},'thisismynewthing', {expiresIn:'7 days'})
//     console.log(token)
//     const data = jwt.verify(token,'thisismynewthing')
//     console.log(data)
// }
// myfun()

// const pet = {
//     name:'moti'
// }
////toJSON ru nby default to cahnge what we return b4 stringify
// pet.toJSON = function() {
//     // return this
//     return {}
// }
// console.log(JSON.stringify(pet))
