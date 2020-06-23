const express = require('express')
require('./db/mongoose')
const multer = require('multer')

const { ObjectID } = require('mongodb')
const { update, findById } = require('./models/user')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app
