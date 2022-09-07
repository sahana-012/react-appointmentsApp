// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsFavorite} = props
  const {id, title, correctDateValue, isFavorite} = appointmentDetails

  const starImgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickFavoriteIcon = () => {
    toggleIsFavorite(id)
  }

  return (
    <li className="appointment-display-container">
      <div className="title-and-star-container">
        <p>{title}</p>
        <button
          type="button"
          className="favorite-icon-container"
          onClick={onClickFavoriteIcon}
          //   testid="star"
        >
          <img src={starImgUrl} alt="star" className="favorite-icon" />
        </button>
      </div>
      <p>Date: {correctDateValue}</p>
    </li>
  )
}

export default AppointmentItem
