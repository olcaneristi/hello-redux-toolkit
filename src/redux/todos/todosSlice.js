import { createSlice } from "@reduxjs/toolkit";
import {
  getTodosAsync,
  addTodoAsync,
  removeTodoAsync,
  toggleTodoAsync,
} from "./todoServices";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: localStorage.getItem("activeFilter"),
    addNewTodo: {
      isLoading: false,
      error: false,
    },
  },

  reducers: {
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },

  extraReducers: {
    // get todos
    [getTodosAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },

    // add todos
    [addTodoAsync.pending]: (state, action) => {
      state.addNewTodo.isLoading = true;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.addNewTodo.isLoading = false;
    },

    [addTodoAsync.rejected]: (state, action) => {
      state.addNewTodo.isLoading = false;
      state.addNewTodo.error = action.error.message;
    },

    // toggle todos
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const { id, completed } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items[index].completed = completed;
    },

    //remove todos
    [removeTodoAsync.fulfilled]: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => item.id !== id);
      state.items = filtered;

      /* bir diğer yöntem
      const id = action.payload;
      const filtered = state.items.findIndex((item) => item.id === id);
      state.items.splice(filtered, 1); 
      */
    },
  },
});
export const selectTodos = (state) => state.todos.items;
export const selectActiveFilter = (state) => state.todos.activeFilter;
export const selectFiltered = (state) => {
  if (state.todos.activeFilter === "all") return state.todos.items;

  return state.todos.items.filter((todo) =>
    state.todos.activeFilter === "active"
      ? todo.completed === false
      : todo.completed === true
  );
};
export const { changeActiveFilter } = todosSlice.actions;
export default todosSlice.reducer;
