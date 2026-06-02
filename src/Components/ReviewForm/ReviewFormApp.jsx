import React from "react";
import ReviewForm from "./ReviewForm/ReviewForm"; // ✅ Import ReviewForm

// Example doctor + appointment data passed as props
const doctorData = {
  name: "Dr. Jane Smith",
  speciality: "Dermatology",
};

const appointmentData = {
  patientName: "John Doe",
  date: "2026-06-05",
  time: "03:00 PM",
};

function ReviewFormApp() {
  return (
    <div className="review-app">
      <h1>Reviews Page</h1>
      <p>
        Please provide feedback for your consultation with{" "}
        <strong>{doctorData.name}</strong> ({doctorData.speciality}) on{" "}
        <strong>{appointmentData.date}</strong> at{" "}
        <strong>{appointmentData.time}</strong>.
      </p>

      {/* Render ReviewForm with context-specific data */}
      <ReviewForm doctor={doctorData} appointment={appointmentData} />
    </div>
  );
}

export default ReviewFormApp;
