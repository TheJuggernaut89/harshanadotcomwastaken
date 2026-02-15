import React from 'react';
import { cn } from '../../utils/cn';

const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-navy-light rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-navy/5 dark:border-white/5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
