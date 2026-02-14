import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle2, XCircle, Copy, Sparkles } from 'lucide-react';

const ComplianceCheckerDemo = () => {
    const [inputText, setInputText] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const checkCompliance = () => {
        setLoading(true);
        setTimeout(() => {
            // Simulated compliance check
            const hasAlcohol = inputText.toLowerCase().includes('wine') || inputText.toLowerCase().includes('beer') || inputText.toLowerCase().includes('alcohol');
            const hasPork = inputText.toLowerCase().includes('pork') || inputText.toLowerCase().includes('bacon');
            const hasInsensitive = inputText.toLowerCase().includes('chinese only') || inputText.toLowerCase().includes('malay only');

            setResults({
                jakim: {
                    status: hasAlcohol || hasPork ? 'fail' : 'pass',
                    issues: [
                        ...(hasAlcohol ? ['Alcohol-related content detected'] : []),
                        ...(hasPork ? ['Non-halal ingredient mentioned'] : [])
                    ]
                },
                mcmc: {
                    status: 'pass',
                    issues: []
                },
                sensitivity: {
                    status: hasInsensitive ? 'warning' : 'pass',
                    issues: hasInsensitive ? ['Potentially exclusive language detected'] : []
                },
                fixedVersion: inputText
                    .replace(/wine|beer|alcohol/gi, 'beverage')
                    .replace(/pork|bacon/gi, 'meat')
                    .replace(/chinese only|malay only/gi, 'all Malaysians')
            });
            setLoading(false);
        }, 1500);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pass': return 'text-teal';
            case 'warning': return 'text-sandy';
            case 'fail': return 'text-primary';
            default: return 'text-gray-500';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pass': return <CheckCircle2 className="text-teal" size={24} />;
            case 'warning': return <AlertTriangle className="text-sandy" size={24} />;
            case 'fail': return <XCircle className="text-primary" size={24} />;
            default: return null;
        }
    };

    return (
        <div className="glass-card p-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-teal/20 to-primary/20 rounded-lg flex items-center justify-center">
                    <Shield size={32} className="text-teal" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-navy dark:text-white">Compliance Checker</h3>
                    <p className="text-gray-600 dark:text-gray-400">JAKIM + MCMC + Sensitivity validator</p>
                </div>
            </div>

            {!results ? (
                <div className="space-y-4">
                    {/* Textarea */}
                    <div>
                        <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                            Paste Your Campaign Copy
                        </label>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Try: 'Join our wine tasting event! Chinese only. Pork dumplings will be served.'"
                            rows={8}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-navy-dark text-navy dark:text-white focus:border-primary focus:outline-none resize-none"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            💡 Tip: Try adding words like "wine", "pork", or "Chinese only" to see compliance issues
                        </p>
                    </div>

                    {/* Check Button */}
                    <button
                        onClick={checkCompliance}
                        disabled={!inputText.trim() || loading}
                        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Checking Compliance...
                            </>
                        ) : (
                            <>
                                <Shield size={20} />
                                Check Compliance
                            </>
                        )}
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Compliance Results */}
                    <div className="grid gap-4">
                        {/* JAKIM */}
                        <div className="p-6 bg-white dark:bg-navy/20 rounded-lg border-2 border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {getStatusIcon(results.jakim.status)}
                                    <div>
                                        <h4 className="font-bold text-navy dark:text-white">JAKIM Halal Compliance</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Halal certification standards</p>
                                    </div>
                                </div>
                                <span className={`text-lg font-bold ${getStatusColor(results.jakim.status)} uppercase`}>
                                    {results.jakim.status}
                                </span>
                            </div>
                            {results.jakim.issues.length > 0 && (
                                <ul className="space-y-2">
                                    {results.jakim.issues.map((issue, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                            <XCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                                            {issue}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* MCMC */}
                        <div className="p-6 bg-white dark:bg-navy/20 rounded-lg border-2 border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {getStatusIcon(results.mcmc.status)}
                                    <div>
                                        <h4 className="font-bold text-navy dark:text-white">MCMC Legal Compliance</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Malaysian communications regulations</p>
                                    </div>
                                </div>
                                <span className={`text-lg font-bold ${getStatusColor(results.mcmc.status)} uppercase`}>
                                    {results.mcmc.status}
                                </span>
                            </div>
                            {results.mcmc.issues.length > 0 && (
                                <ul className="space-y-2">
                                    {results.mcmc.issues.map((issue, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                            <XCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                                            {issue}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Sensitivity */}
                        <div className="p-6 bg-white dark:bg-navy/20 rounded-lg border-2 border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {getStatusIcon(results.sensitivity.status)}
                                    <div>
                                        <h4 className="font-bold text-navy dark:text-white">Cultural Sensitivity</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Multi-ethnic appropriateness</p>
                                    </div>
                                </div>
                                <span className={`text-lg font-bold ${getStatusColor(results.sensitivity.status)} uppercase`}>
                                    {results.sensitivity.status}
                                </span>
                            </div>
                            {results.sensitivity.issues.length > 0 && (
                                <ul className="space-y-2">
                                    {results.sensitivity.issues.map((issue, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                            <AlertTriangle size={16} className="text-sandy mt-0.5 flex-shrink-0" />
                                            {issue}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Fixed Version */}
                    {(results.jakim.issues.length > 0 || results.sensitivity.issues.length > 0) && (
                        <div className="p-6 bg-teal/10 rounded-lg border-2 border-teal/30">
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="text-teal" size={20} />
                                <h4 className="font-bold text-navy dark:text-white">AI-Fixed Version</h4>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line mb-4">
                                {results.fixedVersion}
                            </p>
                            <button
                                onClick={() => navigator.clipboard.writeText(results.fixedVersion)}
                                className="flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-dark transition-colors"
                            >
                                <Copy size={16} />
                                Copy Fixed Version
                            </button>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => setResults(null)}
                            className="flex-1 btn-secondary"
                        >
                            Check Another
                        </button>
                        <button className="flex-1 btn-outline">
                            Download Report
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ComplianceCheckerDemo;
