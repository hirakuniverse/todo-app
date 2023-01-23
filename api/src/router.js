import express from 'express';
import TodoController from './controllers/todo';

const router = express.Router();

router.get("/todos", TodoController.getTodo);
router.post("/todo", TodoController.addTodo);
router.put("/todo/:id", TodoController.updateTodo);
router.delete("/todo/:id", TodoController.deleteTodo);

export default router;