const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true , 
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})
// const User = mongoose.model('USER' , {
//     name:{
//         type:String,
//         required : true,
//         trim : true
//     },
//     age:{
//         type: Number,
//         default : 0,
//         validate(value){
//             if(value  < 0)
//                 throw new Error('Age must be positive')
//         }
//     },email:{
//         type: String,
//         required:true,
//         lowercase : true,
//         trim : true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid')
//             }
//         }
//     },password:{
//         type : String,
//         trim:true,
//         required:true,
//         minlength:7,
//         validate(value){
//             if(value.toLowerCase().includes('password')){
//                 throw new Error('Invalid password')
//             }
//         }
//     }
// })
//create instance og a model 
// const me = new User({
//     name:'Ishu'
// })
//create instance og a model 
// const me = new User({
//     name : '    Dahnu ahit  ',
//     // age : 9,
//     email:'gmDAF@GF.GS  ',
//     password:'      passwor4342D'
// })
// me.save().then(()=>{
//     console.log(me)
// }).catch((err)=>{
//     console.log(err)
// })

//data validation n sanitization
// const Task = mongoose.model('Task' , {
//     description :{
//         required : true,
//         trim:true,
//         type : String
//     },completed:{
//         default:false,
//         type : Boolean
//     }

// })

// const note = new Task({
//     description:'COol Down   ',

// }) 
// note.save().then((task)=>{
//     console.log(task)
// }).catch((err)=>{
//     console.log(err)
// })