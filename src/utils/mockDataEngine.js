/**
 * Mock Data Engine for Malaysian Platform AI Tools
 * Provides realistic demo data for all 15 tools
 */

export const mockDataEngine = {
  // ===================================
  // KOPITIAM INTEL LAYER (5 Tools)
  // ===================================

  /**
   * 1. Culture Code - Cultural moment predictor
   */
  cultureCode: (monthsAhead = 30) => {
    const culturalMoments = [
      {
        event: "Chinese New Year",
        date: "January 29, 2025",
        daysAway: 37,
        culturalSignificance: 95,
        targetAudience: "Chinese Malaysian + Singaporeans",
        marketingOpportunities: [
          "Family reunion meal packages",
          "Ang pau promotions (multiples of 8)",
          "Prosperity-themed products (gold, red colors)",
          "Reunion hampers and gift sets"
        ],
        contentThemes: ["prosperity", "family", "reunion", "luck", "abundance"],
        colorPalette: ["#FF0000", "#FFD700", "#8B0000"],
        avgSpendIncrease: "+340%",
        competitorActivity: "Very High",
        recommendedBudget: "35% of quarterly budget",
        bestPlatforms: ["Facebook", "Instagram", "TikTok", "Outdoor"],
        timing: {
          campaignStart: "December 29, 2024",
          peakSpending: "January 20-28, 2025",
          campaignEnd: "February 5, 2025"
        }
      },
      {
        event: "Hari Raya Aidilfitri",
        date: "March 31, 2025 (estimated)",
        daysAway: 99,
        culturalSignificance: 98,
        targetAudience: "Malay Malaysian (60% population)",
        marketingOpportunities: [
          "Balik kampung travel packages",
          "Baju raya fashion collections",
          "Kuih raya and food hampers",
          "Duit raya campaigns"
        ],
        contentThemes: ["forgiveness", "family", "gratitude", "renewal", "charity"],
        colorPalette: ["#00A86B", "#FFD700", "#FFFFFF"],
        avgSpendIncrease: "+380%",
        competitorActivity: "Extremely High",
        recommendedBudget: "40% of quarterly budget",
        bestPlatforms: ["Facebook", "Instagram", "TikTok", "TV"],
        timing: {
          campaignStart: "February 28, 2025",
          peakSpending: "March 20-30, 2025",
          campaignEnd: "April 7, 2025"
        }
      },
      {
        event: "Deepavali",
        date: "October 20, 2025",
        daysAway: 302,
        culturalSignificance: 90,
        targetAudience: "Indian Malaysian (7% population)",
        marketingOpportunities: [
          "Traditional clothing and jewelry",
          "Murukku and sweet hampers",
          "Home decoration items (kolam, oil lamps)",
          "Gold jewelry promotions"
        ],
        contentThemes: ["light", "victory", "prosperity", "family", "tradition"],
        colorPalette: ["#FF6B35", "#FFD700", "#8B008B"],
        avgSpendIncrease: "+280%",
        competitorActivity: "Medium-High",
        recommendedBudget: "15% of quarterly budget",
        bestPlatforms: ["Facebook", "Instagram", "WhatsApp"],
        timing: {
          campaignStart: "September 20, 2025",
          peakSpending: "October 10-19, 2025",
          campaignEnd: "October 25, 2025"
        }
      },
      {
        event: "11.11 Shopping Festival",
        date: "November 11, 2025",
        daysAway: 324,
        culturalSignificance: 85,
        targetAudience: "Urban millennials & Gen Z (all races)",
        marketingOpportunities: [
          "Flash deals and midnight sales",
          "Free shipping thresholds",
          "Bundle deals (buy 1 get 1)",
          "Platform-exclusive discounts"
        ],
        contentThemes: ["value", "deals", "FOMO", "limited time", "self-care"],
        colorPalette: ["#FF0000", "#000000", "#FFD700"],
        avgSpendIncrease: "+420%",
        competitorActivity: "Extremely High",
        recommendedBudget: "25% of quarterly budget",
        bestPlatforms: ["Shopee", "Lazada", "TikTok Shop", "Instagram"],
        timing: {
          campaignStart: "October 25, 2025",
          peakSpending: "November 10-11, 2025",
          campaignEnd: "November 13, 2025"
        }
      },
      {
        event: "Malaysia Day",
        date: "September 16, 2025",
        daysAway: 268,
        culturalSignificance: 75,
        targetAudience: "All Malaysians (patriotic angle)",
        marketingOpportunities: [
          "Malaysian-made product campaigns",
          "Unity and diversity themes",
          "Local brand collaborations",
          "Malaysian flag colors (red, blue, yellow, white)"
        ],
        contentThemes: ["unity", "diversity", "pride", "local", "heritage"],
        colorPalette: ["#CC0001", "#010066", "#FFCC00"],
        avgSpendIncrease: "+45%",
        competitorActivity: "Medium",
        recommendedBudget: "8% of quarterly budget",
        bestPlatforms: ["Facebook", "Instagram", "TikTok"],
        timing: {
          campaignStart: "September 1, 2025",
          peakSpending: "September 14-16, 2025",
          campaignEnd: "September 18, 2025"
        }
      }
    ];

    // Return events within the specified timeframe
    return culturalMoments
      .filter(event => event.daysAway <= monthsAhead * 30)
      .sort((a, b) => a.daysAway - b.daysAway);
  },

  /**
   * 2. Kopitiam Oracle - F&B trend prediction
   */
  kopitiamOracle: (query) => {
    const trendDatabase = {
      "bubble tea": {
        trendScore: 87,
        velocity: "+23% in last 30 days",
        peakMonth: "March 2025",
        hotspots: ["Bukit Bintang", "Subang Jaya", "Georgetown", "Mid Valley"],
        competitors: 45,
        avgPrice: "RM 8-12",
        priceElasticity: "Medium - consumers willing to pay for quality",
        targetDemo: "Gen Z & Millennials (18-32)",
        insights: [
          "Brown sugar variant gaining massive traction (+67% mentions)",
          "Instagram hashtag #BubbleTeaMY up 89% month-over-month",
          "Premium offerings (RM 15+) growing faster than budget tier",
          "Cheese foam trending among Gen Z demographics"
        ],
        redFlags: [
          "Market saturation in Klang Valley - consider Penang/JB expansion",
          "Price wars among major chains affecting margins"
        ],
        opportunities: [
          "Health-conscious variants (low sugar, oat milk)",
          "Collaborations with local dessert brands",
          "Seasonal limited editions (durian, cendol flavors)"
        ]
      },
      "nasi lemak": {
        trendScore: 94,
        velocity: "+12% in last 30 days",
        peakMonth: "Ongoing (National Favorite)",
        hotspots: ["Literally everywhere lah"],
        competitors: 1247,
        avgPrice: "RM 3-8 (street), RM 15-25 (premium)",
        priceElasticity: "Low - price-sensitive market",
        targetDemo: "All Malaysians (universal appeal)",
        insights: [
          "Premium nasi lemak trend (+RM 15-25 range) growing 45%",
          "Sambal variants becoming key differentiator",
          "Weekend brunch market emerging for upscale versions",
          "Delivery orders increased 78% since pandemic"
        ],
        redFlags: [
          "Extreme competition in budget segment",
          "Rising chicken prices affecting margins"
        ],
        opportunities: [
          "Unique sambal recipes (sambal hijau, sambal belacan cheese)",
          "Fusion variants (Korean, Japanese twists)",
          "Subscription meal plans for office workers"
        ]
      },
      "sambal": {
        trendScore: 91,
        velocity: "+45% in last 30 days",
        peakMonth: "April 2025",
        hotspots: ["Nationwide - E-commerce boom"],
        competitors: 89,
        avgPrice: "RM 5-15 per bottle",
        priceElasticity: "Medium - quality differentiation matters",
        targetDemo: "Home cooks 25-55, expats missing Malaysian food",
        insights: [
          "Homemade sambal brands exploding on TikTok Shop",
          "Unique flavors trending: Sambal Hijau, Sambal Belacan Cheese, Sambal Mangga",
          "E-commerce sales up 78%, especially Shopee and TikTok Shop",
          "Singaporean market showing strong demand (+120% orders)"
        ],
        redFlags: [
          "JAKIM halal certification becoming mandatory for major retailers",
          "Quality control issues with home-based producers"
        ],
        opportunities: [
          "Premium bottled sambal (RM 20-35 range) underserved",
          "Corporate gifting sets (sambal variety packs)",
          "Export to Singapore and overseas Malaysians"
        ]
      },
      "kopi": {
        trendScore: 88,
        velocity: "+31% in last 30 days",
        peakMonth: "May 2025",
        hotspots: ["Klang Valley", "Ipoh", "Johor Bahru"],
        competitors: 156,
        avgPrice: "RM 2-4 (kopitiam), RM 8-15 (cafe)",
        priceElasticity: "Medium - segment-dependent",
        targetDemo: "Traditionalists 40+ & Hipster millennials 25-35",
        insights: [
          "Traditional kopitiam culture revival among Gen Z",
          "Specialty Malaysian coffee beans gaining premium status",
          "Kopi peng (iced) variations trending in hot weather",
          "Nostalgia marketing performing exceptionally well"
        ],
        redFlags: [
          "Coffee bean price volatility affecting margins",
          "Starbucks and international chains dominating premium segment"
        ],
        opportunities: [
          "Bottled/canned ready-to-drink kopi for convenience stores",
          "Kopitiam-style cafes in hip neighborhoods",
          "Coffee bean subscriptions (support local farmers angle)"
        ]
      },
      "roti canai": {
        trendScore: 85,
        velocity: "+18% in last 30 days",
        peakMonth: "June 2025",
        hotspots: ["Mamak restaurants nationwide"],
        competitors: 890,
        avgPrice: "RM 1.50-3 (plain), RM 5-8 (special)",
        priceElasticity: "Very Low - Malaysians know the 'right' price",
        targetDemo: "All demographics (comfort food)",
        insights: [
          "Gourmet roti variants trending (roti tissue, roti boom)",
          "Frozen roti canai sales up 65% in supermarkets",
          "Creative fillings: Nutella, durian, mozzarella cheese",
          "Delivery-friendly packaging innovations"
        ],
        redFlags: [
          "Labor-intensive preparation limiting scalability",
          "Price sensitivity extremely high in this category"
        ],
        opportunities: [
          "Frozen pre-made roti for home cooking",
          "Roti canai meal kits with premium curries",
          "24-hour roti canai concepts (late night munchies)"
        ]
      },
      "durian": {
        trendScore: 93,
        velocity: "+58% in last 30 days",
        peakMonth: "June-August 2025 (Peak Season)",
        hotspots: ["Penang", "Johor", "Pahang (Musang King territory)"],
        competitors: 234,
        avgPrice: "RM 25-80 per kg (variety dependent)",
        priceElasticity: "Low - durian lovers will pay premium",
        targetDemo: "Durian enthusiasts 30-60, Chinese Malaysian majority",
        insights: [
          "Musang King remains king but Black Thorn gaining ground",
          "Durian delivery services booming (overnight shipping)",
          "Younger generation (Gen Z) showing increased interest",
          "Export market to China explosive growth (+200%)"
        ],
        redFlags: [
          "Seasonal availability creating supply challenges",
          "Price manipulation by middlemen affecting farmers"
        ],
        opportunities: [
          "Durian investment schemes (pre-order harvest)",
          "Durian-flavored products (ice cream, mooncakes, pizza)",
          "Agro-tourism experiences (durian farm visits)"
        ]
      }
    };

    const defaultResponse = {
      trendScore: Math.floor(Math.random() * 40) + 60,
      velocity: `+${Math.floor(Math.random() * 50) + 5}% in last 30 days`,
      peakMonth: ["March", "April", "May", "June", "July"][Math.floor(Math.random() * 5)] + " 2025",
      hotspots: ["Klang Valley", "Penang", "Johor Bahru"].slice(0, Math.floor(Math.random() * 2) + 1),
      competitors: Math.floor(Math.random() * 100) + 20,
      avgPrice: `RM ${Math.floor(Math.random() * 20) + 5}-${Math.floor(Math.random() * 30) + 15}`,
      priceElasticity: "Medium",
      targetDemo: "Urban millennials 25-40",
      insights: [
        "Emerging trend in urban areas",
        "Social media mentions increasing steadily",
        "Potential for viral marketing campaigns"
      ],
      redFlags: ["Limited historical data for accurate prediction"],
      opportunities: ["First-mover advantage in this niche"]
    };

    return trendDatabase[query.toLowerCase()] || defaultResponse;
  },

  /**
   * 3. Subsidy Tracker - Government policy impact
   */
  subsidyTracker: (category = "all") => {
    const policies = {
      fuel: [
        {
          policy: "RON95 Subsidy Rationalization",
          announcedDate: "December 15, 2024",
          effectiveDate: "March 1, 2025",
          impact: "High",
          affectedGroup: "T15 income group (RM 15,000+ household income)",
          priceChange: "+RM 0.50/liter for T15, subsidized for M40 & B40",
          currentPrice: "RM 2.05/liter",
          projectedPrice: "RM 2.55/liter (T15)",
          marketingImplications: [
            "Emphasize fuel efficiency in vehicle marketing",
            "Value-for-money positioning for budget products",
            "Delivery service costs may increase - communicate early",
            "Promote public transport alternatives"
          ],
          affectedSectors: ["Automotive", "Transportation", "Delivery Services", "Logistics"],
          opportunityIndex: 7.5,
          timeline: "Q1 2025 implementation"
        }
      ],
      electricity: [
        {
          policy: "Electricity Tariff Adjustment",
          announcedDate: "January 3, 2025",
          effectiveDate: "February 1, 2025",
          impact: "Medium",
          affectedGroup: "Commercial and industrial users",
          priceChange: "+2.5% for commercial use, +4.1% for industrial",
          currentPrice: "RM 0.365/kWh (commercial avg)",
          projectedPrice: "RM 0.374/kWh (commercial avg)",
          marketingImplications: [
            "Promote energy-efficient products (LED, inverter AC)",
            "Highlight long-term cost savings messaging",
            "B2B angle: Help businesses reduce operating costs",
            "Solar panel solutions gaining traction"
          ],
          affectedSectors: ["Retail", "F&B", "Manufacturing", "Data Centers"],
          opportunityIndex: 6.8,
          timeline: "Q1 2025 implementation"
        }
      ],
      food: [
        {
          policy: "Chicken Price Control Extension",
          announcedDate: "December 20, 2024",
          effectiveDate: "January 1, 2025",
          impact: "Low-Medium",
          affectedGroup: "All consumers",
          priceChange: "RM 9.40/kg ceiling maintained (no change)",
          currentPrice: "RM 9.40/kg (standard chicken)",
          projectedPrice: "RM 9.40/kg (stable)",
          marketingImplications: [
            "Family meal bundles remain attractive value proposition",
            "Chicken-based products maintain pricing advantage",
            "Promote chicken over beef/seafood (higher prices)",
            "Recipe content marketing (affordable protein focus)"
          ],
          affectedSectors: ["F&B", "Restaurants", "Catering", "Food Processing"],
          opportunityIndex: 5.2,
          timeline: "Extended through 2025"
        },
        {
          policy: "Cooking Oil Price Stabilization",
          announcedDate: "January 10, 2025",
          effectiveDate: "February 1, 2025",
          impact: "Medium",
          affectedGroup: "Households and F&B businesses",
          priceChange: "RM 2.50/kg subsidy for 1kg packets",
          currentPrice: "RM 9.50/kg (market price)",
          projectedPrice: "RM 7.00/kg (subsidized for 1kg packets only)",
          marketingImplications: [
            "Promote 1kg packet sales over bulk",
            "Kitchen efficiency content (reduce oil waste)",
            "Air fryer marketing opportunity (uses less oil)",
            "Recipe focus on oil-efficient cooking methods"
          ],
          affectedSectors: ["F&B", "Retail", "CPG (Consumer Packaged Goods)"],
          opportunityIndex: 6.5,
          timeline: "Q1 2025 rollout"
        }
      ],
      utilities: [
        {
          policy: "Water Tariff Restructuring",
          announcedDate: "November 28, 2024",
          effectiveDate: "April 1, 2025",
          impact: "Low",
          affectedGroup: "High-consumption households (>35m³/month)",
          priceChange: "+15% for usage above 35m³",
          currentPrice: "Tiered system (RM 0.57-1.45/m³)",
          projectedPrice: "Tiered system (RM 0.57-1.67/m³ top tier)",
          marketingImplications: [
            "Water-saving appliances gaining importance",
            "Eco-friendly messaging resonates with policy",
            "Car wash services may adjust pricing - opportunity for waterless products",
            "Home renovation angle: low-flow fixtures"
          ],
          affectedSectors: ["Home Improvement", "Appliances", "Car Care"],
          opportunityIndex: 4.8,
          timeline: "Q2 2025 implementation"
        }
      ]
    };

    if (category === "all") {
      return Object.values(policies).flat().sort((a, b) => 
        new Date(b.announcedDate) - new Date(a.announcedDate)
      );
    }

    return policies[category] || [];
  },

  /**
   * 4. Singaporean Hunter - Cross-border shopping tracker
   */
  singaporeanHunter: () => {
    const exchangeRate = (2.9 + (Math.random() * 0.4 - 0.2)).toFixed(2);
    const weekendTraffic = Math.floor(Math.random() * 30000) + 50000;
    const isGoodRate = parseFloat(exchangeRate) > 3.05;

    return {
      currentRate: `SGD 1 = RM ${exchangeRate}`,
      rateChange: isGoodRate ? "+2.3% vs last week" : "-1.1% vs last week",
      trend: isGoodRate 
        ? "🔥 EXCELLENT - Prime time to target Singaporean shoppers!" 
        : "📊 MODERATE - Better rates expected in 2-3 weeks",
      weekendTraffic: `${weekendTraffic.toLocaleString()} Singaporeans expected in JB this weekend`,
      peakDays: ["Saturday 10am-8pm", "Sunday 11am-6pm"],
      hotProducts: [
        { 
          category: "Groceries & Snacks", 
          demand: "Very High", 
          savings: "30-40%",
          topItems: ["Local snacks", "Biscuits", "Instant noodles", "Coffee powder"],
          avgBasket: "SGD 80-150"
        },
        { 
          category: "Petrol", 
          demand: "Extremely High", 
          savings: "50%+",
          topItems: ["RON95 full tank"],
          avgBasket: "SGD 50-70"
        },
        { 
          category: "Dining & F&B", 
          demand: "High", 
          savings: "40-50%",
          topItems: ["Seafood", "Dim sum", "Local delicacies"],
          avgBasket: "SGD 30-60 per person"
        },
        { 
          category: "Massage & Spa", 
          demand: "Medium-High", 
          savings: "60%+",
          topItems: ["Full body massage", "Foot reflexology"],
          avgBasket: "SGD 25-50"
        },
        { 
          category: "Electronics & Gadgets", 
          demand: "Medium", 
          savings: "15-25%",
          topItems: ["Phones", "Accessories", "Power banks"],
          avgBasket: "SGD 100-500"
        }
      ],
      marketingTips: isGoodRate ? [
        "🎯 HIGHLIGHT SGD PRICING prominently in all materials",
        "💰 Show side-by-side price comparisons (SGD vs MYR savings)",
        "📍 Emphasize proximity to Causeway (e.g., '10 mins from Checkpoint')",
        "⏰ Extended hours promotions (Singaporeans love late-night shopping)",
        "🅿️ Advertise free/ample parking (major plus vs Singapore)",
        "📱 QR codes for SG mobile payments (PayNow, GrabPay SG)"
      ] : [
        "⏸️ HOLD OFF on aggressive SG-focused campaigns until rates improve",
        "🎁 Focus on loyalty programs for repeat SG customers",
        "📊 Build remarketing lists for when rates spike again",
        "💡 Promote non-price benefits (variety, experience, nostalgia)",
        "🔔 Set up 'Rate Alert' email campaigns for your SG customer base"
      ],
      bestLocations: [
        "JB City Square / Komtar JBCC",
        "Mid Valley Southkey",
        "Toppen Shopping Centre",
        "AEON Tebrau City",
        "Johor Premium Outlets"
      ],
      competitorInsights: {
        mostAggressive: "KSL City Mall (heavy SGD promotions)",
        underutilized: "Permas Jaya area (less crowded, good value)",
        emerging: "Medini area (new developments attracting SG investment)"
      },
      seasonalTrends: {
        peak: "School holidays, long weekends, festive periods",
        low: "Mid-week, rainy season (Nov-Dec)",
        optimal: "3-day weekends + favorable exchange rate = 200% traffic spike"
      }
    };
  },

  /**
   * 5. Festival ROI Maximizer - Budget optimization
   */
  festivalROI: (totalBudget) => {
    const festivals = [
      { 
        name: "Chinese New Year", 
        allocation: 35, 
        historicalROI: 4.2, 
        audience: "Chinese Malaysian (22% population) + Singaporeans",
        avgSpendPerCustomer: "RM 450",
        peakSpendingDays: "3 days before CNY to Day 5",
        contentPillars: ["Prosperity", "Family Reunion", "Luck & Fortune"],
        colorScheme: ["Red", "Gold", "Vibrant"],
        keyProducts: ["Hampers", "Oranges", "Cookies", "Decoration", "Angpau packets"]
      },
      { 
        name: "Hari Raya Aidilfitri", 
        allocation: 30, 
        historicalROI: 3.8, 
        audience: "Malay Malaysian (60% population)",
        avgSpendPerCustomer: "RM 520",
        peakSpendingDays: "2 weeks before Raya to Day 3",
        contentPillars: ["Forgiveness", "Gratitude", "Homecoming"],
        colorScheme: ["Green", "Gold", "White"],
        keyProducts: ["Baju Raya", "Kuih Raya", "Home Decor", "Rendang ingredients"]
      },
      { 
        name: "Deepavali", 
        allocation: 15, 
        historicalROI: 3.5, 
        audience: "Indian Malaysian (7% population)",
        avgSpendPerCustomer: "RM 280",
        peakSpendingDays: "1 week before Deepavali to Day 2",
        contentPillars: ["Light Over Darkness", "Prosperity", "Tradition"],
        colorScheme: ["Orange", "Gold", "Purple"],
        keyProducts: ["Traditional wear", "Murukku", "Sweets", "Oil lamps", "Gold jewelry"]
      },
      { 
        name: "11.11 Shopping Festival", 
        allocation: 12, 
        historicalROI: 5.1, 
        audience: "Urban Millennials & Gen Z (all ethnicities)",
        avgSpendPerCustomer: "RM 380",
        peakSpendingDays: "11.11 (midnight to 2am + lunchtime spikes)",
        contentPillars: ["FOMO", "Limited Time Deals", "Self-Care"],
        colorScheme: ["Black", "Red", "Gold"],
        keyProducts: ["Electronics", "Beauty", "Fashion", "Gadgets"]
      },
      { 
        name: "Christmas & New Year", 
        allocation: 8, 
        historicalROI: 2.9, 
        audience: "Christians, Expats, Urban professionals",
        avgSpendPerCustomer: "RM 320",
        peakSpendingDays: "Mid-December to Jan 2",
        contentPillars: ["Celebration", "Gifting", "New Beginnings"],
        colorScheme: ["Red", "Green", "Gold", "Silver"],
        keyProducts: ["Gifts", "Party supplies", "Decorations", "Food & wine"]
      }
    ];

    return festivals.map(f => ({
      ...f,
      budgetAmount: `RM ${((totalBudget * f.allocation) / 100).toLocaleString()}`,
      expectedReturn: `RM ${((totalBudget * f.allocation * f.historicalROI) / 100).toLocaleString()}`,
      projectedRevenue: `RM ${((totalBudget * f.allocation * f.historicalROI) / 100).toLocaleString()}`,
      netProfit: `RM ${(((totalBudget * f.allocation * f.historicalROI) - (totalBudget * f.allocation)) / 100).toLocaleString()}`,
      recommendedChannels: f.allocation > 25 
        ? ["Facebook", "Instagram", "TikTok", "Outdoor Billboards", "Radio"] 
        : ["Facebook", "Instagram", "TikTok"],
      campaignDuration: f.allocation > 25 ? "4-6 weeks" : "2-3 weeks",
      contentVolume: f.allocation > 25 ? "15-20 posts" : "8-12 posts"
    }));
  },

  // ===================================
  // MAMAK WORKSHOP LAYER (5 Tools)
  // ===================================

  /**
   * 6. Pitch Perfect - AI pitch deck generator
   */
  pitchPerfect: (industry, businessModel = "B2C") => {
    const marketData = {
      "food delivery": {
        marketSize: "RM 2.8B",
        growth: "18.5% annually",
        competitors: 12,
        topPlayers: ["Foodpanda", "GrabFood", "Shopee Food"]
      },
      "e-commerce": {
        marketSize: "RM 11.2B",
        growth: "23.1% annually",
        competitors: 8,
        topPlayers: ["Shopee", "Lazada", "TikTok Shop"]
      },
      "fintech": {
        marketSize: "RM 4.5B",
        growth: "31.2% annually",
        competitors: 15,
        topPlayers: ["Touch 'n Go eWallet", "GrabPay", "Boost"]
      },
      "edtech": {
        marketSize: "RM 890M",
        growth: "15.8% annually",
        competitors: 18,
        topPlayers: ["Pandai", "Sekolahku", "Cocomel"]
      },
      "healthtech": {
        marketSize: "RM 1.2B",
        growth: "27.3% annually",
        competitors: 9,
        topPlayers: ["DoctorOnCall", "BookDoc", "MyDoc"]
      }
    };

    const data = marketData[industry.toLowerCase()] || {
      marketSize: `RM ${Math.floor(Math.random() * 500 + 100)}M`,
      growth: `${Math.floor(Math.random() * 20 + 10)}% annually`,
      competitors: Math.floor(Math.random() * 20 + 5),
      topPlayers: ["Competitor A", "Competitor B", "Competitor C"]
    };

    return {
      ...data,
      targetSegment: businessModel === "B2C" 
        ? "Urban millennials & Gen Z (18-40 years)" 
        : "SMEs with 10-50 employees",
      uniqueAngle: `First ${industry} platform built specifically for Malaysian market context`,
      marketOpportunity: {
        tam: data.marketSize,
        sam: `RM ${(parseInt(data.marketSize.replace(/\D/g, '')) * 0.4).toFixed(0)}M`,
        som: `RM ${(parseInt(data.marketSize.replace(/\D/g, '')) * 0.05).toFixed(0)}M (Year 1 target)`
      },
      slideStructure: [
        { 
          title: "Problem", 
          content: "Malaysian consumers face unique challenges not addressed by international platforms",
          speakerNotes: "Emphasize local pain points: language barriers, payment methods, cultural nuances"
        },
        { 
          title: "Solution", 
          content: `AI-powered ${industry} platform tailored for Malaysia`,
          speakerNotes: "Highlight Malaysian-specific features: Rojak language support, local payment integration, cultural calendar"
        },
        { 
          title: "Market Opportunity", 
          content: `${data.marketSize} market growing at ${data.growth}`,
          speakerNotes: "Break down TAM/SAM/SOM, show growth trajectory vs regional markets"
        },
        { 
          title: "Business Model", 
          content: businessModel === "B2C" ? "Freemium + Commission" : "SaaS Subscription + Enterprise",
          speakerNotes: "Explain monetization: free tier for acquisition, premium features for revenue"
        },
        { 
          title: "Competitive Advantage", 
          content: "Deep Malaysian market understanding + AI automation",
          speakerNotes: "Our team's local expertise is moat that foreign companies can't replicate quickly"
        },
        { 
          title: "Traction", 
          content: "Early validation metrics",
          speakerNotes: "Insert actual numbers: users, revenue, growth rate, retention"
        },
        { 
          title: "Go-to-Market", 
          content: "Phase 1: Klang Valley → Phase 2: Major cities → Phase 3: National",
          speakerNotes: "Explain why geographic expansion strategy fits Malaysian market dynamics"
        },
        { 
          title: "Team", 
          content: "Founders with deep domain + tech expertise",
          speakerNotes: "Highlight relevant Malaysian market experience and technical capabilities"
        },
        { 
          title: "Financials", 
          content: "3-year projection: Path to profitability",
          speakerNotes: "Conservative estimates, clear assumptions, realistic Malaysian unit economics"
        },
        { 
          title: "The Ask", 
          content: "Seeking RM X for 18-month runway",
          speakerNotes: "Specify use of funds: 40% product, 35% marketing, 15% operations, 10% reserve"
        }
      ],
      designTips: [
        "Use Malaysian cultural colors subtly (avoid stereotype overload)",
        "Include data visualizations - investors love charts",
        "1 idea per slide maximum - keep it simple",
        "Use local success story case studies if possible"
      ]
    };
  },

  /**
   * 7. Rojak Translator - Multi-language code-switching
   */
  rojakTranslator: (text, style = "casual") => {
    const translations = {
      casual: {
        "hello everyone": "Hai semua! 👋",
        "thank you": "Terima kasih tau! 🙏",
        "big sale today": "Sale besar hari ni woii! 🔥",
        "limited time only": "Limited time je tau, cepat! ⏰",
        "check it out": "Cuba try tengok",
        "amazing deals": "Murah gila! 😱",
        "don't miss out": "Jangan miss tau, nanti rugi!",
        "free shipping": "Free shipping okay! 🚚",
        "buy now": "Beli sekarang lah!",
        "sold out": "Habis dah! Sold out! 😭",
        "back in stock": "Dah ada stock balik! 🎉",
        "new arrival": "Baru sampai! New arrival nih!",
        "best seller": "Laris gila! Best seller tau!",
        "hurry up": "Cepat! Kejap lagi habis!",
        "last chance": "Last chance ni! Lepas ni naik harga!",
        "good morning": "Morning semua! ☀️",
        "good night": "Nite nite semua! 🌙",
        "see you soon": "Jumpa lagi okay! See you! 👋",
        "welcome": "Welcome welcome! Selamat datang! 🤗",
        "congratulations": "Tahniah! Congrats! 🎊"
      },
      professional: {
        "hello everyone": "Selamat sejahtera semua",
        "thank you": "Terima kasih atas sokongan anda",
        "big sale today": "Promosi besar-besaran hari ini",
        "limited time only": "Tawaran terhad",
        "check it out": "Sila lihat",
        "amazing deals": "Tawaran istimewa",
        "don't miss out": "Jangan lepaskan peluang ini",
        "free shipping": "Penghantaran percuma",
        "buy now": "Beli sekarang",
        "sold out": "Kehabisan stok",
        "back in stock": "Stok telah tersedia semula",
        "new arrival": "Produk baharu",
        "best seller": "Produk popular",
        "hurry up": "Sila cepat",
        "last chance": "Peluang terakhir",
        "good morning": "Selamat pagi",
        "good night": "Selamat malam",
        "see you soon": "Jumpa lagi",
        "welcome": "Selamat datang",
        "congratulations": "Tahniah"
      },
      genz: {
        "hello everyone": "Haiiii guysss! 👋✨",
        "thank you": "Tqqqq babyyyy! 💕💕",
        "big sale today": "SALE GILA HARI NI FAMSSS 🔥🔥🔥",
        "limited time only": "Limited je sis! Later habis stock 😱",
        "check it out": "Go check nowww bestie!",
        "amazing deals": "CRAZY DEALS SIA OMGG 🤯",
        "don't miss out": "Jangan miss bro nanti menyesal FR FR! 😭",
        "free shipping": "FREE SHIPPING WEH! NO CAP! 🚚✨",
        "buy now": "BUY NOW LAH WHAT U WAITING FOR! 💅",
        "sold out": "HABIS DAH GG 😭💔",
        "back in stock": "RESTOCK ALERT FAMSSS! 🎉🎊",
        "new arrival": "NEW DROP JUST LANDED! 🔥✨",
        "best seller": "EVERYONE BUYING THIS RN! 👀",
        "hurry up": "RUN DONT WALK BESTIE! 🏃‍♀️💨",
        "last chance": "LAST CALL GUYS THIS IS IT! ⚠️",
        "good morning": "Morning vibe check! ☀️✨",
        "good night": "Nighty night besties! Sleep well! 🌙💤",
        "see you soon": "Ttyl babes! See ya! 👋💕",
        "welcome": "WELCOME TO THE FAMMMM! 🤗🎉",
        "congratulations": "YASSSS QUEEN SLAY! 🎊👑"
      }
    };

    const styleDict = translations[style.toLowerCase()] || translations.casual;
    const lowerText = text.toLowerCase();
    
    if (styleDict[lowerText]) {
      return styleDict[lowerText];
    }

    // Fallback transformations
    const rojak = {
      casual: text => text + " lah!",
      professional: text => text,
      genz: text => text + " sis! 💅✨"
    };

    return rojak[style.toLowerCase()] 
      ? rojak[style.toLowerCase()](text) 
      : text + " lah!";
  },

  /**
   * 8. Mamak Copy Generator - Social media content
   */
  mamakCopyGenerator: (product, platform, tone = "casual") => {
    const templates = {
      instagram: {
        casual: [
          `✨ ${product} yang korang tunggu dah sampai! ✨\n\nMurah gila, quality pun best! Jangan miss tau! 🔥\n\nOrder sekarang → Link in bio 👆\n\n#${product.replace(/ /g, '')} #MalaysiaShopping #MurahMeriah`,
          
          `Okay listen! 👂\n\n${product} ni memang worth it tau! Ramai customer dah beli and semua puji gila! 😍\n\nKalau korang nak try, now is the time! Limited stock je! ⚡\n\nSwipe untuk tengok lebih details ➡️\n\n#${product.replace(/ /g, '')} #BestBuy #ShopNow`,
          
          `🎉 GOOD NEWS! 🎉\n\n${product} on sale sekarang! Discount gila sampai XX%! 🤑\n\nNak beli? Click link in bio now! Kejap lagi habis! 🏃‍♂️💨\n\n#Sale #${product.replace(/ /g, '')} #Malaysia`
        ],
        professional: [
          `Introducing ${product} - designed for Malaysians, by Malaysians.\n\nQuality you can trust. Value you'll love. ✨\n\nAvailable now. Link in bio. 🔗\n\n#${product.replace(/ /g, '')} #MadeInMalaysia #QualityProducts`,
          
          `${product} is here.\n\nPremium quality at accessible prices. Because you deserve the best.\n\nShop now → Link in bio\n\n#${product.replace(/ /g, '')} #Premium #Shopping`,
          
          `New arrival: ${product}\n\nCrafted with care. Priced with you in mind.\n\nExplore our collection. Link in bio. 🔗\n\n#NewArrival #${product.replace(/ /g, '')}`
        ],
        genz: [
          `YOOO GUYSSS! 😱\n\n${product.toUpperCase()} JUST DROPPED AND ITS GIVING MAIN CHARACTER ENERGY! ✨💅\n\nNO CAP THIS IS THE ONE! Link in bio RN! 🔗🔥\n\n#${product.replace(/ /g, '')} #Slay #MainCharacter #IYKYK`,
          
          `NOT A DRILL BESTIESSS! 🚨\n\n${product} is literally everything rn and everyone's getting it! 👀\n\nDont be the last one to know babe! Go cop it! Link in bio! 💕\n\n#${product.replace(/ /g, '')} #MustHave #TrendAlert`,
          
          `POV: You finally found THE perfect ${product} 🎯✨\n\nIts giving expensive but make it affordable! FR FR! 🤑\n\nRun dont walk to our bio link NOWWW! 🏃‍♀️💨\n\n#${product.replace(/ /g, '')} #POV #Aesthetic`
        ]
      },
      facebook: {
        casual: [
          `‼️ ${product} SALE BESAR! ‼️\n\nKorang request, kami dengar! ${product} yang viral tu dah available sekarang dengan harga SPECIAL! 🎉\n\n✅ Quality terbaik\n✅ Harga berpatutan\n✅ Fast delivery\n\nNak order? PM kami sekarang atau click link dekat comments! Limited stock je tau! ⏰\n\nJangan lepaskan peluang ni! Share dengan kawan-kawan korang! 🔥`,
          
          `Assalamualaikum & Hai semua! 👋\n\nKita ada good news! ${product} yang ramai tanya tu dah ready stock! 🎊\n\nSpecial price untuk followers kami:\n💰 Normal: RM XX\n🎉 Special: RM YY je!\n\nFree shipping for orders above RM 50! 🚚\n\nBerminat? Whatsapp kami di 012-123 4567 atau click link di bawah!\n\nTerima kasih atas support korang! ❤️`
        ],
        professional: [
          `📢 Announcement\n\n${product} is now available at selected outlets and online.\n\nPremium quality. Competitive pricing. Reliable service.\n\nFor inquiries:\n📞 Contact: 012-123 4567\n🌐 Website: www.yourwebsite.com\n\nThank you for your continued support.`,
          
          `Introducing ${product}\n\nDesigned to meet Malaysian needs. Built to last.\n\nKey Features:\n✓ High quality materials\n✓ Affordable pricing\n✓ Nationwide delivery\n\nOrder now through our website or visit our stores.\n\nFor more information, please contact our customer service team.`
        ],
        genz: [
          `OKAY BUT HEAR ME OUT! 🗣️\n\n${product} is literally THE moment right now and if you havent got yours... BESTIE WHAT R U DOING?! 😭\n\nIts giving quality, its giving affordable, its giving EVERYTHING! ✨💅\n\nLink in comments GO GO GO! This is your sign! 🔥\n\nTag your bestie who needs this RN! 👇`,
          
          `NOT ME BEING OBSESSED WITH ${product}! 😍\n\nFR tho this is the best purchase I made this month and now everyone in my circle getting it too! 💕\n\nIf you need a sign to buy it, THIS IS IT SIS! ✨\n\nLink in comments! Lets goooo! 🏃‍♀️💨`
        ]
      },
      tiktok: {
        casual: [
          `🎵 [Trending sound] 🎵\n\nPOV: You discover ${product} dan hidup jadi lagi senang! 😌✨\n\n*shows product*\n\nMurah, quality best, semua orang nak! 🔥\n\nLink kat bio! Go grab yours! 🛒\n\n#${product.replace(/ /g, '')} #MalaysiaTikTok #MustHave #Viral`,
          
          `Wait... ${product} ni MURAH GILA?! 😱\n\n*checks price*\n*checks quality*\n*adds to cart immediately*\n\nGuys this is not a drill! Go buy now! 🏃‍♂️💨\n\n#${product.replace(/ /g, '')} #TikTokShop #Malaysia #Budget`,
          
          `Expectation vs Reality with ${product}! 🎭\n\nExpectation: Mahal, susah nak dapat\nReality: MURAH + BERBALOI + CEPAT SAMPAI! ✅\n\nKorang kena try! Link in bio! 🔗\n\n#${product.replace(/ /g, '')} #ExpectationVsReality #WorthIt`
        ],
        professional: [
          `Here's why ${product} is the smart choice:\n\n✓ Quality assured\n✓ Value for money\n✓ Trusted by thousands\n\nMake the switch today. Link in bio.\n\n#${product.replace(/ /g, '')} #SmartChoice #Quality`,
          
          `${product} - designed for the modern Malaysian.\n\nSee the difference yourself.\n\nAvailable now. Link in bio.\n\n#${product.replace(/ /g, '')} #Innovation #Modern`
        ],
        genz: [
          `NO BECAUSE WHY IS ${product} SO GOOD THO?! 😭✨\n\n*uses product*\n*falls in love*\n*everyone asks where I got it*\n\nBESTIES ITS IN MY BIO GO GET YOURS! This is your sign! 💕\n\n#${product.replace(/ /g, '')} #GirlBoss #IYKYK #MainCharacter`,
          
          `Telling my kids this was ${product} 😂\n\n*shows expensive alternative*\n\nBut actually its THIS and its SO much better! 🔥\n\nSaved so much money sis! Link in bio! 💅\n\n#${product.replace(/ /g, '')} #SmartShopping #Slay`
        ]
      }
    };

    const platformTemplates = templates[platform.toLowerCase()] || templates.instagram;
    const toneTemplates = platformTemplates[tone.toLowerCase()] || platformTemplates.casual;
    
    return toneTemplates[Math.floor(Math.random() * toneTemplates.length)];
  },

  /**
   * 9. Live Seller Script - TikTok Live selling
   */
  liveSellerScript: (product, pricePoint, stockCount = 50) => {
    const scripts = [
      {
        phase: "Opening Hook (First 30 seconds)",
        script: `"HAIIII SEMUA! Okay jap jap! *waves* Ramai dah masuk! Welcome welcome! 👋\n\nOkay listen, today I ada benda GILA MURAH tau! Serious! Korang mesti suka punya! \n\n*holds up ${product}*\n\nNI DIA! ${product}! Yang viral kat TikTok tu! Ramai DM tanya kan?! INI DIA!\n\n*shows product close-up*\n\nCantik kan?! Quality pun best! I pakai sendiri tau! Bukan tipu-tipu!"`,
        tips: "High energy! Smile! Make eye contact with camera!"
      },
      {
        phase: "Product Demo (2-3 minutes)",
        script: `"Okay now I show you properly!\n\n*demonstrates product*\n\nTengok! *shows feature 1* Ni best sebab... [explain benefit]\n\n*shows feature 2* And then ni pulak... [explain benefit]\n\nKalau korang beli kat kedai luar, at least RM XX++ kan?! I check dah! Shopee pun RM YY!\n\nBUT TONIGHT, special untuk live viewers je - RM ${pricePoint} JE! CONFIRM MURAH!\n\n*pause for effect*\n\nStok ada ${stockCount} pieces je tau! Yang slow nanti takde dah! I warning dulu okay!"`,
        tips: "Show, don't just tell. Use the product actively!"
      },
      {
        phase: "Urgency Build (1-2 minutes)",
        script: `"Okay okay, I tengok chat... Ramai tanya 'betul ke murah?!' \n\nYES BETUL! I takde tipu! Korang boleh check sendiri harga luar!\n\nTapi ni LIVE PRICE je! After live, balik normal price!\n\n*checks stock*\n\nEh! Stok dah tinggal ${Math.floor(stockCount * 0.6)} je! Serious!\n\nYANG NAK, COMMENT 'SEND' SEKARANG! Cepat! Nanti habis!\n\n1... 2... 3... YANG DAH DAPAT SCREENSHOT! Jangan delete ye!\n\nI process satu-satu! CEPAT GUYS! Time is running!"`,
        tips: "Create FOMO! Count down stock! Quick pace!"
      },
      {
        phase: "Social Proof (1 minute)",
        script: `"Okay jap, I nak show korang something!\n\n*shows reviews/previous customers*\n\nTengok! Customer semalam beli, semua happy! Ada yang repeat order lagi!\n\nNi bukan first time I jual okay! Dah berapa ratus orang beli!\n\nKorang boleh check my page, all reviews good! 5 stars!\n\n*shows comment*\n\nTengok ni! 'Fast delivery, quality best!' \n\nI jaga customer okay! Serious! Kalau ada problem, you boleh Whatsapp I terus!"`,
        tips: "Build trust! Show evidence! Read positive comments aloud!"
      },
      {
        phase: "Final Push (Last 2 minutes)",
        script: `"OKAY FINAL CALL NI!\n\nStok tinggal ${Math.floor(stockCount * 0.2)} je dah! After this HABIS!\n\nYang belum comment 'SEND', NOW IS THE TIME!\n\nRM ${pricePoint} je! With FREE SHIPPING okay! No hidden charges!\n\nBayar COD pun boleh! Bank transfer pun boleh! Semua boleh!\n\n*urgency intensifies*\n\n10... 9... 8... CEPAT GUYS!\n\nYANG NAK LAST MINUTE, COMMENT NOW!\n\n3... 2... 1... OKAY STOP!\n\n*dramatic pause*\n\nHABIS DAH! SOLD OUT! Yang dapat, CONGRATULATIONS! I process sekarang!\n\nYang terlepas, next live okay! I restock soon! Follow my page!\n\nTHANK YOU SEMUA! BYE BYE! 👋"`,
        tips: "Maximum urgency! Fast talking! Celebrate those who got it!"
      }
    ];

    return {
      product: product,
      pricePoint: `RM ${pricePoint}`,
      stockCount: stockCount,
      fullScript: scripts,
      proTips: [
        "🎯 Start strong - First 3 seconds decide if viewers stay",
        "💬 Read chat actively - Call out usernames to build connection",
        "⏰ Create mini-urgency cycles every 2-3 mins (stock updates)",
        "📸 Show product from ALL angles - viewers can't touch it",
        "🎁 Use 'bonuses' - 'First 10 buyers dapat free gift!'",
        "💰 Compare prices - Show Shopee/Lazada screenshots",
        "📱 Have assistant moderate chat & take screenshots of buyers",
        "🔄 Repeat key points - Price, stock, benefits every 2 mins",
        "👥 Encourage tagging friends - 'Tag kawan yang nak!'",
        "⭐ End with restock promise - 'Next week I bawak lagi!'"
      ],
      dontDo: [
        "❌ Don't be too scripted - sound natural!",
        "❌ Don't ignore chat - engagement is key!",
        "❌ Don't lie about stock - builds distrust",
        "❌ Don't forget to smile - energy is contagious!",
        "❌ Don't go too fast on payment instructions"
      ]
    };
  },

  /**
   * 10. Malaysian SEO Translator - Search intent localizer
   */
  malaysianSEO: (keyword) => {
    const seoDatabase = {
      "best phone": {
        international: "best phone",
        malaysian: "hp murah terbaik malaysia",
        searchVolume: "22,000/mo",
        competition: "High",
        cpc: "RM 1.20",
        alternatives: [
          { keyword: "phone murah bawah 1000", volume: "18,500/mo", difficulty: "Medium" },
          { keyword: "smartphone terbaik 2025", volume: "15,200/mo", difficulty: "High" },
          { keyword: "hp gaming murah", volume: "12,800/mo", difficulty: "Medium" }
        ],
        userIntent: "Transactional - Ready to buy",
        keyFeatures: ["Price-conscious", "Value seekers", "Compare before buying"]
      },
      "cheap laptop": {
        international: "cheap laptop",
        malaysian: "laptop murah bawah 2000",
        searchVolume: "18,500/mo",
        competition: "Medium",
        cpc: "RM 0.95",
        alternatives: [
          { keyword: "laptop gaming murah malaysia", volume: "14,200/mo", difficulty: "Medium-High" },
          { keyword: "laptop student budget", volume: "11,800/mo", difficulty: "Low-Medium" },
          { keyword: "laptop second hand murah", volume: "9,500/mo", difficulty: "Low" }
        ],
        userIntent: "Transactional - Shopping mode",
        keyFeatures: ["Budget-focused", "Students/entry-level workers", "Specific price thresholds matter"]
      },
      "food delivery": {
        international: "food delivery",
        malaysian: "food delivery murah near me",
        searchVolume: "45,000/mo",
        competition: "Very High",
        cpc: "RM 2.50",
        alternatives: [
          { keyword: "delivery makanan murah", volume: "28,000/mo", difficulty: "Very High" },
          { keyword: "food delivery promo malaysia", volume: "22,500/mo", difficulty: "High" },
          { keyword: "nasi lemak delivery near me", volume: "18,200/mo", difficulty: "Medium" }
        ],
        userIntent: "Transactional - Immediate need",
        keyFeatures: ["Location-based", "Promo-driven", "Quick decision makers"]
      },
      "best restaurant": {
        international: "best restaurant",
        malaysian: "restoran sedap near me",
        searchVolume: "35,000/mo",
        competition: "High",
        cpc: "RM 1.80",
        alternatives: [
          { keyword: "tempat makan best kl", volume: "24,500/mo", difficulty: "High" },
          { keyword: "restoran halal murah", volume: "19,200/mo", difficulty: "Medium" },
          { keyword: "makan mana best", volume: "16,800/mo", difficulty: "Medium" }
        ],
        userIntent: "Informational → Transactional",
        keyFeatures: ["Reviews matter", "Halal is default consideration", "Price range filters common"]
      },
      "car insurance": {
        international: "car insurance",
        malaysian: "insurans kereta murah",
        searchVolume: "28,000/mo",
        competition: "Very High",
        cpc: "RM 4.50",
        alternatives: [
          { keyword: "renew roadtax online", volume: "42,000/mo", difficulty: "Very High" },
          { keyword: "compare car insurance malaysia", volume: "15,500/mo", difficulty: "High" },
          { keyword: "insurance kereta termurah", volume: "12,200/mo", difficulty: "Medium-High" }
        ],
        userIntent: "Transactional - Renewal time",
        keyFeatures: ["Price comparison critical", "Annual renewal cycle", "Government-regulated"]
      },
      "weight loss": {
        international: "weight loss",
        malaysian: "kurus cepat dalam sebulan",
        searchVolume: "32,000/mo",
        competition: "Very High",
        cpc: "RM 2.80",
        alternatives: [
          { keyword: "cara nak kurus", volume: "28,500/mo", difficulty: "Very High" },
          { keyword: "diet sihat malaysia", volume: "18,200/mo", difficulty: "High" },
          { keyword: "turun berat badan cepat", volume: "15,800/mo", difficulty: "High" }
        ],
        userIntent: "Informational → Commercial",
        keyFeatures: ["Quick results emphasis", "Mix of BM and English searches", "Testimonial-driven"]
      }
    };

    const lowerKeyword = keyword.toLowerCase();
    
    if (seoDatabase[lowerKeyword]) {
      return seoDatabase[lowerKeyword];
    }

    // Generate plausible data for unknown keywords
    return {
      international: keyword,
      malaysian: `${keyword} malaysia murah`,
      searchVolume: `${Math.floor(Math.random() * 20000) + 5000}/mo`,
      competition: ["Low", "Medium", "High", "Very High"][Math.floor(Math.random() * 4)],
      cpc: `RM ${(Math.random() * 3 + 0.5).toFixed(2)}`,
      alternatives: [
        { keyword: `${keyword} murah`, volume: `${Math.floor(Math.random() * 15000) + 3000}/mo`, difficulty: "Medium" },
        { keyword: `${keyword} terbaik malaysia`, volume: `${Math.floor(Math.random() * 12000) + 2500}/mo`, difficulty: "High" },
        { keyword: `cara ${keyword}`, volume: `${Math.floor(Math.random() * 10000) + 2000}/mo`, difficulty: "Medium" }
      ],
      userIntent: "Mixed",
      keyFeatures: ["Malaysian market context", "Price-conscious", "Local preferences matter"]
    };
  },

  // ===================================
  // MAKCIK APPROVAL LAYER (5 Tools)
  // ===================================

  /**
   * 11. JAKIM Guardian - Halal compliance
   */
  jakimGuardian: (content, productType = "food") => {
    const complianceChecks = {
      ingredients: {
        status: "pass",
        flagged: [],
        warnings: [],
        message: "No prohibited ingredients detected"
      },
      imagery: {
        status: "pass",
        flagged: [],
        warnings: [],
        message: "Visual content compliant"
      },
      language: {
        status: "pass",
        flagged: [],
        warnings: [],
        message: "Terminology appropriate"
      },
      certification: {
        status: "recommendation",
        message: productType === "food" 
          ? "JAKIM halal certification recommended for F&B products" 
          : "Islamic finance certification available if applicable"
      }
    };

    // Check for common issues
    const prohibitedTerms = ["pork", "bacon", "ham", "lard", "alcohol", "beer", "wine", "rum"];
    const contentLower = content.toLowerCase();
    
    prohibitedTerms.forEach(term => {
      if (contentLower.includes(term)) {
        complianceChecks.ingredients.flagged.push(term);
        complianceChecks.ingredients.status = "fail";
        complianceChecks.ingredients.message = "Prohibited ingredients detected - Remove before publishing";
      }
    });

    // Check for ambiguous terms
    const ambiguousTerms = ["gelatin", "glycerin", "shortening", "emulsifier", "flavoring"];
    ambiguousTerms.forEach(term => {
      if (contentLower.includes(term)) {
        complianceChecks.ingredients.warnings.push(term);
        if (complianceChecks.ingredients.status === "pass") {
          complianceChecks.ingredients.status = "warning";
          complianceChecks.ingredients.message = "Ambiguous ingredients - Verify halal status";
        }
      }
    });

    return {
      overallScore: complianceChecks.ingredients.status === "fail" ? 0 : 
                    complianceChecks.ingredients.status === "warning" ? 75 : 95,
      complianceStatus: complianceChecks.ingredients.status === "fail" ? "REJECTED" :
                        complianceChecks.ingredients.status === "warning" ? "REVIEW NEEDED" : "APPROVED",
      checks: complianceChecks,
      recommendations: [
        "Apply for JAKIM halal certification for F&B products",
        "Display halal logo prominently on packaging",
        "Maintain halal supply chain documentation",
        "Regular audits and compliance checks"
      ],
      jakimResources: {
        application: "http://www.halal.gov.my",
        guidelines: "JAKIM Halal Certification Manual",
        contact: "halal@islam.gov.my",
        timeline: "3-6 months for certification process"
      }
    };
  },

  /**
   * 12. MCMC SafePost - Legal compliance
   */
  mcmcSafePost: (content) => {
    const violations = [];
    const warnings = [];
    const contentLower = content.toLowerCase();

    // Check for prohibited content
    const prohibitedCategories = [
      {
        category: "Defamation/Sedition",
        keywords: ["overthrow government", "racial slurs", "religious insults"],
        severity: "critical"
      },
      {
        category: "Fake News",
        keywords: ["cure covid", "government conspiracy", "fake scandal"],
        severity: "high"
      },
      {
        category: "Gambling/Lottery",
        keywords: ["online casino", "betting", "lottery jackpot"],
        severity: "medium"
      },
      {
        category: "Explicit Content",
        keywords: ["nudity", "explicit_material", "mature_content"],
        severity: "high"
      }
    ];

    prohibitedCategories.forEach(cat => {
      cat.keywords.forEach(keyword => {
        if (contentLower.includes(keyword)) {
          violations.push({
            category: cat.category,
            keyword: keyword,
            severity: cat.severity,
            penalty: cat.severity === "critical" ? "Legal action possible" : "Content removal required"
          });
        }
      });
    });

    // Check for warnings
    const warningKeywords = [
      { term: "guaranteed returns", issue: "May violate financial advertising rules" },
      { term: "miracle cure", issue: "Health claims require MOH approval" },
      { term: "limited offer", issue: "Ensure transparency on actual limitation" },
      { term: "comparison with competitor", issue: "Ensure claims are substantiated" }
    ];

    warningKeywords.forEach(item => {
      if (contentLower.includes(item.term)) {
        warnings.push(item);
      }
    });

    const riskScore = violations.length === 0 ? 
                     (warnings.length === 0 ? 95 : 70) : 
                     (violations.some(v => v.severity === "critical") ? 10 : 40);

    return {
      riskScore: riskScore,
      status: riskScore >= 80 ? "SAFE TO POST" : 
              riskScore >= 60 ? "REVIEW RECOMMENDED" : "HIGH RISK - DO NOT POST",
      violations: violations,
      warnings: warnings,
      legalReferences: [
        "Communications and Multimedia Act 1998 (CMA)",
        "Penal Code - Section 499 (Defamation)",
        "Sedition Act 1948",
        "Personal Data Protection Act 2010 (PDPA)"
      ],
      recommendations: violations.length > 0 ? [
        "Remove all flagged content before publishing",
        "Consult legal counsel if uncertain",
        "Review MCMC content guidelines"
      ] : [
        "Content appears compliant with MCMC regulations",
        "Monitor engagement for any unforeseen issues",
        "Keep records of content for compliance purposes"
      ]
    };
  },

  /**
   * 13. Sensitivity Checker - Cultural appropriateness
   */
  sensitivityChecker: (content, targetAudience = "all") => {
    const ethnicGroups = ["Malay", "Chinese", "Indian", "Indigenous"];
    const sensitivities = [];
    const contentLower = content.toLowerCase();

    // Check for cultural insensitivity
    const sensitiveTopics = [
      { topic: "Religion", keywords: ["convert", "false god", "backward religion"], severity: "critical" },
      { topic: "Race", keywords: ["lazy race", "greedy community", "inferior"], severity: "critical" },
      { topic: "Politics", keywords: ["corrupt government", "useless minister"], severity: "high" },
      { topic: "Royalty", keywords: ["stupid sultan", "useless king"], severity: "critical" },
      { topic: "Cultural Practices", keywords: ["weird tradition", "backward custom"], severity: "high" }
    ];

    sensitiveTopics.forEach(item => {
      item.keywords.forEach(keyword => {
        if (contentLower.includes(keyword)) {
          sensitivities.push({
            topic: item.topic,
            keyword: keyword,
            severity: item.severity,
            affectedGroups: targetAudience === "all" ? ethnicGroups : [targetAudience]
          });
        }
      });
    });

    // Check for positive multicultural elements
    const positiveElements = [
      "unity", "diversity", "harmony", "together", "all malaysians", 
      "1malaysia", "muhibbah", "gotong-royong"
    ];

    const positiveCount = positiveElements.filter(elem => 
      contentLower.includes(elem)
    ).length;

    const approvalScore = sensitivities.length === 0 ? 
                         (positiveCount > 0 ? 98 : 92) :
                         (sensitivities.some(s => s.severity === "critical") ? 20 : 60);

    return {
      approvalScore: approvalScore,
      status: approvalScore >= 90 ? "CULTURALLY APPROPRIATE" :
              approvalScore >= 70 ? "MINOR CONCERNS" : "MAJOR ISSUES DETECTED",
      sensitivities: sensitivities,
      positiveElements: positiveCount,
      ethnicGroupApproval: {
        Malay: approvalScore - (Math.random() * 5),
        Chinese: approvalScore - (Math.random() * 5),
        Indian: approvalScore - (Math.random() * 5),
        Indigenous: approvalScore - (Math.random() * 5)
      },
      recommendations: sensitivities.length === 0 ? [
        "Content shows cultural awareness",
        "Good use of inclusive language",
        "Consider adding local cultural references to strengthen connection"
      ] : [
        "Remove all culturally insensitive content",
        "Consult with cultural advisors from affected communities",
        "Reframe messaging to be inclusive and respectful",
        "Consider impact on Malaysia's multicultural society"
      ],
      culturalTips: [
        "Use 'Selamat' greetings across festivals (Selamat Hari Raya, Gong Xi Fa Cai, Deepavali Vazhthukkal)",
        "Avoid assumptions about race-religion correlation",
        "Respect sensitivities around pork (Muslims) and beef (some Hindus)",
        "Use inclusive visuals representing Malaysia's diversity",
        "Be mindful of religious holidays when scheduling campaigns"
      ]
    };
  },

  /**
   * 14. Ringgit Psychology - Pricing optimizer
   */
  ringgitPsychology: (price) => {
    const originalPrice = parseFloat(price);
    
    const strategies = [
      {
        name: "Charm Pricing (.90 ending)",
        optimized: Math.floor(originalPrice) - 0.10,
        reasoning: "Malaysian consumers perceive .90 prices as significantly lower",
        expectedLift: "+12-18% conversion",
        psychology: "Left-digit effect - RM 99.90 feels closer to RM 90 than RM 100"
      },
      {
        name: "Precision Pricing (.95 ending)",
        optimized: Math.floor(originalPrice) - 0.05,
        reasoning: "Creates perception of calculated, fair pricing",
        expectedLift: "+8-12% conversion",
        psychology: "Implies seller carefully considered the price (not arbitrary)"
      },
      {
        name: "Prestige Pricing (Round numbers)",
        optimized: Math.round(originalPrice / 10) * 10,
        reasoning: "Round numbers signal premium quality",
        expectedLift: "+5-8% for luxury items",
        psychology: "RM 150 feels more premium than RM 149.90 for high-end products"
      },
      {
        name: "Bundle Barrier (.99 ending)",
        optimized: Math.floor(originalPrice) - 0.01,
        reasoning: "Just below psychological barrier (e.g., RM 99.99 vs RM 100)",
        expectedLift: "+15-20% conversion",
        psychology: "Stays in lower price bracket in consumer's mind"
      }
    ];

    // Determine best strategy based on price range
    let recommendedStrategy;
    if (originalPrice >= 100) {
      recommendedStrategy = strategies[3]; // Bundle Barrier
    } else if (originalPrice >= 50) {
      recommendedStrategy = strategies[0]; // Charm Pricing
    } else {
      recommendedStrategy = strategies[1]; // Precision Pricing
    }

    return {
      originalPrice: `RM ${originalPrice.toFixed(2)}`,
      recommendedPrice: `RM ${recommendedStrategy.optimized.toFixed(2)}`,
      bestStrategy: recommendedStrategy,
      allStrategies: strategies,
      comparativeAnalysis: {
        savings: `RM ${(originalPrice - recommendedStrategy.optimized).toFixed(2)}`,
        percentageReduction: `${(((originalPrice - recommendedStrategy.optimized) / originalPrice) * 100).toFixed(1)}%`,
        customerPerception: recommendedStrategy.optimized < originalPrice - 1 
          ? "Significant savings" 
          : "Marginal adjustment with psychological impact"
      },
      competitorBenchmark: {
        averageMarketPrice: `RM ${(originalPrice * (0.9 + Math.random() * 0.2)).toFixed(2)}`,
        yourPosition: "Competitive",
        recommendation: "Price is within market range - focus on value communication"
      },
      culturalContext: [
        "Malaysians love '8' in prices (prosperity) - Consider RM X8.88",
        "Avoid '4' when possible (unlucky in Chinese culture)",
        "Ramadan/CNY: Consumers expect special pricing (bundle deals work well)",
        "Use 'RM X.90' for groceries/daily items, round numbers for luxury"
      ],
      abTestSuggestion: {
        variant_a: `RM ${recommendedStrategy.optimized.toFixed(2)}`,
        variant_b: `RM ${originalPrice.toFixed(2)}`,
        duration: "14 days",
        metric: "Conversion rate + Average Order Value"
      }
    };
  },

  /**
   * 15. MyInfluencer Rate Card - Influencer pricing
   */
  myInfluencerRateCard: (followerCount) => {
    let category, rateData;

    if (followerCount < 5000) {
      category = "Nano";
      rateData = {
        range: "< 5K",
        igPost: "RM 50-200",
        igStory: "RM 30-100",
        igReel: "RM 80-250",
        tiktok: "RM 100-300",
        facebook: "RM 40-150",
        engagement: "12-20%",
        trustScore: 9.2,
        pros: ["Highly engaged niche audience", "Authentic voice", "Budget-friendly"],
        cons: ["Limited reach", "May lack professional equipment"]
      };
    } else if (followerCount < 50000) {
      category = "Micro";
      rateData = {
        range: "5K-50K",
        igPost: "RM 200-800",
        igStory: "RM 100-400",
        igReel: "RM 250-1000",
        tiktok: "RM 300-1200",
        facebook: "RM 150-600",
        engagement: "8-15%",
        trustScore: 8.5,
        pros: ["Niche expertise", "High engagement", "Authentic reviews"],
        cons: ["Smaller reach than macro", "May have less experience"]
      };
    } else if (followerCount < 200000) {
      category = "Mid-Tier";
      rateData = {
        range: "50K-200K",
        igPost: "RM 800-3000",
        igStory: "RM 400-1500",
        igReel: "RM 1000-4000",
        tiktok: "RM 1200-5000",
        facebook: "RM 600-2500",
        engagement: "4-8%",
        trustScore: 7.8,
        pros: ["Good reach + credibility balance", "Professional content", "Proven track record"],
        cons: ["Higher rates", "May have exclusivity clauses"]
      };
    } else if (followerCount < 1000000) {
      category = "Macro";
      rateData = {
        range: "200K-1M",
        igPost: "RM 3000-15000",
        igStory: "RM 1500-7000",
        igReel: "RM 4000-20000",
        tiktok: "RM 5000-25000",
        facebook: "RM 2500-12000",
        engagement: "2-5%",
        trustScore: 7.2,
        pros: ["Wide reach", "Brand awareness", "Celebrity status in niche"],
        cons: ["Expensive", "Lower engagement %", "Long booking lead time"]
      };
    } else {
      category = "Mega";
      rateData = {
        range: "1M+",
        igPost: "RM 15000-80000+",
        igStory: "RM 7000-40000+",
        igReel: "RM 20000-100000+",
        tiktok: "RM 25000-150000+",
        facebook: "RM 12000-60000+",
        engagement: "1-3%",
        trustScore: 6.5,
        pros: ["Maximum reach", "Mainstream visibility", "Celebrity endorsement"],
        cons: ["Very expensive", "Lowest engagement %", "May dilute brand message"]
      };
    }

    return {
      influencerCategory: category,
      followerRange: rateData.range,
      rateCard: {
        instagram: {
          post: rateData.igPost,
          story: rateData.igStory,
          reel: rateData.igReel
        },
        tiktok: {
          video: rateData.tiktok
        },
        facebook: {
          post: rateData.facebook
        }
      },
      metrics: {
        engagementRate: rateData.engagement,
        trustScore: `${rateData.trustScore}/10`,
        averageReach: `${(followerCount * 0.15).toLocaleString()} - ${(followerCount * 0.45).toLocaleString()}`
      },
      prosAndCons: {
        pros: rateData.pros,
        cons: rateData.cons
      },
      recommendations: category === "Nano" || category === "Micro" ? [
        "Best for niche products and authentic reviews",
        "Great for building brand credibility",
        "Cost-effective for testing campaigns",
        "Higher ROI due to engaged audience"
      ] : category === "Mid-Tier" ? [
        "Ideal for brand awareness campaigns",
        "Good balance of reach and engagement",
        "Professional content quality",
        "Suitable for product launches"
      ] : [
        "Use for major campaigns and product launches",
        "Expect longer negotiation and booking periods",
        "Focus on reach over engagement",
        "Combine with micro-influencers for better ROI"
      ],
      negotiationTips: [
        "Bundle multiple posts for better rates (3-post package discount)",
        "Offer product barter for nano/micro influencers",
        "Request analytics reports in contract",
        "Include content usage rights in negotiation",
        "Set clear KPIs (engagement rate, clicks, conversions)",
        "Ask for past campaign performance data"
      ],
      redFlags: [
        "🚩 Engagement rate < 2% for micro influencers (likely fake followers)",
        "🚩 Comments full of emojis and generic praise (bot activity)",
        "🚩 Follower spike then drop pattern (bought followers)",
        "🚩 No audience demographics data available",
        "🚩 Unwilling to share past campaign results"
      ],
      topMalaysianInfluencerCategories: [
        { niche: "Beauty & Skincare", avgFollowers: "50K-500K", topRate: "RM 5K-25K" },
        { niche: "Food & Lifestyle", avgFollowers: "30K-300K", topRate: "RM 3K-15K" },
        { niche: "Fashion", avgFollowers: "40K-400K", topRate: "RM 4K-20K" },
        { niche: "Tech & Gadgets", avgFollowers: "20K-150K", topRate: "RM 2K-10K" },
        { niche: "Parenting", avgFollowers: "25K-200K", topRate: "RM 2.5K-12K" }
      ]
    };
  }
};

export default mockDataEngine;
