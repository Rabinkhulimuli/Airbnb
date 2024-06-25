const express= require("express")
const multer=require("multer")
const {createUser,
    getUser,
    getProfile,
    logOut,
    photoLinks,
    uploadPhotos
} = require("../controller/taskList")
const multerMiddleware= multer({dest:'uploads/'})
const router=express.Router()

router.route("/register").post(createUser)
router.route("/login").post(getUser)
router.route("/profile").get(getProfile)
router.route("/logout").post(logOut)
router.route("/uploadByLink").post(photoLinks)
router.route("/uploads").post(multerMiddleware.array('photos',10),uploadPhotos)
module.exports=router