import {
  FaBullhorn, FaPalette, FaShoppingCart, FaAmazon, FaPaintBrush, FaReact,
  FaIndustry, FaLaptopCode, FaMoneyBillWave, FaRocket, FaGlobeAmericas, FaHandHoldingHeart,
} from "react-icons/fa";
import type { IconType } from "react-icons";

export type Course = {
  slug: string;
  title: string;
  icon: IconType;
  duration: string;
  description: string;
  outcomes: string[];
  internship: boolean;
};

export const courses: Course[] = [
  {
    slug: "full-stack-digital-marketing",
    title: "Full Stack Digital Marketing",
    icon: FaBullhorn,
    duration: "3 Months + 1 Month Internship",
    description: "Planned with a 1-Month internship by industrial & Marketing Experts. 100% Hands-On Training with Labs covering SEO, SEM, social media, content and paid media.",
    outcomes: ["Performance Marketer", "Growth Lead", "SEO Specialist"],
    internship: true,
  },
  {
    slug: "premium-graphic-designing",
    title: "Premium Graphic Designing",
    icon: FaPalette,
    duration: "3 Months + 1 Month Internship",
    description: "Creative Designing training by industrial Experts. Brand identity, typography, layout — built in Figma, Illustrator & After Effects. 100% Hands-On with Labs.",
    outcomes: ["Brand Designer", "Visual Designer", "Freelance Creative"],
    internship: true,
  },
  {
    slug: "shopify-daraz",
    title: "Shopify & Daraz",
    icon: FaShoppingCart,
    duration: "3 Months",
    description: "Complete Daraz & Shopify Program by VA Experts. Product research, listings, ads, operations — practical hands-on learning environment.",
    outcomes: ["Ecom Manager", "Store Owner", "Daraz Seller"],
    internship: true,
  },
  {
    slug: "amazon-va",
    title: "Amazon VA",
    icon: FaAmazon,
    duration: "3 Months",
    description: "Amazon Virtual Assistant Program by VA Experts with maximum experience in freelancing. PL, wholesale, FBA and account management — practical environment.",
    outcomes: ["Amazon VA", "FBA Specialist", "Account Manager"],
    internship: true,
  },
  {
    slug: "ui-ux-designing",
    title: "UI/UX Designing",
    icon: FaPaintBrush,
    duration: "2 Months + 1 Month Internship",
    description: "UIUX Designing program by Software Houses & industrial Experts. Research, wireframes, prototyping and design systems — portfolio-grade product work.",
    outcomes: ["Product Designer", "UX Researcher", "Design Systems"],
    internship: true,
  },
  {
    slug: "react-node-js",
    title: "React & Node JS",
    icon: FaReact,
    duration: "3 Months",
    description: "Web Development program by Software Houses & industrial Experts. Full-stack JavaScript — React, Node, APIs, databases and deployment to production.",
    outcomes: ["Full-Stack Dev", "Frontend Engineer", "API Engineer"],
    internship: true,
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
  { icon: FaHandHoldingHeart, title: "Rs.100K Scholarship", desc: "Up to Rs.100,000 scholarship available for deserving youth. Limited seats." },
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
  { title: "Rs.100K Scholarships", desc: "Up to Rs.100,000 per deserving student — no one left behind." },
  { title: "4.0 Industrial Revolution", desc: "Training youth in technologies that shape Pakistan's future." },
];

export const partners = [
  { name: "Sublime", abbr: "SB" },
  { name: "XpertPrime", abbr: "XP" },
  { name: "GTA Homes", abbr: "GTA" },
  { name: "Lucky Cement", abbr: "LC" },
];
