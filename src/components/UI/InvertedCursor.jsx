import React, { useState, useEffect, useRef } from 'react';

const InvertedCursor = ({ size = 60 }) => {
    const cursorRef = useRef(null);
    const requestRef = useRef();
    const previousPos = useRef({ x: -size, y: -size });

    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: -size, y: -size });

    // Animation loop for smooth cursor follow
    useEffect(() => {
        const animate = () => {
            if (!cursorRef.current) return;

            const currentX = previousPos.current.x;
            const currentY = previousPos.current.y;
            const targetX = position.x - size / 2;
            const targetY = position.y - size / 2;

            const deltaX = (targetX - currentX) * 0.2;
            const deltaY = (targetY - currentY) * 0.2;

            const newX = currentX + deltaX;
            const newY = currentY + deltaY;

            previousPos.current = { x: newX, y: newY };
            cursorRef.current.style.transform = `translate(${newX}px, ${newY}px)`;

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [position, size]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setVisible(true);
            setPosition({ x: e.pageX, y: e.pageY });
        };

        const handleMouseEnter = () => {
            setVisible(true);
        };

        const handleMouseLeave = () => {
            setVisible(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.documentElement.addEventListener('mouseenter', handleMouseEnter);
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);

        // Hide native cursor
        document.body.style.cursor = 'none';
        document.body.style.setProperty('cursor', 'none', 'important');

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);

            // Restore native cursor
            document.body.style.cursor = 'auto';
            document.body.style.removeProperty('cursor');
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed pointer-events-none rounded-full bg-white z-[9999] transition-opacity duration-300"
            style={{
                width: size,
                height: size,
                opacity: visible ? 1 : 0,
                mixBlendMode: 'difference',
                willChange: 'transform',
            }}
            aria-hidden="true"
        />
    );
};

export default InvertedCursor;
