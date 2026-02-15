import React from 'react';
import { cn } from '../../utils/cn';

const Card = ({ children, className, ...props }) => {
    return (
        <div
            className={cn(
                "glass-card p-6",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
