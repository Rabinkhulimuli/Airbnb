import axios from 'axios'
import {useContext} from 'react'
import {Navigate} from "react-router-dom"
import {UserContext} from "../pages/userContext"
export default function Profile(){
    const {setUser}= useContext(UserContext)
    const logOut=async ()=> {
        await axios.post("/logout")
        setUser(null)
        return <Navigate to="/"/>
      }
    return (
        <>
        <h1>This is profile section</h1>
        <div className=" sec-div">
        <button  className="log-out" onClick={logOut} >Log Out</button>
      </div>
        </>
    )
}