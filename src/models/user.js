const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./tasks')


const userschema = new mongoose.Schema({
    name:{
        type:String,
        required : true,
        trim : true
    },
    age:{
        type: Number,
        default : 0,
        validate(value){
            if(value  < 0)
                throw new Error('Age must be positive')
        }
    },email:{
        unique : true,
        type:String,
        required:true,
        lowercase : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },password:{
        type : String,
        trim:true,
        required:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Invalid password')
            }
        }
    },tokens:[{
        token : {
            type:String,
            required:true
        }
    }],avatar:{
        type:Buffer
    }
},{
    timestamps:true
})

userschema.virtual('tasks' , {
    ref:'Task' , //jus for mngoose to get hte relation
    localField :'_id',
    foreignField:'owner'
})

// userschema.methods.getPublicProfile = function(){
userschema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar 
    return userObject
}

userschema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userschema.statics.findbyCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('User Email not found')
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw new Error('Unable to login')
    }
    return user
}

//binding with standard funct--arrow func dont wwork---pre and post --in mongoose
userschema.pre('save' ,async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8)
    }
    
    next()  //for next user--otherwise it will hang in here
})

//delete user tasks when user is removed
userschema.pre('remove', async function(next){
    const user = this
    await Task.deleteMany({owner : user._id})
    next()
})


const User = mongoose.model('USER' , userschema)

module.exports = User
