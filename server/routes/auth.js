const express = require('express')
const router = express.Router()
const validator = require('validator')
const User = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()


const createToken = (_id)=>{
    return jwt.sign({_id} , process.env.SECRET_KEY, {expiresIn : '3d'});
}

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Both field must be filled." })
    if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid email address." })

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword })

    try {
        await newUser.save()
        const token = createToken(newUser._id);

        res.status(200).json({email , token});
    } catch (error) {
        return res.status(400).json({ message: "Error Occured." + error })
    }
})

router.post("/login" , async(req , res)=>{
    const {email , password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message : "Account not found."})
        const passwordMatch = await bcrypt.compare(password , user.password);
        
        if(passwordMatch){
            const token = createToken(user._id)
            return res.status(200).json({email , token})

        }
        else return res.status(400).json({message : "Incorrect passwrod"})
    }catch(error){ return res.status(400).json({message : "Error occured"})}
})

module.exports = router;