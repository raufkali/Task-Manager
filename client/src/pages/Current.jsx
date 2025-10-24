import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Current = () => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const handleRegister = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users/current", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(res.data.body.username);
        setEmail(res.data.body.email);
        setError("");
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Email Allready Taken");
        }
      }
    };
    handleRegister();
  }, []);
  return (
    <div className="form container">
      <div className="row">
        <div className="col-6 mt-5 mx-auto">
          <h3>Curent User Info</h3>
          <div className="card">
            <div className="card-body">
              <h4>{username}</h4>
              <h4>{email}</h4>
            </div>
          </div>
          {error && <div className="alert alert-danger mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Current;
