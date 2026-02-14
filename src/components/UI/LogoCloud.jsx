import React from 'react';
import { InfiniteSlider } from '../UI/InfiniteSlider';
import { ProgressiveBlur } from '../UI/ProgressiveBlur';
import { cn } from '../../utils/cn';

export function LogoCloud({ logos, className }) {
    return (
        <div className={cn("relative w-full py-12", className)}>
            <InfiniteSlider gap={60} reverse duration={25} durationOnHover={60}>
                {logos.map((logo, index) => (
                    <img
                        alt={logo.alt}
                        className="pointer-events-none h-16 select-none md:h-20 dark:brightness-0 dark:invert opacity-70 hover:opacity-100 transition-opacity"
                        height="auto"
                        key={`logo-${logo.alt}-${index}`}
                        loading="lazy"
                        src={logo.src}
                        width="auto"
                    />
                ))}
            </InfiniteSlider>

            <ProgressiveBlur
                blurIntensity={1}
                className="pointer-events-none absolute top-0 left-0 h-full w-[200px]"
                direction="left"
            />
            <ProgressiveBlur
                blurIntensity={1}
                className="pointer-events-none absolute top-0 right-0 h-full w-[200px]"
                direction="right"
            />
        </div>
    );
}
