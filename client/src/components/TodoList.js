import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { selectFiltered } from "../redux/todos/todosSlice";
import {
  getTodosAsync,
  toggleTodoAsync,
  removeTodoAsync,
} from "../redux/todos/todoServices";
import Error from "./Error";
import Loading from "./Loading";

const TodoList = () => {
  // const items = useSelector(selectTodos);
  const filteredTodos = useSelector(selectFiltered);
  const dispatch = useDispatch();
  // const activeFilter = useSelector((state) => state.todos.activeFilter);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const handleRemove = async (id) => {
    if (window.confirm("Are you sure?")) {
      await dispatch(removeTodoAsync(id));
      toast.success("Todo başarıyla silindi!");
    }
  };

  const handleToggle = (id, completed) => {
    dispatch(toggleTodoAsync({ id, data: { completed } }));
    toast.success(
      `Todo ${
        completed === true
          ? "tamamlandı, tebrikler!"
          : "geri alındı, başarılar!"
      } .`
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <ul className="todo-list">
      {/* <li className="completed">
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>Learn JavaScript</label>
          <button className="destroy"></button>
        </div>
      </li>*/}

      {filteredTodos.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggle(item.id, !item.completed)}
            />
            <label>{item.title}</label>
            <button
              className="destroy"
              onClick={() => handleRemove(item.id)}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
