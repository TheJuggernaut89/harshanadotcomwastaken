import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Zap, Code2, Megaphone, BarChart3, Palette, Bot } from 'lucide-react';

const skillCategories = [
    {
        id: 'marketing',
        title: 'Marketing & Growth',
        icon: Megaphone,
        color: 'from-pink-500 to-rose-500',
        skills: [
            { name: 'Meta Business Suite', level: 98, note: '429% growth achieved' },
            { name: 'Instagram Strategy', level: 95, note: '178% growth with Reels' },
            { name: 'TikTok Marketing', level: 92, note: '200% AI-powered growth' },
            { name: 'LinkedIn B2B', level: 85, note: 'Lead generation expert' },
            { name: 'Content Strategy', level: 90, note: 'Multi-platform campaigns' },
        ]
    },
    {
        id: 'technical',
        title: 'Development & AI',
        icon: Code2,
        color: 'from-blue-500 to-cyan-500',
        skills: [
            { name: 'React / Next.js', level: 92, note: '6 AI tools built' },
            { name: 'Node.js / APIs', level: 88, note: 'Full-stack development' },
            { name: 'AI Integration', level: 90, note: 'OpenAI, Claude, Gemini' },
            { name: 'Automation (n8n)', level: 85, note: 'Workflow automation' },
            { name: 'Python / ML', level: 80, note: 'Data processing & ML' },
        ]
    },
    {
        id: 'data',
        title: 'Analytics & Data',
        icon: BarChart3,
        color: 'from-green-500 to-emerald-500',
        skills: [
            { name: 'Google Analytics 4', level: 90, note: 'Advanced tracking setup' },
            { name: 'Looker Studio', level: 88, note: 'Dashboard creation' },
            { name: 'A/B Testing', level: 85, note: 'Statistical analysis' },
            { name: 'Data Visualization', level: 87, note: 'Interactive reports' },
            { name: 'SQL / Databases', level: 82, note: 'Data extraction' },
        ]
    },
    {
        id: 'creative',
        title: 'Creative & Design',
        icon: Palette,
        color: 'from-purple-500 to-violet-500',
        skills: [
            { name: 'Adobe Creative Suite', level: 88, note: 'PS, AI, Premiere' },
            { name: 'Figma', level: 85, note: 'UI/UX prototyping' },
            { name: 'Video Editing', level: 82, note: 'Short-form content' },
            { name: 'Brand Strategy', level: 90, note: 'Visual identity' },
            { name: 'Motion Graphics', level: 78, note: 'After Effects' },
        ]
    },
    {
        id: 'ai',
        title: 'AI & Automation',
        icon: Bot,
        color: 'from-amber-500 to-orange-500',
        skills: [
            { name: 'Prompt Engineering', level: 95, note: 'Advanced techniques' },
            { name: 'AI Workflows', level: 92, note: 'Multi-agent systems' },
            { name: 'Chatbot Development', level: 88, note: 'Conversational AI' },
            { name: 'LLM Integration', level: 90, note: 'GPT-4, Claude, Gemini' },
            { name: 'AI Content Gen', level: 93, note: 'At scale automation' },
        ]
    },
    {
        id: 'soft',
        title: 'Strategy & Leadership',
        icon: Star,
        color: 'from-teal-500 to-cyan-500',
        skills: [
            { name: 'Project Management', level: 90, note: 'Agile & scrum' },
            { name: 'Team Leadership', level: 88, note: 'Cross-functional' },
            { name: 'Client Relations', level: 92, note: 'Enterprise accounts' },
            { name: 'Strategic Planning', level: 87, note: 'Long-term vision' },
            { name: 'Budget Management', level: 85, note: 'ROI optimization' },
        ]
    },
];

const SkillCard = ({ category, isActive, onClick }) => {
    const Icon = category.icon;
    
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-shrink-0 w-72 p-5 rounded-2xl cursor-pointer transition-all ${
                isActive 
                    ? 'bg-white dark:bg-navy-dark shadow-xl ring-2 ring-primary' 
                    : 'bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10'
            }`}
        >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
                <Icon size={24} className="text-white" />
            </div>
            <h3 className="font-bold text-lg mb-3">{category.title}</h3>
            <div className="space-y-2">
                {category.skills.slice(0, 3).map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{skill.name}</span>
                        <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                                    style={{ width: `${skill.level}%` }}
                                />
                            </div>
                            <span className="text-xs font-bold text-gray-500 w-8">{skill.level}%</span>
                        </div>
                    </div>
                ))}
                <p className="text-xs text-primary mt-2">+{category.skills.length - 3} more skills</p>
            </div>
        </motion.div>
    );
};

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState(null);
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({ 
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-20 bg-gradient-to-b from-navy/5 to-white dark:from-white/5 dark:to-navy-dark">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-2">Skills & Expertise</h2>
                            <p className="text-gray-600 dark:text-gray-400">Click any category to explore</p>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => scroll('left')}
                                className="w-10 h-10 rounded-full bg-white dark:bg-navy-dark shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button 
                                onClick={() => scroll('right')}
                                className="w-10 h-10 rounded-full bg-white dark:bg-navy-dark shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Horizontal Scroll Container */}
                <div 
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {skillCategories.map((category) => (
                        <div key={category.id} className="snap-start">
                            <SkillCard 
                                category={category}
                                isActive={activeCategory === category.id}
                                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                            />
                        </div>
                    ))}
                </div>

                {/* Expanded Detail View */}
                {activeCategory && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-8 bg-white dark:bg-navy-dark rounded-2xl p-6 shadow-lg"
                    >
                        {(() => {
                            const cat = skillCategories.find(c => c.id === activeCategory);
                            const Icon = cat.icon;
                            return (
                                <>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                                            <Icon size={20} className="text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold">{cat.title}</h3>
                                        <button 
                                            onClick={() => setActiveCategory(null)}
                                            className="ml-auto text-sm text-gray-500 hover:text-gray-700"
                                        >
                                            Close
                                        </button>
                                    </div>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {cat.skills.map((skill, idx) => (
                                            <div key={idx} className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium">{skill.name}</span>
                                                    <span className="text-sm font-bold text-primary">{skill.level}%</span>
                                                </div>
                                                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                                                    <div 
                                                        className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                                                        style={{ width: `${skill.level}%` }}
                                                    />
                                                </div>
                                                <p className="text-xs text-gray-500">{skill.note}</p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            );
                        })()}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Skills;
