import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export const BentoGrid = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  animationType = "float",
}) => {
  const animations = {
    float: {
      animate: { y: [0, -10, 0] },
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    },
    pulse: {
      animate: { scale: [1, 1.02, 1] },
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    drift: {
      animate: { x: [0, 5, 0], y: [0, -5, 0] },
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    },
    glow: {
      animate: {
        boxShadow: [
          "0 0 20px rgba(230, 57, 70, 0.3)",
          "0 0 40px rgba(230, 57, 70, 0.5)",
          "0 0 20px rgba(230, 57, 70, 0.3)"
        ]
      },
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const animation = animations[animationType];

  return (
    <motion.div
      {...animation}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-navy/50 bg-white/50 border border-navy/10 dark:border-white/10 justify-between flex flex-col space-y-4 backdrop-blur-sm",
        className
      )}
      whileHover={{ scale: 1.02 }}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon && (
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
            {icon}
          </div>
        )}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-sm dark:text-neutral-300">
          {description}
        </div>
      </div>
    </motion.div>
  );
};
