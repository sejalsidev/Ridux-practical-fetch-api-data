import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTodos, updatedData } from "../action/actions";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {
  updateTodoInDatabase,
  deleteTodo,
  updateTodoDataSuccess,
} from "../action/actions";

const AddTodoList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.todo.data);
  const [softDeleteFilter, setSoftDeleteFilter] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editedTodos, setEditedTodos] = useState({});

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);

  const handleCheckboxChange = async (id, checked) => {
    try {
      const updatedData = data.data.map((todo) => {
        if (todo._id === id) {
          return { ...todo, softDeleted: !checked };
        }
        return todo;
      });
      dispatch(updatedData(id, updatedData));
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  const filteredTodos = data?.data?.filter((todo) => {
    if (todo && todo.title) {
      return todo.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return false;
  });
  console.log(filteredTodos);
  /* const handleSave = async (todoId) => {
    const updatedTodo = editedTodos[todoId];
    console.log(updatedTodo, "updatedTodoupdatedTodoupdatedTodo");
    if (updatedTodo) {
      try {
        // dispatch(updateTodoDataSuccess(todoId, updatedTodo));
        await dispatch(updateTodoInDatabase(todoId, updatedTodo));
      } catch (error) {
        console.error("Error updating todo:", error.message);
      }
    }
  }; */
  const handleSave = async (todoId) => {
    const updatedTodo = editedTodos[todoId];
    if (updatedTodo) {
      try {
        await dispatch(updateTodoInDatabase(todoId, updatedTodo));
        setEditedTodos((prevEditedTodos) => {
          const updatedEditedTodos = { ...prevEditedTodos };
          delete updatedEditedTodos[todoId];
          return updatedEditedTodos;
        });
        dispatch(fetchAllTodos());
      } catch (error) {
        console.error("Error updating todo:", error.message);
      }
    }
  };

  const handleCancel = (todoId) => {
    setEditedTodos((prevEditedTodos) => {
      const updatedEditedTodos = { ...prevEditedTodos };
      delete updatedEditedTodos[todoId];
      return updatedEditedTodos;
    });
  };

  const handleEdit = (todoId, field, value) => {
    setEditedTodos((prevEditedTodos) => ({
      ...prevEditedTodos,
      [todoId]: {
        ...prevEditedTodos[todoId],
        [field]: value,
        editMode: true,
      },
    }));
  };
  const handleDelete = (todoId) => {
    dispatch(deleteTodo(todoId));
    dispatch(fetchAllTodos());
  };
  return (
    <div className="container align-items-center" border="primary">
      <input
        className="form-control me-2 mt-4"
        type="search"
        placeholder="Search Todos"
        aria-label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      ></input>
      {/* <Table striped bordered hover size="sm"> */}
      <Table
        striped
        bordered
        hover
        size="sm"
        stripped
        bordered
        hover
        size="sm"
        fill
        className="mb-3 mt-4  p-20 table-auto"
        responsive="sm"
      >
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos?.map((todo) => (
            <tr key={todo._id}>
              <td style={{ width: "" }} className="text-center">
                {!softDeleteFilter || !todo.softDeleted ? (
                  <input
                    type="checkbox"
                    aria-label="Checkbox for following text input  align-items-start"
                    checked={!todo.isDelete}
                    onChange={(e) =>
                      handleCheckboxChange(todo._id, e.target.checked)
                    }
                  />
                ) : null}
              </td>
              <td>
                {editedTodos[todo._id] ? (
                  <input
                    type="text"
                    value={editedTodos[todo._id].title || ""}
                    onChange={(e) =>
                      handleEdit(todo._id, "title", e.target.value)
                    }
                  />
                ) : (
                  todo.title
                )}
              </td>
              <td>
                {editedTodos[todo._id] ? (
                  <input
                    type="text"
                    value={editedTodos[todo._id].description || ""}
                    onChange={(e) =>
                      handleEdit(todo._id, "description", e.target.value)
                    }
                  />
                ) : (
                  todo.description
                )}
              </td>
              <td>
                {editedTodos[todo._id] && editedTodos[todo._id].editMode ? (
                  <>
                    <Button
                      variant="success"
                      onClick={() => handleSave(todo._id)}
                    >
                      Save
                    </Button>{" "}
                    <Button
                      variant="secondary"
                      onClick={() => handleCancel(todo._id)}
                    >
                      Cancel
                    </Button>{" "}
                  </>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => handleEdit(todo._id)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="primary"
                      onClick={() => handleDelete(todo._id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AddTodoList;
