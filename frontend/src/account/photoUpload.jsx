import axios from 'axios'
import PropTypes from 'prop-types'
export default function PhotoUpload({addedPhoto,setAddedPhoto}){
  const removePhoto=(fileName,event)=> {
    event.preventDefault()
    console.log(fileName)

  }
    const linkP = addedPhoto.map((one) => {
        return (
          <div className="link-img-div" key={one}>
            <img
              className="link-img"
              src={`http://localhost:5000/uploads/${one}`}
              alt={one}
            />
            <div onClick={removePhoto(one,event)} className="link-img-del" ><img src="/trash.svg"/> </div>
          </div>
        );
      });
       const photoUpload= async (event)=> {
    try{
        const files=event.target.files
        const formData=new FormData()
        for(let i=0;i<files.length;i++){
          formData.append('photos',files[i])
        }
        const {data}= await axios.post("/uploads",formData,{
          headers:{
            "Content-Type":"multipart/form-data"
          }
        })

        for(let i in data){
         setAddedPhoto((prev)=> {
          return [...prev,`${data[i]}`]
         })
        }
    } catch(error){
      console.log("error in photo uploading",error)
    }
  }
    return (
        <>
           
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
        </>
    )
}
PhotoUpload.propTypes = {
    addedPhoto: PropTypes.arrayOf(PropTypes.string).isRequired,
    setAddedPhoto: PropTypes.func.isRequired,
  };