
import React from 'react';
import { ClipboardList } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="py-16 flex flex-col items-center justify-center text-center animate-fade-in">
      <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
        <ClipboardList size={32} className="text-primary" />
      </div>
      <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
      <p className="text-muted-foreground max-w-xs">
        Create your first task by typing in the input field above
      </p>
    </div>
  );
};

export default EmptyState;
