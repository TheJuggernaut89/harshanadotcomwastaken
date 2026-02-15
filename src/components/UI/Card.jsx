import React from 'react';
import { cn } from '../../utils/cn';

const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
