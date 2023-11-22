const express = require("express")
const router = express.Router()

router.get("/private" , (req, res)=>{
    res.status(200).json({messsage : "This is private."})
})


module.exports = router;