import {
  FaBullhorn, FaPalette, FaShoppingCart, FaAmazon, FaPaintBrush, FaReact,
  FaIndustry, FaLaptopCode, FaMoneyBillWave, FaRocket, FaGlobeAmericas,
} from "react-icons/fa";
import type { IconType } from "react-icons";

export type CourseModule = {
  title: string;
  topics: string[];
};

export type Course = {
  slug: string;
  title: string;
  icon: IconType;
  duration: string;
  description: string;
  outcomes: string[];
  internship: boolean;
  level: string;
  category: string;
  whatYouLearn: string[];
  modules: CourseModule[];
  prerequisites: string[];
  tools: string[];
  fee: string;
};

export const courses: Course[] = [
  {
    slug: "full-stack-digital-marketing",
    title: "Full Stack Digital Marketing",
    icon: FaBullhorn,
    duration: "3 Months + 1 Month Internship",
    description:
      "Planned with a 1-Month internship by industrial & Marketing Experts. 100% Hands-On Training with Labs covering SEO, SEM, social media, content and paid media.",
    outcomes: ["Performance Marketer", "Growth Lead", "SEO Specialist"],
    internship: true,
    level: "Beginner to Advanced",
    category: "Digital Marketing",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Master SEO and rank websites on Google",
      "Run profitable Google Search & Display Ads",
      "Manage Facebook, Instagram and TikTok campaigns",
      "Build high-converting content strategies",
      "Set up and grow email marketing funnels",
      "Analyze campaigns with Google Analytics & Meta Pixel",
    ],
    prerequisites: [
      "Basic computer and internet skills",
      "Interest in marketing and business",
      "No prior marketing experience required",
    ],
    tools: [
      "Google Analytics 4",
      "Meta Ads Manager",
      "SEMrush / Ahrefs",
      "Canva",
      "Mailchimp",
      "WordPress",
      "Google Search Console",
    ],
    modules: [
      {
        title: "Module 1: SEO Fundamentals",
        topics: ["Keyword Research", "On-Page SEO", "Off-Page & Link Building", "Technical SEO", "Local SEO"],
      },
      {
        title: "Module 2: Google Ads (SEM)",
        topics: ["Search Campaigns", "Display Advertising", "Shopping Ads", "Remarketing", "Conversion Tracking"],
      },
      {
        title: "Module 3: Social Media Marketing",
        topics: ["Facebook Ads Manager", "Instagram Promotions", "TikTok Ads", "LinkedIn Marketing", "Content Calendar"],
      },
      {
        title: "Module 4: Content & Email Marketing",
        topics: ["Copywriting for Web", "Blog & Video Strategy", "Email Automation", "Lead Magnet Design", "CRM Basics"],
      },
      {
        title: "Module 5: Analytics & Reporting",
        topics: ["Google Analytics 4", "Meta Pixel Setup", "KPI Dashboards", "A/B Testing", "Campaign Reporting"],
      },
    ],
  },
  {
    slug: "premium-graphic-designing",
    title: "Premium Graphic Designing",
    icon: FaPalette,
    duration: "3 Months + 1 Month Internship",
    description:
      "Creative Designing training by industrial Experts. Brand identity, typography, layout — built in Figma, Illustrator & After Effects. 100% Hands-On with Labs.",
    outcomes: ["Brand Designer", "Visual Designer", "Freelance Creative"],
    internship: true,
    level: "Beginner",
    category: "Design & Creativity",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Design logos and complete brand identity systems",
      "Master typography, color theory and layout principles",
      "Create print and digital media designs",
      "Build animated motion graphics in After Effects",
      "Design UI mockups and prototypes in Figma",
      "Build a professional freelancing portfolio",
    ],
    prerequisites: [
      "Basic computer literacy",
      "Creative mindset and interest in visual design",
      "No prior design experience needed",
    ],
    tools: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe After Effects",
      "Figma",
      "Canva Pro",
      "Behance (portfolio)",
    ],
    modules: [
      {
        title: "Module 1: Adobe Photoshop",
        topics: ["Photo Editing & Retouching", "Compositing & Masking", "Social Media Graphics", "Poster Design", "Mockups"],
      },
      {
        title: "Module 2: Adobe Illustrator",
        topics: ["Logo Design", "Vector Illustration", "Typography Mastery", "Branding Kits", "Print Materials"],
      },
      {
        title: "Module 3: Figma for UI Design",
        topics: ["Frames & Auto Layout", "Components & Variants", "Prototyping", "Design Systems", "Developer Handoff"],
      },
      {
        title: "Module 4: After Effects",
        topics: ["Motion Graphics Basics", "Text Animations", "Logo Animation", "Video Intros & Outros"],
      },
      {
        title: "Module 5: Freelancing & Portfolio",
        topics: ["Behance & Dribbble Setup", "Fiverr Profile Optimization", "Client Communication", "Pricing Your Work"],
      },
    ],
  },
  {
    slug: "shopify-daraz",
    title: "Shopify & Daraz",
    icon: FaShoppingCart,
    duration: "3 Months",
    description:
      "Complete Daraz & Shopify Program by VA Experts. Product research, listings, ads, operations — practical hands-on learning environment.",
    outcomes: ["Ecom Manager", "Store Owner", "Daraz Seller"],
    internship: true,
    level: "Beginner",
    category: "E-Commerce",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Set up and manage a Daraz seller account",
      "Build a Shopify store from scratch",
      "Conduct product research using analytics tools",
      "Optimize listings for maximum search visibility",
      "Run profitable Daraz Sponsored & Shopify ads",
      "Manage orders, returns and customer service",
    ],
    prerequisites: [
      "Basic computer and internet skills",
      "A smartphone or laptop",
      "Interest in online business and selling",
    ],
    tools: [
      "Daraz Seller Center",
      "Shopify",
      "Meta Ads Manager",
      "Google Sheets",
      "Canva (product images)",
      "Dsers / Oberlo",
    ],
    modules: [
      {
        title: "Module 1: Daraz Seller Fundamentals",
        topics: ["Account Registration", "Product Listing", "Pricing Strategy", "Daraz University", "Seller Center"],
      },
      {
        title: "Module 2: Shopify Store Setup",
        topics: ["Theme Customization", "Product Pages", "Payment Gateways", "Shipping Settings", "Apps & Plugins"],
      },
      {
        title: "Module 3: Product Research",
        topics: ["Niche Selection", "Competitor Analysis", "Trending Products", "Supplier Sourcing", "Profit Margins"],
      },
      {
        title: "Module 4: Advertising",
        topics: ["Daraz Sponsored Ads", "Shopify Facebook Ads", "Retargeting", "Ad Analytics", "ROI Optimization"],
      },
      {
        title: "Module 5: Operations & Scaling",
        topics: ["Order Fulfillment", "Returns Management", "Customer Reviews", "Inventory Planning", "Scaling Strategy"],
      },
    ],
  },
  {
    slug: "amazon-va",
    title: "Amazon VA",
    icon: FaAmazon,
    duration: "3 Months",
    description:
      "Amazon Virtual Assistant Program by VA Experts with maximum experience in freelancing. PL, wholesale, FBA and account management — practical environment.",
    outcomes: ["Amazon VA", "FBA Specialist", "Account Manager"],
    internship: true,
    level: "Beginner to Intermediate",
    category: "Freelancing & E-Commerce",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Navigate Amazon Seller Central confidently",
      "Conduct product research using Helium10 & Jungle Scout",
      "Create optimized listings with A+ content",
      "Manage PPC campaigns for profitability",
      "Source products through wholesale and private label",
      "Handle account health and customer metrics",
    ],
    prerequisites: [
      "Basic English reading and writing skills",
      "Computer literacy and internet access",
      "Interest in e-commerce and freelancing",
    ],
    tools: [
      "Amazon Seller Central",
      "Helium10",
      "Jungle Scout",
      "Google Sheets",
      "Canva (product images)",
      "Alibaba / Local Suppliers",
    ],
    modules: [
      {
        title: "Module 1: Amazon Marketplace Basics",
        topics: ["Seller Central Walkthrough", "FBA vs FBM", "Account Setup", "Categories & Restrictions", "Buy Box"],
      },
      {
        title: "Module 2: Product Research",
        topics: ["Helium10 & Jungle Scout", "Niche Validation", "Competition Analysis", "Profitability Calculator"],
      },
      {
        title: "Module 3: Listing Optimization",
        topics: ["Keyword Research", "Title & Bullets", "A+ Content", "Images & Infographics", "Backend Keywords"],
      },
      {
        title: "Module 4: Amazon PPC",
        topics: ["Sponsored Products", "Sponsored Brands", "Auto vs Manual Campaigns", "Bid Optimization", "ACoS"],
      },
      {
        title: "Module 5: Wholesale & Private Label",
        topics: ["Supplier Sourcing", "Alibaba & Local Suppliers", "MOQ & Negotiations", "Shipping to Amazon FBA"],
      },
    ],
  },
  {
    slug: "ui-ux-designing",
    title: "UI/UX Designing",
    icon: FaPaintBrush,
    duration: "2 Months + 1 Month Internship",
    description:
      "UIUX Designing program by Software Houses & industrial Experts. Research, wireframes, prototyping and design systems — portfolio-grade product work.",
    outcomes: ["Product Designer", "UX Researcher", "Design Systems"],
    internship: true,
    level: "Beginner",
    category: "Design & Technology",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Apply design thinking and user-centered research",
      "Create wireframes and interactive prototypes in Figma",
      "Build scalable design systems and component libraries",
      "Conduct usability testing and iterate on feedback",
      "Present and document design decisions professionally",
      "Build a portfolio that impresses real employers",
    ],
    prerequisites: [
      "Basic computer skills",
      "Interest in design and user experience",
      "No coding or prior design experience required",
    ],
    tools: [
      "Figma",
      "Adobe XD",
      "Miro (user research & flows)",
      "Zeplin (developer handoff)",
      "Google Forms (user testing)",
      "Notion (documentation)",
    ],
    modules: [
      {
        title: "Module 1: UX Research & Design Thinking",
        topics: ["User Interviews", "Personas & Journey Maps", "Problem Definition", "Ideation Techniques"],
      },
      {
        title: "Module 2: Figma Fundamentals",
        topics: ["Frames & Grids", "Components & Variants", "Auto Layout", "Styles & Variables"],
      },
      {
        title: "Module 3: Wireframing & Prototyping",
        topics: ["Low-Fi Wireframes", "High-Fi Mockups", "Interactive Prototypes", "Micro Interactions"],
      },
      {
        title: "Module 4: Design Systems",
        topics: ["Atomic Design", "Color & Typography Systems", "Icon Libraries", "Documentation"],
      },
      {
        title: "Module 5: Portfolio & Career",
        topics: ["Case Study Writing", "Behance Portfolio", "LinkedIn Optimization", "Interview Preparation"],
      },
    ],
  },
  {
    slug: "react-node-js",
    title: "React & Node JS",
    icon: FaReact,
    duration: "3 Months",
    description:
      "Web Development program by Software Houses & industrial Experts. Full-stack JavaScript — React, Node, APIs, databases and deployment to production.",
    outcomes: ["Full-Stack Dev", "Frontend Engineer", "API Engineer"],
    internship: true,
    level: "Intermediate",
    category: "Web Development",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Build modern, responsive UIs with React.js",
      "Develop RESTful APIs using Node.js & Express",
      "Work with MongoDB and relational databases",
      "Implement authentication with JWT & OAuth",
      "Deploy full-stack applications to cloud platforms",
      "Follow professional Git workflows used in industry",
    ],
    prerequisites: [
      "Basic HTML and CSS knowledge",
      "Logical thinking and problem-solving interest",
      "Familiarity with computers and internet",
    ],
    tools: [
      "VS Code",
      "Node.js & npm",
      "MongoDB / MongoDB Atlas",
      "Git & GitHub",
      "Postman (API testing)",
      "Vercel / Render (deployment)",
      "React DevTools",
    ],
    modules: [
      {
        title: "Module 1: HTML, CSS & JavaScript ES6+",
        topics: ["Semantic HTML", "Flexbox & Grid", "ES6 Arrow Functions", "Async/Await & Promises", "DOM Manipulation"],
      },
      {
        title: "Module 2: React.js",
        topics: ["Components & Props", "useState & useEffect", "React Router", "Context API", "Custom Hooks"],
      },
      {
        title: "Module 3: Node.js & Express",
        topics: ["Node Fundamentals", "REST API Design", "Middleware", "File Upload", "Error Handling"],
      },
      {
        title: "Module 4: MongoDB & Databases",
        topics: ["MongoDB CRUD", "Mongoose ODM", "Aggregation Pipeline", "Indexing", "SQL Basics"],
      },
      {
        title: "Module 5: Deployment & DevOps Basics",
        topics: ["Git & GitHub", "Vercel & Render Deploy", "Environment Variables", "CI/CD Basics", "Final Project"],
      },
    ],
  },
];

