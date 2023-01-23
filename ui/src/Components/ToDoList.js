import React, {useState, useEffect} from 'react';
import TodoService from '../Services/ToDo';
function ToDoList(){
    const [todos, setTodos] = useState([]);
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
    const handleActiveFilter = (e) => {
        getTodo(0);
    };
    const handleCompletedFilter = (e) => {
        getTodo(1);
    };
    const handleAllFilter = (e) => {
        getTodo();
    };
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
        <li key={todo._id}>
            <div>
                <span><input type="checkbox" value={todo._id} checked={todo.isCompleted} onChange={handleCheckboxChange}></input></span>
                <span className={todo.isActive ? 'text-green': ''}>{todo.text}</span>
                {todo.isCompleted && <span className='ml-5'>{!todo.isActive && <button value={todo._id} onClick={handleActiveBtn}>Active</button>} <button value={todo._id} onClick={handleRemoveBtn}>Remove</button></span>}
            </div>
        </li>
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
        <ul className='todo-list'>{listItems}</ul>
        <div>
            <span className='mr-5'>Filters:</span>
            <span>
            <button className='mr-5' onClick={handleActiveFilter}>Active</button>
            <button className='mr-5' onClick={handleCompletedFilter}>Completed</button>
            <button className='mr-5' onClick={handleAllFilter}>All</button>
            </span>
        </div>
        </>
    )
}
export default ToDoList;