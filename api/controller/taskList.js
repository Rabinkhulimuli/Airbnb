const User = require("../model/user")
const mongoose= require("mongoose")
const imageDownloader=require("image-downloader")
const bcrypt=require("bcryptjs")
bcryptSalt=bcrypt.genSaltSync(10)
const jwt = require("jsonwebtoken")
const fs=require("fs")
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
        const {token}= await req.cookies
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
const photoLinks=async (req,res)=> {
    try{
        const {Link}= req.body
    const newName="photo" + Date.now()+ ".jpg"
    console.log(__dirname)
    await imageDownloader.image({
        url:Link,
        dest:'D:/web_intern/airbnb/api/uploads/'+ newName,
    })
    res.status(200).json(newName)
    } catch(error){
        res.json(error)
    }
}
const uploadPhotos=(req,res)=> {
    const uploadedPhoto=[]
    const files=req.files
    for(let i=0;i<files.length;i++){
        const{path,originalname}=files[i]
        const splitname= originalname.split(".")
        const ext=splitname[splitname.length-1]
        const newPath=path+ "."+ext
        fs.renameSync(path,newPath)
        uploadedPhoto.push(newPath.replace('uploads/',' '))
        console.log(path)
    }
   
    res.json(uploadedPhoto)
}
module.exports={
    createUser,
    getUser,
    getProfile,
    logOut,
    photoLinks,
    uploadPhotos
}