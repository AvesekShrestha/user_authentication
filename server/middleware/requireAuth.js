const jwt = require('jsonwebtoken')
require("dotenv").config()


const requireAuth =(req , res , next)=>{
    const {authorization} = req.headers;

    if(!authorization) return res.status(401).json({message : "You are not authorized"});
    const token = authorization.split(" ")[1];
    try{
        if(jwt.verify(token , process.env.SECRET_KEY)) next()
    }catch(error){res.status(401).json({message : "Your credients has been changed. Is this really you."})}
}


module.exports = requireAuth;