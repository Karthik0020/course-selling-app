const { Router } = require("express")
const { userModel } = require("../db")
const  zod  = require('zod');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const userRouter = Router();
const JWT_SECRET = "USER_APP";

const signUpSchema = zod.object({
    email: zod.string(),
    password: zod.string(3 ,"password must contain minimum 6 character"),
    firstName: zod.string(1,"First Name is required"),
    lastName: zod.string(1,"last name is requires")
}) 

userRouter.post("/signup", async (req,res) => {

    const parsedData = signUpSchema.safeParse(req.body);

    if(!parsedData.success){
        return res.status(400).json({
            error: parsedData.error.format()
        })
    }

    const {email, password, firstName, lastName } = parsedData.data;

    const hashedPassword = await bcrypt.hash(password,10);

    try{
    await userModel.create({
        email,
        hashedPassword,
        firstName,
        lastName
    })
    } catch(e){
        res.status(400).json({
            msg:"failed to signUp"
        })
    }

    res.json({
        msg: "signed up successfuly"
    })
})

userRouter.post("/signin", async (req,res) => {
    const {email,password} = req.body;

    const user = await userModel.findOne({
        email: email,
    })
        

    if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
    }

    isMatch = await bcrypt.compare(password, user.hashedPassword)

    if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
    }

    if(user){
        const token =await jwt.sign({
            email: user.email
        }, JWT_SECRET)
        res.send({
            token
        })
    }
    
})



userRouter.get("/course", (req,res) => {
    res.json({
        msg: "signin page"
    })
})

module.exports = {
    userRouter
}