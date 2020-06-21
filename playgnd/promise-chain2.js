require('../src/db/mongoose')
const Task = require('../src/models/tasks')

// Task.findByIdAndDelete('5ee5ed446de5f7322c6b60e1').then(()=>{
//     return Task.find({completed:false})
// }).then((task)=>{
//     console.log(task)
// }).catch((e)=>{
//     console.log(e)
// })

const findNdel = async(id) =>{
    const task = await Task.findByIdAndDelete(id)
    const cnt = await Task.countDocuments({completed : false})
    return cnt
}
findNdel('5ee62f3b1c35ec3d30fcae8d').then((task)=>{
    console.log(task)
}).catch((e)=>{
    console.log(e)
})