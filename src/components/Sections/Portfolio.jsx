import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../../data/content';
import { X, ExternalLink, Tag, Eye, Sparkles, Target, TrendingUp } from 'lucide-react';

const Portfolio = () => {
    const [filter, setFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);
    
    const categories = ['All', ...new Set(content.projects.map(p => p.category))];
    
    const filteredProjects = filter === 'All'
        ? content.projects
        : content.projects.filter(p => p.category === filter);

    return (
        <section id="projects" className="py-20 bg-white dark:bg-navy-dark">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
                        <Sparkles size={16} />
                        Portfolio
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">Visionary Projects</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                        Strategic concepts and real-world implementations
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                                filter === cat
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Compact Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.title}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ scale: 1.03, y: -5 }}
                                onClick={() => setSelectedProject(project)}
                                className="group cursor-pointer bg-gray-50 dark:bg-white/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                            >
                                {/* Thumbnail */}
                                <div className="aspect-[4/3] relative overflow-hidden">
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-teal/20 flex items-center justify-center">
                                            <Target size={32} className="text-primary/50" />
                                        </div>
                                    )}
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="flex items-center gap-2 text-white font-bold">
                                            <Eye size={18} />
                                            View Details
                                        </div>
                                    </div>
                                    {/* Category Badge */}
                                    <div className="absolute top-2 left-2">
                                        <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold rounded-full">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Info */}
                                <div className="p-4">
                                    <h3 className="font-bold text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 line-clamp-2">
                                        {project.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Full Screen Modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                            onClick={() => setSelectedProject(null)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                                onClick={e => e.stopPropagation()}
                                className="bg-white dark:bg-navy-dark rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                            >
                                {/* Modal Header with Image */}
                                <div className="relative h-48 md:h-64">
                                    {selectedProject.image ? (
                                        <img
                                            src={selectedProject.image}
                                            alt={selectedProject.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-primary to-teal" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    
                                    {/* Close Button */}
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
                                    >
                                        <X size={20} />
                                    </button>
                                    
                                    {/* Title Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                                                {selectedProject.category}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                                            {selectedProject.title}
                                        </h2>
                                    </div>
                                </div>
                                
                                {/* Modal Content */}
                                <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
                                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                        {selectedProject.description}
                                    </p>
                                    
                                    {selectedProject.proposalDetails && (
                                        <div className="space-y-6">
                                            {/* Concept */}
                                            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-5">
                                                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                                    <Sparkles size={18} className="text-primary" />
                                                    The Concept
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    {selectedProject.proposalDetails.concept}
                                                </p>
                                            </div>
                                            
                                            {/* Genius Moment */}
                                            <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-5 border-l-4 border-primary">
                                                <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-primary">
                                                    <TrendingUp size={18} />
                                                    The Breakthrough
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    {selectedProject.proposalDetails.geniusMoment}
                                                </p>
                                            </div>
                                            
                                            {/* Status */}
                                            <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="text-gray-500">Status:</span>
                                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">
                                                        {selectedProject.proposalDetails.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Portfolio;
