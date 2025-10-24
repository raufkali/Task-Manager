import axios from "axios";

// Update with the actual URL of your backend
const API_URL = "http://localhost:5000"; // Example: your backend URL

export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks", error);
    return [];
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, taskData);
    return response.data;
  } catch (error) {
    console.error("Error creating task", error);
    throw error;
  }
};

// Other API functions...
