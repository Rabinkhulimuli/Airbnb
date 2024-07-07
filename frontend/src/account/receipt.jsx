import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import PhotoGrid from "../pages/photoGrid";
import "../css/pagelist.css";
export async function loader({ params }) {
  try {
    const { data } = await axios.get("/bookNow");
    const { id } = params;

    return data.find(({ _id }) => _id === id);
  } catch (err) {
    console.log(err);
  }
}

export default function Receipt() {
  const [booking, setBooking] = useState([]);
  const Ldata = useLoaderData();

  useEffect(() => {
    setBooking(Ldata);
  }, [Ldata]);
  if (!booking) {
    return <div>Loading ...</div>;
  }
if (!Ldata){
    return <div>No data found</div>
}
  return (
    <>
      <h2>{booking.place?.title} </h2>
      <div className="receipt-info">
        <div>
          <h5 className="receipt-info-i">Your booking Information</h5>
          <div className="n-day">
            <div className="m-m-i">
              <img className="mini-i" src="/moon-stars.svg" />
              <p>
                {" "}
                {differenceInCalendarDays(
                  new Date(booking.checkOut),
                  new Date(booking.checkIn)
                )}{" "}
                Nights{" "}
              </p>
            </div>
            <div className="m-m-i">
              <div className="m-m-i">
                <img className="mini-i" src="/calendar3.svg" />
                <p>
                  {" "}
                  {booking.checkIn}
                  {"->"}{" "}
                </p>
              </div>
              <div className="m-m-i">
                <img className="mini-i" src="/calendar3.svg" />
                <p> {booking.checkOut}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="receipt-info-ii">
          <p className="receipt-info-ii">Total Price</p>
          <p className="receipt-info-ii"> ${booking.price} </p>
        </div>
      </div>
      {booking.place && <PhotoGrid page={booking.place} />}
    </>
  );
}
