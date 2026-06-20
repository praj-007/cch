import type {
  Badge,
  CaseStudy,
  ForumPost,
  LeaderboardEntry,
  RubricItem,
  Team,
  TeamMember,
  User,
} from "@/types";

export const currentUser: User = {
  id: "u1",
  name: "Arjun Patel",
  college: "IIM Delhi",
  program: "MBA (2nd Year)",
  points: 2840,
  streak: 12,
  casesCompleted: 18,
  rank: 7,
  isPracticeCertified: false,
  badges: [
    {
      id: "b1",
      name: "First Case",
      description: "Completed your first mock case",
      icon: "🎯",
      earnedAt: "2026-05-10",
    },
    {
      id: "b2",
      name: "7-Day Streak",
      description: "Practiced 7 days in a row",
      icon: "🔥",
      earnedAt: "2026-05-20",
    },
    {
      id: "b3",
      name: "Team Player",
      description: "Completed 3 team practice sessions",
      icon: "🤝",
      earnedAt: "2026-06-01",
    },
  ],
};

export const allBadges: Badge[] = [
  ...currentUser.badges,
  {
    id: "b4",
    name: "Strategy Master",
    description: "Complete 5 strategy cases with 4+ rating",
    icon: "♟️",
  },
  {
    id: "b5",
    name: "Practice Certified",
    description: "Complete 20 cases with good peer ratings",
    icon: "✅",
  },
  {
    id: "b6",
    name: "Top 10",
    description: "Reach top 10 on national leaderboard",
    icon: "🏆",
  },
];

