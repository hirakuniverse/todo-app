import AppService from '../Config/Axios';
const baseUrl = "http://localhost:3001/api";
const TodoService = {
    getTodos : async (filterBy) => {
        let url = `${baseUrl}/todos`;
        if(filterBy === 0){
            url += "?filter=0"
        }
        if(filterBy === 1){
            url += "?filter=1"
        }
        const response = await AppService.get(url);
        if(response && response.data.success){
            return response.data;
        }
    },
    addTodo : async (data) => {
        const url = `${baseUrl}/todo`;
        const response = await AppService.post(url,data);
        if(response && response.data.success){
            return response.data;
        }
    },
    updateTodo : async (id, data) => {
        const url = `${baseUrl}/todo/${id}`;
        const response =  await AppService.put(url,data);
        if(response && response.data.success){
            return response.data;
        }
    },
    deleteTodo : async (id) => {
        const url = `${baseUrl}/todo/${id}`;
        const response = await AppService.delete(url);
        if(response && response.data.success){
            return response.data;
        }
    }
}

export default TodoService