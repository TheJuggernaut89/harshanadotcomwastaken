import React from 'react';
import { motion } from 'framer-motion';
import { User, Code, Palette, TrendingUp, Briefcase, Sparkles } from 'lucide-react';
import { content } from '../../data/content';
import { fadeInUp } from '../../utils/animations';
import { BentoGrid, BentoGridItem } from '../UI/bento-grid';

const AboutBento = () => {
    return (
        <section id="about" className="py-24 bg-navy/[0.02] dark:bg-white/[0.02] relative">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title mb-4">Marketing Technologist</h2>
                    <p className="text-xl text-primary font-medium">
                        "Building Revenue Systems, Not Just Content"
                    </p>
                </motion.div>

                <BentoGrid className="max-w-7xl mx-auto">
                    <BentoGridItem
                        className="md:col-span-2 md:row-span-2"
                        animationType="float"
                        icon={<User size={24} />}
                        title="Who I Am"
                        description={
                            <div className="flex flex-col md:flex-row gap-6 h-full pt-2">
                                {/* Left: Profile Image (Larger & Side-by-Side) */}
                                <div className="w-full md:w-[40%] relative min-h-[250px] md:min-h-full shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-navy opacity-60 rounded-2xl" />
                                    <img
                                        src="/images/profile-waterfall.jpg"
                                        alt="Harshana Jothi"
                                        className="relative w-full h-full object-cover rounded-2xl shadow-lg"
                                    />
                                    {/* Floating Badge */}
                                    <motion.div
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute bottom-4 right-4 px-3 py-1 glass-card bg-white/90 dark:bg-navy-dark/90 rounded-full text-xs font-bold text-primary shadow-xl"
                                    >
                                        Available
                                    </motion.div>
                                </div>

                                {/* Right: Content */}
                                <div className="w-full md:w-[60%] space-y-4 flex flex-col justify-center">
                                    <p className="text-base leading-relaxed">
                                        I'm not a typical marketer who uses tools—I'm a Marketing Technologist who builds systems.
                                    </p>
                                    <p className="text-base leading-relaxed">
                                        While most marketers hit technical limitations and file tickets, I code the solution. While most developers build marketing tools without understanding conversion psychology, I bridge that gap.
                                    </p>
                                    <p className="text-base leading-relaxed">
                                        At Cream of Creams, I delivered <span className="text-primary font-bold">429% Facebook growth</span> by building 6 AI-powered tools that replaced agency operations and connected social media directly to revenue.
                                    </p>
                                    <div className="flex items-center gap-2 pt-2">
                                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-white/5 shadow-sm flex items-center justify-center text-primary">
                                            <Sparkles size={16} />
                                        </div>
                                        <span className="text-sm font-medium">{content.personal.location}</span>
                                    </div>
                                </div>
                            </div>
                        }
                    />

                    {/* Card 2: Technical Arsenal */}
                    <BentoGridItem
                        className="md:col-span-1"
                        animationType="pulse"
                        icon={<Code size={24} />}
                        title="Technical Arsenal"
                        description={
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-primary">Automation & Development:</p>
                                <p className="text-sm">n8n, APIs, React, Python, Google Cloud IDE</p>
                                <p className="text-sm font-medium text-primary mt-3">Analytics & Tracking:</p>
                                <p className="text-sm">GA4, Facebook Pixel, UTM Systems, Custom Dashboards</p>
                            </div>
                        }
                    />

                    {/* Card 3: Creative Tools */}
                    <BentoGridItem
                        className="md:col-span-1"
                        animationType="drift"
                        icon={<Palette size={24} />}
                        title="Creative Tools"
                        description={
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-primary">Design & Video:</p>
                                <p className="text-sm">Adobe Premiere, Photoshop, After Effects, Illustrator</p>
                                <p className="text-sm font-medium text-primary mt-3">Content Strategy:</p>
                                <p className="text-sm">Brand Storytelling, Visual Communication, Multi-format Content</p>
                            </div>
                        }
                    />

                    {/* Card 4: Growth Track Record */}
                    <BentoGridItem
                        className="md:col-span-1"
                        animationType="glow"
                        icon={<TrendingUp size={24} />}
                        title="Growth Track Record"
                        description={
                            <div className="space-y-3">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-primary">429%</span>
                                    <span className="text-sm">Facebook Growth</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-primary">178%</span>
                                    <span className="text-sm">Instagram Growth</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-primary">200%</span>
                                    <span className="text-sm">TikTok Growth</span>
                                </div>
                            </div>
                        }
                    />

                    {/* Card 5: Industries & Experience */}
                    <BentoGridItem
                        className="md:col-span-2"
                        animationType="float"
                        icon={<Briefcase size={24} />}
                        title="Industries & Experience"
                        description={
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-primary mb-2">Sectors:</p>
                                    <ul className="text-sm space-y-1">
                                        <li>• F&B (Cream of Creams)</li>
                                        <li>• Eco-Tourism (JungleWalla)</li>
                                        <li>• Security (Certis CISCO)</li>
                                        <li>• Government (PServ Singapore)</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-primary mb-2">Systems Built:</p>
                                    <ul className="text-sm space-y-1">
                                        <li>• 6 AI Marketing Tools</li>
                                        <li>• Revenue Attribution System</li>
                                        <li>• Multi-platform Automation</li>
                                        <li>• Legal Transcription Business</li>
                                    </ul>
                                </div>
                            </div>
                        }
                    />
                </BentoGrid>

                {/* Terminal Access Hint */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <span className="px-5 py-2 rounded-full border border-primary/40 bg-primary/5 text-primary text-sm font-mono font-bold hover:bg-primary/10 transition-all cursor-help inline-block" title="Terminal Access Code">
                        🔒 AUTH: REACT
                    </span>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutBento;
