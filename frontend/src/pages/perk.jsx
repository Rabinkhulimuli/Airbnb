export default function Perks(){

    return (
        <>
            <div className="check-box">
                <label className="label-a">
                  <input type="checkbox" />
                  <img src="/wifi.svg" />
                  <span> Wifi</span>
                </label>
                <label className="label-a">
                  <input type="checkbox" />
                  <img className="profile-png" src="/kitchen.jfif" />
                  <span> Kitchen</span>
                </label>
                <label className="label-a">
                  <input type="checkbox" />
                  <img src="/tv.svg" />
                  <span> TV</span>
                </label>
                <label className="label-a">
                  <input type="checkbox" />
                  <img src="/car-front.svg" />
                  <span> Parking</span>
                </label>
                <label className="label-a">
                  <input type="checkbox" />
                  <img src="/box-arrow-in-down-left.svg" />
                  <span> Private entrance</span>
                </label>
              </div>
        </>
    )
}