const {MongoClient , ObjectID} = require('mongodb')

const connectURL ='mongodb://127.0.0.1:27017' //default ip instead of loaclhost as it makes it slow
const dbName = 'task-manager'


const db = MongoClient.connect(connectURL , {useNewUrlParser:true , useUnifiedTopology:true},(error , client)=>{
    if(error){
        return console.log('Unable to connect to db')
    }
    const db = client.db(dbName)

//using promise

    // const upd = db.collection('users').updateOne({
    //     _id: new ObjectID("5ee538f363e06f1241fa977a")
    // },{
    //     //update oprators
    //     // $set:{
    //     //     name:'Mike'
    //     // }
    //     $inc:{
    //         age:1
    //     }

    // })

    // upd.then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    db.collection('tasks').updateMany({
        completed:false
    },{
        $set:{
            completed:true
        }
    }).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })



})






