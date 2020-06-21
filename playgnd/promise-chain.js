require('../src/db/mongoose')
const User = require('../src/models/user')

//5ee5e3c6db64e67e08868d1e
//mongoose -findbyid and update

// User.findByIdAndUpdate('5ee5e3c6db64e67e08868d1e',{age : 12}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:12})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })
const updNcont = async(id,n)=>{
    const user = await User.findByIdAndUpdate(id , {age:n})
    const cnt = await User.countDocuments({age:n})
    return cnt
}

updNcont('5ee5e3c6db64e67e08868d1e' , 7).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})