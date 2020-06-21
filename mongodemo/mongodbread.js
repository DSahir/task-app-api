const {MongoClient , ObjectID}=require('mongodb')

const connectURL ='mongodb://127.0.0.1:27017' //default ip instead of loaclhost as it makes it slow
const dbName = 'task-manager'

MongoClient.connect(connectURL , {useNewUrlParser:true , useUnifiedTopology:true} , (error , client)=>{
    if(error){
        return console.log('Unable to connect to db')
    }
    const db = client.db(dbName)

    //fetchin data --find findOne

    // db.collection('users').findOne(({name:'Tanu' , age:1}),(error , user)=>{
    //     if(error){
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })
    //5ee53a481a4183c04079d7db
    // db.collection('users').findOne({_id: new ObjectID("5ee53a481a4183c04079d7db")},(error , user)=>{
    //     if(error){
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })
    // db.collection('users').find({age:33}).toArray((error , users)=>{
    //     if(error){
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(users)
    // })
    
    // db.collection('users').find({age:33}).count((error , users)=>{
    //     if(error){
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(users)
    // })
    db.collection('tasks').findOne({_id:ObjectID('5ee53b81da2898ba0caa27ba')},(error , task)=>{
        if(error){
            return console.log('Unable to fetch')
        }
        console.log(task)
    })
    db.collection('tasks').find({completed:false}).toArray((error , task)=>{
        if(error){
            return console.log('Unable to fetch')
        }
        console.log(task)
    })
})