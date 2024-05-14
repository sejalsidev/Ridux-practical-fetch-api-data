import axios from "axios";

export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";
export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const UPDATE_TODO_SUCCESS = "UPDATE_TODO_SUCCESS";
export const DELETE_TODO_SUCCESS = "DELETE_TODO_SUCCESS";
export const FETCH_ALL_TODOS_REQUEST = "FETCH_ALL_TODOS_REQUEST";
export const FETCH_ALL_TODOS_SUCCESS = "FETCH_ALL_TODOS_SUCCESS";
export const FETCH_ALL_TODOS_FAILURE = "FETCH_ALL_TODOS_FAILURE";
export const UPDATE_ALL_TODO_SUCCESS = "UPDATE_ALL_TODO_SUCCESS";
export const FETCH_ALL_DATA_FAILURE = "FETCH_ALL_DATA_FAILURE";

export const fetchTodoList = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/todo/get-todo-list`
      );

      dispatch({ type: FETCH_DATA_SUCCESS, payload: response.data });
      console.log(response.data);
    } catch (error) {
      dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
    }
  };
};
export const addTodoSuccess = (postTodo) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/todo/add-todo-list`,
        postTodo
      );
      dispatch({ type: ADD_TODO_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
    }
  };
};
export const updateTodoSuccess = (todoId, updatedTodo) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/todo/update-todo-list/${todoId}`,
        updatedTodo
      );
      dispatch({ type: UPDATE_TODO_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
    }
  };
};
export const deleteTodoSuccess = (todoId) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `http://localhost:8000/todo/delete-todo-list/${todoId}`
      );
      dispatch({ type: DELETE_TODO_SUCCESS, payload: todoId });
    } catch (error) {
      dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
    }
  };
};

export const fetchAllTodos = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALL_TODOS_REQUEST });
    try {
      const response = await axios.get(
        "http://localhost:8000/todo/get-All-todo-list"
      );
      console.log(response.data);
      dispatch({ type: FETCH_ALL_TODOS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_ALL_TODOS_FAILURE, payload: error.message });
    }
  };
};

export const updatedData = (id, updatedTodo) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `localhost:8000/todo/get-todo-item/${id}`,
        updatedTodo
      );
      dispatch({ type: UPDATE_ALL_TODO_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_ALL_DATA_FAILURE, payload: error.message });
    }
  };
};