export const cases: CaseStudy[] = [
  {
    id: "c1",
    title: "Market Entry Strategy for D2C Skincare Brand",
    company: "GlowNest India",
    domain: "Strategy",
    difficulty: "Intermediate",
    duration: 90,
    tags: ["market-entry", "consumer", "D2C"],
    isCaseOfTheWeek: true,
    problemStatement:
      "GlowNest, a premium D2C skincare brand, is considering expansion into Tier-2 cities. With limited marketing budget and strong competition from established players, recommend a go-to-market strategy for the next 18 months.",
    frameworks: ["Porter's Five Forces", "STP", "4Ps", "BCG Matrix"],
    keyQuestions: [
      "Which Tier-2 cities should GlowNest prioritize?",
      "What channel mix maximizes ROI?",
      "How should pricing differ from metro markets?",
    ],
    modelSolutionSummary:
      "Prioritize 3 cities based on disposable income and digital penetration. Use influencer-led D2C with selective offline partnerships. Premium positioning with localized bundles.",
    hasVideoWalkthrough: true,
  },
  {
    id: "c2",
    title: "Supply Chain Optimization for FMCG Distributor",
    company: "BharatFresh Logistics",
    domain: "Operations",
    difficulty: "Advanced",
    duration: 120,
    tags: ["supply-chain", "logistics", "cost-reduction"],
    problemStatement:
      "BharatFresh faces 18% higher logistics costs than industry average due to fragmented warehouse network. Design a supply chain restructuring plan to reduce costs by 10% within 12 months.",
    frameworks: ["Value Chain Analysis", "Network Optimization", "Cost-Benefit Analysis"],
    keyQuestions: [
      "Which warehouses should be consolidated?",
      "What is the optimal hub-and-spoke model?",
      "How to manage transition without service disruption?",
    ],
    modelSolutionSummary:
      "Consolidate from 12 to 7 regional hubs. Implement cross-docking for fast-moving SKUs. Phase rollout over 3 quarters with KPI tracking.",
    hasVideoWalkthrough: true,
  },
  {
    id: "c3",
    title: "Brand Repositioning for Legacy Textile Company",
    company: "WeaveCraft Ltd",
    domain: "Marketing",
    difficulty: "Intermediate",
    duration: 90,
    tags: ["branding", "repositioning", "B2C"],
    problemStatement:
      "WeaveCraft, a 40-year-old textile brand, is losing market share to fast-fashion players among millennials. Develop a brand repositioning strategy to appeal to Gen Z while retaining loyal customers.",
    frameworks: ["Brand Positioning Map", "Customer Journey", "Perceptual Mapping"],
    keyQuestions: [
      "What brand identity resonates with Gen Z?",
      "How to bridge old and new customer segments?",
      "What marketing channels drive awareness?",
    ],
    modelSolutionSummary:
      "Dual-brand approach: heritage line for loyalists, sub-brand 'WeaveCraft Studio' for Gen Z with sustainability focus and social-first campaigns.",
    hasVideoWalkthrough: true,
  },
  {
    id: "c4",
    title: "Valuation of EdTech Startup for Series B",
    company: "LearnSphere",
    domain: "Finance",
    difficulty: "Advanced",
    duration: 120,
    tags: ["valuation", "EdTech", "investment"],
    problemStatement:
      "LearnSphere, a B2B EdTech platform, is raising Series B. With ₹45Cr ARR growing at 80% YoY but negative EBITDA, determine a fair valuation range and recommend deal structure.",
    frameworks: ["DCF", "Comparable Company Analysis", "Unit Economics"],
    keyQuestions: [
      "What valuation range is justified?",
      "What are the key value drivers and risks?",
      "Preferred vs common equity structure?",
    ],
    modelSolutionSummary:
      "Valuation range ₹350-450Cr using revenue multiples of 7-10x. Recommend milestone-based tranches tied to enterprise customer acquisition.",
    hasVideoWalkthrough: true,
  },
  {
    id: "c5",
    title: "Customer Churn Reduction for SaaS Platform",
    company: "CloudDesk Pro",
    domain: "Analytics",
    difficulty: "Intermediate",
    duration: 90,
    tags: ["churn", "SaaS", "data-analytics"],
    problemStatement:
      "CloudDesk Pro has 8% monthly churn, above the 4% industry benchmark. Using provided customer data, identify churn drivers and propose an intervention plan.",
    frameworks: ["Cohort Analysis", "RFM Segmentation", "A/B Testing Framework"],
    keyQuestions: [
      "Which customer segments churn most?",
      "What are leading indicators of churn?",
      "What interventions have highest ROI?",
    ],
    modelSolutionSummary:
      "SMB segment drives 70% of churn. Implement proactive onboarding, usage-based alerts, and dedicated success manager for accounts below engagement threshold.",
    hasVideoWalkthrough: true,
  },
  {
    id: "c6",
    title: "Turnaround Strategy for Regional Bank",
    company: "Punjab Heritage Bank",
    domain: "Strategy",
    difficulty: "Advanced",
    duration: 120,
    tags: ["turnaround", "banking", "regulatory"],
    problemStatement:
      "Punjab Heritage Bank faces declining deposits and rising NPAs. RBI has issued a warning. Develop a 3-year turnaround plan balancing growth and risk management.",
    frameworks: ["SWOT", "Porter's Five Forces", "Risk-Return Framework"],
    keyQuestions: [
      "Which business lines to retain vs exit?",
      "How to improve asset quality?",
      "What digital investments are essential?",
    ],
    modelSolutionSummary:
      "Exit low-margin corporate lending, focus on retail and MSME. Aggressive NPA recovery with digital collections. Invest in mobile-first banking.",
    hasVideoWalkthrough: true,
  },
  {
    id: "c7",
    title: "Product Launch for Plant-Based Protein",
    company: "GreenBite Foods",
    domain: "Marketing",
    difficulty: "Beginner",
    duration: 45,
    tags: ["product-launch", "FMCG", "health"],
    problemStatement:
      "GreenBite is launching India's first affordable plant-based protein bar. Define target segment, positioning, and launch campaign for Delhi-NCR.",
    frameworks: ["STP", "4Ps", "AIDA Model"],
    keyQuestions: [
      "Who is the primary target consumer?",
      "What price point maximizes adoption?",
      "Which channels for launch?",
    ],
    modelSolutionSummary:
      "Target health-conscious urban professionals 25-35. Price at ₹89. Launch via gyms, Instagram influencers, and modern trade.",
    hasVideoWalkthrough: true,
  },
  {
    id: "c8",
    title: "Warehouse Automation ROI Analysis",
    company: "QuickShip E-commerce",
    domain: "Operations",
    difficulty: "Intermediate",
    duration: 90,
    tags: ["automation", "ROI", "e-commerce"],
    problemStatement:
      "QuickShip is evaluating ₹12Cr investment in warehouse automation. Analyze ROI and recommend whether to proceed, including implementation timeline.",
    frameworks: ["NPV/IRR Analysis", "Break-even Analysis", "Process Mapping"],
    keyQuestions: [
      "What is the payback period?",
      "Which processes benefit most from automation?",
      "Build vs buy decision for automation tech?",
    ],
    modelSolutionSummary:
      "Positive NPV with 3.2-year payback. Prioritize picking and sorting automation. Partner with established vendor for phased deployment.",
    hasVideoWalkthrough: false,
  },
  {
    id: "c9",
    title: "M&A Integration for IT Services Firm",
    company: "TechBridge Solutions",
    domain: "Strategy",
    difficulty: "Advanced",
    duration: 120,
    tags: ["M&A", "integration", "IT-services"],
    problemStatement:
      "TechBridge acquired a 200-person niche AI consulting firm. Integration is behind schedule with cultural clashes and client attrition. Recommend integration roadmap.",
    frameworks: ["McKinsey 7S", "Integration Playbook", "Synergy Analysis"],
    keyQuestions: [
      "How to retain key talent?",
      "What is optimal organizational structure?",
      "How to prevent client churn?",
    ],
    modelSolutionSummary:
      "Retain AI firm brand for 18 months. Cross-sell to existing clients. Unified HR policies with preserved innovation culture in AI unit.",
    hasVideoWalkthrough: true,
  },
  {
    id: "c10",
    title: "Pricing Strategy for EV Charging Network",
    company: "ChargePoint India",
    domain: "Finance",
    difficulty: "Intermediate",
    duration: 90,
    tags: ["pricing", "EV", "infrastructure"],
    problemStatement:
      "ChargePoint operates 500 charging stations with utilization at 35%. Design a dynamic pricing model to increase utilization and revenue.",
    frameworks: ["Price Elasticity", "Yield Management", "Competitive Pricing"],
    keyQuestions: [
      "What pricing tiers maximize utilization?",
      "How to balance peak vs off-peak pricing?",
      "Subscription vs pay-per-use model?",
    ],
    modelSolutionSummary:
      "Introduce time-of-day pricing with 30% off-peak discount. Monthly subscription for fleet operators. Loyalty program for frequent users.",
    hasVideoWalkthrough: true,
  },
  {
    id: "c11",
    title: "Social Media Campaign for Tourism Board",
    company: "Rajasthan Tourism",
    domain: "Marketing",
    difficulty: "Beginner",
    duration: 45,
    tags: ["tourism", "digital-marketing", "campaign"],
    problemStatement:
      "Rajasthan Tourism wants to attract domestic millennial travelers post-pandemic. Design a social media campaign with measurable KPIs.",
    frameworks: ["AIDA", "Content Calendar", "KPI Framework"],
    keyQuestions: [
      "Which platforms to prioritize?",
      "What content themes resonate?",
      "How to measure campaign success?",
    ],
    modelSolutionSummary:
      "Instagram and YouTube focus with #RajasthanUnfiltered UGC campaign. Partner with travel micro-influencers. Target 50M impressions in 3 months.",
    hasVideoWalkthrough: false,
  },
  {
    id: "c12",
    title: "Inventory Management for Pharma Retail",
    company: "MediCare Pharmacy Chain",
    domain: "Operations",
    difficulty: "Intermediate",
    duration: 90,
    tags: ["inventory", "pharma", "retail"],
    problemStatement:
      "MediCare's 200-store chain faces ₹8Cr annual losses from expired inventory and stockouts. Optimize inventory management across the network.",
    frameworks: ["EOQ Model", "ABC Analysis", "Demand Forecasting"],
    keyQuestions: [
      "Which SKUs need centralized vs decentralized stocking?",
      "What reorder policies reduce waste?",
      "How to leverage data for forecasting?",
    ],
    modelSolutionSummary:
      "Central warehouse for slow-moving SKUs, store-level for fast-moving. Implement expiry-tracking system with automated markdowns 60 days before expiry.",
    hasVideoWalkthrough: true,
  },
  {
    id: "c13",
    title: "Market Sizing for Online Grocery",
    company: "FreshKart",
    domain: "Analytics",
    difficulty: "Beginner",
    duration: 45,
    tags: ["market-sizing", "grocery", "TAM"],
    problemStatement:
      "FreshKart is evaluating expansion to 5 new cities. Estimate the total addressable market for online grocery in each city and prioritize entry.",
    frameworks: ["Top-down/Bottom-up Sizing", "Market Segmentation"],
    keyQuestions: [
      "What is TAM for each city?",
      "Which cities offer best growth potential?",
      "What assumptions drive the model?",
    ],
    modelSolutionSummary:
      "Hyderabad and Pune offer highest growth with moderate competition. TAM estimates: Hyderabad ₹2,400Cr, Pune ₹1,800Cr by 2028.",
    hasVideoWalkthrough: true,
  },
  {
    id: "c14",
    title: "Competitive Response to New Market Entrant",
    company: "Dominant Telecom Ltd",
    domain: "Strategy",
    difficulty: "Intermediate",
    duration: 90,
    tags: ["competitive-strategy", "telecom", "pricing"],
    problemStatement:
      "A new telecom player is offering 30% lower prices in 3 circles. Dominant Telecom holds 45% market share. Recommend competitive response strategy.",
    frameworks: ["Game Theory", "Porter's Generic Strategies", "Scenario Planning"],
    keyQuestions: [
      "Should Dominant match pricing or differentiate?",
      "Which customer segments to defend?",
      "What is the long-term equilibrium?",
    ],
    modelSolutionSummary:
      "Selective price matching for mass market, premium retention through bundled OTT and loyalty. Invest in network quality as differentiator.",
    hasVideoWalkthrough: true,
  },
  {
    id: "c15",
    title: "Working Capital Optimization",
    company: "AutoParts Manufacturing Co",
    domain: "Finance",
    difficulty: "Intermediate",
    duration: 90,
    tags: ["working-capital", "manufacturing", "cash-flow"],
    problemStatement:
      "AutoParts has DSO of 75 days vs industry 45 days, tying up ₹50Cr in receivables. Propose working capital improvement plan.",
    frameworks: ["Cash Conversion Cycle", "Working Capital Analysis"],
    keyQuestions: [
      "What drives high DSO?",
      "Which levers improve cash conversion?",
      "Trade-offs with customer relationships?",
    ],
    modelSolutionSummary:
      "Early payment discounts (2/10 net 30), credit scoring for new customers, dedicated collections team. Target DSO reduction to 55 days in 6 months.",
    hasVideoWalkthrough: false,
  },
  {
    id: "c16",
    title: "CSR Strategy for Mining Company",
    company: "Himalaya Minerals",
    domain: "Strategy",
    difficulty: "Beginner",
    duration: 45,
    tags: ["CSR", "sustainability", "community"],
    problemStatement:
      "Himalaya Minerals faces community protests at a new mining site. Design a CSR strategy that ensures social license to operate.",
    frameworks: ["Stakeholder Mapping", "Triple Bottom Line"],
    keyQuestions: [
      "What are key stakeholder concerns?",
      "Which CSR initiatives create most impact?",
      "How to measure social ROI?",
    ],
    modelSolutionSummary:
      "Community employment program, local infrastructure investment, environmental monitoring transparency. Establish community advisory board.",
    hasVideoWalkthrough: true,
  },
  {
    id: "c17",
    title: "Loyalty Program Redesign for Airline",
    company: "SkyWings Airlines",
    domain: "Marketing",
    difficulty: "Intermediate",
    duration: 90,
    tags: ["loyalty", "aviation", "retention"],
    problemStatement:
      "SkyWings' loyalty program has 2M members but only 15% are active. Redesign the program to increase engagement and ancillary revenue.",
    frameworks: ["Customer Lifetime Value", "Gamification Framework"],
    keyQuestions: [
      "Why is engagement low?",
      "What rewards drive behavior?",
      "How to monetize through partners?",
    ],
    modelSolutionSummary:
      "Tiered program with experiential rewards. Partner with hotels and credit cards. Gamified challenges for frequent flyers.",
    hasVideoWalkthrough: true,
  },
  {
    id: "c18",
    title: "Data-Driven Sales Territory Planning",
    company: "PharmaCorp India",
    domain: "Analytics",
    difficulty: "Advanced",
    duration: 120,
    tags: ["sales", "territory-planning", "pharma"],
    problemStatement:
      "PharmaCorp's 500 medical reps have uneven territory allocation causing 20% productivity gap. Use data to optimize territory design.",
    frameworks: ["Cluster Analysis", "Sales Force Effectiveness", "Geospatial Analysis"],
    keyQuestions: [
      "How to define optimal territory size?",
      "Which metrics balance workload and opportunity?",
      "How to manage transition?",
    ],
    modelSolutionSummary:
      "Redesign territories using prescription volume and doctor density. Reduce rep count in over-covered areas, add in underserved zones.",
    hasVideoWalkthrough: true,
  },
  {
    id: "c19",
    title: "Make vs Buy for Cloud Infrastructure",
    company: "FinSecure Banking",
    domain: "Operations",
    difficulty: "Advanced",
    duration: 120,
    tags: ["cloud", "infrastructure", "fintech"],
    problemStatement:
      "FinSecure is deciding between building private cloud vs continuing with AWS. Analyze TCO and recommend approach for next 5 years.",
    frameworks: ["TCO Analysis", "Build vs Buy", "Risk Assessment"],
    keyQuestions: [
      "What is 5-year TCO for each option?",
      "What regulatory constraints apply?",
      "What hybrid approach is feasible?",
    ],
    modelSolutionSummary:
      "Hybrid model: core banking on private cloud, customer-facing apps on AWS. 5-year TCO savings of 15% vs full public cloud.",
    hasVideoWalkthrough: false,
  },
  {
    id: "c20",
    title: "International Expansion for IT Services",
    company: "CodeCraft Global",
    domain: "Strategy",
    difficulty: "Intermediate",
    duration: 90,
    tags: ["international", "IT-services", "expansion"],
    problemStatement:
      "CodeCraft wants to expand from India to Southeast Asia. Recommend market entry strategy for Vietnam and Philippines.",
    frameworks: ["CAGE Framework", "Market Entry Modes", "PESTEL"],
    keyQuestions: [
      "Which country to enter first?",
      "Greenfield vs acquisition?",
      "What talent strategy is needed?",
    ],
    modelSolutionSummary:
      "Enter Philippines first via acquisition of 50-person firm. Vietnam as year-2 greenfield. Focus on BPO and fintech verticals.",
    hasVideoWalkthrough: true,
  },
  {
    id: "c21",
    title: "Subscription Model for Newspaper",
    company: "The Daily Herald",
    domain: "Marketing",
    difficulty: "Beginner",
    duration: 45,
    tags: ["subscription", "media", "digital-transformation"],
    problemStatement:
      "The Daily Herald's print revenue is declining 12% annually. Design a digital subscription model to achieve profitability.",
    frameworks: ["Freemium Model", "Customer Acquisition Cost", "Churn Analysis"],
    keyQuestions: [
      "What content to gate vs free?",
      "What price point for Indian market?",
      "How to convert print readers?",
    ],
    modelSolutionSummary:
      "Freemium with 5 free articles/month. Premium at ₹199/month with podcasts and exclusives. Bundle with print for ₹299.",
    hasVideoWalkthrough: true,
  },
  {
    id: "c22",
    title: "Cost Reduction in Hospital Operations",
    company: "CityCare Hospitals",
    domain: "Operations",
    difficulty: "Intermediate",
    duration: 90,
    tags: ["healthcare", "cost-reduction", "operations"],
    problemStatement:
      "CityCare's operating costs grew 15% while revenue grew 8%. Identify cost reduction opportunities without compromising care quality.",
    frameworks: ["Activity-Based Costing", "Lean Healthcare", "Benchmarking"],
    keyQuestions: [
      "Where are the biggest cost drivers?",
      "What efficiency gains are achievable?",
      "How to maintain quality metrics?",
    ],
    modelSolutionSummary:
      "Optimize OR scheduling, centralize procurement, reduce average length of stay through care pathways. Target 8% cost reduction.",
    hasVideoWalkthrough: false,
  },
  {
    id: "c23",
    title: "IPO Readiness Assessment",
    company: "AgriTech Innovations",
    domain: "Finance",
    difficulty: "Advanced",
    duration: 120,
    tags: ["IPO", "AgriTech", "governance"],
    problemStatement:
      "AgriTech is considering IPO in 18 months. Assess readiness across financial, governance, and operational dimensions.",
    frameworks: ["IPO Readiness Checklist", "Governance Framework", "Financial Audit"],
    keyQuestions: [
      "What gaps exist in financial reporting?",
      "Is governance structure IPO-ready?",
      "What is realistic timeline?",
    ],
    modelSolutionSummary:
      "6-month gap in audit trail and board independence. Recommend 12-month preparation with Big 4 audit and independent directors.",
    hasVideoWalkthrough: true,
  },
  {
    id: "c24",
    title: "Predictive Maintenance for Manufacturing",
    company: "SteelWorks Industries",
    domain: "Analytics",
    difficulty: "Advanced",
    duration: 120,
    tags: ["predictive-maintenance", "IoT", "manufacturing"],
    problemStatement:
      "SteelWorks loses ₹3Cr annually to unplanned downtime. Design a predictive maintenance program using IoT sensor data.",
    frameworks: ["Predictive Analytics", "ROI Modeling", "Implementation Roadmap"],
    keyQuestions: [
      "Which equipment to prioritize?",
      "What data infrastructure is needed?",
      "Expected ROI and timeline?",
    ],
    modelSolutionSummary:
      "Start with critical furnaces and rolling mills. Deploy IoT sensors with ML-based anomaly detection. 18-month ROI of 250%.",
    hasVideoWalkthrough: true,
  },
  {
    id: "c25",
    title: "Franchise Model for Quick Service Restaurant",
    company: "SpiceBox QSR",
    domain: "Strategy",
    difficulty: "Beginner",
    duration: 45,
    tags: ["franchise", "QSR", "expansion"],
    problemStatement:
      "SpiceBox has 30 company-owned outlets and wants to scale via franchising. Design franchise model and expansion plan for North India.",
    frameworks: ["Franchise Economics", "Unit Economics", "Expansion Strategy"],
    keyQuestions: [
      "What franchise fee and royalty structure?",
      "What support does franchisee need?",
      "How many outlets in 3 years?",
    ],
    modelSolutionSummary:
      "₹15L franchise fee, 6% royalty. Centralized supply chain and training academy. Target 100 outlets in 3 years across NCR and Punjab.",
    hasVideoWalkthrough: true,
  },
];

