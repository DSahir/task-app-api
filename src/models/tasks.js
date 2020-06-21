const mongoose = require('mongoose')

const taskschema = new  mongoose.Schema({
    description :{
        required : true,
        trim:true,
        type : String
    },completed:{
        default:false,
        type : Boolean
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required : true,
        ref:'User'
    }

},{
    timestamps:true
})
taskschema.pre('save' , async function(next){
    const task  = this
    if(task.isModified('completed')){
        console.log('Completion status changed!!')
    }
    next()
})

const Task = mongoose.model('Task' , taskschema)

module.exports = Task