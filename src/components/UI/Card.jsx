import React from 'react';
import { cn } from '../../utils/cn';

const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 border border-zinc-200 dark:border-zinc-800 transition-colors duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
