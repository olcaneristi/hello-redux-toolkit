import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [
      {
        id: 1,
        title: "Learn React",
        completed: true,
      },
      {
        id: 2,
        title: "Read a Book",
        completed: false,
      },
    ],
    activeFilter: "all",
  },

  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: ({ title }) => {
        return {
          payload: {
            id: nanoid(),
            completed: false,
            title,
          },
        };
      },
    },
    toggle: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);

      item.completed = !item.completed;
    },
    destroy: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => item.id !== id);
      state.items = filtered;
    },

    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },

    clearCompleted: (state) => {
      const clearAllCompleted = state.items.filter(
        (item) => item.completed === false
      );
      state.items = clearAllCompleted;
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
export const { addTodo, toggle, destroy, changeActiveFilter, clearCompleted } =
  todosSlice.actions;
export default todosSlice.reducer;
