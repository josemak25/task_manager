export interface ITask {
  id: string;
  title: string;
  end_time: number;
  created_at: number;
  start_time: number;
  updated_at: number;
  completed: boolean;
  description: string;
  categories: ICategory[];
  start_date: number | null;
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
