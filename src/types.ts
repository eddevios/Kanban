export interface Task {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  createdBy: string;
  lastEdited?: Date;
  color?: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Board {
  columns: Column[];
}