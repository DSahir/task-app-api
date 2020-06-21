//CRUD operation

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient //acess fun to connect db
// const ObjectId = mongodb.ObjectID

const {MongoClient , ObjectID} = require('mongodb')
const id = new ObjectID() //generate new id
console.log(id)
console.log(id.id)
console.log(id.id.length)
console.log(id.toHexString().length)

console.log(id.getTimestamp())


//running server
const connectURL ='mongodb://127.0.0.1:27017' //default ip instead of loaclhost as it makes it slow
//name of db
const dbName = 'task-manager'

//async callback on connection sucessful
MongoClient.connect(connectURL , {useNewUrlParser:true , useUnifiedTopology:true}, (error , client)=>{
    if(error){
        return console.log(error);
    }
    //console.log('Connected db successfully')
    const db = client.db(dbName) //create-reference to given db
    //insertONe is async 
    // db.collection('users').insertOne({
    //     _id : id,  //here providing our random id 
    //     name:'Sanyu',
    //     age:30
    // } , (error , result)=>{
    //     if(error){
    //         return  console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
        
    // })
    // db.collection('users').insertMany([
    //     {
    //         name : 'om',
    //         age:9
    //     },{
    //         name:'Tanu',
    //         age:13
    //     }
    // ] , (error , result)=>{
    //     if(error){
    //         return console.log('UNable to insert doc')
    //     }
    //     console.log(result.ops)

    // })

    db.collection('tasks').insertMany([{
        description:'Study',
        completed:true
    },{
        describtion:'Cook',
        completed:false
    },{
        describtion:'Learn',
        completed:false
    }],(error , result)=>{
        if(error){
            return console.log('Unable to insert tasks')
        }
        console.log(result.ops)
    })


})
