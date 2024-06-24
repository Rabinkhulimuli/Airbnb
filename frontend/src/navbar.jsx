import { Link } from "react-router-dom";
import "./css/navbar.css"
import {UserContext} from './pages/userContext'
import {useContext} from "react"
export default function Navbar(){
  const {user}=useContext(UserContext)
    return (
      <>
        <div className="nav-flex">
          <div className="home-l">
            <Link to="/" >
                <img className="home-i" src="/download.png" />
            </Link>
           
            <h4>Mirrage</h4>
          </div>
          <div className="o-search-c" >
            <div className="search-c">Anywhere</div>
            <div className="search-c">Any Week</div>
            <div className="search-c">Add Guest</div>
            <button className="home-i-b" >
              <img  className="home-i-i" src="/s-icon.jfif" /> 
            </button>
          </div>
          <div className="user-png-m" >
              <img className="user-png" src="/bar.png" />
              <Link to={user? "/account":"/login"} >
                  <img className="user-png" src="/user.png" />
                  
              </Link>
              {!!user&&<h3 className="user-profile" >{user.name}</h3> }
          </div>
        </div>
      </>
    );
}