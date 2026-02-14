import React from 'react';
import { InfiniteSlider } from '../UI/InfiniteSlider';
import { motion } from 'framer-motion';

// Top Carousel Images (Forward Direction)
// Top Carousel Images (Forward Direction)
const topImages = [
    {
        title: "Mart Artwork 1",
        image: "/images/carousel/top/mart1.jpeg"
    },
    {
        title: "Mart Artwork 2",
        image: "/images/carousel/top/mart2.jpeg"
    },
    {
        title: "Mart Artwork 3",
        image: "/images/carousel/top/mart3.jpeg"
    },
    {
        title: "Mart Artwork 4",
        image: "/images/carousel/top/mart4.jpeg"
    },
    {
        title: "Mart Artwork 5",
        image: "/images/carousel/top/mart5.png"
    },
    {
        title: "Mart Artwork 6",
        image: "/images/carousel/top/mart6.png"
    },
    // Repeating some to ensure infinite scroll density if needed, or just keeping unique. 
    // Given the previous list had 10, let's duplicate the first 4 to maintain length/flow
    {
        title: "Mart Artwork 1 (Rep)",
        image: "/images/carousel/top/mart1.jpeg"
    },
    {
        title: "Mart Artwork 2 (Rep)",
        image: "/images/carousel/top/mart2.jpeg"
    },
    {
        title: "Mart Artwork 3 (Rep)",
        image: "/images/carousel/top/mart3.jpeg"
    },
    {
        title: "Mart Artwork 4 (Rep)",
        image: "/images/carousel/top/mart4.jpeg"
    },
];

// Bottom Carousel Images (Reverse Direction)
const bottomImages = [
    {
        title: "Bottom Artwork 1",
        image: "/images/carousel/bottom/art-1.png"
    },
    {
        title: "Bottom Artwork 2",
        image: "/images/carousel/bottom/art-2.png"
    },
    {
        title: "Bottom Artwork 3",
        image: "/images/carousel/bottom/art-3.png"
    },
    {
        title: "Bottom Artwork 4",
        image: "/images/carousel/bottom/art-4.png"
    },
    {
        title: "Bottom Artwork 5",
        image: "/images/carousel/bottom/art-5.png"
    },
    {
        title: "Bottom Artwork 6",
        image: "/images/carousel/bottom/art-6.png"
    },
    {
        title: "Bottom Artwork 7",
        image: "/images/carousel/bottom/art-7.png"
    },
    {
        title: "Bottom Artwork 8",
        image: "/images/carousel/bottom/art-8.png"
    },
    {
        title: "Bottom Artwork 9",
        image: "/images/carousel/bottom/art-9.png"
    },
    {
        title: "Bottom Artwork 10",
        image: "/images/carousel/bottom/art-10.png"
    },
];

const ArtworkBanner = () => {
    return (
        <section className="py-12 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="h-[400px] flex flex-col justify-center gap-4"
            >
                {/* Top Carousel - Forward Direction */}
                <div className="flex items-center space-x-4 mx-auto w-full max-w-max">
                    <InfiniteSlider direction="horizontal" duration={40} gap={24}>
                        {topImages.map((image, idx) => (
                            <div key={`${image.title}-${idx}`} className="aspect-square w-[200px] rounded-[12px] overflow-hidden border border-white/10 relative group">
                                <img
                                    src={image.image}
                                    alt={image.title}
                                    className="object-cover h-full w-full rounded-[12px] transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                            </div>
                        ))}
                    </InfiniteSlider>
                </div>

                {/* Bottom Carousel - Reverse Direction */}
                <div className="flex items-center space-x-4 mx-auto w-full max-w-max">
                    <InfiniteSlider direction="horizontal" reverse duration={45} gap={24}>
                        {bottomImages.map((image, idx) => (
                            <div key={`${image.title}-rev-${idx}`} className="aspect-square w-[200px] rounded-[12px] overflow-hidden border border-white/10 relative group">
                                <img
                                    src={image.image}
                                    alt={image.title}
                                    className="object-cover h-full w-full rounded-[12px] transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                            </div>
                        ))}
                    </InfiniteSlider>
                </div>
            </motion.div>

            {/* Fade Edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </section>
    );
};

export default ArtworkBanner;
