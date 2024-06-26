import {
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  ADD_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  FETCH_ALL_TODOS_REQUEST,
  FETCH_ALL_TODOS_SUCCESS,
  FETCH_ALL_TODOS_FAILURE,
  UPDATE_ALL_TODO_SUCCESS,
  UPDATE_TODO_DATA_SUCCESS,
  UPDATE_TODO_DATA_FAILURE,
  SAVE_TODO_SUCCESS,
  SAVE_TODO_FAILURE,
} from "../action/actions";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_DATA_SUCCESS:
      return { ...state, data: action.payload, isLoading: false, error: null };
    case FETCH_DATA_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case FETCH_ALL_TODOS_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_ALL_TODOS_SUCCESS:
      return { ...state, data: action.payload, isLoading: false, error: null };
    case FETCH_ALL_TODOS_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    case UPDATE_ALL_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
        error: null,
      };

    case UPDATE_TODO_SUCCESS:
      const updatedIndex = state.data.findIndex(
        (todo) => todo._id === action.payload._id
      );
      if (updatedIndex === -1) {
        return state;
      }
      const updatedData = [...state.data];
      updatedData[updatedIndex] = action.payload;
      return {
        ...state,
        data: updatedData,
      };

    case DELETE_TODO_SUCCESS:
      const filteredData = state.data.filter(
        (todo) => todo._id !== action.payload
      );
      return {
        ...state,
        data: filteredData,
      };
    case UPDATE_TODO_DATA_SUCCESS:
      console.log("Updated data:", action.payload);
    // const updatedTodos = state.data.map((todo) => {
    //   if (todo._id === action.payload.todoId) {
    //     return action.payload.updatedTodo;
    //   }
    //   return todo;
    // });
    // console.log("Updated todos:", updatedTodos);
    // return {
    //   ...state,
    //   data: updatedTodos,
    //   loading: false,
    // };
    case UPDATE_TODO_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SAVE_TODO_SUCCESS:
      const savedData = state.data.map((todo) => {
        if (todo._id === action.payload.todoId) {
          return action.payload.savedTodo;
        }
        return todo;
      });
      return {
        ...state,
        data: savedData,
        loading: false,
      };
    case SAVE_TODO_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