export const availableMembers: TeamMember[] = [
  { id: "m1", name: "Priya Nair", college: "FMS Delhi", role: "Analyst", status: "available" },
  { id: "m2", name: "Rohan Gupta", college: "IIM Delhi", role: "Presenter", status: "available" },
  { id: "m3", name: "Sneha Reddy", college: "XLRI Jamshedpur", role: "Researcher", status: "available" },
  { id: "m4", name: "Vikram Singh", college: "MDI Gurgaon", role: "Lead", status: "available" },
  { id: "m5", name: "Ananya Joshi", college: "IIFT Delhi", role: "Analyst", status: "in-team" },
  { id: "m6", name: "Karthik Menon", college: "IIM Delhi", role: "Researcher", status: "available" },
];

export const openTeams: Team[] = [
  {
    id: "t1",
    name: "Case Crushers",
    college: "IIM Delhi",
    members: 3,
    maxMembers: 4,
    lookingFor: ["Presenter"],
    caseId: "c1",
  },
  {
    id: "t2",
    name: "Strategy Squad",
    college: "FMS Delhi",
    members: 2,
    maxMembers: 4,
    lookingFor: ["Analyst", "Researcher"],
    caseId: "c14",
  },
  {
    id: "t3",
    name: "The Consultants",
    college: "MDI Gurgaon",
    members: 3,
    maxMembers: 4,
    lookingFor: ["Lead"],
    caseId: "c9",
  },
];

