export interface ITask {
  id: string;
  tags: ITag[];
  title: string;
  end_time: Date;
  created_at: Date;
  updated_at: Date;
  start_time: Date;
  description: string;
}

export interface ITag {
  id: string;
  name: string;
  color: string;
}

export interface ITaskState {
  data: ITask[];
  isLoading: boolean;
  error: Error | null;
}
