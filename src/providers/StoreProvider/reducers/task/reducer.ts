import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { ITaskState } from "./interfaces";
import { generateId } from "../../../../helpers/generateId";
import { generateRandomColor } from "../../../../helpers/generateRandomColor";

export const TASK_REDUCER_SLICE_NAME = "task";

const initialState: ITaskState = {
  data: [
    {
      completed: false,
      id: generateId(),
      end_time: dayjs(1667661812620).toDate(),
      start_date: dayjs(1667661812620).toDate(),
      start_time: dayjs(1667661812620).toDate(),
      updated_at: dayjs(1667661812620).toDate(),
      created_at: dayjs(1667661812620).toDate(),
      title: "Client Review & Feedback",
      description: "Crypto Wallet Redesign",
      categories: [...Array(5)].map(() => ({
        id: generateId(),
        name: generateRandomColor(),
        color: generateRandomColor(),
      })),
    },
  ],
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
