const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')
const Task = require('../src/models/tasks')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id:userOneId,
    name:"Tanvi",
    email:"tanvi@mail.com",
    password:"asd123!",
    tokens:[{
        token: jwt.sign({_id:userOneId},process.env.JWT_SECRET)
    }]
}
const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id:userTwoId,
    name:"Hamit",
    email:"hamit@mail.com",
    password:"asd123!",
    tokens:[{
        token: jwt.sign({_id:userTwoId},process.env.JWT_SECRET)
    }]

}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description:"First Task",
    completed:true,
    owner: userOne._id
}
const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description:"Second Task",
    completed:false,
    owner: userOne._id
}
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description:"Three Task",
    completed:true,
    owner: userTwo._id
}


beforeEach(async()=>{
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await Task.deleteMany()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
})

test('Signup a new user' , async()=>{
    const response = await request(app)
    .post('/user')
    .send({
        name:"Om Ahir",
        email:"om@mail.com",
        password:"qwert123!"
    })
    .expect(201)
    
    // db was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    
    //about the response
    expect(response.body).toMatchObject({
        user:{
            name:"Om Ahir"
        },
        token:user.tokens[0].token
    })
    expect(user.password).not.toBe('qwert123!')
})


test('Login nexisting user', async()=>{
    const response = await request(app)
    .post('/user/login')
    .send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    //check token is added
    expect(response.body.token).toBe(user.tokens[1].token)

})
test('Should not login nonexist user', async()=>{
    const response = await request(app)
    .post('/user/login')
    .send({
        email:userOne.email,
        password:"notmypassword"
    }).expect(400)

})

test('Get profile for user' , async ()=>{
    await request(app)
    .get('/user/me')
    .set('Authorization' , `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Dont get profile for unauthorized user' , async()=>{
    await request(app)
    .get('/user/me')
    .send()
    .expect(401)
})

test('update valid user field' , async()=>{
    await request(app)
    .patch('/user/me')
    .set('Authorization' , `Bearer ${userOne.tokens[0].token}`)
    .send({
            name:"Mickey"
    }).expect(200)
})

test('Dont update invalid user field' , async()=>{
    await request(app)
    .patch('/user/me')
    .set('Authorization' , `Bearer ${userOne.tokens[0].token}`)
    .send({
            place:"Akola"
    }).expect(400)
})


test('Delete account for user' , async()=>{
    await request(app)
    .delete('/user/me')
    .set('Authorization' , `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})
test('DOnt delete account for unauthorized user' , async()=>{
    await request(app)
    .delete('/user/me')
    .send()
    .expect(401)
})


test('Create task for user',async()=>{
    const response = await request(app)
    .post('/task')
    .set('Authorization' , `Bearer ${userOne.tokens[0].token}`)
    .send({
        description:"Hava Kha"
    })
    .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task.description).not.tobeNull
    expect(task.completed).toEqual(false)
})

test('Fetch user task' , async()=>{
    const response = await request (app)
    .get('/task')
    .set('Authorization' , `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    // .expect(response.body.length).toEqual(2)
})

test('dont delete other users tasks' , async () =>{
    const response = await request(app)
    .delete(`/task/${taskOne._id}`)
    .set('Authorization' , `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    // const task = await Task.findById(taskOne._id)
    // expect(task).not.tobeNull
})

// // test('Upload avatar' , async()=>{
// //     await request(app)
// //     .post('user/me/avatar')
// //     .set('Authorization' , `Bearer ${userOne.tokens[0].token}`)
// //     .attach('avatar','tests/fixtures/ic.jpg')
// //     .expect(200)
// //     const user= await User.findById(userOneId)
// //     expect(user.avatar).toEqual(expect.any(Buffer))
// // })