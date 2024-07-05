import { Link ,useNavigate} from "react-router-dom"
import { useState,useContext } from "react"
import { UserContext } from "./userContext"

import axios from "axios"
export default function Register(){
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [confirm,setConfirm]=useState("")
    const [password,setPassword]=useState("")
    const {loggedin}=useContext(UserContext)
    const navigate=useNavigate()
    if (loggedin){
        return navigate("/account")
    }
    async function registerUser(event){
       event.preventDefault()
        
       await axios.post("/register",{
            name,
            email,
            password
        })
    }
    return (
        <>
            <div className="login" >
          <h1 className="login-h">Register now</h1>
            <form onSubmit={registerUser} >
                <label>Full Name:</label>
                <input className="login-i" type="text" placeholder="Full name"
                    value={name} 
                    onChange={(event)=> setName(event.target.value)}
                />
                <label>Email:</label>
                <input className="login-i" type="email" placeholder="@gmail.com"
                    value={email}
                    onChange={(event)=> setEmail(event.target.value)}
                ></input>
                <label>Create Password:</label>
                <input className="login-i" type="password" placeholder="password"
                    value={confirm} 
                    onChange={(event)=> setConfirm(event.target.value)}
                ></input>
                <label htmlFor="cpassword">Confirm Password:</label>
                <input className="login-i" type="password" placeholder="Retype password"
                    value={password}
                    onChange={(event)=> setPassword(event.target.value)}
                ></input>
                
                { (confirm != password && password != ""&& confirm !="") ?
                <div>
                     <button className="login-b" disabled={true}  >Submit</button>
                     <p>Password mismatch</p>
                </div> :
               <button className="login-b" type="submit"  >Submit</button>}
                <div className="reg-f">
                    <p className="reg-f-p">Already have an account ? </p>
                    <Link to="/login"  > Log In</Link>
                </div>
            </form>
            
            </div>  
        </>
    )
}