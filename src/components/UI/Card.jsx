import React from 'react';

const Card = ({ children, className = '' }) => {
    return (
        <div className={`bg-white dark:bg-navy-light/50 backdrop-blur-sm rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 dark:border-white/5 ${className}`}>
            {children}
        </div>
    );
};

export default Card;
