import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/80 dark:bg-navy-light/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-white/5 p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
