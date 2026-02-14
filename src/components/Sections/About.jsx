import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Briefcase, Sparkles, Settings, Palette, Target } from 'lucide-react';
import { content } from '../../data/content';
import { fadeInUp, slideInLeft, slideInRight } from '../../utils/animations';
import Card from '../UI/Card';
import TruthReveal from '../UI/TruthReveal';

const About = () => {
    // New Marketing Technologist Content
    const aboutContent = {
        title: "Marketing Technologist",
        subtitle: "Building Revenue Systems, Not Just Content",
        description: `I'm not a typical marketer who uses tools—I'm a Marketing Technologist who builds systems.

While most marketers hit technical limitations and file tickets, I code the solution. While most developers build marketing tools without understanding conversion psychology, I bridge that gap.

At Cream of Creams, I delivered 429% Facebook growth by building 6 AI-powered tools that replaced agency operations and connected social media directly to revenue. I saved them RM 10-45K annually while delivering better results.

I combine three skill sets usually split across three people:
- Marketing Strategy (campaign design, targeting, optimization)
- Technical Execution (coding, automation, APIs, system building)  
- Creative Production (video editing, design, content creation)

Most companies pay RM 12-15K for this (3 separate people or expensive agencies). You get all three in me.`,

        differentiators: [
            {
                title: "System Builder",
                description: "I don't just strategize—I build. Need automation? I code it. Need attribution? I build the system.",
                icon: Settings
            },
            {
                title: "Technical + Creative",
                description: "I track what matters: sales. Built UTM attribution systems connecting posts to revenue.",
                icon: Palette
            },
            {
                title: "Revenue-Focused",
                description: "In-house expertise that knows your business inside out, saving costly agency fees.",
                icon: Target
            }
        ]
    };

    return (
        <section id="about" className="py-24 bg-navy/[0.02] dark:bg-white/[0.02] relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Visual Side */}
                    <motion.div
                        variants={slideInLeft}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="aspect-square relative rounded-3xl overflow-hidden glass-card border-none">
                            {/* Profile Image with Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-navy opacity-60" />
                            <img
                                src="/images/profile-waterfall.jpg"
                                alt="Harshana Jothi"
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Floating Badge */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute top-8 right-8 p-4 glass-card bg-white/90 dark:bg-navy-dark/90 flex items-center gap-3 shadow-2xl"
                            >
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                    <Sparkles size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-black text-primary">Status</p>
                                    <p className="text-xs font-bold">{content.personal.status}</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Background Decorative Rings */}
                        <div className="absolute -z-10 -top-10 -left-10 w-full h-full border-2 border-primary/20 rounded-3xl" />
                        <div className="absolute -z-10 -bottom-10 -right-10 w-full h-full border-2 border-navy/10 rounded-3xl" />
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        variants={slideInRight}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2"
                    >
                        <h2 className="section-title mb-6">{aboutContent.title}</h2>
                        <p className="text-xl font-medium text-primary mb-8 leading-relaxed">
                            "{aboutContent.subtitle}"
                        </p>

                        <div className="text-navy/70 dark:text-gray-400 text-lg leading-relaxed mb-10 whitespace-pre-line">
                            {aboutContent.description}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <div className="flex items-center gap-4 text-navy/80 dark:text-gray-300">
                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 shadow-sm flex items-center justify-center text-primary">
                                    <MapPin size={20} />
                                </div>
                                <span className="font-medium">{content.personal.location}</span>
                            </div>
                            <div className="flex items-center gap-4 text-navy/80 dark:text-gray-300">
                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 shadow-sm flex items-center justify-center text-primary">
                                    <Briefcase size={20} />
                                </div>
                                <span className="font-medium">429% Growth Delivered</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {aboutContent.differentiators.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="p-4 rounded-xl border border-navy/10 dark:border-white/10 bg-white/5 flex items-start gap-4"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                                            <Icon size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-primary mb-1">{item.title}</h4>
                                            <p className="text-sm opacity-80">{item.description}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="mt-8">
                            {/* Terminal Access Hint */}
                            <span className="px-5 py-2 rounded-full border border-primary/40 bg-primary/5 text-primary text-sm font-mono font-bold hover:bg-primary/10 transition-all cursor-help" title="Terminal Access Code">
                                AUTH: REACT
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
