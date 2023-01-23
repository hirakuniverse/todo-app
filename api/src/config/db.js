import mongoose from 'mongoose';
mongoose.set('strictQuery', false)
const _self = {
    connect: async () => {
        try{
            await mongoose.connect("mongodb://127.0.0.1:27017/todo-api");
            console.log("Database connection establish successfully");
        }catch(err){
            console.log("Database connection error");
        }
    }
}

export default _self