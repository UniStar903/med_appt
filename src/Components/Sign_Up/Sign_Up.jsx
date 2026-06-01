import React, { useState } from "react";
import "./Sign_Up.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config"; // Make sure config.js exports API_URL

const Sign_Up = () => {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showerr, setShowerr] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};

    if (!formData.role) tempErrors.role = "Role is required";
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.phone.match(/^[0-9]{10}$/))
      tempErrors.phone = "Phone must be 10 digits";
    if (!formData.email.match(/^[^@]+@[^@]+\.[^@]+$/))
      tempErrors.email = "Invalid email format";
    if (formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const register = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (json.authtoken) {
        // Store user data in session storage
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", formData.name);
        sessionStorage.setItem("phone", formData.phone);
        sessionStorage.setItem("email", formData.email);

        // Redirect to home
        navigate("/");
        window.location.reload();
      } else {
        if (json.errors) {
          setShowerr(json.errors[0].msg);
        } else {
          setShowerr(json.error);
        }
      }
    } catch (err) {
      setShowerr("Server error. Please try again later.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={register}>
        <label>Role</label>
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="">Select Role</option>
          <option value="Doctor">Doctor</option>
          <option value="Patient">Patient</option>
        </select>
        {errors.role && <p className="error">{errors.role}</p>}

        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>Phone</label>
        <input
          type="text"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {errors.password && <p className="error">{errors.password}</p>}

        {showerr && <p className="error">{showerr}</p>}

        <button type="submit">Submit</button>
        <button type="reset" onClick={() => setFormData({})}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default Sign_Up;
