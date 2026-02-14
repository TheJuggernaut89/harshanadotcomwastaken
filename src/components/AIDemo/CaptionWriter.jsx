import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Copy, RefreshCw, Check, Sparkles } from 'lucide-react';

const CaptionWriter = () => {
    const [description, setDescription] = useState('');
    const [emotion, setEmotion] = useState('excited');
    const [captions, setCaptions] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);

    const emotions = [
        { value: 'excited', label: 'Excited', emoji: '🎉' },
        { value: 'informative', label: 'Informative', emoji: '📚' },
        { value: 'inspiring', label: 'Inspiring', emoji: '✨' },
        { value: 'humorous', label: 'Humorous', emoji: '😄' }
    ];

    const generateCaptions = async () => {
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        const mockCaptions = [
            {
                english: "Transform your mornings with our signature blend! ☕ Made fresh daily with love. Your perfect cup awaits! #MalaysianCoffee #KLCafe #MorningVibes",
                malay: "Ubah pagi anda dengan campuran istimewa kami! ☕ Dibuat segar setiap hari dengan penuh kasih. Secawan sempurna menanti anda! #KopiMalaysia #KafeKL #PagiCeria",
                manglish: "Wah, this coffee memang sedap gila! ☕ Fresh every day, confirm you suka one! Come try lah! #BestCoffeeKL #SedapGila #MustTry"
            },
            {
                english: "Weekend special alert! 🎊 Enjoy 20% off all beverages. Because you deserve a treat! Limited time only. #WeekendVibes #CoffeeLovers #SpecialOffer",
                malay: "Istimewa hujung minggu! 🎊 Nikmati diskaun 20% untuk semua minuman. Kerana anda layak dimanjakan! Tawaran terhad. #HujungMinggu #PeminatKopi #TawaranIstimewa",
                manglish: "Eh, weekend promo ni! 🎊 20% off semua drinks tau! Don't miss out lah, very shiok! #WeekendPromo #CoffeeLover #MustGrab"
            },
            {
                english: "Behind every great cup is a passionate barista. ☕ Meet our team who makes magic happen daily! Swipe to see their stories. #BehindTheScenes #BaristaLife #CoffeePassion",
                malay: "Di sebalik setiap cawan istimewa adalah barista yang berdedikasi. ☕ Kenali pasukan kami yang mencipta keajaiban setiap hari! Leret untuk lihat kisah mereka. #DiSebalikTabir #KehidupanBarista #PassionKopi",
                manglish: "Our barista team damn power one! ☕ Every cup made with so much love and skill. Swipe to kenal them better! #TeamGoals #BaristaSkills #ProudTeam"
            }
        ];

        setCaptions(mockCaptions);
        setLoading(false);
    };

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="glass-card p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-teal/10 rounded-lg flex items-center justify-center">
                    <MessageSquare size={32} className="text-teal" />
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-navy dark:text-white">
                        Bilingual Caption Writer
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        English + Malay + Manglish captions in seconds
                    </p>
                </div>
            </div>

            {!captions ? (
                <div className="space-y-8">
                    {/* Description Input */}
                    <div>
                        <label className="block text-sm font-semibold text-navy dark:text-white mb-3">
                            What are you posting about?
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="e.g., New coffee blend launch, weekend promo, customer testimonial..."
                            rows={4}
                            className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-navy-dark text-navy dark:text-white focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all resize-none"
                        />
                    </div>

                    {/* Emotion Selection */}
                    <div>
                        <label className="block text-sm font-semibold text-navy dark:text-white mb-3">
                            Desired Emotion
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {emotions.map(emo => (
                                <button
                                    key={emo.value}
                                    onClick={() => setEmotion(emo.value)}
                                    className={`p-4 rounded-lg border-2 transition-all ${emotion === emo.value
                                            ? 'border-teal bg-teal/5'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-teal'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">{emo.emoji}</div>
                                    <div className="text-sm font-semibold text-navy dark:text-white">
                                        {emo.label}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={generateCaptions}
                        disabled={!description || loading}
                        className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed bg-teal hover:bg-teal-dark"
                    >
                        {loading ? (
                            <>
                                <Sparkles className="animate-spin" size={20} />
                                Crafting Your Captions...
                            </>
                        ) : (
                            <>
                                <Sparkles size={20} />
                                Generate Captions
                            </>
                        )}
                    </button>

                    {/* Info */}
                    <div className="bg-teal/5 border border-teal/20 rounded-lg p-6">
                        <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                            <p className="font-semibold text-teal">💡 Pro Tip:</p>
                            <p>Be specific about your product/service and target audience for better results!</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
                                Example: "Launching new salted caramel latte, targeting young professionals who love premium coffee"
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Caption Results */}
                    <div className="space-y-6">
                        {captions.map((caption, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-navy-dark p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-bold text-teal">
                                        Caption Variation {index + 1}
                                    </span>
                                </div>

                                {/* English */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                            🇬🇧 English
                                        </span>
                                        <button
                                            onClick={() => copyToClipboard(caption.english, `${index}-en`)}
                                            className="text-xs flex items-center gap-1 text-teal hover:text-teal-dark transition-colors"
                                        >
                                            {copiedIndex === `${index}-en` ? (
                                                <>
                                                    <Check size={14} /> Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <Copy size={14} /> Copy
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-navy dark:text-white">{caption.english}</p>
                                </div>

                                {/* Malay */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                            🇲🇾 Bahasa Melayu
                                        </span>
                                        <button
                                            onClick={() => copyToClipboard(caption.malay, `${index}-my`)}
                                            className="text-xs flex items-center gap-1 text-teal hover:text-teal-dark transition-colors"
                                        >
                                            {copiedIndex === `${index}-my` ? (
                                                <>
                                                    <Check size={14} /> Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <Copy size={14} /> Copy
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-navy dark:text-white">{caption.malay}</p>
                                </div>

                                {/* Manglish */}
                                <div className="bg-teal/5 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-semibold text-teal flex items-center gap-2">
                                            😄 Manglish (Malaysian Vibe!)
                                        </span>
                                        <button
                                            onClick={() => copyToClipboard(caption.manglish, `${index}-manglish`)}
                                            className="text-xs flex items-center gap-1 text-teal hover:text-teal-dark transition-colors"
                                        >
                                            {copiedIndex === `${index}-manglish` ? (
                                                <>
                                                    <Check size={14} /> Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <Copy size={14} /> Copy
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-navy dark:text-white font-medium">{caption.manglish}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => setCaptions(null)}
                            className="btn-secondary flex-1 flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={18} />
                            Generate New Captions
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default CaptionWriter;
