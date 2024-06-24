import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/loginPage";
import Layout from "./layout";
import Home from "./pages/home";
import Register from "./pages/register";
import axios from "axios";
import Account from "./pages/account"
import Profile from "./account/profile";
import Accomodation from "./account/accommodation";
import Booking from "./account/booking";
import UserContextProvider from "./pages/userContext";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
function App() {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="account" element={<Account/>}>
                <Route index element={<Profile/>}/>
                <Route path="booking" element={<Booking/>}/>
                <Route path="places" element={<Accomodation/>}/>
                <Route path="places/:action" element={<Accomodation/>}/>
              </Route>
              <Route path="*" element={<div>This Page doesnt exist</div>} />
            </Route>
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
