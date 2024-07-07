import { Link, useParams, Navigate,useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import Perks from "../pages/perk";
import axios from "axios";
import PhotoUpload from "./photoUpload";
import SubList from "../pages/subListPage";
export async function loader({params}){
  try{
  const {id}=params
  const {data}= await axios.get(`/page/${id}`)
  return data
 }catch(err){
    console.log(err)
  }
  return null
}
export default function Accomodation() {
  const { action, id } = useParams();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [addedPhoto, setAddedPhoto] = useState([]);
  const [photolink, setPhotolink] = useState(" ");
  const [description, setDescription] = useState("");
  const [perk, setPerk] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [check, setCheck] = useState({ in: 0, outT: 0, guest: 0,price:100 });
  const [redirec, setRedirect] = useState(false);
  const data= useLoaderData()
  
  useEffect(() => {
    if (id) {
       
        setTitle(data.title);
        setLocation(data.location);
        setAddedPhoto(data.addedPhoto);
        setDescription(data.description);
        setPerk(data.perk);
        setExtraInfo(data.extraInfo);
        setCheck({
          in: data.checkIn,
          outT: data.checkOut,
          guest: data.maxGuest,
          price:data.Price,
        });
      
    }
    setRedirect(false);
  }, [id,data]);

  async function addPhotoByLinks(event) {
    event.preventDefault();
    if (photolink !== " ") {
      const { data } = await axios.post("/uploadByLink", { Link: photolink });
      setPhotolink(" ");

      setAddedPhoto((prev) => {
        return [...prev, data];
      });
    }
  }
  const preInput = (header, desc) => {
    return (
      <>
        <h2>{header}</h2>
        <p>{desc}</p>
      </>
    );
  };
  const addNewPlace = async (event) => {
    const dataOb = {
      title,
      location,
      description,
      perk,
      extraInfo,
      checkIn: check.in,
      checkOut: check.outT,
      maxGuest: check.guest,
      Price:check.price,
      addedPhoto,
    };
    event.preventDefault();
    try {
      if (id) {
        await axios.put("/newPage", {
          id,
          ...dataOb,
        });
      } else if (action === "new") {
        await axios.post("/newPage", dataOb);
      } else {
        console.log("data is unable to be saved");
      }

      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirec) {
    return <Navigate to={"/account/places"} />;
  }
  const checkTime = (event) => {
    const { name, value } = event.target;

    setCheck({ ...check, [name]: value });
  };

  return (
    <>
      <div
        style={{
          width: "auto",
          height: "10px",
          backgroundColor: "transparent",
          margin: "5px",
        }}
      >
        {" "}
      </div>

      {id == undefined && action !== "new" && (
        <div>
          <div className="new-p-b">
            <Link
              to="new"
              className="new-place"
              onClick={() => setRedirect(false)}
            >
              + Add New Place
            </Link>
          </div>
          <div
            style={{
              width: "auto",
              height: "10px",
              backgroundColor: "transparent",
              margin: "5px",
            }}
          >
            {" "}
          </div>
          <SubList/>
        </div>
      )}

      {(!!id || action === "new") && (
        <div className="place-form">
          <form onSubmit={addNewPlace}>
            {preInput(
              "Title",
              "title should be short and catchy as in advertisement"
            )}

            <input
              className="input-place"
              type="text"
              placeholder="title, for example : my lovely .."
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            {preInput("Address", "Address to your place")}

            <input
              className="input-place"
              type="text"
              placeholder="address"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
            {preInput("Photos", "More is better")}

            <input
              type="text"
              placeholder="Add link of photo"
              value={photolink}
              onChange={(event) => setPhotolink(event.target.value)}
            />
            <div className="make-btn" onClick={addPhotoByLinks}>Add Photo</div>
            <PhotoUpload
              addedPhoto={addedPhoto}
              setAddedPhoto={setAddedPhoto}
            />

            <div>
              {preInput("Description", "Description of the place")}
              <textarea
                className="textarea"
                placeholder="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div>
              {preInput("Perk", "Sellect all the perks of your place")}
              <Perks perk={perk} setPerk={setPerk} />
            </div>
            <div>
              {preInput("Extra info", "house rules , etc")}

              <textarea
                className="textarea"
                placeholder="Rules"
                value={extraInfo}
                onChange={(event) => setExtraInfo(event.target.value)}
              />
            </div>
            <div className="check-i-o">
              {preInput(
                "Check In , Check Out, Max Guest",
                "Add check in check out time and maximum guest can stay there"
              )}

              <div className="check-box">
                <div>
                  <h5>Check In Time</h5>
                  <input
                    value={check?.in}
                    type="number"
                    name="in"
                    onChange={checkTime}
                  />
                </div>
                <div>
                  <h5>Check Out Time</h5>
                  <input
                    type="number"
                    value={check?.outT}
                    name="outT"
                    onChange={checkTime}
                  />
                </div>
                <div>
                  <h5>Max Guest</h5>
                  <input
                    value={check?.guest}
                    name="guest"
                    type="number"
                    onChange={checkTime}
                  />
                </div>
                <div>
                  <h5>Price per room</h5>
                  <input
                    value={check?.price}
                    name="price"
                    type="number"
                    onChange={checkTime}
                  />
                </div>
              </div>
            </div>
            <button className="log-out">Save</button>
          </form>
        </div>
      )}
    </>
  );
}
