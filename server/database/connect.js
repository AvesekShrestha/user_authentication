const mongoose = require("mongoose")
require("dotenv").config()


mongoose.connect(`${process.env.DATABASE_URL}`).then(()=>{
    console.log("Connection successfull.")
}).catch((error)=>{
    console.log("Connection cannot be established")
})