export const stats = [
  { value: "9,288+", label: "Enrolled Students" },
  { value: "5,326+", label: "No. of Alumni" },
  { value: "26+", label: "Available Courses" },
  { value: "30+", label: "Available Trainers" },
  { value: "#1", label: "IT Institute in Pakistan" },
];

export const features = [
  { icon: FaIndustry, title: "Industrial Experts", desc: "Top notch trainers from real industry — not classroom-only academics." },
  { icon: FaLaptopCode, title: "100% Hands-On Training", desc: "Build real projects from week one. No passive lectures — only practical labs." },
  { icon: FaMoneyBillWave, title: "Minimal Fee Structure", desc: "World-class curriculum at a fraction of the market rate. Affordable for all." },
  { icon: FaRocket, title: "Internship Opportunities", desc: "Guaranteed internships with partner companies, agencies and software houses." },
  { icon: FaGlobeAmericas, title: "Global Job Readiness", desc: "Portfolio, English fluency and freelancing skills for global career pathways." },
];

export const testimonials = [
  {
    name: "Junaid Iqbal",
    course: "Premium Graphic Designing",
    rating: 5,
    quote: "After I completed my course, YETP offered me an internship. I had the incredible opportunity to work on projects like Lucky Cement Faisalabad, GTA Homes, Stralent Brand Management. YETP is the perfect choice for a future career in graphic design.",
  },
  {
    name: "Nayab Mirza",
    course: "Full Stack Digital Marketing",
    rating: 5,
    quote: "YETP is very good Institute for those students who want to learn good skills. I'm doing Digital Marketing Course and I learn so many things. Highly recommended!",
  },
  {
    name: "Tahir Ghaffar",
    course: "Full Stack Digital Marketing",
    rating: 5,
    quote: "The instructors were highly knowledgeable and passionate. The curriculum was comprehensive with real-world examples. The facilities were well-equipped and the staff was always helpful. A very positive experience.",
  },
  {
    name: "Faiza Maryam",
    course: "Premium Graphic Designing",
    rating: 5,
    quote: "It's the best opportunity to polish your skill. Teaching methodology is good for both online and physical students. They charge very low price and gave opportunity to start your own work. Best part — come and join fast!",
  },
];

export const founders = [
  {
    name: "Engr. Waqar Rao",
    role: "Founder & CEO, YETP",
    bio: "Engineer-turned-educator on a mission to industrialize Pakistan's youth talent pipeline. Leading YETP's vision to train 1 million youth in emerging technologies.",
  },
  {
    name: "Engr. Umair Iftikhar",
    role: "Co-Founder & COO, YETP",
    bio: "Operator behind YETP's curriculum, mentorship and internship partnerships nationwide. Driving excellence across all training programs and industry collaborations.",
  },
];

export const pillars = [
  { title: "Skills Development", desc: "Industry-grade, hands-on curriculum for emerging technologies." },
  { title: "Equal Opportunities", desc: "Talent first. Internships and jobs to the best trainees." },
  { title: "Career Placement", desc: "Dedicated placement support to help graduates land their first job." },
  { title: "4.0 Industrial Revolution", desc: "Training youth in technologies that shape Pakistan's future." },
];

export const partners = [
  { name: "Sublime", abbr: "SB" },
  { name: "XpertPrime", abbr: "XP" },
  { name: "GTA Homes", abbr: "GTA" },
  { name: "Lucky Cement", abbr: "LC" },
];
