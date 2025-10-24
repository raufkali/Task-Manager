// src/pages/TaskPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TaskPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token"); // retrieve token
      const response = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data.body); // update state with tasks
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };
  // Fetching the task when the page reloads
  useEffect(() => {
    fetchTasks();
  }, []);

  // deleteing all the tasks here
  const delTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Task Deleted Successfully ✅");
      setTimeout(() => {
        setSuccess("");
      }, 1000);
      // Option 1: Re-fetch tasks
      fetchTasks(); // a function you define to reload all tasks
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred while creating the task.");
      }
    }
  };

  // go to update page
  const goToUpdatePage = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-8  mx-auto mt-5">
          <h2>Your Tasks</h2>
          {tasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            <ul className="list-group shadow-sm ">
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className="list-group-item d-flex align-items-center justify-content-center"
                >
                  <section>
                    <strong>Title:</strong> {task.title} <br />
                    <strong>Description:</strong> {task.description} <br />
                    <p>
                      <strong>Created at: </strong>
                      {task.createdAt}
                    </p>
                  </section>
                  <section className="ms-auto">
                    {/* Button for editing */}
                    <button
                      className="edit btn btn-success rounded"
                      onClick={() => {
                        goToUpdatePage(task._id);
                      }}
                    >
                      Edit
                    </button>
                    {/* Button for deleting */}

                    <button
                      className="remove btn rounded-circle"
                      onClick={() => {
                        delTask(task._id);
                      }}
                    >
                      X
                    </button>
                  </section>
                </li>
              ))}
            </ul>
          )}
          {error && <div className="alert alert-danger mt-2">{error}</div>}
          {success && <div className="alert alert-success mt-2">{success}</div>}
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
