import { Link } from "react-router-dom";
import "./css/navbar.css"
import {UserContext} from './pages/userContext'
import {useContext} from "react"
export default function Navbar(){
  const {user}=useContext(UserContext)
    return (
      <>
        <div className="nav-flex">
          <div className="home-l-m">
            <Link className="home-l" to="/" >
                <img className="home-i" src="/house-add.svg" />
                <h4 className="home-i-h4" >Mirrage</h4>
            </Link>
           
           
          </div>
          <div className="o-search-c" >
            <div className="search-c">
              <p className="nav-m" >where</p>
              <p className="nav-m-s" >Search destination</p>
            </div>
            <div className="search-c">
              <p className="nav-m" >Check In</p>
              <p className="nav-m-s" >Add Dates</p>
            </div>
            <div className="search-c">
              <p className="nav-m" >Check Out</p>
              <p className="nav-m-s" >Add Dates</p>
            </div>
            <div className="search-c">
              <p className="nav-m" >Who</p>
              <p className="nav-m-s" >Add Guest</p>
            </div>
            <div className="home-i-b-d">
              <button className="home-i-b" >
              <img  className="home-i-i" src="/search-heart.svg" /> 
              <p className="nav-m" >Search</p>
            </button>
            </div>
            
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