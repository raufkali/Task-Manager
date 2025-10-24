import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdatedTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  let [title, setTitle] = useState("");
  let [details, setDetails] = useState("");
  const [successMessage, setSuccess] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      // getting the task of given id
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTitle(res.data.body.title);
        setDetails(res.data.body.description);
      } catch (err) {
        console.log(err);
        setError(err);
      }
    };
    fetchTasks();
  }, [id]);

  const updateTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        {
          title,
          description: details,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Task Updated Successfully ✅");
      setTimeout(() => {
        setSuccess("");
        navigate("/tasks");
      }, 1000);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred while creating the task.");
      }
    }
  };
  return (
    <form
      className="form container"
      onSubmit={(e) => {
        e.preventDefault();
        updateTask();
      }}
    >
      <div className="row">
        <div className="col-6 mx-auto mt-5">
          <input
            type="text"
            name="updateName"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            id="updateName"
            className="form-control"
          />
          <textarea
            value={details}
            onChange={(e) => {
              setDetails(e.target.value);
            }}
            name="details"
            id="details"
            rows="4"
            cols="50"
            className="form-control custom-textarea"
            required
          ></textarea>
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
    </form>
  );
};

export default UpdatedTask;
