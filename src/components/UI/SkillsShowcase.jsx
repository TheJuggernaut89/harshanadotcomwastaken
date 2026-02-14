import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { content } from '../../data/content';

export function SkillsShowcase() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Flatten skills object into array
    const flatSkills = Object.values(content.skills).flat();

    // Map existing skills to include percentage levels
    const skillsWithLevels = flatSkills.map((skill, index) => ({
        name: skill,
        level: [95, 90, 88, 85, 82, 80, 78, 75, 72, 70, 68, 65][index] || 70
    }));

    return (
        <div className="flex flex-col w-full max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
                <div className="h-px w-12 bg-navy/20 dark:bg-white/10" />
                <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-navy/60 dark:text-gray-400">
                    Expertise
                </span>
            </div>

            {/* Skills list */}
            <div className="flex flex-col gap-1">
                {skillsWithLevels.map((skill, index) => (
                    <div
                        key={skill.name}
                        className="group relative"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div
                            className={cn(
                                "relative flex items-center justify-between py-5 px-4 -mx-4 cursor-pointer",
                                "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                                "rounded-lg",
                                hoveredIndex === index
                                    ? "bg-navy/[0.03] dark:bg-white/[0.05]"
                                    : "bg-transparent",
                            )}
                        >
                            {/* Left side - skill name with animated elements */}
                            <div className="relative flex items-center gap-4">
                                <div
                                    className={cn(
                                        "h-5 w-0.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                                        hoveredIndex === index
                                            ? "bg-primary scale-y-100 opacity-100"
                                            : "bg-gray-300 dark:bg-gray-700 scale-y-50 opacity-0",
                                    )}
                                />

                                {/* Skill name */}
                                <span
                                    className={cn(
                                        "text-base font-medium tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                                        hoveredIndex === index
                                            ? "text-navy dark:text-white translate-x-0"
                                            : "text-navy/60 dark:text-gray-400 -translate-x-5",
                                    )}
                                >
                                    {skill.name}
                                </span>
                            </div>

                            {/* Right side - progress visualization */}
                            <div className="flex items-center gap-4">
                                <div className="relative w-24 h-1 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                                    {/* Animated fill */}
                                    <div
                                        className={cn(
                                            "absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                                            "bg-gradient-to-r from-primary/80 to-primary",
                                        )}
                                        style={{
                                            width: hoveredIndex === index ? `${skill.level}%` : "0%",
                                            transitionDelay: hoveredIndex === index ? "100ms" : "0ms",
                                        }}
                                    />

                                    {/* Shine effect on hover */}
                                    <div
                                        className={cn(
                                            "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent",
                                            "transition-transform duration-700 ease-out",
                                            hoveredIndex === index ? "translate-x-full" : "-translate-x-full",
                                        )}
                                        style={{
                                            transitionDelay: hoveredIndex === index ? "300ms" : "0ms",
                                        }}
                                    />
                                </div>

                                <div className="relative w-10 overflow-hidden">
                                    <span
                                        className={cn(
                                            "block text-sm font-mono tabular-nums text-right",
                                            "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                                            hoveredIndex === index
                                                ? "text-navy dark:text-white opacity-100 translate-y-0 blur-0"
                                                : "text-navy/40 dark:text-gray-500 opacity-0 translate-y-3 blur-sm",
                                        )}
                                    >
                                        {skill.level}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {index < skillsWithLevels.length - 1 && (
                            <div
                                className={cn(
                                    "mx-4 h-px transition-all duration-500",
                                    hoveredIndex === index || hoveredIndex === index + 1
                                        ? "bg-transparent"
                                        : "bg-gray-200 dark:bg-gray-700",
                                )}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-3 mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
                <p className="text-[11px] text-navy/60 dark:text-gray-400 tracking-wide">
                    Hover to explore
                </p>
            </div>
        </div>
    );
}
