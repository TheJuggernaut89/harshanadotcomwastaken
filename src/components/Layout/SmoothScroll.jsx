import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Lenis from 'lenis';
// import 'lenis/dist/lenis.css'; // REMOVED: Managed manually in global CSS to prevent blocking

const SmoothScroll = ({ children }) => {
    useEffect(() => {
        // DETECT MOBILE: If simplified user agent check detects mobile, do NOT init Lenis
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

        if (isMobile) {
            return; // Use native scrolling on mobile
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false, // Explicitly false
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div className="smooth-scroll-wrapper">
            {children}
        </div>
    );
};

export default SmoothScroll;
