import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("ERROR! Login First");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("✅ Task created successfully!");
      setTimeout(() => {
        navigate("/tasks");
        setSuccessMessage("");
      }, 500);

      // clearing the form
      setTitle("");
      setDescription("");
      setError("");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred while creating the task.");
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="container">
          <div className="row">
            <div className="col-6 mx-auto mt-5">
              <h3>Create your Task</h3>
              <div className="form-group mb-2 mt-3">
                <input
                  placeholder="Enter your Title here"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  className="form-control"
                  type="text"
                  name="title"
                  id="title"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  name="description"
                  id="description"
                  rows="4"
                  cols="50"
                  className="form-control custom-textarea"
                  placeholder="Enter your description here..."
                  required
                ></textarea>
              </div>
              {error && <div className="alert alert-danger mt-2">{error}</div>}
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}

              <button type="submit" className="btn mt-2 btn-primary">
                create
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Home;
