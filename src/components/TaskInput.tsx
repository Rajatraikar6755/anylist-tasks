
import React, { useState } from 'react';
import { Priority, Category } from '../types/task';
import CategorySelector from './CategorySelector';
import { Calendar as CalendarIcon, Plus, AlertTriangle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface TaskInputProps {
  onAddTask: (title: string, priority: Priority, category: Category, dueDate?: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('personal');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Task title cannot be empty");
      return;
    }
    
    onAddTask(
      title, 
      priority, 
      category, 
      date ? format(date, 'yyyy-MM-dd') : undefined
    );
    
    setTitle('');
    setPriority('medium');
    setCategory('personal');
    setDate(undefined);
    setIsExpanded(false);
    
    toast.success("Task added successfully");
  };

  const priorityOptions: { value: Priority; label: string; icon: React.ReactNode }[] = [
    { value: 'low', label: 'Low', icon: null },
    { value: 'medium', label: 'Medium', icon: <AlertCircle size={14} /> },
    { value: 'high', label: 'High', icon: <AlertTriangle size={14} /> },
  ];

  return (
    <form onSubmit={handleSubmit} className="mb-6 w-full">
      <div className="glass-panel rounded-xl p-4 transition-all duration-300">
        <div className="flex items-center gap-2">
          <div className="flex-grow">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a new task..."
              className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/80 text-base"
              onFocus={() => setIsExpanded(true)}
            />
          </div>
          <Button 
            type="submit" 
            variant="default"
            size="sm"
            className="rounded-full w-8 h-8 p-0"
          >
            <Plus size={16} />
          </Button>
        </div>

        {isExpanded && (
          <div className="pt-3 animate-slide-up overflow-hidden">
            <div className="border-t border-border pt-3">
              <div className="mb-3">
                <div className="text-xs font-medium text-muted-foreground mb-2">Priority</div>
                <div className="flex gap-2">
                  {priorityOptions.map(({ value, label, icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setPriority(value)}
                      className={`px-3 py-1.5 text-xs rounded-full flex items-center gap-1.5 transition-colors ${
                        priority === value 
                          ? value === 'high' 
                            ? 'bg-destructive/10 text-destructive border border-destructive/30' 
                            : value === 'medium'
                              ? 'bg-orange-100 text-orange-700 border border-orange-200' 
                              : 'bg-primary/10 text-primary border border-primary/30'
                          : 'bg-secondary border border-input text-muted-foreground'
                      }`}
                    >
                      {icon && <span>{icon}</span>}
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs font-medium text-muted-foreground mb-2">Category</div>
              <CategorySelector selectedCategory={category} onChange={setCategory} />

              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-2">Due Date (Optional)</div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`text-xs justify-start h-8 ${
                          date ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-3 w-3" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default TaskInput;
