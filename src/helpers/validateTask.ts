import { ITask } from "../providers/StoreProvider/reducers/task/interfaces";

export const validateTask = (task: Partial<ITask>) => {
  const values = Object.entries(task);
  const errors = values.reduce((acc, [key, value]) => {
    if (!value) {
      acc[key as keyof ITask] = `${key} is required`;
    }

    return acc;
  }, {} as Record<keyof ITask, string>);

  return { hasErrors: !!Object.values(errors).length, errors };
};
