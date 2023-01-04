export interface ITask {
  id: string;
  title: string;
  end_time: Date;
  created_at: Date;
  start_time: Date;
  updated_at: Date;
  completed: boolean;
  description: string;
  start_date: Date | null;
  categories: ICategory[];
}

export interface ICategory {
  id: string;
  name: string;
  color: string;
}

export interface ITaskState {
  data: ITask[];
  isLoading: boolean;
  error: Error | null;
}
