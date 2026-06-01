import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";

const Login = () => {
  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  // Validation logic
  const validate = () => {
    let tempErrors = {};
    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/))
      tempErrors.email = "Invalid email format";
    if (password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Login function with backend connectivity
  const login = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await res.json();
    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("email", email);

      navigate("/");
      window.location.reload();
    } else {
      if (json.errors) {
        alert(json.errors[0].msg);
      } else {
        alert(json.error);
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={login}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter your email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter your password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="btn-group">
          <button type="submit" className="btn btn-primary">Login</button>
          <button type="reset" className="btn btn-danger" onClick={() => { setEmail(""); setPassword(""); }}>
            Reset
          </button>
        </div>

        <p>
          New member?{" "}
          <Link to="/signup" style={{ color: "#2190FF" }}>
            Sign Up Here
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Login;