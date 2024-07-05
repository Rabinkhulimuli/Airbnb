import { BrowserRouter, Routes, Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/loginPage";
import Layout from "./layout";
import Home,{loader as homeLoader} from "./pages/home";
import Register from "./pages/register";
import axios from "axios";
import Account from "./pages/account"
import Profile from "./account/profile";
import "./css/pagelist.css"
import Accomodation,{loader as accomodationLoader} from "./account/accommodation";
import Booking,{loader as bookingLoader} from "./account/booking";
import ListPages,{loader as listPageLoader} from "./pages/listPages"
import Receipt,{loader as receiptLoader} from "./account/receipt";

import UserContextProvider from "./pages/userContext";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

const router =createBrowserRouter(createRoutesFromElements(
  
            <Route element={<Layout />}>
              <Route  path="/" element={<Home />} loader={homeLoader} />
              <Route path=":id" element={<ListPages /> }  loader={listPageLoader} />
              
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="account" element={<Account/>}>
                <Route index  element={<Profile/>}/>
                <Route path="booking" element={<Booking/>} loader={bookingLoader} />
                <Route path="booking/:id" element={<Receipt/>} loader={receiptLoader} />
                <Route path="places" element={<Accomodation/>} />
                <Route path="places/:action" element={<Accomodation/>}  />
                <Route path=":id" element={<Accomodation/>} loader={accomodationLoader} />
              </Route>
              <Route path="*" element={<div>This Page doesnt exist</div>} />
            </Route>
          

))
/* function App() {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route  path="/" element={<Home />} />
              <Route path=":id" element={<ListPages /> }/>
              
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="account" element={<Account/>}>
                <Route index element={<Profile/>}/>
                <Route path="booking" element={<Booking/>}/>
                <Route path="booking/:id" element={<Receipt/>} />
                <Route path="places" element={<Accomodation/>}/>
                <Route path="places/:action" element={<Accomodation/>}/>
                <Route path=":id" element={<Accomodation/>} />
              </Route>
              <Route path="*" element={<div>This Page doesnt exist</div>} />
            </Route>
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}
 */
function App(){
  return(
    <>
      <UserContextProvider>
        <RouterProvider router={router}/>
      </UserContextProvider>
    </>
  )
}
export default App;
