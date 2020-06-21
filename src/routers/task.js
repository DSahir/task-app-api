const express = require('express')
const Task = require('../models/tasks')
const router = new express.Router()
const auth = require('../middleware/auth')


router.post('/task' ,auth, async (req , res)=>{
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner : req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})
//GEt tasks?completed=true
//GEt tasks?limit=10&skip=10
//GEt tasks?sortBy=createdAt:desc
router.get('/task',auth ,async (req , res)=>{
   
   const match = {}
   const sort = {}
   if( req.query.completed){
       match.completed =  req.query.completed ==='true'
   }
   if(req.query.sortBy){
       const parts = req.query.sortBy.split(':')
       sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
   }
    try{
    //    const task = await Task.find({})
    //    const task = await Task.find({owner : req.user._id})

    await req.user.populate({
        path:'tasks',
        match,
        options:{
            limit: parseInt(req.query.limit),
            skip:parseInt(req.query.skip),
            sort
        }
    }).execPopulate()
    //    res.status(200).send(task)
       res.status(200).send(req.user.task)
   }catch(e){
       res.status(404).send(e)
   }
})
router.get('/task/:id' ,auth,async (req , res)=>{
    const _id = req.params.id
    try{
        // const task = await Task.findById(_id)
       
        const task = await Task.findOne({_id , owner:req.user._id})
        if(!task){
           return res.status(404).send()
       }
        res.status(200).send(task)
    }catch(e){
        res.status(500).send()
    }
})
router.patch('/task/:id',auth , async (req , res)=>{
    const upt = Object.keys(req.body)
    const allowedkeys = ['description' , 'completed']
    const isvalid = upt.every((x)=>allowedkeys.includes(x))

    if(!isvalid){
        return res.status(404).send('invalid setup')
    }
    try{
        // const task = await Task.findById(req.params.id)
        const task = await Task.findOne({_id :req.params.id , owner:req.user._id})

    //const task =await Task.findByIdAndUpdate(req.params.id , req.body , {new : true , runValidators:true})

    if(!task){
        return res.status(404).send()
    }
    upt.forEach((elt)=>task[elt] = req.body[elt])
    await task.save()

    res.status(200).send(task)

    }catch(e){
        res.status(500).send()
    }

})
router.delete('/task/:id',auth , async (req , res)=>{
    try{
    //    const task = await Task.findByIdAndDelete(req.params.id) 
      
    const task = await Task.findOneAndDelete({_id:req.params.id , owner:req.user._id})
    if(!task){
            return res.status(404).send()
        } 
        res.status(200).send(task)
   }catch(e){
       res.status(500).send(e)
   }
})

module.exports = router