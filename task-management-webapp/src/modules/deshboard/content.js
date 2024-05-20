import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Dashboard = ({
  onSubmit,
  allTasks,
  onSubmitDeleteTask,
  handleTaskComplete,
  handleFilterTask,
}) => {
  const location = useLocation();
  const { userID, email, name } = location.state || {};
  console.log(userID, email, name);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    status: "pending",
  });
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  useEffect(() => {
    setTasks(allTasks.taskData || []);
  }, [allTasks]);

  const handleCreateTask = () => {
    if (newTask.name && newTask.description) {
      // setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTask({
        name: "",
        description: "",
        status: "pending",
      });
      onSubmit(newTask);
    }
  };

  const handleDeleteTask = (taskId) => {
    onSubmitDeleteTask(taskId);
  };

  const handleTaskCompleted = (taskId) => {
    handleTaskComplete(taskId);
  };

  const handleFilterCompleted = (status) => {
    handleFilterTask(status);
    setFilter(status);
  };

  const renderButton = (filterType, text) => (
    <button
      className={`p-2 rounded-md ${
        filter === filterType ? "bg-blue-500 text-white" : "bg-gray-200"
      }`}
      onClick={() => handleFilterCompleted(filterType)}
    >
      {text}
    </button>
  );

  return (
    <>
      <div className="w-full bg-white shadow-lg rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">{name[0]}</span>
          </div>
          <div className="flex flex-row">
            <div className="flex items-center space-x-4 ">
              <span className="text-gray-700 font-semibold">Name:</span>
              <span className="text-gray-600">{name}</span>
            </div>
            <div className="flex items-center space-x-4 ml-8">
              <span className="text-gray-700 font-semibold">Email:</span>
              <span className="text-gray-600">{email}</span>
            </div>
            <div className="flex items-center space-x-4 ml-8">
              <span className="text-gray-700 font-semibold">User ID:</span>
              <span className="text-gray-600">{userID}</span>
            </div>
            <div className="flex items-center space-x-4 ml-8">
              <a
                href="/"
                className="text-blue-500 focus:outline-none focus:underline hover:underline"
              >
                Login Page
              </a>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-4xl font-bold font-serif text-center text-gray-500 dark:text-white my-8 ">
        Task Management Dashboard
      </h1>

      <div className="container mx-auto px-4 mt-5">
        <div className="mb-4">
          <input
            type="text"
            name="name"
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
            placeholder="Task name"
            value={newTask.name}
            onChange={handleChange}
          />
          <textarea
            name="description"
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
            placeholder="Task description"
            value={newTask.description}
            onChange={handleChange}
          />
          <select
            name="status"
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
            value={newTask.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button
            className="w-full mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleCreateTask}
          >
            Add Task
          </button>
        </div>

        <div className="mb-4 flex space-x-4">
          {renderButton("", "All")}
          {renderButton("completed", "Completed")}
          {renderButton("pending", "Pending")}
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Search tasks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
            >
              <div className="flex items-center flex-1 space-x-4">
                <div
                  className={`flex-shrink-0 w-10 h-10 ${
                    task.status === "completed" ? "bg-green-200" : "bg-gray-200"
                  } rounded-full flex items-center justify-center`}
                >
                  <span className="text-gray-700 font-semibold">
                    {index + 1}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <h3
                    className={`text-lg font-semibold ${
                      task.status === "completed"
                        ? "line-through text-gray-500"
                        : ""
                    }`}
                  >
                    {task.name}
                  </h3>
                  <p
                    className={`text-gray-700 ${
                      task.status === "completed"
                        ? "line-through text-gray-500"
                        : ""
                    }`}
                  >
                    {task.description}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className={`p-2 rounded-md font-semibold transition-colors duration-200 ${
                    task.status === "completed"
                      ? "bg-gray-400 text-white"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                  onClick={() => handleTaskCompleted(task._id)}
                >
                  {task.status === "completed" ? "Completed" : "Mark Completed"}
                </button>
                <button
                  className="p-2 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600 transition-colors duration-200"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
