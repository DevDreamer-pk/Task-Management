import express from "express";
import taskController from "./task.controller.js"
const taskRouter = express.Router();

taskRouter.post("/create", new taskController().createTask) 
taskRouter.put("/update/:taskId", new taskController().updateTask)
taskRouter.delete("/delete/:taskId", new taskController().deleteTask)
taskRouter.get("/filter", new taskController().getTask)
taskRouter.put("/complete/:id", new taskController().completeTask)


export default taskRouter