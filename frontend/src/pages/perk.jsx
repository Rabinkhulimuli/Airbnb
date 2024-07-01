import PropTypes from "prop-types"
export default function Perks({setPerk,perk}){
  const perkChanged= (event)=> {
    const {checked,name}= event.target
    if (checked){
      setPerk((prev)=> {
        return [...prev,name]
      })
    }
    else {
      setPerk((prev)=> prev.filter((one)=> one !== name))
    }
  }
    return (
        <>
            <div className="check-box">
                <label className="label-a">
                  <input name="wifi" type="checkbox" checked={perk.includes("wifi")} onChange={perkChanged}  />
                  <img src="/wifi.svg" />
                  <span> Wifi</span>
                </label>
                <label className="label-a">
                  <input name="kitchen" checked={perk.includes('kitchen')} type="checkbox" onChange={perkChanged} />
                  <img className="profile-png" src="/kitchen.jfif" />
                  <span> Kitchen</span>
                </label>
                <label className="label-a">
                  <input name="tv" type="checkbox" checked={perk.includes('tv')} onChange={perkChanged} />
                  <img src="/tv.svg" />
                  <span> TV</span>
                </label>
                <label className="label-a">
                  <input name="car" type="checkbox" checked={perk.includes('car')} onChange={perkChanged} />
                  <img src="/car-front.svg" />
                  <span> Parking</span>
                </label>
                <label className="label-a">
                  <input name="pr" type="checkbox" checked={perk.includes('pr')} onChange={perkChanged} />
                  <img src="/box-arrow-in-down-left.svg" />
                  <span> Private entrance</span>
                </label>
              </div>
        </>
    )
}
Perks.propTypes={
  perk : PropTypes.arrayOf(PropTypes.string).isRequired,
  setPerk : PropTypes.func.isRequired,
  
}