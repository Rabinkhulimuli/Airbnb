import axios from 'axios'
import {useContext} from 'react'
import {Navigate} from "react-router-dom"
import {UserContext} from "../pages/userContext"
import "../css/pagelist.css"
export default function Profile(){
    const {setUser,setLoggedin,user}= useContext(UserContext)
    const logOut=async ()=> {
        await axios.post("/logout")
        setUser(null)
        setLoggedin(false)
        return <Navigate to="/"/>
      }
      console.log(user)
    return (
        <>
        <div className="user-in-fo" >
          <h1 className="user-in-fo-i">  Your profile info</h1>
          <h2 className="user-in-fo-i">Name : {user.name}</h2>
          <h2 className="user-in-fo-i"> Email: {user.email} </h2>
        </div>
        <div className=" sec-div">
        <button  className="log-out" onClick={logOut} >Log Out</button>
      </div>
        </>
    )
}