import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, Zap, MessageSquare, Ban, CheckCircle2 } from 'lucide-react';

const ProposalModal = ({ isOpen, onClose, project }) => {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null; // Logic handled inside AnimatePresence usually, but for Portal conditional rendering is safer

    const modalContent = (
        <AnimatePresence mode="wait">
            {isOpen && project && project.proposalDetails && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-navy-light w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col my-auto"
                        >
                            {/* Header Image */}
                            <div className="h-48 relative shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                                <div className="absolute bottom-4 left-6 z-20">
                                    <div className="text-xs font-black text-primary uppercase tracking-widest mb-1 shadow-black/50 drop-shadow-md">
                                        {project.category}
                                    </div>
                                    <h2 className="text-3xl font-bold text-white shadow-black/50 drop-shadow-md">
                                        {project.title}
                                    </h2>
                                </div>
                            </div>

                            {/* Scrollable Content */}
                            <div className="p-6 md:p-8 space-y-8 max-h-[60vh] md:max-h-[70vh] overflow-y-auto custom-scrollbar">

                                {/* 1. The Concept */}
                                <div>
                                    <div className="flex items-center gap-2 text-primary text-sm font-black uppercase tracking-wider mb-3">
                                        <Lightbulb size={18} />
                                        The Concept
                                    </div>
                                    <p className="text-navy/80 dark:text-gray-300 leading-relaxed text-lg">
                                        {project.proposalDetails.concept}
                                    </p>
                                </div>

                                {/* 2. The Genius Moment */}
                                <div className="bg-primary/5 dark:bg-white/5 p-6 rounded-xl border border-primary/10">
                                    <div className="flex items-center gap-2 text-primary text-sm font-black uppercase tracking-wider mb-3">
                                        <Zap size={18} />
                                        The Genius Moment
                                    </div>
                                    <p className="text-navy/80 dark:text-gray-300 leading-relaxed italic">
                                        "{project.proposalDetails.geniusMoment}"
                                    </p>
                                </div>

                                {/* 3. The Pitch */}
                                <div>
                                    <div className="flex items-center gap-2 text-primary text-sm font-black uppercase tracking-wider mb-3">
                                        <MessageSquare size={18} />
                                        The Pitch
                                    </div>
                                    <blockquote className="border-l-4 border-primary pl-4 py-1 text-navy/70 dark:text-gray-400 text-lg leading-relaxed">
                                        {project.proposalDetails.pitch}
                                    </blockquote>
                                </div>

                                {/* 4. The Rejection / Status */}
                                {(() => {
                                    const { status, rejection } = project.proposalDetails;
                                    const isRejected = status.includes("DECLINED") || status.includes("CONCEPT ONLY");
                                    return (
                                        <div className={`p-4 rounded-lg border flex items-start gap-4 ${isRejected
                                            ? 'bg-red-500/5 border-red-500/20'
                                            : 'bg-green-500/5 border-green-500/20'
                                            }`}>
                                            <div className={`mt-1 ${isRejected ? 'text-red-500' : 'text-green-500'}`}>
                                                {isRejected ? <Ban size={24} /> : <CheckCircle2 size={24} />}
                                            </div>
                                            <div>
                                                <h4 className={`text-sm font-black uppercase tracking-wider mb-1 ${isRejected ? 'text-red-500' : 'text-green-500'
                                                    }`}>
                                                    {isRejected ? 'The Rejection' : 'Current Status'}
                                                </h4>
                                                <p className="text-navy/80 dark:text-gray-300 font-bold">
                                                    {status}
                                                </p>
                                                {rejection && (
                                                    <p className="text-navy/60 dark:text-gray-400 text-sm mt-2 italic">
                                                        "{rejection}"
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
};

export default ProposalModal;
