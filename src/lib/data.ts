import { Course, StudentEvidence, UserActivity } from "./types";

export const initialCourses: Course[] = [
  {
    id: "course-1",
    title: "Meta Ads 2026: Facebook & Instagram Scaling Blueprint",
    slug: "meta-ads-scaling-blueprint",
    description:
      "Master high-converting creative testing, CBO budget scaling, Lookalike 2.0 audiences, and post-iOS tracking to generate consistent 4x+ ROAS.",
    category: "Social Media Ads",
    level: "Intermediate",
    instructor: "Alex Vance",
    instructorRole: "Ex-Meta Ad Strategist ($15M+ Ad Spend)",
    rating: 4.9,
    reviewsCount: 428,
    studentsCount: 1840,
    price: 4500,
    originalPrice: 9000,
    duration: "14 hours",
    lessonsCount: 38,
    featured: true,
    modules: [
      {
        title: "Module 1: High-Converting Creative Architecture",
        lessons: [
          "Hook Psychology & Scripting Frameworks",
          "UGC That Converts: Briefing Creators",
          "Fast-Paced Editing Techniques for Meta",
        ],
      },
      {
        title: "Module 2: Campaign Structure & Media Buying",
        lessons: [
          "Advantage+ Shopping Campaigns Decoded",
          "Testing Sandboxes vs Scaling Campaigns",
          "Daily Budget Pacing & Bid Caps Mastery",
        ],
      },
      {
        title: "Module 3: Advanced Retargeting & Attribution",
        lessons: [
          "Server-Side Conversions API Setup",
          "Dynamic Product Ad Funnels",
          "LTV Maximization & Retention",
        ],
      },
    ],
  },
  {
    id: "course-2",
    title: "TikTok E-Commerce & Viral Organic Marketing",
    slug: "tiktok-ecommerce-viral",
    description:
      "From zero to viral: Launch and scale TikTok Shop, TikTok Ads Manager, and organic viral video hooks that convert viewers into loyal paying customers.",
    category: "Social Media Ads",
    level: "Beginner",
    instructor: "Sarah Lin",
    instructorRole: "TikTok Top Creator Partner",
    rating: 4.8,
    reviewsCount: 312,
    studentsCount: 1290,
    price: 3800,
    originalPrice: 7500,
    duration: "11 hours",
    lessonsCount: 29,
    featured: true,
    modules: [
      {
        title: "Module 1: TikTok Algorithm & Hook Dynamics",
        lessons: [
          "The 3-Second Viral Hook Principle",
          "Trending Audio & Spark Ads Strategy",
          "Content Cadence & Publishing Schedule",
        ],
      },
      {
        title: "Module 2: TikTok Shop & Affiliate Army",
        lessons: [
          "Setting Up Shop & Inventory Sync",
          "Recruiting 100+ Affiliates in 14 Days",
          "Live Stream Selling Blueprints",
        ],
      },
    ],
  },
  {
    id: "course-3",
    title: "Google Performance Max & High-Intent Search Ads",
    slug: "google-pmax-search-ads",
    description:
      "Capture customers actively searching to buy. Master Google Search, Performance Max, YouTube Ads, and negative keyword architecture.",
    category: "Search & PPC",
    level: "Advanced",
    instructor: "David Miller",
    instructorRole: "Google Premier Partner Certified",
    rating: 4.9,
    reviewsCount: 295,
    studentsCount: 980,
    price: 5200,
    originalPrice: 9900,
    duration: "16 hours",
    lessonsCount: 42,
    featured: false,
    modules: [
      {
        title: "Module 1: Intent-Driven Keyword Research",
        lessons: [
          "Commercial Intent Match Types",
          "Competitor Keyword Reverse Engineering",
          "Negative Keyword Exclusion Lists",
        ],
      },
      {
        title: "Module 2: Performance Max Mastery",
        lessons: [
          "Asset Group Optimization & Feeds",
          "Audience Signals & First-Party Data",
          "Steering Google AI to High-Margin Sales",
        ],
      },
    ],
  },
  {
    id: "course-4",
    title: "AI-Powered Marketing: Automations, Copy & Workflows",
    slug: "ai-powered-marketing-automations",
    description:
      "Harness generative AI to 10x your output. Build automated sales funnels, high-converting ad copy with LLMs, and personalized email workflows.",
    category: "AI Marketing",
    level: "Beginner",
    instructor: "Marcus Reed",
    instructorRole: "Founder, Growth Automations Lab",
    rating: 5.0,
    reviewsCount: 184,
    studentsCount: 840,
    price: 2900,
    originalPrice: 5800,
    duration: "8 hours",
    lessonsCount: 22,
    featured: true,
    modules: [
      {
        title: "Module 1: AI Copywriting Systems",
        lessons: [
          "Prompt Engineering for Direct-Response Copy",
          "Angle Generation: 20 Variations in 5 Minutes",
          "AI Voice & Brand Consistency Tuning",
        ],
      },
      {
        title: "Module 2: Workflow Automations",
        lessons: [
          "Make.com & Zapier Marketing Flows",
          "Automated Lead Scoring & Follow-ups",
          "Dynamic Personalization at Scale",
        ],
      },
    ],
  },
  {
    id: "course-5",
    title: "High-Ticket Funnels & Sales Page Architecture",
    slug: "high-ticket-funnels-sales-pages",
    description:
      "Design and deploy high-converting landing pages, VSL (Video Sales Letter) funnels, and application pipelines for services and consulting.",
    category: "Strategy",
    level: "Intermediate",
    instructor: "Elena Rostova",
    instructorRole: "Conversion Rate Optimization Director",
    rating: 4.9,
    reviewsCount: 156,
    studentsCount: 620,
    price: 4200,
    originalPrice: 8400,
    duration: "10 hours",
    lessonsCount: 26,
    featured: false,
    modules: [
      {
        title: "Module 1: The Irresistible Offer Framework",
        lessons: [
          "Grand-Slam Offer Packaging",
          "Risk Reversal & Guarantee Stacking",
          "Pricing Psychology & Tiering",
        ],
      },
      {
        title: "Module 2: Wireframing & CRO",
        lessons: [
          "Above-The-Fold Visual Hierarchy",
          "Social Proof Placement Strategy",
          "Mobile Speed Optimization Checklist",
        ],
      },
    ],
  },
  {
    id: "course-6",
    title: "Modern Dropshipping & Private Label Brand Scaling",
    slug: "modern-dropshipping-private-label",
    description:
      "Build a real, defensible e-commerce brand. Sourcing quality products, custom packaging, fast 3PL logistics, and building customer repeat purchase loops.",
    category: "E-Commerce",
    level: "Intermediate",
    instructor: "Kenji Sato",
    instructorRole: "8-Figure E-Commerce Store Owner",
    rating: 4.8,
    reviewsCount: 210,
    studentsCount: 1100,
    price: 4900,
    originalPrice: 9500,
    duration: "13 hours",
    lessonsCount: 34,
    featured: false,
    modules: [
      {
        title: "Module 1: Product Research & Validation",
        lessons: [
          "Uncovering Unsaturated High-Margin Niches",
          "Supplier Vetting & Sample Inspections",
          "Margin Calculators with Ad Spend Costs",
        ],
      },
      {
        title: "Module 2: Brand Asset Building",
        lessons: [
          "Custom Packaging & Unboxing Experience",
          "Shopify Theme Conversion Customization",
          "Email & SMS Post-Purchase Retention",
        ],
      },
    ],
  },
];

