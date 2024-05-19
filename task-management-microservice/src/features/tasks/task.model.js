import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum : ['pending', 'completed']
    }
});

const taskModel = mongoose.model("task", taskSchema);

export default taskModel