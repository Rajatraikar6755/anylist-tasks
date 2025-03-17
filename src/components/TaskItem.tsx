
import React, { useState } from 'react';
import { Task } from '../types/task';
import { format } from 'date-fns';
import { Check, Trash, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getCategoryStyles } from './CategorySelector';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = () => {
    onToggle(task.id);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(task.id);
    }, 300);
  };

  const getPriorityDot = () => {
    return (
      <span className={`priority-dot ${task.priority}`}></span>
    );
  };

  return (
    <div
      className={cn(
        'group px-4 py-3 rounded-lg border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:bg-card',
        isDeleting && 'opacity-0 transform -translate-y-2',
        task.completed && 'bg-card/20 border-muted',
        'animate-slide-in'
      )}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggle}
          className={cn(
            'flex-shrink-0 w-5 h-5 rounded-full border transition-all duration-300 flex items-center justify-center',
            task.completed 
              ? 'bg-primary border-primary' 
              : 'border-muted-foreground/50 hover:border-primary'
          )}
        >
          {task.completed && (
            <Check size={12} className="text-primary-foreground animate-checkmark" />
          )}
        </button>

        <div className="flex-grow">
          <div className="flex items-start gap-2">
            <h3 
              className={cn(
                'font-medium text-sm transition-all task-complete-transition',
                task.completed && 'text-muted-foreground line-through'
              )}
            >
              {getPriorityDot()} {task.title}
            </h3>
          </div>
          
          <div className="flex gap-2 mt-2 items-center">
            <span className={cn(
              "category-pill text-[10px]",
              getCategoryStyles(task.category)
            )}>
              {task.category}
            </span>
            
            {task.dueDate && (
              <span className="flex items-center text-[10px] text-muted-foreground">
                <Calendar size={10} className="mr-1" />
                {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </span>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 h-8 w-8 transition-opacity text-muted-foreground hover:text-destructive"
          onClick={handleDelete}
        >
          <Trash size={14} />
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;
