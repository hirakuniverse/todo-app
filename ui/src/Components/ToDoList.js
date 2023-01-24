import React, {useState, useEffect} from 'react';
import TodoService from '../Services/ToDo';
/**
 * This is main Todo List Component. It is used to add/update/delete task
 */
function ToDoList(){
    const [todos, setTodos] = useState([]);
    /**
     * This function is used to handle key press event of text box and add task into Todo list 
     */
    const handleInputKeyPress = async (e) => {
        if(e.target.value && e.key === "Enter"){
            const newTodo = {
                text: e.target.value,
                isActive: false,
                isCompleted: false
            }
            try {
                const result = await TodoService.addTodo(newTodo);
                setTodos([...todos, result.todo]);
                e.target.value = "";
            } catch (err) {
                alert(err);
            }
        }
    };
    /**
     * This is function is used to filter list of active task 
     */
    const handleActiveFilter = (e) => {
        getTodo(0);
    };
    /**
     * This is function is used to filter list of completed task 
     */
    const handleCompletedFilter = (e) => {
        getTodo(1);
    };
    /**
     * This is function is used to filter list of all task 
     */
    const handleAllFilter = (e) => {
        getTodo();
    };
    /**
     * This is function is used to complete the selected task 
     */
    const handleCheckboxChange = async (e) => {
        let tempTodos = [...todos];
        try{
            let currentTodo = tempTodos.find(item=> item._id === e.target.value);
            currentTodo["isCompleted"] = e.target.checked ? true : false;
            await TodoService.updateTodo(e.target.value, currentTodo);
            getTodo();
        } catch(err){
            setTodos(tempTodos);
            alert(err);
        }
    };
    /**
     * This is function is used to active the selected task 
     */
    const handleActiveBtn = async (e) => {
        let tempTodos = [...todos];
        try{
            let currentTodo = tempTodos.find(item=> item._id === e.target.value);
            currentTodo["isActive"] = true ;
            await TodoService.updateTodo(e.target.value, currentTodo);
            getTodo();
        }catch(err){
            setTodos(tempTodos);
            alert(err);
        }
    };
    /**
     * This is function is used to remove the selected task 
     */
    const handleRemoveBtn = async (e) => {
        let tempTodos = [...todos];
        try {
            await TodoService.deleteTodo(e.target.value);
            const todos = tempTodos.filter(item => item._id !== e.target.value);
            setTodos(todos);
        } catch (err) {
            setTodos(tempTodos);
            alert(err);
        }
    }
    const listItems = todos && todos.map(todo =>
        <tr key={todo._id}>
            <td><span><input type="checkbox" value={todo._id} checked={todo.isCompleted} onChange={handleCheckboxChange}></input></span></td>
            <td><span className={todo.isActive ? 'text-green': ''}>{todo.text}</span></td>
            <td>{todo.isCompleted && <span className='ml-5'>{!todo.isActive && <button value={todo._id} onClick={handleActiveBtn}>Active</button>} <button value={todo._id} onClick={handleRemoveBtn}>Remove</button></span>}</td>
        </tr>
    );
    const getTodo = async (filter) => {
        const result = await TodoService.getTodos(filter);
        if(result.success){
            setTodos(result.todos);
        }
    }
    useEffect(() => {
       getTodo();
    },[]);
    return (
        <>
        <h1>ToDo List</h1>
        <input type="text" onKeyPress={handleInputKeyPress}></input>
        <table align="center" className='pt-10 pb-10'>
            {listItems}
        </table>
        <div>
            <span className='mr-5'>Filters:</span>
            <span>
            <button className='mr-5' onClick={handleAllFilter}>All</button>
            <button className='mr-5' onClick={handleActiveFilter}>Active</button>
            <button className='mr-5' onClick={handleCompletedFilter}>Completed</button>
            </span>
        </div>
        </>
    )
}
export default ToDoList;