export const initialStudentEvidence: StudentEvidence[] = [
  {
    id: "ev-1",
    studentName: "Michael Chang",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    resultTitle: "Scaled E-Commerce Store to 185,000 ETB / month",
    metric: "+185,000 ETB / mo",
    metricType: "Revenue",
    courseTitle: "Meta Ads 2026: Blueprint",
    testimonial:
      "Before taking this course I was burning cash on broad targeting. Applying the Creative Architecture module completely turned my store around. Hit my first 185,000 ETB month with a 4.2x ROAS!",
    proofImageUrl:
      "https://res.cloudinary.com/ujbsqmo3/image/upload/v1794472184/apexmarketing/logo.jpg",
    date: "November 2026",
    verified: true,
  },
  {
    id: "ev-2",
    studentName: "Fatima Al-Mansoor",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
    resultTitle: "Generated 1.2M Organic TikTok Views in 30 Days",
    metric: "5.6x ROAS (92,000 ETB)",
    metricType: "ROAS",
    courseTitle: "TikTok E-Commerce & Viral",
    testimonial:
      "Sarah's viral hook frameworks are literally a cheat code. My second video reached 850k views and drove 92,000 ETB in sales in just one weekend.",
    proofImageUrl:
      "https://res.cloudinary.com/ujbsqmo3/image/upload/v1794472184/apexmarketing/logo.jpg",
    date: "October 2026",
    verified: true,
  },
  {
    id: "ev-3",
    studentName: "Lucas Da Silva",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    resultTitle: "Lowered Lead Generation Cost by 54%",
    metric: "2,400+ Leads (35 ETB/CPL)",
    metricType: "Leads",
    courseTitle: "Google Performance Max",
    testimonial:
      "David's negative keyword and audience signal framework saved my marketing agency thousands. Our client's cost per qualified lead dropped significantly.",
    proofImageUrl:
      "https://res.cloudinary.com/ujbsqmo3/image/upload/v1794472184/apexmarketing/logo.jpg",
    date: "November 2026",
    verified: true,
  },
];

export const initialUserActivity: UserActivity[] = [
  {
    id: "usr-1",
    name: "Tariq Ibrahim",
    email: "tariq.mktg@example.com",
    course: "Meta Ads 2026: Blueprint",
    progress: 78,
    lastActive: "12 mins ago",
    status: "Active",
    joinedDate: "Nov 02, 2026",
  },
  {
    id: "usr-2",
    name: "Jessica Wu",
    email: "jessica.ecom@example.com",
    course: "TikTok E-Commerce & Viral",
    progress: 100,
    lastActive: "1 hour ago",
    status: "Completed",
    joinedDate: "Oct 28, 2026",
  },
  {
    id: "usr-3",
    name: "Ahmed Hassan",
    email: "ahmed.h@example.com",
    course: "AI-Powered Marketing",
    progress: 45,
    lastActive: "3 hours ago",
    status: "Active",
    joinedDate: "Nov 08, 2026",
  },
  {
    id: "usr-4",
    name: "Sofia Rodriguez",
    email: "sofia.agency@example.com",
    course: "High-Ticket Funnels",
    progress: 20,
    lastActive: "Yesterday",
    status: "Active",
    joinedDate: "Nov 10, 2026",
  },
  {
    id: "usr-5",
    name: "Dawit Bekele",
    email: "dawit.growth@example.com",
    course: "Google Performance Max",
    progress: 10,
    lastActive: "2 days ago",
    status: "Active",
    joinedDate: "Nov 11, 2026",
  },
];
