import { createSlice } from "@reduxjs/toolkit";
import { ITaskState } from "./interfaces";

export const TASK_REDUCER_SLICE_NAME = "TASK";

const initialState: ITaskState = {
  data: [],
  error: null,
  isLoading: false,
};

export const { reducer: taskReducer } = createSlice({
  initialState,
  name: TASK_REDUCER_SLICE_NAME,
  reducers: {
    addTask: (state, action) => {},
    editTodo: (state, action) => {},
    deleteTask: (state, action) => {},
  },
});
