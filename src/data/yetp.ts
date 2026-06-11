import {
  FaBullhorn, FaPalette, FaShoppingCart, FaAmazon, FaPaintBrush, FaReact,
  FaIndustry, FaLaptopCode, FaMoneyBillWave, FaRocket, FaGlobeAmericas,
  FaWordpress, FaLaravel, FaPython, FaFilm, FaRobot, FaChartLine, FaShieldAlt,
  FaLanguage, FaBriefcase, FaCube, FaTshirt, FaCut, FaMobileAlt, FaLink,
  FaCoins, FaUserSecret, FaGoogle, FaSearch, FaYoutube, FaLayerGroup,
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
  {
    slug: "wordpress-development",
    title: "WordPress Website Development",
    icon: FaWordpress,
    duration: "2 Months",
    description:
      "Build professional websites with WordPress — themes, page builders, plugins and WooCommerce stores, with hands-on client-style projects.",
    outcomes: ["WordPress Developer", "Freelance Web Builder", "WooCommerce Specialist"],
    internship: true,
    level: "Beginner",
    category: "Web Development",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Install and configure WordPress from scratch",
      "Customize themes using Elementor & Gutenberg",
      "Build WooCommerce online stores",
      "Optimize site speed and basic SEO",
      "Manage plugins, security and backups",
      "Deploy and host WordPress sites live",
    ],
    prerequisites: [
      "Basic computer and internet skills",
      "Interest in web design",
      "No coding experience required",
    ],
    tools: ["WordPress", "Elementor", "WooCommerce", "Hostinger / cPanel", "Yoast SEO", "Canva"],
    modules: [
      {
        title: "Module 1: WordPress Fundamentals",
        topics: ["Installation & Dashboard", "Themes & Templates", "Pages vs Posts", "Menus & Widgets"],
      },
      {
        title: "Module 2: Elementor Page Builder",
        topics: ["Drag & Drop Design", "Sections & Columns", "Responsive Design", "Templates Library"],
      },
      {
        title: "Module 3: WooCommerce Stores",
        topics: ["Store Setup", "Product Listings", "Payment Gateways", "Order Management"],
      },
      {
        title: "Module 4: Plugins & Security",
        topics: ["Essential Plugins", "Security Hardening", "Backups & Updates", "Performance Optimization"],
      },
      {
        title: "Module 5: Hosting & Deployment",
        topics: ["Domain & Hosting Setup", "Going Live", "Basic SEO Setup", "Client Handover"],
      },
    ],
  },
  {
    slug: "php-laravel-development",
    title: "PHP Laravel Web Development",
    icon: FaLaravel,
    duration: "3 Months",
    description:
      "Backend web development with PHP & Laravel — MVC architecture, databases, authentication and APIs for production-ready applications.",
    outcomes: ["Laravel Developer", "Backend Engineer", "Full-Stack PHP Developer"],
    internship: true,
    level: "Intermediate",
    category: "Web Development",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Write clean PHP using OOP principles",
      "Build apps with Laravel's MVC architecture",
      "Design databases with Eloquent ORM & migrations",
      "Implement authentication and role-based access",
      "Build and consume RESTful APIs",
      "Deploy Laravel applications to live servers",
    ],
    prerequisites: [
      "Basic HTML & CSS knowledge",
      "Logical thinking and problem-solving interest",
      "Basic understanding of programming concepts",
    ],
    tools: ["PHP", "Laravel", "MySQL", "Composer", "Git & GitHub", "Postman", "VS Code"],
    modules: [
      {
        title: "Module 1: PHP & OOP Fundamentals",
        topics: ["PHP Syntax & Functions", "Object-Oriented PHP", "Working with Arrays & Forms", "Sessions & Cookies"],
      },
      {
        title: "Module 2: Laravel Basics",
        topics: ["MVC Architecture", "Routing & Controllers", "Blade Templating", "Artisan CLI"],
      },
      {
        title: "Module 3: Database & Eloquent",
        topics: ["Migrations & Seeders", "Eloquent ORM", "Relationships", "Query Builder"],
      },
      {
        title: "Module 4: Authentication & APIs",
        topics: ["Laravel Breeze / Auth", "Middleware & Roles", "Building REST APIs", "API Authentication (Sanctum)"],
      },
      {
        title: "Module 5: Deployment & Project",
        topics: ["Environment Config", "Deploying to a Live Server", "Debugging & Testing", "Final Capstone Project"],
      },
    ],
  },
  {
    slug: "python-programming",
    title: "Python Programming",
    icon: FaPython,
    duration: "2 Months",
    description:
      "From basics to automation — learn Python programming with hands-on projects covering scripting, data handling and intro to AI/ML libraries.",
    outcomes: ["Python Developer", "Automation Engineer", "Junior Data Analyst"],
    internship: false,
    level: "Beginner",
    category: "Programming",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Write clean, structured Python code",
      "Work with data structures, loops and functions",
      "Automate everyday tasks with scripts",
      "Read and process files, CSVs and APIs",
      "Use libraries like NumPy and Pandas",
      "Build small real-world Python projects",
    ],
    prerequisites: [
      "Basic computer skills",
      "No prior programming experience required",
      "Logical thinking interest",
    ],
    tools: ["Python 3", "VS Code", "Jupyter Notebook", "NumPy", "Pandas", "Git & GitHub"],
    modules: [
      {
        title: "Module 1: Python Basics",
        topics: ["Variables & Data Types", "Operators & Expressions", "Conditionals & Loops", "Functions"],
      },
      {
        title: "Module 2: Data Structures",
        topics: ["Lists & Tuples", "Dictionaries & Sets", "String Manipulation", "Comprehensions"],
      },
      {
        title: "Module 3: File Handling & Modules",
        topics: ["Reading & Writing Files", "Working with CSV & JSON", "Modules & Packages", "Error Handling"],
      },
      {
        title: "Module 4: Automation & APIs",
        topics: ["Web Scraping Basics", "Working with APIs", "Task Automation Scripts", "Scheduling Tasks"],
      },
      {
        title: "Module 5: Intro to Data & Projects",
        topics: ["NumPy & Pandas Basics", "Data Cleaning", "Mini Capstone Project", "Portfolio on GitHub"],
      },
    ],
  },
  {
    slug: "video-editing-animation",
    title: "Video Editing & Animation",
    icon: FaFilm,
    duration: "2 Months",
    description:
      "Professional video editing and motion graphics training using Adobe Premiere Pro and After Effects for content creators and freelancers.",
    outcomes: ["Video Editor", "Motion Graphics Artist", "Content Creator"],
    internship: true,
    level: "Beginner",
    category: "Design & Creativity",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Edit professional videos in Premiere Pro",
      "Apply color grading and audio mixing",
      "Create motion graphics in After Effects",
      "Design intros, outros and lower thirds",
      "Optimize content for YouTube & social media",
      "Build a freelance video editing portfolio",
    ],
    prerequisites: [
      "Basic computer skills",
      "A laptop with moderate specs",
      "Creative interest in video content",
    ],
    tools: ["Adobe Premiere Pro", "Adobe After Effects", "DaVinci Resolve", "Canva", "Audacity", "YouTube Studio"],
    modules: [
      {
        title: "Module 1: Premiere Pro Essentials",
        topics: ["Interface & Workspace", "Cutting & Trimming", "Transitions & Effects", "Timeline Management"],
      },
      {
        title: "Module 2: Color & Audio",
        topics: ["Color Correction & Grading", "Audio Editing & Mixing", "Sound Effects & Music", "Export Settings"],
      },
      {
        title: "Module 3: After Effects Basics",
        topics: ["Keyframe Animation", "Text Animation", "Layers & Compositions", "Templates & Plugins"],
      },
      {
        title: "Module 4: Motion Graphics",
        topics: ["Logo Animation", "Lower Thirds & Titles", "Intros & Outros", "Visual Effects Basics"],
      },
      {
        title: "Module 5: Content & Freelancing",
        topics: ["YouTube Optimization", "Social Media Formats", "Building a Showreel", "Freelance Platforms"],
      },
    ],
  },
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence (AI)",
    icon: FaRobot,
    duration: "3 Months",
    description:
      "Hands-on introduction to Artificial Intelligence — machine learning fundamentals, neural networks and practical AI tools used in real projects.",
    outcomes: ["AI Engineer (Junior)", "ML Practitioner", "AI Tools Specialist"],
    internship: true,
    level: "Intermediate",
    category: "Artificial Intelligence",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Understand core AI and machine learning concepts",
      "Work with Python libraries for AI development",
      "Build and train basic neural networks",
      "Use pre-trained models and AI APIs",
      "Apply AI tools (ChatGPT, etc.) for productivity",
      "Build a portfolio AI project",
    ],
    prerequisites: [
      "Basic Python programming knowledge",
      "High school level mathematics",
      "Interest in technology and AI",
    ],
    tools: ["Python", "TensorFlow / Keras", "Scikit-learn", "Jupyter Notebook", "OpenAI API", "Google Colab"],
    modules: [
      {
        title: "Module 1: AI & ML Foundations",
        topics: ["What is AI / ML / DL", "Types of Machine Learning", "Data Preprocessing", "Python for AI"],
      },
      {
        title: "Module 2: Machine Learning Models",
        topics: ["Regression & Classification", "Decision Trees", "Model Evaluation", "Scikit-learn Practice"],
      },
      {
        title: "Module 3: Neural Networks",
        topics: ["Perceptrons & Layers", "Activation Functions", "Building with TensorFlow / Keras", "Training & Tuning"],
      },
      {
        title: "Module 4: Applied AI Tools",
        topics: ["Using OpenAI / ChatGPT API", "Prompt Engineering", "Computer Vision Basics", "NLP Basics"],
      },
      {
        title: "Module 5: Capstone Project",
        topics: ["Project Planning", "Model Building", "Deployment Basics", "Presentation"],
      },
    ],
  },
  {
    slug: "machine-learning-data-science",
    title: "Machine Learning & Data Science",
    icon: FaChartLine,
    duration: "3 Months",
    description:
      "Data Science & Machine Learning program covering data analysis, visualization, statistics and predictive modeling with real datasets.",
    outcomes: ["Data Analyst", "Machine Learning Engineer (Junior)", "Data Scientist (Entry)"],
    internship: true,
    level: "Intermediate",
    category: "Data Science",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Clean and analyze data with Pandas",
      "Visualize insights with Matplotlib & Seaborn",
      "Apply statistics for data-driven decisions",
      "Build machine learning models with Scikit-learn",
      "Work with real-world datasets and case studies",
      "Present findings through dashboards and reports",
    ],
    prerequisites: [
      "Basic Python programming",
      "Basic mathematics & statistics",
      "Interest in data and analytics",
    ],
    tools: ["Python", "Pandas & NumPy", "Matplotlib / Seaborn", "Scikit-learn", "Jupyter Notebook", "Power BI / Excel"],
    modules: [
      {
        title: "Module 1: Data Analysis with Python",
        topics: ["Pandas & NumPy", "Data Cleaning", "Exploratory Data Analysis", "Working with Datasets"],
      },
      {
        title: "Module 2: Data Visualization",
        topics: ["Matplotlib & Seaborn", "Dashboards in Power BI", "Storytelling with Data", "Reporting"],
      },
      {
        title: "Module 3: Statistics for Data Science",
        topics: ["Descriptive Statistics", "Probability Basics", "Hypothesis Testing", "Correlation & Regression"],
      },
      {
        title: "Module 4: Machine Learning Models",
        topics: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Scikit-learn Projects"],
      },
      {
        title: "Module 5: Capstone Project",
        topics: ["Real Dataset Analysis", "Model Building & Tuning", "Final Report", "Portfolio Presentation"],
      },
    ],
  },
  {
    slug: "cyber-security",
    title: "Cyber Security",
    icon: FaShieldAlt,
    duration: "3 Months",
    description:
      "Comprehensive Cyber Security training covering network security, ethical hacking fundamentals and defense practices used by security teams.",
    outcomes: ["Security Analyst", "SOC Analyst (Junior)", "Cyber Security Associate"],
    internship: true,
    level: "Intermediate",
    category: "Cyber Security",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Understand networking and security fundamentals",
      "Identify common cyber threats and attack vectors",
      "Configure firewalls and security tools",
      "Perform basic vulnerability assessments",
      "Apply security best practices and policies",
      "Use industry-standard security monitoring tools",
    ],
    prerequisites: [
      "Basic computer networking knowledge",
      "Interest in cybersecurity",
      "Basic Linux familiarity (helpful)",
    ],
    tools: ["Kali Linux", "Wireshark", "Nmap", "Burp Suite", "Metasploit", "VirtualBox"],
    modules: [
      {
        title: "Module 1: Networking & Security Basics",
        topics: ["TCP/IP Fundamentals", "Network Devices & Protocols", "OS Security Basics", "Linux Essentials"],
      },
      {
        title: "Module 2: Threats & Attacks",
        topics: ["Malware Types", "Phishing & Social Engineering", "Common Vulnerabilities", "Threat Intelligence"],
      },
      {
        title: "Module 3: Security Tools",
        topics: ["Wireshark for Traffic Analysis", "Nmap Scanning", "Firewall Configuration", "IDS/IPS Basics"],
      },
      {
        title: "Module 4: Vulnerability Assessment",
        topics: ["Vulnerability Scanning", "Burp Suite Basics", "Risk Assessment", "Reporting Findings"],
      },
      {
        title: "Module 5: Security Operations",
        topics: ["SOC Fundamentals", "Incident Response Basics", "Security Policies", "Career & Certifications"],
      },
    ],
  },
  {
    slug: "ielts-preparation",
    title: "IELTS Preparation",
    icon: FaLanguage,
    duration: "6 Weeks",
    description:
      "Focused IELTS preparation program covering all four modules — Listening, Reading, Writing and Speaking — with practice tests and expert feedback.",
    outcomes: ["IELTS Band 6.5+ Target", "Study Abroad Ready", "Improved English Communication"],
    internship: false,
    level: "Beginner to Intermediate",
    category: "Languages & Test Prep",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Master strategies for all 4 IELTS modules",
      "Improve vocabulary and grammar accuracy",
      "Practice with timed mock tests",
      "Develop confident speaking and fluency",
      "Write structured essays and reports",
      "Understand band score criteria and scoring",
    ],
    prerequisites: [
      "Basic English reading and writing skills",
      "Willingness to practice daily",
      "No prior IELTS experience required",
    ],
    tools: ["Cambridge IELTS Books", "Mock Test Platforms", "Vocabulary Apps", "Recording Tools (speaking practice)"],
    modules: [
      {
        title: "Module 1: Listening",
        topics: ["Section-wise Strategies", "Note-taking Techniques", "Practice Tests", "Common Traps"],
      },
      {
        title: "Module 2: Reading",
        topics: ["Skimming & Scanning", "Question Types", "Time Management", "Practice Tests"],
      },
      {
        title: "Module 3: Writing",
        topics: ["Task 1: Reports & Graphs", "Task 2: Essays", "Grammar & Cohesion", "Examiner Feedback"],
      },
      {
        title: "Module 4: Speaking",
        topics: ["Part 1, 2 & 3 Practice", "Fluency & Pronunciation", "Mock Interviews", "Feedback Sessions"],
      },
      {
        title: "Module 5: Mock Tests & Strategy",
        topics: ["Full-Length Mock Tests", "Score Analysis", "Personalized Improvement Plan", "Exam Day Strategy"],
      },
    ],
  },
  {
    slug: "freelancing-program",
    title: "Freelancing Program",
    icon: FaBriefcase,
    duration: "1 Month",
    description:
      "Kickstart your freelancing career — set up winning profiles, find clients, price your services and earn from international platforms.",
    outcomes: ["Freelancer", "Remote Worker", "Online Income Earner"],
    internship: false,
    level: "Beginner",
    category: "Freelancing & Career",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Set up professional Fiverr & Upwork profiles",
      "Identify in-demand freelance skills and niches",
      "Write winning proposals and bids",
      "Price services and manage client communication",
      "Receive international payments safely",
      "Build long-term client relationships",
    ],
    prerequisites: [
      "Basic computer and internet skills",
      "At least one marketable skill (any field)",
      "Active email and bank/payment account",
    ],
    tools: ["Fiverr", "Upwork", "Payoneer", "Canva", "Google Workspace", "LinkedIn"],
    modules: [
      {
        title: "Module 1: Freelancing Foundations",
        topics: ["Freelance Marketplaces Overview", "Choosing Your Niche", "Profile Setup", "Portfolio Building"],
      },
      {
        title: "Module 2: Winning Clients",
        topics: ["Writing Proposals", "Gig & Service Pricing", "Communication Skills", "Building Trust & Reviews"],
      },
      {
        title: "Module 3: Platforms in Practice",
        topics: ["Fiverr Gig Optimization", "Upwork Bidding Strategy", "LinkedIn for Freelancers", "Local Freelance Markets"],
      },
      {
        title: "Module 4: Payments & Operations",
        topics: ["Payoneer & International Payments", "Contracts & Invoicing", "Time Management", "Tax Basics for Freelancers"],
      },
      {
        title: "Module 5: Scaling Up",
        topics: ["Repeat Clients & Retainers", "Building an Agency", "Personal Branding", "Long-term Career Planning"],
      },
    ],
  },
  {
    slug: "architectural-visualization-blender",
    title: "Architectural Visualization with Blender 3D",
    icon: FaCube,
    duration: "2 Months",
    description:
      "Create stunning architectural renders and walkthroughs using Blender 3D — modeling, texturing, lighting and rendering for real estate and design.",
    outcomes: ["3D Visualizer", "Architectural Renderer", "Freelance 3D Artist"],
    internship: true,
    level: "Beginner to Intermediate",
    category: "Design & Creativity",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Model buildings and interiors in Blender",
      "Apply realistic materials and textures",
      "Set up professional lighting for renders",
      "Render high-quality architectural images",
      "Create walkthrough animations",
      "Build a 3D visualization portfolio",
    ],
    prerequisites: [
      "Basic computer skills",
      "A laptop with moderate graphics capability",
      "Interest in 3D design and architecture",
    ],
    tools: ["Blender 3D", "Cycles / Eevee Renderer", "Substance Painter (intro)", "Photoshop", "AutoCAD (basics)", "Behance"],
    modules: [
      {
        title: "Module 1: Blender Fundamentals",
        topics: ["Interface & Navigation", "Modeling Basics", "Modifiers", "Object Management"],
      },
      {
        title: "Module 2: Architectural Modeling",
        topics: ["Walls, Floors & Roofs", "Interior Modeling", "Importing CAD Plans", "Detailing"],
      },
      {
        title: "Module 3: Materials & Texturing",
        topics: ["Material Nodes", "PBR Textures", "UV Unwrapping", "Realistic Surfaces"],
      },
      {
        title: "Module 4: Lighting & Rendering",
        topics: ["Studio & HDRI Lighting", "Cycles vs Eevee", "Camera Setup", "Render Optimization"],
      },
      {
        title: "Module 5: Animation & Portfolio",
        topics: ["Walkthrough Animation", "Post-Processing", "Portfolio Building", "Freelance Marketplaces"],
      },
    ],
  },
  {
    slug: "textile-designing",
    title: "Textile Designing",
    icon: FaTshirt,
    duration: "2 Months",
    description:
      "Learn modern textile and fabric design — pattern creation, color theory and digital design tools used by Pakistan's textile industry.",
    outcomes: ["Textile Designer", "Fabric Print Designer", "Fashion Industry Designer"],
    internship: true,
    level: "Beginner",
    category: "Design & Creativity",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Understand textile design principles and trends",
      "Create repeat patterns and motifs",
      "Apply color theory for fabric design",
      "Design digitally using Illustrator & Photoshop",
      "Prepare print-ready textile files",
      "Build a textile design portfolio",
    ],
    prerequisites: [
      "Basic computer skills",
      "Interest in fashion and design",
      "No prior design experience required",
    ],
    tools: ["Adobe Illustrator", "Adobe Photoshop", "CorelDRAW", "Pantone Color Guides", "Canva"],
    modules: [
      {
        title: "Module 1: Design Fundamentals",
        topics: ["Elements & Principles of Design", "Color Theory", "Trend Research", "Sketching Basics"],
      },
      {
        title: "Module 2: Pattern Design",
        topics: ["Repeat Patterns", "Motif Creation", "Geometric & Floral Designs", "Seamless Patterns"],
      },
      {
        title: "Module 3: Digital Tools",
        topics: ["Illustrator for Textile Design", "Photoshop Texturing", "Color Separation", "File Preparation"],
      },
      {
        title: "Module 4: Industry Application",
        topics: ["Print-Ready Files", "Fabric Types & Printing Methods", "Working with Manufacturers", "Trend Forecasting"],
      },
      {
        title: "Module 5: Portfolio & Career",
        topics: ["Building a Design Portfolio", "Freelance Opportunities", "Local Industry Connections", "Presenting Your Work"],
      },
    ],
  },
  {
    slug: "digital-embroidery",
    title: "Digital Embroidery",
    icon: FaCut,
    duration: "6 Weeks",
    description:
      "Learn computerized embroidery design — digitizing artwork, stitch types and machine embroidery for fashion and home textile businesses.",
    outcomes: ["Embroidery Digitizer", "Machine Embroidery Operator", "Home-Based Business Owner"],
    internship: false,
    level: "Beginner",
    category: "Design & Creativity",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Digitize logos and designs for embroidery",
      "Understand stitch types and densities",
      "Operate computerized embroidery software",
      "Prepare files for embroidery machines",
      "Troubleshoot common digitizing issues",
      "Start a home-based embroidery business",
    ],
    prerequisites: [
      "Basic computer skills",
      "Interest in textile and craft work",
      "No prior digitizing experience required",
    ],
    tools: ["Wilcom Embroidery Studio", "Embird", "Adobe Illustrator (artwork)", "Embroidery Machine Software"],
    modules: [
      {
        title: "Module 1: Digitizing Basics",
        topics: ["Software Interface", "Stitch Types", "Underlay & Density", "Color Sequencing"],
      },
      {
        title: "Module 2: Design Digitization",
        topics: ["Lettering & Logos", "Complex Artwork Digitizing", "Auto vs Manual Digitizing", "File Formats"],
      },
      {
        title: "Module 3: Machine Operations",
        topics: ["Machine Setup", "Hooping Techniques", "Thread & Fabric Selection", "Running Test Stitches"],
      },
      {
        title: "Module 4: Troubleshooting & Quality",
        topics: ["Common Errors & Fixes", "Quality Checks", "Editing Existing Designs", "Resizing Designs"],
      },
      {
        title: "Module 5: Business Setup",
        topics: ["Pricing Embroidery Work", "Finding Clients", "Order Management", "Scaling a Home Business"],
      },
    ],
  },
  {
    slug: "flutter-app-development",
    title: "Flutter App Development",
    icon: FaMobileAlt,
    duration: "3 Months",
    description:
      "Build cross-platform mobile apps for Android & iOS using Flutter and Dart — from UI design to publishing on app stores.",
    outcomes: ["Mobile App Developer", "Flutter Developer", "Cross-Platform Engineer"],
    internship: true,
    level: "Intermediate",
    category: "Mobile Development",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Write Dart programming fundamentals",
      "Build responsive UIs with Flutter widgets",
      "Manage app state with Provider / Riverpod",
      "Connect apps to APIs and Firebase",
      "Implement navigation and authentication",
      "Publish apps to Play Store & App Store",
    ],
    prerequisites: [
      "Basic programming knowledge (any language)",
      "Logical thinking and problem-solving interest",
      "A computer capable of running Android Studio",
    ],
    tools: ["Flutter SDK", "Dart", "Android Studio / VS Code", "Firebase", "Git & GitHub", "Postman"],
    modules: [
      {
        title: "Module 1: Dart Programming",
        topics: ["Variables & Functions", "OOP in Dart", "Async Programming", "Collections"],
      },
      {
        title: "Module 2: Flutter UI Basics",
        topics: ["Widgets & Layouts", "Navigation & Routing", "Forms & Input", "Styling & Themes"],
      },
      {
        title: "Module 3: State Management",
        topics: ["setState Basics", "Provider", "Riverpod / Bloc Overview", "App Architecture"],
      },
      {
        title: "Module 4: Backend Integration",
        topics: ["REST API Integration", "Firebase Auth & Firestore", "Push Notifications", "Local Storage"],
      },
      {
        title: "Module 5: Publishing & Project",
        topics: ["App Icons & Splash Screens", "Play Store Publishing", "App Store Basics", "Final Capstone App"],
      },
    ],
  },
  {
    slug: "blockchain-development",
    title: "BlockChain Development",
    icon: FaLink,
    duration: "3 Months",
    description:
      "Introduction to Blockchain & Web3 development — smart contracts, Solidity programming and decentralized application (dApp) basics.",
    outcomes: ["Blockchain Developer (Junior)", "Smart Contract Developer", "Web3 Enthusiast"],
    internship: true,
    level: "Intermediate",
    category: "Blockchain & Web3",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Understand blockchain fundamentals and how it works",
      "Write and deploy smart contracts in Solidity",
      "Use Ethereum development tools and testnets",
      "Build simple decentralized applications (dApps)",
      "Connect smart contracts to frontends with Web3.js",
      "Understand wallets, gas fees and security basics",
    ],
    prerequisites: [
      "Basic programming knowledge (JavaScript helpful)",
      "Interest in cryptocurrency and Web3",
      "Basic understanding of web development",
    ],
    tools: ["Solidity", "Remix IDE", "Hardhat / Truffle", "MetaMask", "Web3.js / Ethers.js", "Ethereum Testnets"],
    modules: [
      {
        title: "Module 1: Blockchain Fundamentals",
        topics: ["How Blockchain Works", "Cryptography Basics", "Bitcoin vs Ethereum", "Wallets & Transactions"],
      },
      {
        title: "Module 2: Solidity Programming",
        topics: ["Solidity Syntax", "Smart Contract Structure", "Functions & Modifiers", "Remix IDE Practice"],
      },
      {
        title: "Module 3: Smart Contract Development",
        topics: ["ERC-20 Tokens", "Contract Testing", "Hardhat / Truffle Setup", "Deploying to Testnets"],
      },
      {
        title: "Module 4: dApp Development",
        topics: ["Web3.js / Ethers.js", "Connecting MetaMask", "Building a Simple dApp", "Frontend Integration"],
      },
      {
        title: "Module 5: Security & Career",
        topics: ["Common Vulnerabilities", "Gas Optimization", "Web3 Career Paths", "Capstone Project"],
      },
    ],
  },
  {
    slug: "forex-trading",
    title: "Forex Trading",
    icon: FaCoins,
    duration: "6 Weeks",
    description:
      "Learn the fundamentals of Forex trading — market analysis, trading strategies and risk management for building a trading career.",
    outcomes: ["Forex Trader", "Market Analyst (Junior)", "Independent Investor"],
    internship: false,
    level: "Beginner",
    category: "Finance & Trading",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Understand how the Forex market works",
      "Read charts using technical analysis",
      "Apply fundamental analysis to currency pairs",
      "Develop and backtest trading strategies",
      "Manage risk and position sizing",
      "Use trading platforms confidently",
    ],
    prerequisites: [
      "Basic computer and internet skills",
      "Interest in finance and markets",
      "No prior trading experience required",
    ],
    tools: ["MetaTrader 4/5", "TradingView", "Economic Calendar Tools", "Demo Trading Accounts"],
    modules: [
      {
        title: "Module 1: Forex Market Basics",
        topics: ["Currency Pairs", "Market Participants", "Pips, Lots & Leverage", "Trading Sessions"],
      },
      {
        title: "Module 2: Technical Analysis",
        topics: ["Chart Types & Patterns", "Support & Resistance", "Indicators (RSI, MACD, MA)", "Trend Analysis"],
      },
      {
        title: "Module 3: Fundamental Analysis",
        topics: ["Economic Indicators", "News Trading", "Central Bank Policies", "Market Sentiment"],
      },
      {
        title: "Module 4: Strategy & Risk Management",
        topics: ["Building a Trading Plan", "Risk-Reward Ratio", "Stop Loss & Take Profit", "Backtesting Strategies"],
      },
      {
        title: "Module 5: Practical Trading",
        topics: ["Demo Account Practice", "Trading Psychology", "Journal Keeping", "Path to Live Trading"],
      },
    ],
  },
  {
    slug: "ethical-hacking-penetration-testing",
    title: "Ethical Hacking & Penetration Testing",
    icon: FaUserSecret,
    duration: "3 Months",
    description:
      "Hands-on Ethical Hacking & Penetration Testing program — learn to find and exploit vulnerabilities legally using industry-standard tools.",
    outcomes: ["Penetration Tester (Junior)", "Ethical Hacker", "Security Researcher"],
    internship: true,
    level: "Intermediate to Advanced",
    category: "Cyber Security",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Set up and use a penetration testing lab",
      "Perform reconnaissance and information gathering",
      "Exploit common web application vulnerabilities",
      "Use Metasploit for exploitation and post-exploitation",
      "Write professional penetration test reports",
      "Follow ethical and legal hacking guidelines",
    ],
    prerequisites: [
      "Basic networking and Linux knowledge",
      "Understanding of cybersecurity fundamentals",
      "Strong ethical commitment",
    ],
    tools: ["Kali Linux", "Burp Suite", "Metasploit", "Nmap", "OWASP ZAP", "Wireshark"],
    modules: [
      {
        title: "Module 1: Pentest Foundations",
        topics: ["Lab Setup with Kali Linux", "Pentest Methodology", "Legal & Ethical Guidelines", "Information Gathering"],
      },
      {
        title: "Module 2: Network Penetration Testing",
        topics: ["Scanning with Nmap", "Vulnerability Scanning", "Exploiting Network Services", "Privilege Escalation"],
      },
      {
        title: "Module 3: Web Application Hacking",
        topics: ["OWASP Top 10", "SQL Injection", "XSS & CSRF", "Burp Suite Practice"],
      },
      {
        title: "Module 4: Exploitation & Post-Exploitation",
        topics: ["Metasploit Framework", "Reverse Shells", "Maintaining Access", "Reporting Lab Findings"],
      },
      {
        title: "Module 5: Reporting & Career",
        topics: ["Writing Pentest Reports", "Bug Bounty Basics", "Security Certification Paths", "Capstone Lab Project"],
      },
    ],
  },
  {
    slug: "advanced-google-ads",
    title: "Advanced Google Ads",
    icon: FaGoogle,
    duration: "6 Weeks",
    description:
      "Master Google Ads — search, display, shopping and YouTube campaigns with conversion tracking and budget optimization for real clients.",
    outcomes: ["Google Ads Specialist", "PPC Manager", "Digital Marketing Freelancer"],
    internship: true,
    level: "Intermediate",
    category: "Digital Marketing",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Set up and structure Google Ads campaigns",
      "Run Search, Display, Shopping & YouTube ads",
      "Perform keyword research and bidding strategies",
      "Set up conversion tracking with Google Tag Manager",
      "Optimize campaigns for ROI",
      "Get Google Ads certified",
    ],
    prerequisites: [
      "Basic digital marketing knowledge",
      "Google account for hands-on practice",
      "Interest in advertising and analytics",
    ],
    tools: ["Google Ads", "Google Tag Manager", "Google Analytics 4", "Google Merchant Center", "Keyword Planner"],
    modules: [
      {
        title: "Module 1: Google Ads Foundations",
        topics: ["Account Structure", "Campaign Types Overview", "Keyword Research", "Ad Copywriting"],
      },
      {
        title: "Module 2: Search & Display Campaigns",
        topics: ["Search Campaign Setup", "Display Network Targeting", "Bidding Strategies", "Ad Extensions"],
      },
      {
        title: "Module 3: Shopping & YouTube Ads",
        topics: ["Merchant Center Setup", "Shopping Campaigns", "YouTube Ad Formats", "Video Campaign Targeting"],
      },
      {
        title: "Module 4: Tracking & Analytics",
        topics: ["Conversion Tracking Setup", "Google Tag Manager", "GA4 Integration", "Reporting Dashboards"],
      },
      {
        title: "Module 5: Optimization & Certification",
        topics: ["Campaign Optimization", "A/B Testing Ads", "Budget Management", "Google Ads Certification Prep"],
      },
    ],
  },
  {
    slug: "seo-search-engine-optimization",
    title: "Search Engine Optimization (SEO)",
    icon: FaSearch,
    duration: "6 Weeks",
    description:
      "In-depth SEO training — keyword research, on-page, off-page and technical SEO to rank websites on Google organically.",
    outcomes: ["SEO Specialist", "SEO Freelancer", "Content & SEO Strategist"],
    internship: true,
    level: "Beginner to Intermediate",
    category: "Digital Marketing",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Conduct keyword research for any niche",
      "Optimize on-page elements for ranking",
      "Build quality backlinks (off-page SEO)",
      "Audit and fix technical SEO issues",
      "Use SEO tools for tracking and reporting",
      "Run local SEO campaigns for businesses",
    ],
    prerequisites: [
      "Basic computer and internet skills",
      "Basic understanding of websites",
      "Interest in digital marketing",
    ],
    tools: ["Google Search Console", "Google Analytics", "SEMrush / Ahrefs", "Yoast SEO", "Screaming Frog", "Google My Business"],
    modules: [
      {
        title: "Module 1: SEO Foundations",
        topics: ["How Search Engines Work", "Keyword Research", "Competitor Analysis", "SEO Strategy Planning"],
      },
      {
        title: "Module 2: On-Page SEO",
        topics: ["Title Tags & Meta Descriptions", "Content Optimization", "Internal Linking", "Image & URL Optimization"],
      },
      {
        title: "Module 3: Off-Page SEO",
        topics: ["Backlink Building", "Guest Posting", "Social Signals", "Outreach Strategies"],
      },
      {
        title: "Module 4: Technical SEO",
        topics: ["Site Speed Optimization", "Mobile-Friendliness", "XML Sitemaps & Robots.txt", "Site Audits with Screaming Frog"],
      },
      {
        title: "Module 5: Local SEO & Reporting",
        topics: ["Google My Business Optimization", "Local Citations & Reviews", "Rank Tracking & Reporting", "Client Case Studies"],
      },
    ],
  },
  {
    slug: "youtube-monetization",
    title: "YouTube Monetization",
    icon: FaYoutube,
    duration: "1 Month",
    description:
      "Build and monetize a YouTube channel — content strategy, SEO, monetization methods and growth tactics for creators.",
    outcomes: ["YouTube Content Creator", "Channel Growth Strategist", "Online Income Earner"],
    internship: false,
    level: "Beginner",
    category: "Digital Marketing",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Plan and brand a YouTube channel",
      "Optimize videos for YouTube SEO",
      "Create engaging thumbnails and titles",
      "Understand YouTube Partner Program requirements",
      "Explore multiple monetization streams",
      "Analyze channel performance with YouTube Analytics",
    ],
    prerequisites: [
      "Basic computer and smartphone skills",
      "Interest in content creation",
      "A camera/smartphone for recording (helpful)",
    ],
    tools: ["YouTube Studio", "Canva (thumbnails)", "TubeBuddy / VidIQ", "CapCut / Premiere Pro", "YouTube Analytics"],
    modules: [
      {
        title: "Module 1: Channel Setup & Strategy",
        topics: ["Niche Selection", "Channel Branding", "Content Planning", "Competitor Research"],
      },
      {
        title: "Module 2: YouTube SEO",
        topics: ["Keyword Research for YouTube", "Titles, Tags & Descriptions", "Thumbnails that Convert", "Using TubeBuddy / VidIQ"],
      },
      {
        title: "Module 3: Content Production",
        topics: ["Recording Basics", "Editing for Retention", "Adding Captions & Cards", "Upload Best Practices"],
      },
      {
        title: "Module 4: Monetization Methods",
        topics: ["YouTube Partner Program", "AdSense Setup", "Sponsorships & Affiliate Marketing", "Memberships & Super Chat"],
      },
      {
        title: "Module 5: Growth & Analytics",
        topics: ["YouTube Analytics Deep Dive", "Audience Retention Strategies", "Cross-Promotion", "Scaling the Channel"],
      },
    ],
  },
  {
    slug: "mern-stack-development",
    title: "MERN Stack Web Development",
    icon: FaLayerGroup,
    duration: "3 Months + 1 Month Internship",
    description:
      "Advanced full-stack development with the MERN stack — MongoDB, Express, React and Node.js — building production-grade web applications.",
    outcomes: ["MERN Stack Developer", "Full-Stack Engineer", "Software Engineer"],
    internship: true,
    level: "Intermediate to Advanced",
    category: "Web Development",
    fee: "Ask for Fee",
    whatYouLearn: [
      "Architect full-stack apps with the MERN stack",
      "Design scalable MongoDB schemas",
      "Build secure REST & GraphQL APIs with Express/Node",
      "Develop dynamic frontends with React & Redux",
      "Implement authentication, authorization and testing",
      "Deploy production apps to the cloud",
    ],
    prerequisites: [
      "JavaScript fundamentals (ES6+)",
      "Basic understanding of HTML/CSS",
      "Familiarity with React basics is a plus",
    ],
    tools: ["MongoDB Atlas", "Express.js", "React.js", "Node.js", "Redux / Context API", "Docker (basics)", "AWS / Render"],
    modules: [
      {
        title: "Module 1: Advanced JavaScript & Node",
        topics: ["ES6+ Deep Dive", "Async Patterns", "Node.js Core Modules", "NPM Ecosystem"],
      },
      {
        title: "Module 2: Express & MongoDB",
        topics: ["REST API Design", "Express Middleware", "MongoDB Schema Design", "Mongoose Relationships"],
      },
      {
        title: "Module 3: Advanced React",
        topics: ["Hooks Deep Dive", "Redux / Context State Management", "Performance Optimization", "Component Architecture"],
      },
      {
        title: "Module 4: Auth, Testing & Security",
        topics: ["JWT & OAuth", "Role-Based Access Control", "Unit & Integration Testing", "Security Best Practices"],
      },
      {
        title: "Module 5: Deployment & Capstone",
        topics: ["Dockerizing the App", "CI/CD Basics", "Cloud Deployment (AWS/Render)", "Full Capstone Project"],
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
