
import React from 'react';
import { useTaskStore } from '../lib/taskStore';
import { CheckCheck, Clock, ListTodo } from 'lucide-react';

const Header: React.FC = () => {
  const { tasks, getFilteredTasks } = useTaskStore();
  
  const completedTasks = getFilteredTasks(true);
  const pendingTasks = getFilteredTasks(false);
  
  const getTodayCount = () => {
    const today = new Date().toISOString().split('T')[0];
    return pendingTasks.filter(task => 
      task.dueDate && task.dueDate.startsWith(today)
    ).length;
  };

  return (
    <header className="mb-8 animate-fade-in px-6 py-4">
      <h1 className="text-3xl font-display tracking-tight mb-2 relative">
        <span className="glass-title">Minimalist Tasks</span>
      </h1>
      <p className="text-muted-foreground max-w-md">
        A clean, beautiful and simple way to manage your tasks
      </p>
      
      <div className="flex flex-wrap gap-4 mt-5">
        <div className="flex items-center">
          <div className="mr-3 p-2 bg-accent rounded-full">
            <ListTodo size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="font-medium">{tasks.length} tasks</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="mr-3 p-2 bg-accent rounded-full">
            <CheckCheck size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="font-medium">{completedTasks.length} tasks</p>
          </div>
        </div>
        
        {getTodayCount() > 0 && (
          <div className="flex items-center">
            <div className="mr-3 p-2 bg-accent rounded-full">
              <Clock size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Due Today</p>
              <p className="font-medium">{getTodayCount()} tasks</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
