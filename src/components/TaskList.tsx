
import React, { useState } from 'react';
import { Task, Category, Priority } from '../types/task';
import TaskItem from './TaskItem';
import EmptyState from './EmptyState';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Check, List, Filter } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

type FilterType = 'all' | 'active' | 'completed';
type CategoryFilter = Category | 'all';
type PriorityFilter = Priority | 'all';

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active' && task.completed) return false;
    if (filter === 'completed' && !task.completed) return false;
    if (categoryFilter !== 'all' && task.category !== categoryFilter) return false;
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className="h-8 text-xs"
          >
            <List size={14} className="mr-1" />
            All
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('active')}
            className="h-8 text-xs"
          >
            Active
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
            className="h-8 text-xs"
          >
            <Check size={14} className="mr-1" />
            Completed
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Filter size={14} className="mr-1" />
              Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Category</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setCategoryFilter('all')}>
              All Categories
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCategoryFilter('personal')}>Personal</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCategoryFilter('work')}>Work</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCategoryFilter('health')}>Health</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCategoryFilter('shopping')}>Shopping</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCategoryFilter('other')}>Other</DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuLabel>Priority</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setPriorityFilter('all')}>
              All Priorities
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPriorityFilter('high')}>High</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPriorityFilter('medium')}>Medium</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPriorityFilter('low')}>Low</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No tasks match your filters</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
