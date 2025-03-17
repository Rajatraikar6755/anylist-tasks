
export type Priority = 'low' | 'medium' | 'high';

export type Category = 'personal' | 'work' | 'health' | 'shopping' | 'other';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  priority: Priority;
  category: Category;
  dueDate?: string;
}
