import TaskModel from "./task.model.js";
export default class TaskManager {

    async createTask({ name, description, status }) {
        try {
            const existingTask = await TaskModel.findOne({ name });
            if (existingTask) {
                return { success: false, message: 'Task already exists' };
            }
            const task = await new TaskModel({ name, description, status }).save();
            return { success: true, taskData : task };
        } catch (error) {
            throw error;
        }
    }

    async updateTask({ name, description, status }, taskId) {
        try {
            const existingTask = await TaskModel.findOne({ _id: taskId });
            if (!existingTask) {
                return { success: false, message: 'Task not found' };
            }
            const task = await TaskModel.findOneAndUpdate({ _id: taskId }, { name, description, status }, { new: true });
            return { success: true, taskData : task };
        } catch (error) {
            throw error;
        }
    }

    async deleteTask(taskId) {
        try {
            const existingTask = await TaskModel.findOne({ _id: taskId });
            if (!existingTask) {
                return { success: false, message: 'Task not found' };
            }
            const task = await TaskModel.findOneAndDelete({ _id: taskId });
            return { success: true, message: 'Task deleted successfully' };
        } catch (error) {
            throw error;
        }
    }

    async getTask(status, name) {
        try {
            const filter = {};
            if (name) {
                filter.name = name;
            }
            if (status) {
                filter.status = status;
            }
            const tasks = await TaskModel.find(filter);
            return { success: true, taskData : tasks };

        } catch (error) {
            throw error;
        }
    }

    async completeTask(taskId) {
        try {
            console.log(taskId)
            const existingTask = await TaskModel.findOne({ _id: taskId });
            if (!existingTask) {
                return { success: false, message: 'Task not found' };
            }
            const task = await TaskModel.findOneAndUpdate({ _id: taskId }, { status: 'completed' }, { new: true });
            return { success: true, taskData : task };
        } catch (error) {
            throw error;
        }
    }
}