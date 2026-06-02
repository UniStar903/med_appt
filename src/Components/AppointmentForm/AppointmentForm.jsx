import React, { useState } from 'react';
import './AppointmentForm.css';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!name || !phoneNumber || !appointmentDate || !appointmentTime) {
      alert('Please fill out all fields before booking.');
      return;
    }

    onSubmit({ name, phoneNumber, appointmentDate, appointmentTime, selectedSlot });

    setName('');
    setPhoneNumber('');
    setAppointmentDate('');
    setAppointmentTime('');
    setSelectedSlot('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <h3>Book Appointment with {doctorName}</h3>
      <p>Speciality: {doctorSpeciality}</p>

      <div className="form-group">
        <label htmlFor="name">Patient Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentDate">Appointment Date:</label>
        <input
          type="date"
          id="appointmentDate"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentTime">Appointment Time:</label>
        <input
          type="time"
          id="appointmentTime"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Choose Time Slot:</label>
        <div className="slot-buttons">
          {['10:00 AM', '12:00 PM', '3:00 PM', '5:00 PM'].map((slot) => (
            <button
              type="button"
              key={slot}
              className={`btnslot ${selectedSlot === slot ? 'selected' : ''}`}
              onClick={() => setSelectedSlot(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <button type="submit">Confirm Booking</button>
    </form>
  );
};

export default AppointmentForm;
