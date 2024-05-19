import React, { useState, useEffect } from "react";
import Content from "./content";
import { userService } from "../../services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeshboardPage = () => {
  const [allTasks, setAllTasks] = useState([]);

  const handleCreateTask = async (newTask) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await userService.createTask(newTask, token);
      if (response.success == true) toast.success("Task created successfully");
      await getTasks(token);
    } catch (error) {
      if (error.response.data == "Unauthorized token")
        toast.error("Time Out. Please Login Again");
      toast.error(error.response.data.message);
    }
  };

  const getTasks = async (token) => {
    try {
      const response = await userService.getTasks(token);
      setAllTasks(response);
    } catch (error) {
      console.error("Error getting tasks:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    getTasks(token);
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await userService.deleteTask(taskId, token);
      if (response.success == true) toast.success("Task deleted successfully");
      await getTasks(token);
    } catch (error) {
      if (error.response.data == "Unauthorized token")
        toast.error("Time Out. Please Login Again");
      toast.error(error.response.data.message);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await userService.completeTask(taskId, token);
      if (response.success == true)
        toast.success("Task completed successfully");
      await getTasks(token);
    } catch (error) {
      if (error.response.data == "Unauthorized token")
        toast.error("Time Out. Please Login Again");
      toast.error(error.response.data.message);
    }
  };

  const handleFilterTask = async (status, name) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await userService.filerTask(status, name, token);
      setAllTasks(response);
    } catch (error) {
      if (error.response.data == "Unauthorized token")
        toast.error("Time Out. Please Login Again");
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Content
        onSubmit={handleCreateTask}
        allTasks={allTasks}
        onSubmitDeleteTask={handleDeleteTask}
        handleTaskComplete={handleCompleteTask}
        handleFilterTask={handleFilterTask}
      />
    </>
  );
};

export default DeshboardPage;
