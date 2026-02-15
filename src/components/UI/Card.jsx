import React from 'react';
import { cn } from '../../utils/cn';

const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-navy-light/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-navy/5 dark:border-white/5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
