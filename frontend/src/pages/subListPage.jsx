import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function SubList() {
  const [data1, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/newPage")
      .then(({ data }) => setData(data))
      .catch((err) => console.log(err));
  }, []);
  const display = data1.map((eh) => {
    return (
      <div key={eh._id}>
        <Link to={`../${eh._id}`}>
          <div className="sub-m-img">
            <img
              className="sub-img"
              src={`http://localhost:5000/uploads/${eh.addedPhoto[0]}`}
            />
            <div>
              <h2>{eh.title} </h2>
              <p className="sub-img-p">{eh.description} </p>
            </div>
          </div>
        </Link>
      </div>
    );
  });
  return (
    <>
      <h1>Your Places</h1>
      {display}
    </>
  );
}
