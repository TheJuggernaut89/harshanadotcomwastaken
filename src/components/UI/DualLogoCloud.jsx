import React from 'react';
import { InfiniteSlider } from './InfiniteSlider';
import { ProgressiveBlur } from './ProgressiveBlur';
import { cn } from '../../utils/cn';

export function DualLogoCloud({ logos, className }) {
    // Use a shared key to ensure both sliders mount simultaneously
    const [syncKey, setSyncKey] = React.useState(0);

    React.useEffect(() => {
        // Force remount to sync animations
        setSyncKey(prev => prev + 1);
    }, []);

    return (
        <div className={cn("relative w-full py-12", className)}>
            <div className="grid grid-cols-2 gap-0">
                {/* Left Side - Grayscale (No Color) */}
                <div className="relative">
                    <InfiniteSlider
                        key={`left-${syncKey}`}
                        gap={60}
                        reverse
                        duration={25}
                    >
                        {logos.map((logo, index) => (
                            <img
                                alt={logo.alt}
                                className="pointer-events-none h-16 select-none md:h-20 dark:brightness-0 dark:invert opacity-70 hover:opacity-100 transition-opacity grayscale"
                                height="auto"
                                key={`logo-left-${logo.alt}-${index}`}
                                loading="lazy"
                                src={logo.src}
                                width="auto"
                            />
                        ))}
                    </InfiniteSlider>

                    {/* Left side blur edges */}
                    <ProgressiveBlur
                        blurIntensity={1}
                        className="pointer-events-none absolute top-0 left-0 h-full w-[200px]"
                        direction="left"
                    />
                </div>

                {/* Right Side - Full Color (Offset for seamless transition) */}
                <div className="relative">
                    <InfiniteSlider
                        key={`right-${syncKey}`}
                        gap={60}
                        reverse
                        duration={25}
                        offset={0.5} // Offset by 50% to create seamless transition
                    >
                        {logos.map((logo, index) => (
                            <img
                                alt={logo.alt}
                                className="pointer-events-none h-16 select-none md:h-20 opacity-70 hover:opacity-100 transition-opacity"
                                height="auto"
                                key={`logo-right-${logo.alt}-${index}`}
                                loading="lazy"
                                src={logo.coloredSrc || logo.src}
                                width="auto"
                            />
                        ))}
                    </InfiniteSlider>

                    {/* Right side blur edges */}
                    <ProgressiveBlur
                        blurIntensity={1}
                        className="pointer-events-none absolute top-0 right-0 h-full w-[200px]"
                        direction="right"
                    />
                </div>
            </div>
        </div>
    );
}
