import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { ITask, ITaskState } from "./interfaces";
import { generateId } from "../../../../helpers/generateId";

export const TASK_REDUCER_SLICE_NAME = "task";

const initialState: ITaskState = {
  data: [],
  error: null,
  isLoading: false,
};

export const { reducer: taskReducer, actions: taskActions } = createSlice({
  initialState,
  name: TASK_REDUCER_SLICE_NAME,
  reducers: {
    updateTask: (state, action: PayloadAction<Partial<ITask>>) => {
      const task = state.data.find(({ id }) => id === action.payload.id);
      const taskIndex = state.data.findIndex(
        ({ id }) => id === action.payload.id
      );

      if (task && taskIndex > -1) {
        state.data.splice(taskIndex, 1, { ...task, ...action.payload });
      }
    },

    addTask: (state, action: PayloadAction<Partial<ITask>>) => {
      const task = {
        ...action.payload,
        completed: false,
        id: generateId(),
        created_at: dayjs().valueOf(),
        updated_at: dayjs().valueOf(),
      };

      state.data.push(task as ITask);
    },

    deleteTask: (state, action: PayloadAction<ITask["id"]>) => {
      const taskIndex = state.data.findIndex(({ id }) => id === action.payload);
      state.data.splice(taskIndex, 1);
    },
  },
});
