const express= require("express")
const {createUser,
    getUser,
    getProfile,
    logOut
} = require("../controller/taskList")
const router=express.Router()

router.route("/register").post(createUser)
router.route("/login").post(getUser)
router.route("/profile").get(getProfile)
router.route("/logout").post(logOut)

module.exports=router