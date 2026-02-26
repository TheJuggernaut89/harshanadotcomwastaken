import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TreeNodeTooltip from './TreeNodeTooltip';

const ToolsPlatforms = () => {
    const [autoExpandFirst, setAutoExpandFirst] = useState(false);

    // Auto-expand first category after 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setAutoExpandFirst(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);
    // Data structure with success rates calculated from actual achievements
    const toolsData = [
        {
            id: "marketing",
            name: "Marketing Strategy & Execution",
            type: "category",
            defaultExpanded: false,
            description: "Social media marketing across 5+ platforms with proven growth results",
            children: [
                {
                    id: "facebook",
                    name: "Meta Business Suite",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/meta.svg",
                    successRate: 98,
                    achievement: "429% Facebook growth at Cream of Creams",
                    description: "Advanced campaign management, A/B testing, and analytics",
                    usage: "Daily campaign optimization & content scheduling"
                },
                {
                    id: "instagram",
                    name: "Instagram",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg",
                    successRate: 95,
                    achievement: "178% Instagram growth with Reels strategy",
                    description: "Content creation, Stories, Reels, and engagement optimization",
                    usage: "Multi-format content strategy & community management"
                },
                {
                    id: "tiktok",
                    name: "TikTok",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tiktok.svg",
                    successRate: 92,
                    achievement: "200% growth through AI-powered trend analysis",
                    description: "Short-form video strategy and viral content creation",
                    usage: "Trend analysis & algorithm optimization"
                },
                {
                    id: "linkedin",
                    name: "LinkedIn",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg",
                    successRate: 85,
                    description: "B2B content strategy and professional networking",
                    usage: "Thought leadership & lead generation"
                },
                {
                    id: "xiaohongshu",
                    name: "XiaoHongShu (小红书)",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/xiaohongshu.svg",
                    successRate: 80,
                    description: "Chinese social commerce platform expertise",
                    usage: "Malaysian-Chinese market targeting"
                },
                {
                    id: "slack",
                    name: "Slack",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/slack.svg",
                    successRate: 90,
                    description: "Team collaboration and workflow automation",
                    usage: "Internal comms & project coordination"
                },
                {
                    id: "notion",
                    name: "Notion",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/notion.svg",
                    successRate: 88,
                    description: "Content calendar, campaign planning, and documentation",
                    usage: "Strategic planning & knowledge management"
                }
            ]
        },
        {
            id: "technical",
            name: "Technical Development & Automation",
            type: "category",
            defaultExpanded: false,
            description: "Full-stack development with focus on marketing automation",
            children: [
                {
                    id: "react",
                    name: "React",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg",
                    successRate: 92,
                    achievement: "Built 6 custom AI tools for Malaysian market",
                    description: "Modern web app development and component architecture",
                    usage: "Portfolio, dashboards & interactive tools"
                },
                {
                    id: "nextjs",
                    name: "Next.js",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdotjs.svg",
                    successRate: 85,
                    description: "Server-side rendering and full-stack React framework",
                    usage: "Landing pages & SEO-optimized sites"
                },
                {
                    id: "nodejs",
                    name: "Node.js",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nodedotjs.svg",
                    successRate: 88,
                    description: "Backend API development and automation scripts",
                    usage: "API integrations & data processing"
                },
                {
                    id: "github",
                    name: "GitHub",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg",
                    successRate: 90,
                    description: "Version control and collaborative development",
                    usage: "Code management & CI/CD pipelines"
                },
                {
                    id: "vscode",
                    name: "VS Code",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/visualstudiocode.svg",
                    successRate: 95,
                    description: "Primary development environment",
                    usage: "Daily coding workflow"
                },
                {
                    id: "mongodb",
                    name: "MongoDB",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mongodb.svg",
                    successRate: 78,
                    description: "NoSQL database for flexible data structures",
                    usage: "User data & content storage"
                }
            ]
        },
        {
            id: "ai-automation",
            name: "AI & Automation Systems",
            type: "category",
            defaultExpanded: false,
            description: "Cutting-edge AI tools and workflow automation platforms",
            children: [
                {
                    id: "chatgpt",
                    name: "ChatGPT / GPT-4",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
                    successRate: 98,
                    achievement: "Built Mamak Copy - Manglish copywriting AI",
                    description: "Advanced prompt engineering and API integration",
                    usage: "Content generation & automation workflows"
                },
                {
                    id: "claude",
                    name: "Claude (Anthropic)",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/anthropic.svg",
                    successRate: 96,
                    achievement: "Created Kopitiam Oracle - Malaysian trend prediction",
                    description: "Long-context analysis and complex reasoning",
                    usage: "Strategy development & technical documentation"
                },
                {
                    id: "midjourney",
                    name: "Midjourney",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/midjourney.svg",
                    successRate: 88,
                    description: "AI image generation for creative campaigns",
                    usage: "Visual concept development"
                },
                {
                    id: "n8n",
                    name: "n8n",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/n8n.svg",
                    successRate: 94,
                    achievement: "Automated legal transcription saving RM 45K/year",
                    description: "Self-hosted workflow automation platform",
                    usage: "Complex multi-step automation workflows"
                },
                {
                    id: "make",
                    name: "Make.com",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/make.svg",
                    successRate: 90,
                    description: "Visual automation platform for no-code workflows",
                    usage: "Social media scheduling & data sync"
                },
                {
                    id: "zapier",
                    name: "Zapier",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/zapier.svg",
                    successRate: 85,
                    description: "Quick automation for common integrations",
                    usage: "CRM updates & notification workflows"
                }
            ]
        },
        {
            id: "creative",
            name: "Creative Production & Design",
            type: "category",
            defaultExpanded: false,
            description: "Professional design and video editing tools",
            children: [
                {
                    id: "figma",
                    name: "Figma",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/figma.svg",
                    successRate: 88,
                    description: "UI/UX design and prototyping",
                    usage: "Landing pages & campaign assets"
                },
                {
                    id: "photoshop",
                    name: "Adobe Photoshop",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobephotoshop.svg",
                    successRate: 90,
                    description: "Advanced image editing and manipulation",
                    usage: "Social media graphics & photo retouching"
                },
                {
                    id: "premiere",
                    name: "Adobe Premiere Pro",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobepremierepro.svg",
                    successRate: 85,
                    description: "Professional video editing",
                    usage: "Reels, TikToks & promotional videos"
                },
                {
                    id: "aftereffects",
                    name: "Adobe After Effects",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobeaftereffects.svg",
                    successRate: 82,
                    description: "Motion graphics and visual effects",
                    usage: "Animated content & brand intros"
                },
                {
                    id: "canva",
                    name: "Canva",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/canva.svg",
                    successRate: 95,
                    description: "Quick design templates and brand kits",
                    usage: "Rapid content creation & templating"
                },
                {
                    id: "davinci",
                    name: "DaVinci Resolve",
                    type: "tool",
                    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/davinciresolve.svg",
                    successRate: 78,
                    description: "Color grading and advanced video editing",
                    usage: "Professional video finishing"
                }
            ]
        }
    ];

    // Calculate overall stats
    const totalTools = toolsData.reduce((sum, category) => sum + (category.children?.length || 0), 0);
    const averageSuccess = Math.round(
        toolsData.reduce((sum, category) =>
            sum + category.children.reduce((catSum, tool) => catSum + (tool.successRate || 0), 0),
            0) / totalTools
    );
    const expertTools = toolsData.reduce((sum, category) =>
        sum + category.children.filter(tool => tool.successRate >= 90).length,
        0);

    return (
        <section className="py-24 bg-gradient-to-b from-white to-navy/5 dark:from-navy-dark dark:to-white/5">
            <div className="container mx-auto px-6 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-left md:text-center mb-12"
                >
                    <h2 className="section-title">Tools & Platforms</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
                        {totalTools} tools organized by expertise • {averageSuccess}% average proficiency • {expertTools} expert-level
                    </p>
                    <p className="text-lg text-primary mt-2 flex items-center justify-start md:justify-center gap-2">
                        <span>🔍</span>
                        <span className="font-medium">Click categories to explore my toolkit</span>
                    </p>
                </motion.div>

                <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-2 gap-4 pb-8 -mx-4 px-4 scrollbar-hide">
                    {toolsData.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="min-w-[85vw] md:min-w-[45vw] lg:min-w-0 snap-center glass-card p-6 rounded-xl border border-primary/10 hover:border-primary/20 transition-all bg-white/80 dark:bg-navy/80 backdrop-blur-sm"
                        >
                            <TreeNodeTooltip
                                node={{
                                    ...category,
                                    defaultExpanded: index === 0 && autoExpandFirst ? true : category.defaultExpanded
                                }}
                                index={index}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Legend */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 flex flex-wrap justify-center gap-6 text-sm"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-gray-600 dark:text-gray-400">Expert (90%+)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-teal"></div>
                        <span className="text-gray-600 dark:text-gray-400">Advanced (75-89%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span className="text-gray-600 dark:text-gray-400">Proficient (60-74%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                        <span className="text-gray-600 dark:text-gray-400">Learning (&lt;60%)</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ToolsPlatforms;
