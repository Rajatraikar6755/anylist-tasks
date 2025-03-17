
import { useState, useEffect } from 'react';
import { Task, Priority, Category } from '../types/task';

// Custom hook to manage tasks with localStorage persistence
export function useTaskStore() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (
    title: string,
    priority: Priority = 'medium',
    category: Category = 'personal',
    dueDate?: string
  ) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      priority,
      category,
      dueDate
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  // Toggle task completion status
  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Edit a task
  const editTask = (
    id: string,
    updates: Partial<Omit<Task, 'id' | 'createdAt'>>
  ) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  // Filter tasks by completion status
  const getFilteredTasks = (
    completed?: boolean,
    category?: Category,
    priority?: Priority
  ) => {
    return tasks.filter((task) => {
      let match = true;
      if (completed !== undefined) match = match && task.completed === completed;
      if (category) match = match && task.category === category;
      if (priority) match = match && task.priority === priority;
      return match;
    });
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    getFilteredTasks
  };
}
