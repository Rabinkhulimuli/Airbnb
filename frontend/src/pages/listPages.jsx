import axios from "axios";
import "../css/pagelist.css";
import { useEffect, useState,useContext } from "react";
import { useParams ,Navigate,useNavigate,useLoaderData} from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";
import PhotoGrid from "./photoGrid";
import { UserContext } from "./userContext";
export async function loader(){
  const {data}=await axios.get("/allPages")
  return data
}
export default function ListPages() {
  const [dataList, setDataList] = useState([]);
  const [fullPage, setFullPage] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guest, setGuest] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(977);
  const [redirect, setRedirect] = useState("");
  const { id } = useParams();
  const {loggedin}=useContext(UserContext)
  const navigate=useNavigate()
  let difference = 0;
  if (checkIn && checkOut) {
    difference = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }


const ldata=useLoaderData()
useEffect(()=> {
  setDataList(ldata)
},[ldata])
  const page = dataList?.find((eh) => eh._id === id);
  if (!page) {
    return <div>Sorry there arent any pages now</div>;
  }
  if (fullPage) {
    return (
      <div style={{ backgroundColor: "grey" }}>
        <button className="f-xd" onClick={() => setFullPage(false)}>
          X Go Back
        </button>

        <div className="r-e-l-l">
          {page?.addedPhoto[3] &&
            page.addedPhoto?.map((eh) => (
              <img
                className="r-e-l"
                key={eh}
                src={`http://localhost:5000/uploads/${eh}`}
              />
            ))}
        </div>
      </div>
    );
  }
  const bookNow = async (ev) => {
    ev.preventDefault();
    if (!loggedin){
      return navigate("/login?You must login first !!")
    }
    try {
      const { data } = await axios.post("/bookNow", {
        
        name,
        phone,
        checkIn,
        checkOut,
        guest,
        place: page._id,
        price: difference * page.Price,
      });

      setRedirect(`/account/booking/${data._id}`);
    } catch (err) {
      console.log(err);
    }
  };
  if (redirect){
    return <Navigate to={redirect}/>
  }
  return (
    <>
      <h2>Your Places</h2>
      <div className="individual">
        <h1>{page?.title} </h1>
        <a href={"https://google.com/maps?q" + page?.location}>
        <img className="loc-img" src="/geo-alt.svg" /> {" "}
        <p className="loc-p" >{page?.location} </p>
          {" "}
        </a>
        <PhotoGrid page={page} />
        <button className="individual-b" onClick={() => setFullPage(true)}>
          <img src="/images.svg" />
          <span> Show More Photos</span>
        </button>
      </div>

      <div className="des-h2">
        <div>
          <div className="des-h1">
            <h2>Description</h2>
            {page.description}
          </div>
          <div className="des-h3">
            Check In:{page.checkIn}
            <br></br>
            Check Out:{page.checkOut}
            <br></br>
            Guest Size:{page.maxGuest}
          </div>
        </div>
        <form onSubmit={bookNow}>
          <div className="des-h4">
            <div className="des-h5">
              Price:${page.Price}
              <sub>/Night </sub>{" "}
            </div>
            <div className="pay">
              <div className="pay-c">
                <label>Check In :</label>
                <input
                  type="date"
                  value={checkIn}
                  required
                  onChange={(ev) => setCheckIn(ev.target.value)}
                />
                <br></br>
              </div>
              <div className="pay-c">
                <label>Check Out :</label>
                <input
                  value={checkOut}
                  onChange={(event) => setCheckOut(event.target.value)}
                  type="date"
                  required
                />
              </div>
            </div>

            <div className="pay-g">
              <label>No.of Guest</label>
              <input
                type="number"
                value={guest}
                onChange={(ev) => setGuest(ev.target.value)}
              />
            </div>
            <div className="pay-g">
              <label>Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>
            <div className="pay-g">
              <label>Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
              />
            </div>
            {difference > 0 && (
              <div className="des-h6">
                <span>Total cost $</span>
                <span>{difference * page.Price}</span>
              </div>
            )}
            <button className="des-h6">^^^ Book Now ^^^</button>
          </div>
        </form>
      </div>
      <div>
        <div className="des-h1">
          <h2>Extra Info</h2>
          {page.extraInfo}
        </div>
      </div>
    </>
  );
}
