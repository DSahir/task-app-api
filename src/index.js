const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/tasks')
const app = express()

app.use(express.json())

app.post('/task' , (req , res)=>{
    const task = new Task(req.body)
    task.save().then(()=>{
        res.status(201).send(task)
    }).catch((e)=>{
        // res.status(400)
        // res.send(e)
        res.status(400).send(e)
    })
})

app.get('/user' , (req , res)=>{
    User.find({}).then((user)=>{
        res.send(user)
    }).catch((e)=>{
        res.status(500).send()
    })
})

//:id is express route hansler
app.get('/user/:id' ,(req, res)=>{
    const _id= req.params.id
    //console.log(req.params)
    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch(()=>{
        res.status(500).send()
    })
} )
app.get('/task' , (req , res)=>{
    Task.find({}).then((task)=>{
        res.status(200).send(task)
    }).catch((e)=>{
        res.status(500).send()
    })
})
app.get('/task/:id' , (req , res)=>{
    const _id = req.params.id
    Task.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send('No such task found')
        }
        res.status(200).send(task)
    }).catch((e)=>{
        res.status(500).send()
    })
})

app.post('/user',(req , res)=>{
    // console.log(req.body)
    // res.send('testing')
    const user = new User(req.body)
    user.save().then(()=>{
        res.send(user)
    }).catch((e)=>{
        // res.status(400)
        // res.send(e)
        res.status(400).send(e)
    })
})
const port = process.env.PORT || 3000
app.listen(port , ()=>{
    console.log('Server is on port' + port)
})
