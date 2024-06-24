import {Link,useParams} from 'react-router-dom'
export default function Accomodation(){
    const{action}=useParams()
    return (
        <>
        <h1>This is Accomodation section</h1>
        {action !=='new' &&(
            <div className="new-p-b" >
            <Link to="new" className="new-place" >+ Add New Place</Link>
        </div>

        )}
        {action ==='new' &&(
            <div>
                <form>
                    <h2>Title</h2>
                    <p>title should be short and catchy as in advertisement </p>
                    <input className="input-place" type="text" placeholder='title, for example : my lovely ..' />
                    <h2>Address</h2>
                    <p>Address to your place</p>
                    <input className="input-place" type="text" placeholder='address' />
                    <h2>Photos</h2>
                    <p>More is better</p>
                    <input type="text" placeholder='Add link of photo' />
                    <button>Add Photo</button>
                    <div className="button-g-m">
                        <button className="button-g">
                            <img className="profile-png" src="/cloud-arrow-up.svg" />
                            Upload</button>
                    </div>
                    <div>
                        <h2>Description</h2>
                        <p>Description of the place</p>
                        <textarea className="textarea" />
                    </div>
                    <div>
                        <h2>Perk</h2>
                        <p>sellect all the perks of your place</p>
                        <div>
                            <label>
                                <input type="checkbox"/>
                                <span>Wifi</span>
                            </label>
                            <label>
                                <input type="checkbox"/>
                                <span>Kitchen</span>
                            </label>
                            <label>
                                <input type="checkbox"/>
                                <span>TV</span>
                            </label>
                            <label>
                                <input type="checkbox"/>
                                <span>Parking</span>
                            </label>
                            </div>
                    </div>
                </form>
            </div>
        )

        }
        
       
        </>
    )
}