import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeActiveFilter,
  clearCompleted,
  selectTodos,
  selectActiveFilter,
} from "../redux/todos/todosSlice";

const ContentFooter = () => {
  const items = useSelector(selectTodos);
  const itemsLeft = items.filter((item) => !item.completed).length;

  const dispatch = useDispatch();
  const activeFilter = useSelector(selectActiveFilter);

  useEffect(() => {
    localStorage.setItem("activeFilter", activeFilter);
  }, [activeFilter]);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft} </strong>
        {itemsLeft > 1 ? "items left" : "item left"}
      </span>

      <ul className="filters">
        <li>
          <button
            className={activeFilter === "all" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("all"))}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={activeFilter === "active" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("active"))}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={activeFilter === "completed" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("completed"))}
          >
            Completed
          </button>
        </li>
      </ul>

      <button
        className="clear-completed"
        onClick={() => dispatch(clearCompleted())}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default ContentFooter;
