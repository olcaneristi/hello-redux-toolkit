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
    activeFilter: "all",
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
    [getTodosAsync.pending]: (state) => {
      state.isLoading = true;
      // console.log("Todolar yükleniyor...");
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      // console.log("Todolar başarıyla yüklendi!", action.payload);
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      // console.log("Yükleme sırasında hata!", state.error);
    },

    // add todos
    [addTodoAsync.pending]: (state) => {
      state.addNewTodo.isLoading = true;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.addNewTodo.isLoading = false;
      // console.log("Yeni todo başarıyla eklendi!", action.payload);
    },

    [addTodoAsync.rejected]: (state, action) => {
      state.addNewTodo.isLoading = false;
      state.addNewTodo.error = action.error.message;
      // console.log("Todo eklenemedi!", state.addNewTodo.error);
    },

    // toggle todos
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const { id, completed } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items[index].completed = completed;
      // console.log("Todo başarıyla değiştirildi!", action.payload);
    },

    //remove todos
    [removeTodoAsync.fulfilled]: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => item.id !== id);
      state.items = filtered;
      // console.log("Todo silindi!");

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
