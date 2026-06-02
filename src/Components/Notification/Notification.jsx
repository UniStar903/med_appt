// Notification.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

const Notification = ({ children }) => {
  // State variables
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Retrieve stored data
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      setShowNotification(true); // show notification when appointment exists
    }
  }, []);

  // Effect to hide notification when appointment is canceled
  useEffect(() => {
    if (!appointmentData) {
      setShowNotification(false); // hide notification
    }
  }, [appointmentData]);

  return (
    <div>
      <Navbar />
      {children}

      {isLoggedIn && showNotification && appointmentData && (
        <div className="notification-container">
          <div className="appointment-card">
            <div className="appointment-card__content">
              <h3 className="appointment-card__title">Appointment Details</h3>
              <p className="appointment-card__message">
                <strong>Patient:</strong> {username}
              </p>
              <p className="appointment-card__message">
                <strong>Doctor:</strong> {doctorData?.name}
              </p>
              <p className="appointment-card__message">
                <strong>Date:</strong> {appointmentData?.appointmentDate}
              </p>
              <p className="appointment-card__message">
                <strong>Time:</strong> {appointmentData?.appointmentTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
