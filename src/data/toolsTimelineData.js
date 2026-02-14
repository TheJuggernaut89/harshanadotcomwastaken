// Tools data for Radial Orbital Timeline
export const toolsTimelineData = [
    {
        id: 1,
        title: "Instagram",
        date: "Social Media",
        content: "Expert in Instagram marketing, content creation, and audience engagement strategies.",
        category: "Social",
        logo: "https://svgl.app/library/instagram-icon.svg",
        relatedIds: [2, 3, 9],
        status: "completed", // EXPERT
        energy: 95,
    },
    {
        id: 2,
        title: "Facebook",
        date: "Social Media",
        content: "Advanced Facebook Ads management, community building, and analytics.",
        category: "Social",
        logo: "https://svgl.app/library/facebook-icon.svg",
        relatedIds: [1, 9],
        status: "completed", // EXPERT
        energy: 90,
    },
    {
        id: 3,
        title: "TikTok",
        date: "Social Media",
        content: "Viral content creation, trend analysis, and TikTok advertising campaigns.",
        category: "Social",
        logo: "https://www.vectorlogo.zone/logos/tiktok/tiktok-icon.svg",
        relatedIds: [1, 10],
        status: "completed", // EXPERT
        energy: 92,
    },
    {
        id: 4,
        title: "OpenAI",
        date: "AI Platform",
        content: "GPT-4, ChatGPT API integration, prompt engineering, and AI automation.",
        category: "AI",
        logo: "https://svgl.app/library/openai.svg",
        relatedIds: [5, 10],
        status: "completed", // EXPERT
        energy: 98,
    },
    {
        id: 5,
        title: "Claude",
        date: "AI Platform",
        content: "Anthropic Claude API, advanced reasoning, and conversational AI systems.",
        category: "AI",
        logo: "https://svgl.app/library/claude-ai-icon.svg",
        relatedIds: [4, 10],
        status: "completed", // EXPERT
        energy: 95,
    },
    {
        id: 6,
        title: "Photoshop",
        date: "Design Tool",
        content: "Professional photo editing, graphic design, and visual content creation.",
        category: "Design",
        logo: "https://svgl.app/library/photoshop.svg",
        relatedIds: [7, 10],
        status: "in-progress", // PROFICIENT
        energy: 75,
    },
    {
        id: 7,
        title: "Figma",
        date: "Design Tool",
        content: "UI/UX design, prototyping, and collaborative design workflows.",
        category: "Design",
        logo: "https://svgl.app/library/figma.svg",
        relatedIds: [6],
        status: "in-progress", // PROFICIENT
        energy: 70,
    },
    {
        id: 8,
        title: "GitHub",
        date: "Development",
        content: "Version control, code collaboration, and project management.",
        category: "Dev",
        logo: "https://www.vectorlogo.zone/logos/github/github-icon.svg",
        relatedIds: [10],
        status: "in-progress", // PROFICIENT
        energy: 80,
    },
    {
        id: 9,
        title: "Meta Business",
        date: "Marketing",
        content: "Meta Business Suite, Ads Manager, and cross-platform campaign management.",
        category: "Marketing",
        logo: "https://svgl.app/library/meta.svg",
        relatedIds: [1, 2],
        status: "completed", // EXPERT
        energy: 93,
    },
    {
        id: 10,
        title: "Canva",
        date: "Design Tool",
        content: "Quick design creation, templates, and brand kit management.",
        category: "Design",
        logo: "https://www.vectorlogo.zone/logos/canva/canva-icon.svg",
        relatedIds: [3, 4, 6],
        status: "completed", // EXPERT
        energy: 88,
    },
];
