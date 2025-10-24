import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("User Registered Successfully! ✅");
      setTimeout(() => {
        navigate("/login");
        setSuccess("");
      }, 1000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Email Allready Taken");
      }
    }
  };
  return (
    <form onSubmit={handleRegister} className="form container">
      <div className="row">
        <div className="col-6 mt-5 mx-auto">
          <h3>Register Here</h3>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username-reg"
            id="username-reg"
            className="form-control mt-2"
            placeholder="Enter your Username"
          />
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            name="email-reg"
            id="email-reg"
            className="form-control mt-2"
            placeholder="Enter your Email"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password-reg"
            id="password-reg"
            className="form-control mt-2"
            placeholder="Enter your Password"
          />
          <button type="submit" className="btn btn-primary mt-2">
            Register
          </button>
          {error && <div className="alert alert-danger mt-2">{error}</div>}
          {success && <div className="alert alert-success mt-2">{success}</div>}
        </div>
      </div>
    </form>
  );
};

export default Register;
