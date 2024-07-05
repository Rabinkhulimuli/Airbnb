import { useState, useContext } from "react";
import { Link, Navigate,useSearchParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./userContext";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser ,user,setLoggedin} = useContext(UserContext);
  const valid=useSearchParams()
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      setLoggedin(true)
      setUser(data);
     
      setRedirect(true);
    } catch (err) {
      console.log( err);
    }
  };
  if (redirect || user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="login">
        
        <h1 className="login-h">LogIn</h1>
        <div style={{color:'white'}} >{valid} </div>
        <form onSubmit={handleLogin}>
          <input
            className="login-i"
            type="email"
            placeholder="@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></input>
          <input
            className="login-i"
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <button className="login-b">Login</button>
          <div className="reg-f">
            <p className="reg-f-p">Dont have an account yet ? </p>
            <Link to="/register"> Register now</Link>
          </div>
        </form>
      </div>
    </>
  );
}
