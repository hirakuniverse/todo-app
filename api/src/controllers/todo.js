import TodoModel from "../models/todoModel";
const _self = {
    /**
     * This api is used to retrieve list of todo task
     */
    getTodo: async (req, res, next) => {
        try{
            let filter = {};
            if(req.query.filter === "0"){
                filter = {isActive: true}
            }
            if(req.query.filter === "1"){
                filter = {isCompleted: true}
            }
            const todos = await TodoModel.find(filter);
            res.status(200).send({success: true, todos: todos});
        }catch(err){
            res.status(500).send({suceess: false, message: "Something went wrong", error: err});
        }   
        
    },
    /**
     * This api is used to add task in todo list
     */
    addTodo: async (req, res, next) => {
        try{
            const todo = await new TodoModel(req.body).save();
            res.status(201).send({success: true, todo: todo});
        }catch(err){
            res.status(500).send({suceess: false, message: "Something went wrong", error: err});
        }
    },
    /**
     * This api is used to deletet task from todo list
     */
    deleteTodo: async (req, res, next) => {
        try {
            const todo = await TodoModel.findByIdAndDelete(req.params.id);
            res.status(200).send({success: true, todo: todo});
        } catch (error) {
            res.status(500).send({suceess: false, message: "Something went wrong", error: err});
        }
    },
    /**
     * This api is used to active/complete the task in todo list
     */
    updateTodo: async (req, res, next) => {
        try {
            const todo = await TodoModel.findOneAndUpdate(
                { _id: req.params.id },
                req.body
            );
            res.status(200).send({success: true, todo: todo});
        } catch (error) {
            res.status(500).send({suceess: false, message: "Something went wrong", error: err});
        }
    }

}

export default _self