export const forumPosts: ForumPost[] = [
  {
    id: "p1",
    author: "Sneha Kapoor",
    college: "XLRI Jamshedpur",
    title: "How to structure a 10-minute case presentation?",
    content:
      "I always struggle with fitting my analysis into the time limit. What framework do you use for structuring presentations?",
    type: "question",
    replies: 14,
    upvotes: 32,
    createdAt: "2026-06-18",
    tags: ["presentation", "tips"],
  },
  {
    id: "p2",
    author: "Rahul Mehra",
    college: "Industry Expert",
    title: "Case of the Week: GlowNest — Discussion Thread",
    content:
      "Share your approach to the GlowNest market entry case. What cities did you prioritize and why?",
    type: "discussion",
    replies: 28,
    upvotes: 45,
    createdAt: "2026-06-17",
    tags: ["case-of-the-week", "strategy"],
  },
  {
    id: "p3",
    author: "Arjun Patel",
    college: "IIM Delhi",
    title: "Best resources for Porter's Five Forces practice?",
    content:
      "Looking for good examples of Porter's Five Forces applied to Indian companies. Any recommendations?",
    type: "question",
    replies: 8,
    upvotes: 15,
    createdAt: "2026-06-15",
    tags: ["frameworks", "resources"],
  },
  {
    id: "p4",
    author: "Dr. Priya Sharma",
    college: "IIM Delhi",
    title: "Professor's Tip: Always start with the problem, not the framework",
    content:
      "Students often jump to frameworks before understanding the core problem. Spend first 15 minutes just understanding what the client really needs.",
    type: "discussion",
    replies: 22,
    upvotes: 67,
    createdAt: "2026-06-12",
    tags: ["professor-tips", "methodology"],
  },
  {
    id: "p5",
    author: "Vikram Rao",
    college: "HUL",
    title: "What recruiters look for in case competition winners",
    content:
      "Having judged 20+ competitions, here's what stands out: structured thinking, quantified recommendations, and confident Q&A handling.",
    type: "discussion",
    replies: 35,
    upvotes: 89,
    createdAt: "2026-06-10",
    tags: ["careers", "recruiting"],
  },
];

