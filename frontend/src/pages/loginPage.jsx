import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./userContext";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      setUser(data);
      setRedirect(true);
    } catch (err) {
      console.log("error loggin ");
    }
  };
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="login">
        <h1 className="login-h">LogIn</h1>
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
