import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTodosApi,
  addTodosApi,
  toggleTodoApi,
  removeTodoApi,
} from "../../api";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const res = await getTodosApi();
    return res.data;
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodosAync",
  async (data) => {
    const res = await addTodosApi(data);
    return res.data;
  }
);

export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodoAsync",
  async (data) => {
    const res = await toggleTodoApi(data);
    return res.data;
  }
);

export const removeTodoAsync = createAsyncThunk(
  "todos/removeTodoAsync",
  async (id) => {
    await removeTodoApi(id);
    return id;
  }
);