export const collegeLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Priya Nair", college: "FMS Delhi", points: 4200, casesCompleted: 28, streak: 21, badges: 5 },
  { rank: 2, name: "Rohan Gupta", college: "IIM Delhi", points: 3850, casesCompleted: 25, streak: 15, badges: 4 },
  { rank: 3, name: "Sneha Reddy", college: "XLRI Jamshedpur", points: 3620, casesCompleted: 22, streak: 18, badges: 4 },
  { rank: 4, name: "Karthik Menon", college: "IIM Delhi", points: 3100, casesCompleted: 20, streak: 10, badges: 3 },
  { rank: 5, name: "Ananya Joshi", college: "IIFT Delhi", points: 2950, casesCompleted: 19, streak: 8, badges: 3 },
  { rank: 6, name: "Vikram Singh", college: "MDI Gurgaon", points: 2900, casesCompleted: 18, streak: 14, badges: 3 },
  { rank: 7, name: "Arjun Patel", college: "IIM Delhi", points: 2840, casesCompleted: 18, streak: 12, badges: 3 },
  { rank: 8, name: "Meera Krishnan", college: "FMS Delhi", points: 2650, casesCompleted: 16, streak: 6, badges: 2 },
];

export const nationalLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Aditya Shah", college: "IIM Bangalore", points: 5100, casesCompleted: 32, streak: 25, badges: 6 },
  { rank: 2, name: "Neha Verma", college: "ISB Hyderabad", points: 4800, casesCompleted: 30, streak: 22, badges: 5 },
  { rank: 3, name: "Priya Nair", college: "FMS Delhi", points: 4200, casesCompleted: 28, streak: 21, badges: 5 },
  { rank: 4, name: "Rohan Gupta", college: "IIM Delhi", points: 3850, casesCompleted: 25, streak: 15, badges: 4 },
  { rank: 5, name: "Sneha Reddy", college: "XLRI Jamshedpur", points: 3620, casesCompleted: 22, streak: 18, badges: 4 },
  { rank: 6, name: "Karthik Menon", college: "IIM Delhi", points: 3100, casesCompleted: 20, streak: 10, badges: 3 },
  { rank: 7, name: "Arjun Patel", college: "IIM Delhi", points: 2840, casesCompleted: 18, streak: 12, badges: 3 },
];

export const selfAssessmentRubric: RubricItem[] = [
  { id: "r1", criterion: "Problem Understanding", description: "Did you correctly identify the core problem and constraints?" },
  { id: "r2", criterion: "Framework Application", description: "Did you apply relevant frameworks appropriately?" },
  { id: "r3", criterion: "Analysis Depth", description: "Was your analysis thorough with supporting data/reasoning?" },
  { id: "r4", criterion: "Recommendations", description: "Were recommendations clear, actionable, and prioritized?" },
  { id: "r5", criterion: "Presentation", description: "Was your solution well-structured and easy to follow?" },
];

export function getCaseById(id: string): CaseStudy | undefined {
  return cases.find((c) => c.id === id);
}

export function getCaseOfTheWeek(): CaseStudy | undefined {
  return cases.find((c) => c.isCaseOfTheWeek);
}