import React from 'react';
import { cva } from "class-variance-authority";
import { cn } from '../../utils/cn';

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-white hover:bg-primary/80",
                secondary:
                    "border-transparent bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600",
                destructive:
                    "border-transparent bg-red-500 text-white hover:bg-red-600",
                outline: "text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

export const Badge = ({ className, variant, ...props }) => {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
};

export { badgeVariants };
