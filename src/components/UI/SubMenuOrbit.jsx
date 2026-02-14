import { motion, AnimatePresence } from "framer-motion";

/**
 * SubMenuOrbit Component - Secondary Radial Menu on Outer Rim
 * Positions a full radial menu on the OUTER RIM of the main navigation
 * Orbits around the main menu based on parent wedge angle
 */

// Helper functions for radial geometry
const FULL_CIRCLE = 360;

function degToRad(deg) {
    return (deg * Math.PI) / 180;
}

function polarToCartesian(radius, angleDeg) {
    const rad = degToRad(angleDeg);
    return {
        x: Math.cos(rad) * radius,
        y: Math.sin(rad) * radius,
    };
}

function slicePath(index, total, wedgeRadius, innerRadius, startAngleDeg = -90) {
    if (total <= 0) return '';

    const anglePerSlice = FULL_CIRCLE / total;
    const midDeg = startAngleDeg + anglePerSlice * index;
    const halfSlice = anglePerSlice / 2;

    const startDeg = midDeg - halfSlice;
    const endDeg = midDeg + halfSlice;

    const outerStart = polarToCartesian(wedgeRadius, startDeg);
    const outerEnd = polarToCartesian(wedgeRadius, endDeg);
    const innerStart = polarToCartesian(innerRadius, startDeg);
    const innerEnd = polarToCartesian(innerRadius, endDeg);

    const largeArcFlag = anglePerSlice > 180 ? 1 : 0;

    return `
        M ${outerStart.x} ${outerStart.y}
        A ${wedgeRadius} ${wedgeRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}
        L ${innerEnd.x} ${innerEnd.y}
        A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}
        Z
    `;
}

export default function SubMenuOrbit({ 
    items, 
    parentAngle,
    orbitRadius = 240, // Distance from main menu center
    toggleMenu
}) {
    if (!items || items.length === 0) {
        console.log('❌ SubMenuOrbit: No items provided');
        return null;
    }

    console.log('✅ SubMenuOrbit rendering with', items.length, 'items at angle', parentAngle);

    // Calculate position on outer rim based on parent wedge angle
    const offsetDistance = orbitRadius + 160; // Position OUTSIDE main menu (240 + 160 = 400px from center)
    const offsetX = Math.cos(degToRad(parentAngle)) * offsetDistance;
    const offsetY = Math.sin(degToRad(parentAngle)) * offsetDistance;

    console.log('📍 SubMenuOrbit position:', { offsetX, offsetY, offsetDistance });

    // Secondary radial menu sizing (smaller than main)
    const menuSize = 260; // 260px diameter
    const radius = menuSize / 2;
    const outerRingWidth = 10;
    const bandWidth = 45;
    const innerGap = 6;

    const outerRingOuterRadius = radius;
    const outerRingInnerRadius = outerRingOuterRadius - outerRingWidth;
    const wedgeOuterRadius = outerRingInnerRadius - 3;
    const wedgeInnerRadius = wedgeOuterRadius - bandWidth;
    const iconRingRadius = (wedgeOuterRadius + wedgeInnerRadius) / 2;
    const centerRadius = Math.max(wedgeInnerRadius - innerGap, 0);

    const slice = FULL_CIRCLE / items.length;

    const handleClick = (e, item) => {
        e.stopPropagation();
        
        console.log('🎯 Secondary menu clicked:', item.name);
        
        if (item.action) {
            item.action();
            // Close menu if it's not theme toggle
            if (item.name !== 'Light' && item.name !== 'Dark') {
                toggleMenu();
            }
        } else if (item.href) {
            const element = document.querySelector(item.href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                toggleMenu();
            }
        }
    };

    return (
        <motion.g
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25
            }}
            // CRITICAL: Use SVG transform attribute, not CSS style!
            transform={`translate(${offsetX}, ${offsetY})`}
        >
            {/* Backdrop glow */}
            <motion.circle
                cx={0}
                cy={0}
                r={radius + 25}
                className="fill-black/60"
                style={{ 
                    filter: 'blur(20px)',
                    pointerEvents: 'none'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            />

            {/* Secondary menu wedges */}
            {items.map((item, index) => {
                const Icon = item.icon;
                const midDeg = -90 + slice * index;
                const { x: iconX, y: iconY } = polarToCartesian(iconRingRadius, midDeg);
                const iconBoxSize = 60;

                console.log('🔵 Rendering wedge:', item.name, 'at', midDeg, 'degrees');

                return (
                    <g
                        key={item.name}
                        className="cursor-pointer group"
                        onClick={(e) => handleClick(e, item)}
                        style={{ pointerEvents: 'auto' }}
                    >
                        <motion.g
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                delay: index * 0.05,
                                type: 'spring',
                                stiffness: 400,
                                damping: 20
                            }}
                        >
                            {/* Outer ring slice */}
                            <path
                                d={slicePath(index, items.length, outerRingOuterRadius, outerRingInnerRadius)}
                                className="fill-primary/70 transition-all duration-200 group-hover:fill-primary/95"
                                style={{ pointerEvents: 'auto' }}
                            />

                            {/* Main wedge slice */}
                            <motion.path
                                d={slicePath(index, items.length, wedgeOuterRadius, wedgeInnerRadius)}
                                className="fill-white/15 stroke-white/30 stroke-[0.8] transition-all duration-200 group-hover:fill-white/95"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.96 }}
                                style={{ pointerEvents: 'auto' }}
                            />

                            {/* Glow on hover */}
                            <path
                                d={slicePath(index, items.length, wedgeOuterRadius + 6, wedgeInnerRadius - 6)}
                                className="fill-primary/0 group-hover:fill-primary/40 transition-all duration-200"
                                style={{ 
                                    filter: 'blur(10px)',
                                    pointerEvents: 'none'
                                }}
                            />

                            {/* Icon + Label */}
                            <foreignObject
                                x={iconX - iconBoxSize / 2}
                                y={iconY - iconBoxSize / 2}
                                width={iconBoxSize}
                                height={iconBoxSize}
                                style={{ pointerEvents: 'none' }}
                            >
                                <div className="w-full h-full flex flex-col items-center justify-center text-white group-hover:text-primary transition-colors">
                                    <Icon size={18} className="mb-1" />
                                    <span className="text-[8px] uppercase font-black tracking-wider text-center leading-tight px-0.5">
                                        {item.name}
                                    </span>
                                </div>
                            </foreignObject>
                        </motion.g>
                    </g>
                );
            })}

            {/* Center circle */}
            <circle
                cx={0}
                cy={0}
                r={centerRadius}
                className="fill-white/10 stroke-white/30 stroke-[0.5]"
                style={{ pointerEvents: 'none' }}
            />

            {/* Center close icon */}
            <foreignObject
                x={-centerRadius}
                y={-centerRadius}
                width={centerRadius * 2}
                height={centerRadius * 2}
                style={{ pointerEvents: 'none' }}
            >
                <div className="w-full h-full flex items-center justify-center text-white/50 text-[10px] font-bold">
                    ✕
                </div>
            </foreignObject>

            {/* Connection line from parent (optional visual) */}
            <line
                x1={-offsetX}
                y1={-offsetY}
                x2={0}
                y2={0}
                className="stroke-white/20 stroke-[1]"
                strokeDasharray="4 4"
                style={{ pointerEvents: 'none' }}
            />
        </motion.g>
    );
}
