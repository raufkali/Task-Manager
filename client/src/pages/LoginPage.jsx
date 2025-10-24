// src/pages/LoginPage.jsx (frontend)
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For redirecting after login

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      const token = response.data.authToken;
      localStorage.setItem("token", token);

      // Redirect user after successful login
      navigate("/"); // Or to any other route you want
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form mt-5">
        <div className="row">
          <div className="col-3 mx-auto">
            <h2>Login</h2>

            <div className="form-group">
              <label>email:</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div>{error}</div>}
            <button type="submit" className="btn mt-2 btn-primary">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
