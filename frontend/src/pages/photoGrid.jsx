import PropTypes from 'prop-types'
export default function PhotoGrid({page}){
     return (
        <>
             <div className="f-t">
          <div className="in-place-img-d">
            {" "}
            <img
              className="in-place-img"
              src={`http://localhost:5000/uploads/${page.addedPhoto[0]}`}
            />
          </div>
          <div className="in-place-img-d">
            <img
              className="in-place-img"
              src={`http://localhost:5000/uploads/${page.addedPhoto[1]}`}
            />
          </div>
          <div className="in-place-img-d">
            <img
              className="in-place-img"
              src={`http://localhost:5000/uploads/${page.addedPhoto[2]}`}
            />
          </div>
        </div>
        </>
     )
}
PhotoGrid.propTypes = {
    page: PropTypes.shape({
        addedPhoto: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
};