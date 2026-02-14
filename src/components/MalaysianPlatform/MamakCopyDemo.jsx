import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Download, Copy, Check, Sparkles } from 'lucide-react';

const MamakCopyDemo = () => {
    const [formData, setFormData] = useState({
        productType: '',
        festival: '',
        audience: '',
        tone: ''
    });
    const [generated, setGenerated] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('social');
    const [copied, setCopied] = useState(false);

    const productTypes = ['F&B', 'Fashion', 'Electronics', 'Beauty', 'Home & Living'];
    const festivals = ['CNY 2026', 'Ramadan 2026', 'Deepavali 2026', 'Merdeka 2026', '11.11 Sale'];
    const audiences = ['Gen Z (18-25)', 'Millennials (26-40)', 'Parents (30-50)', 'Professionals (25-45)'];
    const tones = ['Rojak (Mixed)', 'Formal BM', 'Gen Z Slang', 'Professional English'];

    const handleGenerate = () => {
        setLoading(true);
        setTimeout(() => {
            setGenerated({
                social: [
                    {
                        platform: 'Instagram',
                        content: `Wah CNY sale memang power! 🧧✨\n\nKorang dah ready ke belum for reunion dinner? Our ${formData.productType} collection confirm boleh buat family impressed! 💯\n\n🎊 Special CNY promo: Up to 50% OFF\n🧨 Free gift wrapping pulak tu\n🏮 Delivery before CNY guaranteed!\n\nJangan tunggu last minute tau! Link in bio 👆\n\n#CNY2026 #ChineseNewYear #MalaysiaSale #Promo #${formData.productType}MY`,
                        compliance: ['✓ Halal-friendly', '✓ No sensitive content', '✓ MCMC compliant']
                    },
                    {
                        platform: 'Facebook',
                        content: `🎉 CNY MEGA SALE IS HERE! 🎉\n\nSelamat Tahun Baru Cina to all our Chinese friends! 🧧\n\nSpecial promo for ${formData.audience}:\n✨ Up to 50% discount on selected ${formData.productType}\n✨ FREE delivery for orders above RM100\n✨ Exclusive gift sets available\n\nShop now: [Link]\n\n#CNY2026 #MalaysiaShopping #${formData.productType} #Promo`,
                        compliance: ['✓ Multi-ethnic friendly', '✓ No religious conflicts', '✓ Clear pricing']
                    },
                    {
                        platform: 'TikTok',
                        content: `POV: You found the PERFECT CNY gift 🧧✨\n\n*shows ${formData.productType}*\n\nFamily: "Wah so nice! Where you buy?"\nYou: "Secret lah 😏"\n\n(Actually from our CNY sale - 50% OFF! 🤫)\n\nLink in bio before habis! 🏃‍♂️💨\n\n#CNY2026 #TikTokMalaysia #${formData.productType} #Sale`,
                        compliance: ['✓ Trending format', '✓ Gen Z appropriate', '✓ No misleading claims']
                    }
                ],
                script: `🎬 LIVE SELLER SCRIPT - CNY ${formData.productType} Sale\n\n[OPENING - 0:00]\n"Assalamualaikum! Selamat petang semua! 👋\nWah ramai dah join! Welcome welcome!\nToday kita ada CNY MEGA SALE tau!\nSiapa nak beli ${formData.productType} for CNY angkat tangan! 🙋‍♀️"\n\n[URGENCY - 2:00]\n"Okay dengar ni - stock VERY LIMITED!\nTadi pagi dah 50 pieces sold out!\nYang nak beli, TEKAN KERANJANG SEKARANG!\nJangan tunggu, nanti menyesal! 😱"\n\n[PRICE REVEAL - 5:00]\n"Korang teka berapa harga?\nRM299? SALAH!\nRM199? MASIH SALAH!\nToday CNY special - RM99.90 JE! 🔥\nTapi limited to first 100 buyers je tau!"\n\n[CLOSING - 8:00]\n"Okay last call! Siapa dah add to cart?\nCheckout SEKARANG untuk confirm!\nFree delivery pulak tu!\nThank you semua! Jumpa lagi! 👋"`,
                seo: {
                    english: [
                        'CNY sale Malaysia 2026',
                        `best ${formData.productType} CNY deals`,
                        'Chinese New Year shopping Malaysia',
                        `${formData.productType} discount CNY`,
                        'Malaysia CNY promotion 2026'
                    ],
                    malay: [
                        `${formData.productType} murah CNY`,
                        'jualan tahun baru cina Malaysia',
                        `beli ${formData.productType} CNY 2026`,
                        'promosi CNY Malaysia',
                        `${formData.productType} diskaun besar`
                    ]
                }
            });
            setLoading(false);
        }, 2000);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="glass-card p-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-sandy/20 to-primary/20 rounded-lg flex items-center justify-center">
                    <MessageSquare size={32} className="text-sandy" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-navy dark:text-white">Mamak Copy Generator</h3>
                    <p className="text-gray-600 dark:text-gray-400">Bilingual social media content creator</p>
                </div>
            </div>

            {!generated ? (
                <div className="space-y-4">
                    {/* Product Type */}
                    <div>
                        <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                            Product Type
                        </label>
                        <select
                            value={formData.productType}
                            onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-navy-dark text-navy dark:text-white focus:border-primary focus:outline-none"
                        >
                            <option value="">Select product type...</option>
                            {productTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Festival */}
                    <div>
                        <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                            Festival/Event
                        </label>
                        <select
                            value={formData.festival}
                            onChange={(e) => setFormData({ ...formData, festival: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-navy-dark text-navy dark:text-white focus:border-primary focus:outline-none"
                        >
                            <option value="">Select festival...</option>
                            {festivals.map(fest => (
                                <option key={fest} value={fest}>{fest}</option>
                            ))}
                        </select>
                    </div>

                    {/* Audience */}
                    <div>
                        <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                            Target Audience
                        </label>
                        <select
                            value={formData.audience}
                            onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-navy-dark text-navy dark:text-white focus:border-primary focus:outline-none"
                        >
                            <option value="">Select audience...</option>
                            {audiences.map(aud => (
                                <option key={aud} value={aud}>{aud}</option>
                            ))}
                        </select>
                    </div>

                    {/* Tone */}
                    <div>
                        <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                            Tone/Style
                        </label>
                        <select
                            value={formData.tone}
                            onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-navy-dark text-navy dark:text-white focus:border-primary focus:outline-none"
                        >
                            <option value="">Select tone...</option>
                            {tones.map(tone => (
                                <option key={tone} value={tone}>{tone}</option>
                            ))}
                        </select>
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={handleGenerate}
                        disabled={!formData.productType || !formData.festival || !formData.audience || !formData.tone || loading}
                        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Generating Copy...
                            </>
                        ) : (
                            <>
                                <Sparkles size={20} />
                                Generate Content
                            </>
                        )}
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Tabs */}
                    <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
                        {[
                            { id: 'social', label: 'Social Media' },
                            { id: 'script', label: 'Live Script' },
                            { id: 'seo', label: 'SEO Keywords' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 font-semibold transition-colors ${activeTab === tab.id
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-gray-500 hover:text-navy dark:hover:text-white'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {activeTab === 'social' && (
                                <div className="space-y-4">
                                    {generated.social.map((post, index) => (
                                        <div key={index} className="p-6 bg-white dark:bg-navy/20 rounded-lg border border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="font-bold text-navy dark:text-white">{post.platform}</span>
                                                <button
                                                    onClick={() => copyToClipboard(post.content)}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-teal/10 text-teal rounded-lg hover:bg-teal/20 transition-colors"
                                                >
                                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                                    {copied ? 'Copied!' : 'Copy'}
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line mb-4">{post.content}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {post.compliance.map((badge, i) => (
                                                    <span key={i} className="px-2 py-1 bg-teal/10 text-teal text-xs font-medium rounded">
                                                        {badge}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'script' && (
                                <div className="p-6 bg-white dark:bg-navy/20 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line font-sans">
                                        {generated.script}
                                    </pre>
                                    <button
                                        onClick={() => copyToClipboard(generated.script)}
                                        className="mt-4 w-full btn-secondary flex items-center justify-center gap-2"
                                    >
                                        <Copy size={18} />
                                        Copy Script
                                    </button>
                                </div>
                            )}

                            {activeTab === 'seo' && (
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold text-navy dark:text-white mb-3">English Keywords</h4>
                                        <div className="space-y-2">
                                            {generated.seo.english.map((keyword, i) => (
                                                <div key={i} className="p-3 bg-white dark:bg-navy/20 rounded-lg border border-gray-200 dark:border-gray-700 text-sm">
                                                    {keyword}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-navy dark:text-white mb-3">Malay Keywords</h4>
                                        <div className="space-y-2">
                                            {generated.seo.malay.map((keyword, i) => (
                                                <div key={i} className="p-3 bg-white dark:bg-navy/20 rounded-lg border border-gray-200 dark:border-gray-700 text-sm">
                                                    {keyword}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Download & Reset */}
                    <div className="flex gap-4">
                        <button className="flex-1 btn-secondary flex items-center justify-center gap-2">
                            <Download size={18} />
                            Download All
                        </button>
                        <button
                            onClick={() => setGenerated(null)}
                            className="flex-1 btn-outline"
                        >
                            Generate New
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MamakCopyDemo;
