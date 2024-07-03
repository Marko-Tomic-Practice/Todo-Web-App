import React, { useEffect, useState } from 'react'
import { completeDBTodo, deleteTodo, getAllTodos, inCompleteDBTodo } from '../services/TodoService';
import { useNavigate } from 'react-router-dom'

const ListTodoComponent = () => {

    const [todos, setTodos] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
     listTodos();
     console.log("Izvrsio sam se!")   
    }, []);


    function listTodos(){
        getAllTodos().then((response) => {
            setTodos(response.data);
        }
        ).catch(error => console.error(error));
    }

    function addNewTodo(){
        navigate('/add-todo'); 
    }

    function editTodo(id){
        navigate(`/edit-todo/${id}`);
    }

    function removeTodo(id){
        deleteTodo(id).then((response) => listTodos())
                        .catch(error => console.error(error));
    }

    function completeTodo(id){
        completeDBTodo(id).then((response)=> listTodos()).catch(error=>console.error(error));
    }

    function inCompleteTodo(id){
        inCompleteDBTodo(id).then((response)=> listTodos()).catch(error=>console.error(error));
    }
    

  return (
    <div className='container'>
        <h2 className='text-center'>List of Todos</h2>
        <button className='btn btn-primary mb-2' onClick={addNewTodo}>Add Todo</button>
        <table className='table table-bordered table-striped'>
            <thead>
                <tr>
                    <th>Todo Title</th>
                    <th>Todo Description</th>
                    <th>Todo Completed</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                    {
                        todos.map(todo => 
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.completed ? 'YES' : 'NO'}</td>
                                <td>
                                <button type="button" className="btn btn-secondary" onClick={()=> editTodo(todo.id)}>Edit</button>
                                <button type="button" className="btn btn-success" onClick={()=> completeTodo(todo.id)}>Complete</button>
                                <button type="button" className="btn btn-dark" onClick={()=> inCompleteTodo(todo.id)}>In-Complete</button>
                                <button type="button" className="btn btn-danger" onClick={()=> removeTodo(todo.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
            </tbody>
        </table>
    </div>
  )
}

export default ListTodoComponent