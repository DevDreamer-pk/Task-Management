import TaskManager from "./task.manager.js";
import mongoose from "mongoose";
export default class TaskController {

    async createTask(req, res) {
        try {
            const task = await new TaskManager().createTask(req.body);
            if (!task.success) {
                return res.status(400).send(task);
            }
            return res.status(201).send(task);
        } catch (error) {
            throw error;
        }
    }

    async updateTask(req, res) {
        try {
            const taskId = req.params.taskId;
            const task = await new TaskManager().updateTask(req.body,taskId);
            if (!task.success) {
                return res.status(400).send(task);
            }
            return res.status(201).send(task);
        } catch (error) {
            throw error;
        }
    }

    async deleteTask(req, res) {
        try {
            const taskId = req.params.taskId;
            const task = await new TaskManager().deleteTask(taskId);
            if (!task.success) {
                return res.status(400).send(task);
            }
            return res.status(201).send(task);
        } catch (error) {
            throw error;
        }
    }
// filer task by status pending or completed and search by name
    async getTask(req, res) {
        try {
            const status = req.query.status;
            const name = req.query.name;
            const task = await new TaskManager().getTask(status, name);
            if (!task.success) {
                return res.status(400).send({message : "Task not found"});
            }
            return res.status(201).send(task);
        } catch (error) {
            throw error;
        }
    }

    async completeTask(req, res) {
        try {
            const taskId = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(taskId)) {
                return res.status(400).send('Invalid task ID');
              }
            const task = await new TaskManager().completeTask(taskId);
            if (!task.success) {
                return res.status(400).send(task);
            }
            return res.status(201).send(task);
        } catch (error) {
            throw error;
        }
    }

}