import React from 'react';
import { cn } from '../../utils/cn';

const Card = ({ children, className }) => {
  return (
    <div className={cn("bg-white dark:bg-navy-light rounded-xl p-6 shadow-sm border border-navy/5 dark:border-white/5 transition-all duration-300", className)}>
      {children}
    </div>
  );
};

export default Card;
