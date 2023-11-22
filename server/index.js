const express = require("express")
const app = express()
require("./database/connect")
const User = require('./model/user')
const cors = require('cors')
const authRoute = require('./routes/auth')
const requireAuth = require('./middleware/requireAuth')
const privateRoute = require("./routes/private")


app.use(express.json())
app.use(cors())

app.use("/auth" , authRoute)

app.get("/" , requireAuth , async(req , res)=>{
    const data = await User.find();
    res.status(200).json(data)

})

app.use("/owner" , requireAuth , privateRoute);


app.listen(8000)