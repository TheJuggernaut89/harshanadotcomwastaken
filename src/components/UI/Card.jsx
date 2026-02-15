import React from 'react';
import { cn } from '../../lib/utils';

const Card = ({ children, className = '' }) => {
  // Use 'glass-card' as the base style, consistent with other components like ToolCard.
  // Add p-6 for default padding, and rounded-xl for consistent border radius.
  return (
    <div className={cn('glass-card p-6 rounded-xl', className)}>
      {children}
    </div>
  );
};

export default Card;
