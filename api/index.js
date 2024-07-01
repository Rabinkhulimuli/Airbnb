const express = require("express")
const app = express()
const cors= require("cors")
const cookieParser=require("cookie-parser")
const task= require("./router/task")
require ("dotenv").config()
const connectDB= require("./db/connect")

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))
app.use(express.json())
app.use(cookieParser())
app.use("/uploads",express.static(__dirname+"/uploads"))
app.use("/",task)
const PORT = 5000

/* app.listen(PORT,()=> {
    console.log(`server started at localhost:${PORT} successfully`)
}) */
const start= async ()=> {
    try {
        await connectDB(process.env.mongoo_uri)
        console.log("** Database Connected **");
        app.listen(PORT,()=> {
            console.log(`server started at localhost:${PORT} successfully`)
        })
    } catch (error){
        console.log(error)
    }
}
start()

