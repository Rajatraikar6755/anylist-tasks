
import React from 'react';
import { Category } from '../types/task';
import { Check, Briefcase, ShoppingBag, Heart, ListTodo } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategorySelectorProps {
  selectedCategory: Category;
  onChange: (category: Category) => void;
}

const categories: { value: Category; label: string; icon: React.ReactNode; color: string }[] = [
  { 
    value: 'personal', 
    label: 'Personal', 
    icon: <Heart size={14} />, 
    color: 'bg-pink-100 text-pink-700 border-pink-200'
  },
  { 
    value: 'work', 
    label: 'Work', 
    icon: <Briefcase size={14} />,
    color: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  { 
    value: 'health', 
    label: 'Health', 
    icon: <Heart size={14} />,
    color: 'bg-green-100 text-green-700 border-green-200'
  },
  { 
    value: 'shopping', 
    label: 'Shopping', 
    icon: <ShoppingBag size={14} />,
    color: 'bg-amber-100 text-amber-700 border-amber-200'
  },
  { 
    value: 'other', 
    label: 'Other', 
    icon: <ListTodo size={14} />,
    color: 'bg-purple-100 text-purple-700 border-purple-200'
  },
];

export const getCategoryStyles = (category: Category): string => {
  const categoryObj = categories.find(c => c.value === category);
  return categoryObj?.color || '';
};

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 mt-2">
      {categories.map(({ value, label, icon, color }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all",
            selectedCategory === value 
              ? color 
              : "bg-background text-muted-foreground border-input hover:border-muted-foreground/50"
          )}
        >
          {icon}
          {label}
          {selectedCategory === value && (
            <Check size={12} className="ml-1" />
          )}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
