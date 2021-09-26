import axios from "axios";

const BASE_URL = process.env.REACT_APP_API;

export const api = axios.create({
  baseURL: BASE_URL,
});

export const getTodosApi = async () => {
  return await api.get(`${BASE_URL}`);
};

export const addTodosApi = async (data) => {
  return await api.post(`${BASE_URL}`, data);
};

export const toggleTodoApi = async ({ id, data }) => {
  return await api.patch(`${BASE_URL}/${id}`, data);
};

export const removeTodoApi = async (id) => {
  return await api.delete(`${BASE_URL}/${id}`);
};
