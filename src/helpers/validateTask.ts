import { ITask } from "../providers/StoreProvider/reducers/task/interfaces";

export const validateTask = (task: Partial<ITask>) => {
  const errors = {};

  return { hasErrors: !!Object.values(errors).length, errors };
};
