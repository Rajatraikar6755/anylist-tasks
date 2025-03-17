
import React from 'react';
import Header from '@/components/Header';
import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';
import { Toaster } from '@/components/ui/sonner';
import { useTaskStore } from '@/lib/taskStore';
import { Category, Priority } from '@/types/task';

const Index = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTaskStore();

  const handleAddTask = (
    title: string, 
    priority: Priority, 
    category: Category, 
    dueDate?: string
  ) => {
    addTask(title, priority, category, dueDate);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-background">
      <div className="max-w-2xl w-full mx-auto py-8">
        <Header />
        
        <main className="px-4 md:px-0">
          <div className="glass-container p-6 rounded-xl">
            <TaskInput onAddTask={handleAddTask} />
            <TaskList 
              tasks={tasks} 
              onToggle={toggleTask} 
              onDelete={deleteTask} 
            />
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;
