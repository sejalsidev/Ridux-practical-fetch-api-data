import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTodos, updatedData } from "../action/actions";

const AddTodoList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.todo.data);
  const [softDeleteFilter, setSoftDeleteFilter] = useState(true);

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
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          {data?.data?.map((todo) => (
            <tr key={todo._id}>
              <td>
                {!softDeleteFilter || !todo.softDeleted ? (
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={!todo.isDelete}
                    onChange={(e) =>
                      handleCheckboxChange(todo._id, e.target.checked)
                    }
                  />
                ) : null}
              </td>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddTodoList;
