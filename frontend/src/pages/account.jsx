import { useContext, useState } from "react";
import { Navigate, Link, Outlet } from "react-router-dom";
import { UserContext } from "./userContext";

export default function Account() {
  const { user, ready } = useContext(UserContext);
  const [act, setAct] = useState(1);
  const styles = {
    backgroundColor: "rgb(231, 16, 124)",
    boxShadow: "1.5px 0px 2px 2px rgb(223, 103, 177)",
  };
  if (!ready) {
    return <div>Loading ... </div>;
  }
  if (ready && !user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <>
      <div className="account-h">
        <nav>
          <Link
            className={`account-l `}
            to=""
            style={1 == act ? styles : null}
            onClick={() => setAct(1)}
          >
            <img className="profile-png" src="/user.png" />
            
            <span>  My Profile</span>
            
          </Link>
          <Link
            className={`account-l `}
            to="booking"
            style={2 == act ? styles : null}
            onClick={() => setAct(2)}
          >
            <img className="profile-png" src="/bar.png"/>
            <span>My Bookings </span>
          </Link>
          <Link
            className={`account-l `}
            to="places"
            style={3 == act ? styles : null}
            onClick={() => setAct(3)}
          >
            <img className="profile-png" src="/house-add.svg" />
            <span> My Accommodations </span>
           
          </Link>
        </nav>
      </div>
      <Outlet />
     
    </>
  );
}
