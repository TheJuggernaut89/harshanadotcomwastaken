import React, { useState, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "../../utils/cn";

// --- Sub-Component: ProjectCard ---

const ProjectCard = React.forwardRef(
    ({ image, title, delay, isVisible, index, onClick, isSelected }, ref) => {
        // Slight spread for the cards in the folder
        const rotations = [-8, 0, 8, -4, 4];
        const translations = [-40, 0, 40, -20, 20];

        // Safety for array access
        const rot = rotations[index % rotations.length];
        const trans = translations[index % translations.length];

        return (
            <div
                ref={ref}
                className={cn(
                    "absolute w-24 h-32 rounded-lg overflow-hidden shadow-xl",
                    "bg-white border-2 border-white/20",
                    "cursor-pointer hover:ring-2 hover:ring-accent-primary/50",
                    isSelected && "opacity-0"
                )}
                style={{
                    transform: isVisible
                        ? `translateY(-80px) translateX(${trans}px) rotate(${rot}deg) scale(1)`
                        : "translateY(0px) translateX(0px) rotate(0deg) scale(0.5)",
                    opacity: isSelected ? 0 : isVisible ? 1 : 0,
                    transition: `all 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
                    zIndex: 50 - index, // Ensure higher index is lower in stack
                    left: "calc(50% - 48px)", // Center horizontally (width/2)
                    top: "40%",
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
            >
                <img
                    src={image || "/placeholder.svg"}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] font-medium text-white truncate text-center">
                    {title}
                </p>
            </div>
        );
    }
);
ProjectCard.displayName = "ProjectCard";

// --- Main Component: AnimatedFolder ---

export function AnimatedFolder({
    title,
    projects,
    className,
    onCardClick,
    onHoverChange,
    folderColor = "#722f37", // Default reddish
    icon,
    type = "generic"
}) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRefs = useRef([]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (onHoverChange) onHoverChange(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (onHoverChange) onHoverChange(false);
    };

    // Generate functional color vars based on input prop
    const safeColor = folderColor.includes('var') ? folderColor : folderColor;

    return (
        <div
            className={cn(
                "relative flex flex-col items-center justify-center",
                "p-8 rounded-2xl cursor-pointer",
                "bg-[#2A2426] border border-white/10", // Fallback
                "transition-all duration-500 ease-out",
                "hover:shadow-2xl hover:shadow-accent-primary/10",
                "hover:border-accent-primary/30",
                "group",
                className
            )}
            style={{
                width: "100%",
                maxWidth: "280px",
                height: "320px",
                perspective: "1000px",
                background: "var(--bg-secondary)",
                borderColor: "var(--border-primary)"
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => onCardClick && onCardClick(0)} // Open first item on folder click
        >
            {/* Glow */}
            <div
                className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at 50% 70%, ${safeColor}33 0%, transparent 70%)`, // 33 = 20% opacity
                    opacity: isHovered ? 1 : 0,
                }}
            />

            <div className="relative flex items-center justify-center mb-4" style={{ height: "160px", width: "200px" }}>

                {/* Folder Back */}
                <div
                    className="absolute w-32 h-24 rounded-lg shadow-md"
                    style={{
                        backgroundColor: safeColor,
                        filter: "brightness(0.7)", // Darken for back
                        transformOrigin: "bottom center",
                        transform: isHovered ? "rotateX(-15deg)" : "rotateX(0deg)",
                        transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                        zIndex: 10,
                    }}
                />

                {/* Folder Tab */}
                <div
                    className="absolute w-12 h-4 rounded-t-md"
                    style={{
                        backgroundColor: safeColor,
                        filter: "brightness(0.6)", // Darker for tab
                        top: "calc(50% - 48px - 12px)",
                        left: "calc(50% - 64px + 16px)",
                        transformOrigin: "bottom center",
                        transform: isHovered ? "rotateX(-25deg) translateY(-2px)" : "rotateX(0deg)",
                        transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                        zIndex: 10,
                    }}
                />

                {/* Project Cards (Middle Layer) */}
                <div
                    className="absolute"
                    style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 20,
                    }}
                >
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            ref={(el) => (cardRefs.current[index] = el)}
                            image={project.image}
                            title={project.title}
                            delay={index * 80}
                            isVisible={isHovered}
                            index={index}
                            onClick={() => onCardClick && onCardClick(index)}
                        />
                    ))}
                </div>

                {/* Folder Front */}
                <div
                    className="absolute w-32 h-24 rounded-lg shadow-lg flex items-center justify-center"
                    style={{
                        backgroundColor: safeColor,
                        // No filter or slight brightness
                        top: "calc(50% - 48px + 4px)",
                        transformOrigin: "bottom center",
                        transform: isHovered ? "rotateX(25deg) translateY(8px)" : "rotateX(0deg)",
                        transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                        zIndex: 30,
                    }}
                >
                    <div className="text-white/40">
                        {icon || <ExternalLink size={24} />}
                    </div>
                </div>

                {/* Shine Effect */}
                <div
                    className="absolute w-32 h-24 rounded-lg overflow-hidden pointer-events-none"
                    style={{
                        top: "calc(50% - 48px + 4px)",
                        background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)",
                        transformOrigin: "bottom center",
                        transform: isHovered ? "rotateX(25deg) translateY(8px)" : "rotateX(0deg)",
                        transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                        zIndex: 31,
                    }}
                />
            </div>

            {/* Title */}
            <h3
                className="text-lg font-semibold text-white mt-8 transition-all duration-300"
                style={{
                    transform: isHovered ? "translateY(4px)" : "translateY(0)",
                    color: "var(--text-primary)"
                }}
            >
                {title}
            </h3>

            {/* Count */}
            <p
                className="text-sm text-gray-400 transition-all duration-300"
                style={{
                    opacity: isHovered ? 0.7 : 1,
                    color: "var(--text-secondary)"
                }}
            >
                {projects.length} Files
            </p>

            {/* Hint */}
            <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs text-accent-primary transition-all duration-300 w-full justify-center"
                style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translate(-50%, 0)" : "translate(-50%, 10px)",
                }}
            >
                <span>Click {type} to view</span>
            </div>
        </div>
    );
}

