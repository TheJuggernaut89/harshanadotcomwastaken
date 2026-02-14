import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../../data/content';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import Card from '../UI/Card';
import { ExternalLink, Tag } from 'lucide-react';
import ProposalModal from '../UI/ProposalModal';

const Portfolio = () => {
    const [filter, setFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);
    const categories = ['All', ...new Set(content.projects.map(p => p.category))];

    const filteredProjects = filter === 'All'
        ? content.projects
        : content.projects.filter(p => p.category === filter);

    return (
        <section id="projects" style={{ padding: 'var(--spacing-12) 0' }} className="relative overflow-hidden">
            <div className="container mx-auto" style={{ padding: '0 var(--spacing-3)' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-left md:text-center" style={{ marginBottom: 'var(--spacing-8)' }}
                >
                    <h2 className="section-title">Visionary Proposals</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-lg)', marginTop: 'var(--spacing-2)', lineHeight: 'var(--leading-relaxed)' }} className="max-w-2xl mx-auto">
                        A showcase of strategic creative concepts, from grassroots expansion to AI-powered marketing innovation.
                    </p>
                </motion.div>

                {/* Filter Bar */}
                <div className="flex flex-wrap justify-start md:justify-center" style={{ gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-6)' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${filter === cat
                                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                : 'bg-white dark:bg-white/5 border border-navy/5 dark:border-white/10 opacity-60 hover:opacity-100'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="grid md:grid-cols-2 lg:grid-cols-2" style={{ gap: 'var(--spacing-4)' }}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Card className="h-full flex flex-col p-0 overflow-hidden">
                                    <div className="flex flex-col md:flex-row h-full">
                                        {/* Visual Side */}
                                        <div className="w-full md:w-1/3 aspect-video md:aspect-auto bg-gradient-to-br from-primary/20 to-navy-dark/40 flex items-center justify-center p-0 relative group">
                                            {project.image ? (
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    onClick={() => setSelectedProject(project)}
                                                />
                                            ) : (
                                                <Tag className="text-primary/30" size={48} />
                                            )}
                                        </div>
                                        {/* Content Side */}
                                        <div className="w-full md:w-2/3 p-8 flex flex-col">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest mb-3">
                                                <Tag size={12} />
                                                {project.category}
                                            </div>
                                            <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                                            <p className="text-navy/60 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                                                {project.description}
                                            </p>
                                            <button
                                                onClick={() => setSelectedProject(project)}
                                                className="flex items-center gap-2 text-primary font-bold text-sm hover:translate-x-1 transition-transform"
                                            >
                                                Explore Concept <ExternalLink size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Proposal Detail Modal */}
            <ProposalModal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                project={selectedProject}
            />
        </section>
    );
};

export default Portfolio;
