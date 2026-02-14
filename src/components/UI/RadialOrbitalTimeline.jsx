import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link as LinkIcon, Zap } from "lucide-react";
import { Badge } from './Badge';
import { Button } from './Button';
import { cn } from '../../utils/cn';

// Inline Card components to avoid conflicts
const TimelineCard = ({ className, children, ...props }) => (
    <div className={cn("rounded-lg border bg-white dark:bg-navy-dark text-gray-900 dark:text-white shadow-sm", className)} {...props}>
        {children}
    </div>
);

const TimelineCardHeader = ({ className, children, ...props }) => (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
        {children}
    </div>
);

const TimelineCardTitle = ({ className, children, ...props }) => (
    <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props}>
        {children}
    </h3>
);

const TimelineCardContent = ({ className, children, ...props }) => (
    <div className={cn("p-6 pt-0", className)} {...props}>
        {children}
    </div>
);

export const RadialOrbitalTimeline = ({ timelineData }) => {
    const [expandedItems, setExpandedItems] = useState({});
    const [rotationAngle, setRotationAngle] = useState(0);
    const [autoRotate, setAutoRotate] = useState(true);
    const [pulseEffect, setPulseEffect] = useState({});
    const [centerOffset] = useState({ x: 0, y: 0 });
    const [activeNodeId, setActiveNodeId] = useState(null);
    const containerRef = useRef(null);
    const orbitRef = useRef(null);
    const nodeRefs = useRef({});

    const handleContainerClick = (e) => {
        if (e.target === containerRef.current || e.target === orbitRef.current) {
            setExpandedItems({});
            setActiveNodeId(null);
            setPulseEffect({});
            setAutoRotate(true);
        }
    };

    const toggleItem = (id) => {
        setExpandedItems((prev) => {
            const newState = { ...prev };
            Object.keys(newState).forEach((key) => {
                if (parseInt(key) !== id) {
                    newState[parseInt(key)] = false;
                }
            });

            newState[id] = !prev[id];

            if (!prev[id]) {
                setActiveNodeId(id);
                setAutoRotate(false);

                const relatedItems = getRelatedItems(id);
                const newPulseEffect = {};
                relatedItems.forEach((relId) => {
                    newPulseEffect[relId] = true;
                });
                setPulseEffect(newPulseEffect);
            } else {
                setActiveNodeId(null);
                setAutoRotate(true);
                setPulseEffect({});
            }

            return newState;
        });
    };

    useEffect(() => {
        let rotationTimer;

        if (autoRotate) {
            rotationTimer = setInterval(() => {
                setRotationAngle((prev) => {
                    const newAngle = (prev + 0.3) % 360;
                    return Number(newAngle.toFixed(3));
                });
            }, 50);
        }

        return () => {
            if (rotationTimer) {
                clearInterval(rotationTimer);
            }
        };
    }, [autoRotate]);

    const calculateNodePosition = (index, total) => {
        const angle = ((index / total) * 360 + rotationAngle) % 360;
        const radius = 200;
        const radian = (angle * Math.PI) / 180;

        const x = radius * Math.cos(radian) + centerOffset.x;
        const y = radius * Math.sin(radian) + centerOffset.y;

        const zIndex = Math.round(100 + 50 * Math.cos(radian));
        const opacity = Math.max(
            0.4,
            Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
        );

        return { x, y, angle, zIndex, opacity };
    };

    const getRelatedItems = (itemId) => {
        const currentItem = timelineData.find((item) => item.id === itemId);
        return currentItem ? currentItem.relatedIds : [];
    };

    const isRelatedToActive = (itemId) => {
        if (!activeNodeId) return false;
        const relatedItems = getRelatedItems(activeNodeId);
        return relatedItems.includes(itemId);
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case "completed":
                return "text-white bg-black dark:bg-white dark:text-black border-white dark:border-black";
            case "in-progress":
                return "text-black bg-white dark:bg-black dark:text-white border-black dark:border-white";
            case "pending":
                return "text-white bg-black/40 dark:bg-white/40 dark:text-black border-white/50 dark:border-black/50";
            default:
                return "text-white bg-black/40 border-white/50";
        }
    };

    return (
        <div
            className="w-full h-screen flex flex-col items-center justify-center bg-white dark:bg-black overflow-hidden transition-colors duration-600"
            ref={containerRef}
            onClick={handleContainerClick}
        >
            <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
                <div
                    className="absolute w-full h-full flex items-center justify-center"
                    ref={orbitRef}
                    style={{
                        perspective: "1000px",
                        transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
                    }}
                >
                    {/* Center Core */}
                    <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center z-10">
                        <div className="absolute w-20 h-20 rounded-full border border-white/20 animate-ping opacity-70"></div>
                        <div
                            className="absolute w-24 h-24 rounded-full border border-white/10 animate-ping opacity-50"
                            style={{ animationDelay: "0.5s" }}
                        ></div>
                        <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md"></div>
                    </div>

                    {/* Orbit Ring */}
                    <div className="absolute w-96 h-96 rounded-full border border-white/10"></div>

                    {/* Orbital Nodes */}
                    {timelineData.map((item, index) => {
                        const position = calculateNodePosition(index, timelineData.length);
                        const isExpanded = expandedItems[item.id];
                        const isRelated = isRelatedToActive(item.id);
                        const isPulsing = pulseEffect[item.id];

                        const nodeStyle = {
                            transform: `translate(${position.x}px, ${position.y}px)`,
                            zIndex: isExpanded ? 200 : position.zIndex,
                            opacity: isExpanded ? 1 : position.opacity,
                        };

                        return (
                            <div
                                key={item.id}
                                ref={(el) => (nodeRefs.current[item.id] = el)}
                                className="absolute transition-all duration-700 cursor-pointer"
                                style={nodeStyle}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(item.id);
                                }}
                            >
                                {/* Energy Glow */}
                                <div
                                    className={cn(
                                        "absolute rounded-full -inset-1",
                                        isPulsing && "animate-pulse duration-1000"
                                    )}
                                    style={{
                                        background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
                                        width: `${item.energy * 0.5 + 56}px`,
                                        height: `${item.energy * 0.5 + 56}px`,
                                        left: `-${(item.energy * 0.5 + 56 - 56) / 2}px`,
                                        top: `-${(item.energy * 0.5 + 56 - 56) / 2}px`,
                                    }}
                                ></div>

                                {/* Node Circle with Logo */}
                                <div
                                    className={cn(
                                        "w-14 h-14 rounded-full flex items-center justify-center p-2",
                                        isExpanded
                                            ? "bg-primary text-white"
                                            : isRelated
                                                ? "bg-primary/50 text-white"
                                                : "bg-white dark:bg-navy text-white dark:text-navy",
                                        "border-2",
                                        isExpanded
                                            ? "border-primary shadow-lg shadow-primary/30"
                                            : isRelated
                                                ? "border-primary animate-pulse"
                                                : "border-navy/40 dark:border-white/40",
                                        "transition-all duration-300 transform",
                                        isExpanded && "scale-150"
                                    )}
                                >
                                    <img
                                        src={item.logo}
                                        alt={item.title}
                                        className="w-8 h-8 object-contain"
                                        style={{
                                            filter: isExpanded ? 'brightness(0) invert(1)' : 'none'
                                        }}
                                    />
                                </div>

                                {/* Node Title */}
                                <div
                                    className={cn(
                                        "absolute top-12 whitespace-nowrap",
                                        "text-xs font-semibold tracking-wider",
                                        "transition-all duration-300",
                                        isExpanded ? "text-navy dark:text-white scale-125" : "text-navy/70 dark:text-white/70"
                                    )}
                                >
                                    {item.title}
                                </div>

                                {/* Expanded Card */}
                                {isExpanded && (
                                    <TimelineCard className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-white/95 dark:bg-black/90 backdrop-blur-lg border-navy/30 dark:border-white/30 shadow-xl shadow-navy/10 dark:shadow-white/10 overflow-visible">
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50"></div>
                                        <TimelineCardHeader className="pb-2">
                                            <div className="flex justify-between items-center">
                                                <Badge
                                                    className={cn("px-2 text-xs", getStatusStyles(item.status))}
                                                >
                                                    {item.status === "completed"
                                                        ? "EXPERT"
                                                        : item.status === "in-progress"
                                                            ? "PROFICIENT"
                                                            : "LEARNING"}
                                                </Badge>
                                                <span className="text-xs font-mono text-white/50">
                                                    {item.category}
                                                </span>
                                            </div>
                                            <TimelineCardTitle className="text-sm mt-2 text-white">
                                                {item.title}
                                            </TimelineCardTitle>
                                        </TimelineCardHeader>
                                        <TimelineCardContent className="text-xs text-white/80">
                                            <p>{item.content}</p>

                                            {/* Proficiency Bar */}
                                            <div className="mt-4 pt-3 border-t border-white/10">
                                                <div className="flex justify-between items-center text-xs mb-1">
                                                    <span className="flex items-center">
                                                        <Zap size={10} className="mr-1" />
                                                        Proficiency
                                                    </span>
                                                    <span className="font-mono">{item.energy}%</span>
                                                </div>
                                                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                                        style={{ width: `${item.energy}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {/* Related Tools */}
                                            {item.relatedIds.length > 0 && (
                                                <div className="mt-4 pt-3 border-t border-white/10">
                                                    <div className="flex items-center mb-2">
                                                        <LinkIcon size={10} className="text-white/70 mr-1" />
                                                        <h4 className="text-xs uppercase tracking-wider font-medium text-white/70">
                                                            Related Tools
                                                        </h4>
                                                    </div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {item.relatedIds.map((relatedId) => {
                                                            const relatedItem = timelineData.find(
                                                                (i) => i.id === relatedId
                                                            );
                                                            return (
                                                                <Button
                                                                    key={relatedId}
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-white/20 bg-transparent hover:bg-white/10 text-white/80 hover:text-white transition-all"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        toggleItem(relatedId);
                                                                    }}
                                                                >
                                                                    {relatedItem?.title}
                                                                    <ArrowRight
                                                                        size={8}
                                                                        className="ml-1 text-white/60"
                                                                    />
                                                                </Button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </TimelineCardContent>
                                    </TimelineCard>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default RadialOrbitalTimeline;
