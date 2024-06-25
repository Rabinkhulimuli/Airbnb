import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "../pages/perk";
import axios from "axios";
export default function Accomodation() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [addedPhoto, setAddedPhoto] = useState([]);
  const [photolink, setPhotolink] = useState("");
  const [description, setDescription] = useState("");
  const [perk, setPerk] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [check, setCheck] = useState([]);
  async function addPhotoByLinks(event) {
    event.preventDefault();
    const { data } = await axios.post("/uploadByLink", { Link: photolink });
    console.log(data);
    setPhotolink(" ");
    setAddedPhoto((prev) => {
      return [...prev, data];
    });
  }
  const preInput = (header, desc) => {
    return (
      <>
        <h2>{header}</h2>
        <p>{desc}</p>
      </>
    );
  };
  const linkP = addedPhoto.map((one) => {
    return (
      <div key={one}>
        <img
          className="link-img"
          src={`http://localhost:5000/uploads/${one}`}
          alt={one}
        />
      </div>
    );
  });
  const photoUpload= async (event)=> {
    try{
      /* const files=event.target.files
      let formData = new FormData()
      for(let i=0;i<files.length;i++){
        formData.append('photos',files[i])
      }
      axios.post("/uploads",formData,{
        headers:{
          'Content-Type':"multipart/form-data"
        }
      }).then((res)=> {
        const {formData:filename}= res 
        setAddedPhoto((prev)=> {
          return [...prev,filename]
        })
      }) */
      
        const files=event.target.files

        const formData=new FormData()
        for(let i=0;i<files.length;i++){
          formData.append('photos',files[i])
        }
        const{formData:filename}= await axios.post("/uploads",formData,{
          headers:{
            "Content-Type":"multipart/form-data"
          }
        })
        setAddedPhoto((prev)=> {
          return [...prev,filename]
        })
    } catch(error){
      console.log("error in photo uploading",error)
    }
  }
  return (
    <>
      <h1>This is Accomodation section</h1>
      {action !== "new" && (
        <div className="new-p-b">
          <Link to="new" className="new-place">
            + Add New Place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div className="place-form">
          <form>
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
            <button onClick={addPhotoByLinks}>Add Photo</button>
            {addedPhoto.length > 0 && <div className="link-img-d">{linkP}</div>}
            <div className="button-g-m">
              <label className="button-g">
                <input type="file" multiple name="photos"
                  onChange={photoUpload}
                />
                <img className="profile-png" src="/cloud-arrow-up.svg" />
                Upload
              </label>
            </div>
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
              <Perks />
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
                  <input type="time" />
                </div>
                <div>
                  <h5>Check Out Time</h5>
                  <input type="time" />
                </div>
                <div>
                  <h5>Max Guest</h5>
                  <input type="number" />
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
