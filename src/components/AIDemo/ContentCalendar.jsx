import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, Sparkles, TrendingUp, Clock } from 'lucide-react';

const ContentCalendar = () => {
    const [formData, setFormData] = useState({
        businessType: '',
        audience: '',
        tone: 'professional'
    });
    const [calendar, setCalendar] = useState(null);
    const [loading, setLoading] = useState(false);

    const businessTypes = [
        'F&B / Restaurant',
        'E-commerce',
        'Beauty & Wellness',
        'Professional Services',
        'Education',
        'Real Estate',
        'Technology',
        'Fashion & Retail'
    ];

    const tones = [
        { value: 'professional', label: 'Professional', emoji: '💼' },
        { value: 'casual', label: 'Casual & Fun', emoji: '😊' },
        { value: 'luxury', label: 'Luxury & Premium', emoji: '✨' },
        { value: 'local', label: 'Malaysian Vibe', emoji: '🇲🇾' }
    ];

    const generateCalendar = async () => {
        setLoading(true);

        // Simulate API call (replace with actual OpenAI integration)
        await new Promise(resolve => setTimeout(resolve, 2000));

        const mockCalendar = [
            { date: 'Dec 20', day: 'Friday', content: 'Weekend Special Promo Teaser', type: 'Reel', time: '7:00 PM', hashtags: '#WeekendVibes #MalaysianFood' },
            { date: 'Dec 21', day: 'Saturday', content: 'Customer Testimonial Story', type: 'Story', time: '11:00 AM', hashtags: '#HappyCustomers #LocalBusiness' },
            { date: 'Dec 22', day: 'Sunday', content: 'Behind-the-Scenes: Kitchen Tour', type: 'Reel', time: '6:00 PM', hashtags: '#BehindTheScenes #FoodPrep' },
            { date: 'Dec 23', day: 'Monday', content: 'Monday Motivation Quote + Product', type: 'Post', time: '9:00 AM', hashtags: '#MondayMotivation #FreshStart' },
            { date: 'Dec 24', day: 'Tuesday', content: 'Christmas Eve Special Menu', type: 'Carousel', time: '5:00 PM', hashtags: '#ChristmasEve #FestiveDining' },
            { date: 'Dec 25', day: 'Wednesday', content: 'Merry Christmas Greeting', type: 'Post', time: '10:00 AM', hashtags: '#MerryChristmas #Celebration' },
            { date: 'Dec 26', day: 'Thursday', content: 'Boxing Day Sale Announcement', type: 'Reel', time: '12:00 PM', hashtags: '#BoxingDay #SpecialOffer' },
            { date: 'Dec 27', day: 'Friday', content: 'Weekend Prep: What\'s Cooking?', type: 'Story', time: '4:00 PM', hashtags: '#WeekendPrep #ComingSoon' },
        ];

        setCalendar(mockCalendar);
        setLoading(false);
    };

    const downloadCSV = () => {
        if (!calendar) return;

        const headers = ['Date', 'Day', 'Content Idea', 'Type', 'Best Time', 'Hashtags'];
        const rows = calendar.map(item => [
            item.date,
            item.day,
            item.content,
            item.type,
            item.time,
            item.hashtags
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'content-calendar.csv';
        a.click();
    };

    return (
        <div className="glass-card p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar size={32} className="text-primary" />
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-navy dark:text-white">
                        AI Content Calendar Generator
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        30-day content plan with Malaysian holidays & trends
                    </p>
                </div>
            </div>

            {!calendar ? (
                <div className="space-y-8">
                    {/* Business Type */}
                    <div>
                        <label className="block text-sm font-semibold text-navy dark:text-white mb-3">
                            Business Type
                        </label>
                        <select
                            value={formData.businessType}
                            onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                            className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-navy-dark text-navy dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        >
                            <option value="">Select your business type</option>
                            {businessTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Target Audience */}
                    <div>
                        <label className="block text-sm font-semibold text-navy dark:text-white mb-3">
                            Target Audience
                        </label>
                        <input
                            type="text"
                            value={formData.audience}
                            onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                            placeholder="e.g., Young professionals in KL, age 25-35"
                            className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-navy-dark text-navy dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>

                    {/* Tone */}
                    <div>
                        <label className="block text-sm font-semibold text-navy dark:text-white mb-3">
                            Brand Tone
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {tones.map(tone => (
                                <button
                                    key={tone.value}
                                    onClick={() => setFormData({ ...formData, tone: tone.value })}
                                    className={`p-4 rounded-lg border-2 transition-all ${formData.tone === tone.value
                                            ? 'border-primary bg-primary/5'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-teal'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">{tone.emoji}</div>
                                    <div className="text-sm font-semibold text-navy dark:text-white">
                                        {tone.label}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={generateCalendar}
                        disabled={!formData.businessType || !formData.audience || loading}
                        className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Sparkles className="animate-spin" size={20} />
                                Generating Your Calendar...
                            </>
                        ) : (
                            <>
                                <Sparkles size={20} />
                                Generate 30-Day Calendar
                            </>
                        )}
                    </button>

                    {/* Features */}
                    <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-start gap-3">
                            <TrendingUp className="text-teal mt-1" size={20} />
                            <div>
                                <div className="font-semibold text-navy dark:text-white text-sm">
                                    Malaysian Holidays
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                    Auto-includes Raya, CNY, Deepavali
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Clock className="text-teal mt-1" size={20} />
                            <div>
                                <div className="font-semibold text-navy dark:text-white text-sm">
                                    Optimal Timing
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                    Best posting times for your audience
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Sparkles className="text-teal mt-1" size={20} />
                            <div>
                                <div className="font-semibold text-navy dark:text-white text-sm">
                                    Bilingual Hashtags
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                    English + Malay suggestions
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Calendar Results */}
                    <div className="bg-teal/5 border border-teal/20 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-xl font-bold text-navy dark:text-white">
                                Your 30-Day Content Calendar
                            </h4>
                            <button
                                onClick={downloadCSV}
                                className="btn-outline flex items-center gap-2"
                            >
                                <Download size={18} />
                                Download CSV
                            </button>
                        </div>

                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {calendar.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-navy-dark p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-sm font-bold text-primary">
                                                    {item.date}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {item.day}
                                                </span>
                                                <span className="badge bg-teal/10 text-teal border border-teal/20">
                                                    {item.type}
                                                </span>
                                            </div>
                                            <div className="font-semibold text-navy dark:text-white mb-2">
                                                {item.content}
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <Clock size={12} />
                                                    {item.time}
                                                </span>
                                                <span>{item.hashtags}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => setCalendar(null)}
                            className="btn-secondary flex-1"
                        >
                            Generate New Calendar
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default ContentCalendar;
