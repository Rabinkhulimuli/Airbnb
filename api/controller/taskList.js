const User = require("../model/user")
const mongoose= require("mongoose")

const bcrypt=require("bcryptjs")
bcryptSalt=bcrypt.genSaltSync(10)
const jwt = require("jsonwebtoken")
const jwtSecret="dkiew84ujreue943urhsje3wmd"
const createUser =async (req,res)=> {
    try {
        const {name,email,password}= req.body
        const newUser= await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
        })
        return res.status(201).json({ newUser})
    } catch (err){
        
        res.json({msg: err})
    }
}
const getUser= async(req,res)=> {
    try {
        const {email, password}= req.body
        const userEmail= await User.findOne({email})
        if(userEmail){
            const passOk= bcrypt.compareSync(password,userEmail.password)
            if (passOk){
                jwt.sign({email:userEmail.email,id:userEmail._id,name:userEmail.name},jwtSecret,{},(err,token)=> {
                    if (err){
                        throw err
                    }else {
                        res.cookie("token",token).status(200).json({name:userEmail.name,id:userEmail._id})
                    }
                })
                
            }
            else {
                res.status(422).json({msg:"incorrect password"})
            }
        } else {
            res.status(422).json({msg:"user wasnt found"})
        }
       

    }catch (err){
        res.status(404).json({msg :err})
    }
}
const getProfile= async (req,res)=> {
    const {token}= req.cookies
    if(token){
        jwt.verify(token,jwtSecret,{},(err,user)=> {
            if(err){
                throw err
            }
            res.status(200).json({user})
        })
    }else{
         res.status(404).json({msg: "token invalid "})
    }
    
}
const logOut= (req,res)=> {
    return res.status(200).cookie('token'," ").json({msg:"log out successfully"})
}
module.exports={
    createUser,
    getUser,
    getProfile,
    logOut
}