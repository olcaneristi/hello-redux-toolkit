import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todos/todosSlice";

const Form = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return setError(true);
    dispatch(addTodo({ title }));
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>Boş değer giremezsiniz.</p>}

      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
};

export default Form;
