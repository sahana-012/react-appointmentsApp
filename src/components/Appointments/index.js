// Write your code here
import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    isTrue: false,
  }

  titleValue = event => {
    this.setState({title: event.target.value})
  }

  dateValue = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const correctDateValue = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ' '

    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      correctDateValue,
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  onClickStarred = () => {
    const {isTrue} = this.state
    if (isTrue) {
      this.setState({isTrue: false})
    } else {
      this.setState({isTrue: true})
    }
  }

  render() {
    const {title, date, isTrue} = this.state

    let {appointmentsList} = this.state

    if (isTrue) {
      const filteredList = appointmentsList.filter(
        eachAppointment => eachAppointment.isFavorite === true,
      )
      appointmentsList = filteredList
    }

    return (
      <div className="app-container">
        <div className="appointment-container">
          <h1 className="app-heading">Add Appointment</h1>
          <div className="appointment-and-image-container">
            <div className="add-appointment-container">
              <form
                className="add-appointment-container"
                onSubmit={this.onAddAppointment}
              >
                <label htmlFor="input1" className="title">
                  TITLE
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  id="input1"
                  className="input-container"
                  onChange={this.titleValue}
                />
                <label htmlFor="input2" className="date">
                  DATE
                </label>
                <input
                  type="date"
                  placeholder="Date"
                  value={date}
                  id="input2"
                  className="input-container"
                  onChange={this.dateValue}
                />

                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="horizontal-line" />
          <div className="sub-heading-and-starred-container">
            <h1 className="sub-heading">Appointments</h1>
            {isTrue && (
              <button
                className="starred-buttons"
                type="button"
                onClick={this.onClickStarred}
              >
                Starred
              </button>
            )}
            {!isTrue && (
              <button
                className="starred-button"
                type="button"
                onClick={this.onClickStarred}
              >
                Starred
              </button>
            )}
          </div>

          <ul className="appointments-holder">
            {appointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsFavorite={this.toggleIsFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
