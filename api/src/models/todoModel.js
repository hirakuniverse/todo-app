import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});
const todoModel = mongoose.model("todo", todoSchema, "todo");

export default todoModel;

