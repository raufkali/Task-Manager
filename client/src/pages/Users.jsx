import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const handleUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data.body);
        setError("");
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Un Authorized!");
          navigate("/");
        }
      }
    };
    handleUsers();
  }, []);
  return (
    <div className="container">
      <ul className="list-unstyled row">
        {users.map((user) => {
          return (
            <li
              key={user._id}
              className="col-5 mx-auto shadow my-2 p-2 rounded"
            >
              <h5>Name: {user.username}</h5>
              <h5>Email: {user.email}</h5>
              <h5>role: {user.role}</h5>
            </li>
          );
        })}
      </ul>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default Users;
