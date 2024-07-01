const express= require("express")
const multer=require("multer")
const {createUser,
    getUser,
    getProfile,
    logOut,
    photoLinks,
    uploadPhotos,
    uploadPage,
    getPages,
    findPage,
    UpdatePage
} = require("../controller/taskList")
const multerMiddleware= multer({dest:'uploads/'})
const router=express.Router()

router.route("/register").post(createUser)
router.route("/login").post(getUser)
router.route("/profile").get(getProfile)
router.route("/logout").post(logOut)
router.route("/uploadByLink").post(photoLinks)
router.route("/uploads").post(multerMiddleware.array('photos',10),uploadPhotos)
router.route("/newPage").post(uploadPage).get(getPages).put(UpdatePage)
router.route("/page/:id").get(findPage)
module.exports=router