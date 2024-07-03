import React, { useEffect, useState } from 'react'
import { addTodo, getTodo, updateTodo } from '../services/TodoService';
import { useNavigate, useParams } from 'react-router-dom';


const TodoComponent = () => {
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);

    const navigator = useNavigate();

    function saveTodo(e){
        e.preventDefault();
        const todo = {title, description, completed}
        if(id){
            updateTodo(id, todo).then((response) => {
                navigator('/todos');
            }).catch(error => console.error(error));
        }
        else {
            addTodo(todo).then((response) => {
                navigator('/todos');
            }).catch(error => console.error(error));
        }
        
    }

    const { id } = useParams();
    function addOrEditTodo(){
        if(id){
            return(
                <h2 className='text-center'>Edit Todo</h2>
                );
        } else {
            return(
            <h2 className='text-center'>Add Todo</h2>
            );
        }
    }

    useEffect(()=>{
        if(id){
            getTodo(id)
                    .then((response) =>{
                        setTitle(response.data.title)
                        setDescription(response.data.description)
                        setCompleted(response.data.completed)
                    })
                        .catch(error => console.error(error));
        }
    }, [id]);

    return (
    <div className='container'>
        <br /><br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {addOrEditTodo()}
                <div className='card-body'>
                    <form action="">
                        <div className='form-group mb-2'>
                            <label className='form-label'>Todo Title:</label>
                            <input className='form-control'
                                type="text"
                                placeholder='Enter Todo Title'
                                name='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Todo Description:</label>
                            <input className='form-control'
                                type="text"
                                placeholder='Enter Todo Description'
                                name='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Todo Completed:</label>
                            <select className='form-control'
                                value={completed}
                                onChange={(e) => setCompleted(e.target.value)}
                            >
                                <option value="false">No</option>
                                <option value="false">Yes</option>
                            </select>
                        </div>

                        <button className='btn btn-success' onClick={ (e) => saveTodo(e)}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TodoComponent