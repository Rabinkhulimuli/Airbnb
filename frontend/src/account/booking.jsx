import axios from "axios";
import { differenceInCalendarDays } from "date-fns";

import {  useState, useEffect } from "react";
import {Link,useLoaderData} from 'react-router-dom'
import "../css/pagelist.css"
export async function loader(){
  const {data}= await axios.get("/bookNow")
  return data
}
export default function Booking() {
  const [receipt, setReceipt] = useState([]);
  const Ldata=useLoaderData()
  useEffect(()=> {
    setReceipt(Ldata)
  },[Ldata])

  return (
    <>
      <h1>This is Booking section</h1>
      {receipt.length > 0 &&
        receipt.map((rec) => (
          <div key={rec._id} className="sub-m-i">
            <img
              className="sub-img"
              src={`http://localhost:5000/uploads/${rec.place.addedPhoto[0]}`}
            />
            <Link to={rec._id}  >
            <div>
              <h2 className="title-i-i" >{rec.name} </h2>
              <div className="n-day" >
              
              <div className="m-m-i" >
                <img className="mini-i" src="/moon-stars.svg" />
                <p>
                {" "}
                
                {differenceInCalendarDays(
                  new Date(rec.checkOut),
                  new Date(rec.checkIn)
                )}{" "}
                Nights{" "}
              </p>
              </div>
              <div className="m-m-i" >
              
                <div className="m-m-i" >
                    <img className="mini-i" src="/calendar3.svg" />
                <p>
                  {" "}
                  {rec.checkIn}{"->"}
                 {" "}
                 
                </p>
                </div>
                 <div className="m-m-i" ><img className="mini-i" src="/calendar3.svg" />
                 <p> {rec.checkOut}</p>

                 </div>
              </div>
                
              </div>

              <div className="m-m-i" >
                <img className="mini-i-1" src="/credit-card-2-back.svg" />
                <p className="pr-l" >
              {" "}
               Price: {rec.price}{" "}
            </p>
              </div>
              
              
            </div>
            </Link>
            
           
          </div>
        ))}
    </>
  );
}

