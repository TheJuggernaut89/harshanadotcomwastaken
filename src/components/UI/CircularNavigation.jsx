import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import SubMenuOrbit from "./SubMenuOrbit";
import { cn } from "../../utils/cn";

/**
 * Circular Navigation Component - Orbital System
 * Replaces rigid SVG wedges with a floating orbital menu system
 */
export default function CircularNavigation({
    navItems,
    isOpen,
    toggleMenu,
    size = 420,
    iconSize = 26,
    // Legacy props (kept for compatibility but unused)
    bandWidth = 90,
    innerGap = 10,
    outerGap = 8,
    outerRingWidth = 22,
}) {
    // Lock scroll when open
    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY;
            document.body.style.overflow = 'hidden';

            const container = document.getElementById('nav-portal-container');
            if (container) {
                container.style.top = `${scrollY}px`;
            }

            return () => {
                document.body.style.overflow = '';
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const currentScroll = typeof window !== 'undefined' ? window.scrollY : 0;

    // Use the SubMenuOrbit to render the main navigation items
    // We pass "parentAngle" as -90 (top) to center it, or simple 0 if the component handles distribution
    // SubMenuOrbit expects "items" and "toggleMenu". 
    // It filters/distributes items. Since this is the MAIN menu, we treat it as an orbit around the center button.

    return createPortal(
        <div
            id="nav-portal-container"
            style={{
                position: 'absolute',
                top: currentScroll,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2147483647,
                pointerEvents: 'none'
            }}
        >
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
                onClick={toggleMenu}
            />

            {/* Main Orbit System */}
            <div className="relative pointer-events-none" style={{ width: size, height: size }}>

                {/* 
                   Render the SubMenuOrbit. 
                   Note: The SubMenuOrbit component we created is designed to be a "satellite" menu.
                   However, for this request, we are replacing the "pizza slices" with an orbital system.
                   We can re-use use SubMenuOrbit or adapt it here.
                   Given the prompt asked to "integrate" it, let's use it as the primary renderer for items.
                   We'll center it by passing a dummy parent angle or modifying the component props.
                   Actually, let's look at how SubMenuOrbit behaves: it translates based on parent angle.
                   To make it centered, we can render it without translation or assume parentAngle=0 and orbitRadius=0.
                */}

                <AnimatePresence>
                    {isOpen && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                            {/* 
                                We reuse SubMenuOrbit logic but we need it centered. 
                                The component calculates `offsetDistance = orbitRadius + 160`.
                                If we want it centered, we need to bypass that offset or create a wrapper.
                                For now, let's render the icons directly using a similar map loop here for the "Main" orbit
                                OR we can modify SubMenuOrbit to accept "isCentered" prop.
                                
                                Let's reimplement the loop here for the MAIN menu using the same "Floating Planet" style 
                                to ensure it fits the "Orbital" requirement perfectly replacing the wedges.
                            */}
                            {navItems.map((item, index) => {
                                const angle = (360 / navItems.length) * index - 90; // Start from top
                                const radius = 140; // Distance from center
                                const rad = (angle * Math.PI) / 180;
                                const x = Math.cos(rad) * radius;
                                const y = Math.sin(rad) * radius;

                                return (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                        animate={{ opacity: 1, scale: 1, x, y }}
                                        exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: index * 0.05,
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 20
                                        }}
                                        className="absolute pointer-events-auto group cursor-pointer"
                                        onClick={() => {
                                            if (item.action) {
                                                item.action();
                                                if (item.name !== 'Theme') toggleMenu();
                                            } else if (item.href) {
                                                const el = document.querySelector(item.href);
                                                if (el) {
                                                    el.scrollIntoView({ behavior: 'smooth' });
                                                    toggleMenu();
                                                }
                                            }
                                        }}
                                    >
                                        <div className="flex flex-col items-center justify-center">
                                            <div className={cn(
                                                "w-14 h-14 rounded-full bg-black/80 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-300",
                                                "group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(210,105,30,0.3)]"
                                            )}>
                                                <item.icon size={24} className="text-white group-hover:text-primary transition-colors" />
                                            </div>
                                            <span className="absolute top-16 text-xs font-bold uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-2 py-1 rounded backdrop-blur-sm whitespace-nowrap">
                                                {item.name}
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </AnimatePresence>

                {/* Center Close Button */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
                    onClick={toggleMenu}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center transition-all group-hover:bg-primary/30"
                    >
                        <X size={32} className="text-white" />
                    </motion.div>
                </div>

            </div>
        </div>,
        document.body
    );
}
