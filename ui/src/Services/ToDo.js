import AppService from '../Config/Axios';
const baseUrl = "http://localhost:3001/api";
const TodoService = {
    /**
     * This is service is used to get list of todo task
     * @param {*} filterBy 
     * @returns list of task
     */
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
    /**
     * This service is used to add task in todo list
     * @param {*} data 
     * @returns added task
     */
    addTodo : async (data) => {
        const url = `${baseUrl}/todo`;
        const response = await AppService.post(url,data);
        if(response && response.data.success){
            return response.data;
        }
    },
    /**
     * This service is used to update the task such as active/ completed task in todo list
     * @param {*} id 
     * @param {*} data 
     * @returns 
     */
    updateTodo : async (id, data) => {
        const url = `${baseUrl}/todo/${id}`;
        const response =  await AppService.put(url,data);
        if(response && response.data.success){
            return response.data;
        }
    },
    /**
     * This service is used to delete the task from todo list
     * @param {*} id 
     * @returns 
     */
    deleteTodo : async (id) => {
        const url = `${baseUrl}/todo/${id}`;
        const response = await AppService.delete(url);
        if(response && response.data.success){
            return response.data;
        }
    }
}

export default TodoService