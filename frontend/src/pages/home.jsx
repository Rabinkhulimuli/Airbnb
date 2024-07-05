import axios from "axios";
import "../css/navbar.css";
import { useEffect, useState } from "react";
import { Link,useLoaderData } from "react-router-dom";
export async function loader(){
  const {data}= await axios.get('/allPages')
  return data
}
export default function Home() {
  const [pageData, setPageData] = useState([]);
  const Ldata=useLoaderData()
  useEffect(()=> {
    setPageData(Ldata)
  },[Ldata])
 /*  useEffect(() => {
    axios
      .get("/allPages")
      .then((res) => setPageData(res.data))
      .catch((err) => console.log(err));
  }, []); */

  const pages = pageData.map((eh) => {
    return (
      <div key="eh._id">
        <div className="g-places">
          <Link to={`${eh._id}`}>
            {" "}
            <img
              className="link-img"
              src={`http://localhost:5000/uploads/${eh.addedPhoto[0]}`}
            />{" "}
          </Link>

          <h2>{eh.title}</h2>
          <h3>{eh.location} </h3>
          <p>
            {" "}
            ${eh.Price}
            <sub>per night</sub>{" "}
          </p>
        </div>
        
      </div>
    );
  });
  return (
    <>
      <h1>This is home page</h1>
      <div className="m-f-p">{pages}</div>
    </>
  );
}
