const {MongoClient , ObjectID}=require('mongodb')

const connectURL ='mongodb://127.0.0.1:27017' //default ip instead of loaclhost as it makes it slow
const dbName = 'task-manager'

MongoClient.connect(connectURL , {useNewUrlParser:true , useUnifiedTopology:true} , (error , client)=>{
    if(error){
        return console.log('Unable to connect to db')
    }
    const db = client.db(dbName)
    // db.collection('users').deleteMany({
    //     age:33
    // }).then((res)=>{
    //     console.log(res)
    // }).catch((err)=>{
    //     console.log(err)
    // })

    db.collection('tasks').deleteOne({
        describtion:"Study"
    }).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })

})