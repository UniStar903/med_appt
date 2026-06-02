import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Landing_Page from "./Components/Landing_Page/Landing_Page";
import Sign_Up from "./Components/Sign_Up/Sign_Up";
import Login from "./Components/Login/Login";
import InstantConsultation from "./Components/InstantConsultationBooking/InstantConsultationBooking/InstantConsultation";
import BookingConsultation from './Components/BookingConsultation/BookingConsultation';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<Landing_Page />} />

          {/* Home page */}
          <Route path="/home" element={<Home />} />

          {/* Auth routes */}
          <Route path="/signup" element={<Sign_Up />} />
          <Route path="/login" element={<Login />} />

          {/* Instant Consultation route */}
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/booking-consultation" element={<BookingConsultation />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
