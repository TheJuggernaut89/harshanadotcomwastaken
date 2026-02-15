import React from 'react';
import { cn } from '../../utils/cn';

const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
