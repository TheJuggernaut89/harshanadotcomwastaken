import React from 'react';
import { cn } from '../../utils/cn';

const Card = ({ children, className, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                "bg-white dark:bg-navy-light shadow-lg rounded-2xl overflow-hidden border border-navy/5 dark:border-white/10 transition-all duration-300 hover:shadow-xl",
                className
            )}
        >
            {children}
        </div>
    );
};

export default Card;
