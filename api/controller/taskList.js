const User = require("../model/user")
const mongoose= require("mongoose")
const PlaceModel=require("../model/place")
const imageDownloader=require("image-downloader")
const bcrypt=require("bcryptjs")
bcryptSalt=bcrypt.genSaltSync(10)
const jwt = require("jsonwebtoken")
const fs=require("fs")
const loc=require("path")
require ("dotenv").config()
const jwtSecret=process.env.jwt_secret
const createUser =async (req,res)=> {
    try {
        const {name,email,password}= req.body
        const newUser= await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
        })
        return res.status(201).json({name: newUser.name,email:newUser.email})
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
    try{
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
    } catch(error){
        console.log("error getting profile")
    }   
}
const logOut= (req,res)=> {
    return res.status(200).cookie('token'," ").json({msg:"log out successfully"})
}
const photoLinks=async (req,res)=> {
    try{
        const {Link}= req.body
    const newName="photo" + Date.now()+ ".jpg"
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
        let newPath=path+ "."+ext
        fs.renameSync(path,newPath)
        
        uploadedPhoto.push(loc.basename(newPath))
    }
   
    res.json(uploadedPhoto)
}
const uploadPage= (req,res)=> {
    const { title,
        location,
        description,
        addedPhoto,
        perk,
        extraInfo,
        checkIn,
    checkOut,
maxGuest} = req.body
       console.log(req.body)
            const{token}=  req.cookies
            if(token){
                jwt.verify(token,jwtSecret,{},async (err,user)=> {
                        if(err){
                            throw err
                        }
                        console.log(user)
                        const newPlace= await PlaceModel.create({

                            owner:user.id,
                            title,
                            location,
                            addedPhoto,
                            description,
                            perk,
                            extraInfo,
                            checkIn,
                            checkOut,
                            maxGuest
                        })
                        return res.status(201).json(newPlace)
                })
               
                }
                else {
                    res.json({msg:"token invalid bkend"})
                }
       
}
const getPages=(req,res)=> {
    const {token}= req.cookies
    jwt.verify(token,jwtSecret,{},async (err,userData)=> {
        if(err){
            throw err
        }
        const {id}=userData
        res.status(200).json(await PlaceModel.find({owner:id}))

    })
}
const findPage=async(req,res)=> {
    try{
      const {id}= req.params
    const data =await PlaceModel.findById(id)
    res.status(200).json(data)  
    } catch(err){
        res.status(404).json({msg:err})
    }
    
}
const UpdatePage=async(req,res)=> {
    const {
        id, title,
        location,
        addedPhoto,
        description,
        perk,
        extraInfo,
        checkIn,
        checkOut,
        maxGuest
    } = req.body
    const {token}= await req.cookies
    jwt.verify(token,jwtSecret,{},async(err,UserData)=> {
        if(err){
            throw err
        }
        const page=await PlaceModel.findById(id)
        if(page.owner.toString() ===UserData.id){
            page.set({
                title,
                location,
                addedPhoto,
                description,
                perk,
                extraInfo,
                checkIn,
                checkOut,
                maxGuest
            })
            await page.save()
            res.status(200).json({msg:"data updated"})
        }
    })
   
}
module.exports={
    createUser,
    getUser,
    getProfile,
    logOut,
    photoLinks,
    uploadPhotos,
    uploadPage,
    getPages,
    findPage,
    UpdatePage
}