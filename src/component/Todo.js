import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodoList, addTodoSuccess, updateTodoSuccess, deleteTodoSuccess } from '../action/actions';

const Todo = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [currentTodoId, setCurrentTodoId] = useState(null); 
    const data = useSelector(state => state.todo.data);
    const error = useSelector(state => state.todo.error);

    useEffect(() => {
        dispatch(fetchTodoList());
    }, [dispatch]);

    const handleAddTodo = () => {
        dispatch(addTodoSuccess({ title, description }));
        setTitle('');
        setDescription('');
        dispatch(fetchTodoList());
    };

    const handleUpdateTodo = (todoId, updatedTodo) => {
        console.log("Updating todo with ID:", todoId, "New Todo:", updatedTodo);
        dispatch(updateTodoSuccess(todoId, updatedTodo));
        setTitle(''); 
        setDescription('');
        setCurrentTodoId(null); 
        dispatch(fetchTodoList());
    };

    const handleDeleteTodo = (todoId) => {
        console.log("Deleting todo with ID:", todoId);
        dispatch(deleteTodoSuccess(todoId));
        dispatch(fetchTodoList());
    };

    const handleEditTodo =(todoId, todo) => {
        setTitle(todo.title);
        setDescription(todo.description);
        setCurrentTodoId(todoId);
        dispatch(fetchTodoList());
    };
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.map(todo => (
                        <tr key={todo._id}>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>
                                <button onClick={() => handleEditTodo(todo._id, todo)}>Edit</button>
                                <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

          {/*   <div>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button onClick={currentTodoId ? () => handleUpdateTodo(currentTodoId, { title, description }) : handleAddTodo}>
                    {currentTodoId ? 'Update Todo' : 'Add Todo'}
                </button>
            </div> */}
        </div>
    );
};

export default Todo;