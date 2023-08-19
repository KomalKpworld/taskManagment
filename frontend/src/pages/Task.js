import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../component";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const id = localStorage.getItem("user");
    const getUserTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/task/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getUserTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.delete(`http://localhost:3001/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted task from the tasks state
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-semibold mb-4">Task Page</h2>
        <Link
          to="/add-task"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Task
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {tasks &&
            tasks.map((task) => (
              <div key={task._id} className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                <p className="text-gray-600 mb-4">{task.description}</p>
                <div className="flex justify-between">
                  <button
                    className="bg-green-500 text-white py-2 px-3 rounded hover:bg-green-600"
                    onClick={() => navigate(`/edit-task/${task._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-3 rounded hover:bg-red-600"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Task;
