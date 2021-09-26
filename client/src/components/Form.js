import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTodoAsync } from "../redux/todos/todosSlice";
import Spinner from "./Spinner";

const Form = () => {
  const [title, setTitle] = useState("");
  const isLoading = useSelector((state) => state.todos.addNewTodoLoading);
  const error = useSelector((state) => state.todos.addNewTodoError);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      if (!title) return toast.error("Boş değer giremezsiniz!");
      dispatch(addTodoAsync({ title }));
      setTitle("");
      toast.success("Todo başarıyla eklendi!");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
      />
      {isLoading && <Spinner />}
      {error && toast.error("Error")}
    </form>
  );
};

export default Form;
