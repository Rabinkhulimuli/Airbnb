import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
export const UserContext = createContext({});
export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready,setReady]= useState(false)
  const [loggedin,setLoggedin]=useState(false)
  useEffect(() => {
    try {
     
      if(loggedin && !!user){
        setReady(true)
      } 

      else if (!user) {
        axios.get("/profile") .then((data)=> {
            
            setUser(data.data.user)})
            setReady(true)
      } 
    } catch (err) {
      console.log("error retriving profile info");
    }
  }, [user,loggedin]);
  return (
    <UserContext.Provider value={{ user, setUser,ready,loggedin,setLoggedin}}>
      {children}
    </UserContext.Provider>
  );
}
UserContextProvider.propTypes = {
  children: PropTypes.node,
};
