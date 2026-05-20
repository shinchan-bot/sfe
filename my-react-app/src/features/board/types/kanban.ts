export type ColumnId = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  columnId: ColumnId;
  title: string;
  description?: string;
}

export interface ColumnType {
  id: ColumnId;
  title: string;
}

export const COLUMNS: ColumnType[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' }
];
