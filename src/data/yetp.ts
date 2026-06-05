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
    duration: "6 Months",
    description: "Master SEO, SEM, social, content, analytics and paid media end-to-end with live campaign work.",
    outcomes: ["Performance Marketer", "Growth Lead", "SEO Specialist"],
    internship: true,
  },
  {
    slug: "premium-graphic-designing",
    title: "Premium Graphic Designing",
    icon: FaPalette,
    duration: "4 Months",
    description: "Brand identity, typography, layout and motion — built in Figma, Illustrator and After Effects.",
    outcomes: ["Brand Designer", "Visual Designer", "Freelance Creative"],
    internship: true,
  },
  {
    slug: "shopify-daraz",
    title: "Shopify & Daraz",
    icon: FaShoppingCart,
    duration: "3 Months",
    description: "Launch and scale stores on Shopify & Daraz — product research, listings, ads and operations.",
    outcomes: ["Ecom Manager", "Store Owner", "Daraz Seller"],
    internship: true,
  },
  {
    slug: "amazon-va",
    title: "Amazon VA",
    icon: FaAmazon,
    duration: "4 Months",
    description: "Become a high-earning Amazon Virtual Assistant — PL, wholesale, FBA and account management.",
    outcomes: ["Amazon VA", "FBA Specialist", "Account Manager"],
    internship: true,
  },
  {
    slug: "ui-ux-designing",
    title: "UI/UX Designing",
    icon: FaPaintBrush,
    duration: "5 Months",
    description: "Research, wireframes, prototyping and design systems — ship portfolio-grade product work.",
    outcomes: ["Product Designer", "UX Researcher", "Design Systems"],
    internship: true,
  },
  {
    slug: "react-node-js",
    title: "React & Node JS",
    icon: FaReact,
    duration: "6 Months",
    description: "Full-stack JavaScript — React, Node, APIs, databases and deployment to real production.",
    outcomes: ["Full-Stack Dev", "Frontend Engineer", "API Engineer"],
    internship: true,
  },
];

export const stats = [
  { value: "3+", label: "Years of Excellence" },
  { value: "6", label: "Premium Courses" },
  { value: "Rs.100K", label: "Scholarship" },
  { value: "1M", label: "Youth Training Goal" },
  { value: "#1", label: "IT Institute in Pakistan" },
];

export const features = [
  { icon: FaIndustry, title: "Industrial Experts", desc: "Trainers from real industry — not classroom-only academics." },
  { icon: FaLaptopCode, title: "100% Hands-On Training", desc: "Build real projects from week one. No passive lectures." },
  { icon: FaMoneyBillWave, title: "Minimal Fee Structure", desc: "World-class curriculum at a fraction of the market rate." },
  { icon: FaRocket, title: "Internship Opportunities", desc: "Guaranteed internships with partner companies and agencies." },
  { icon: FaGlobeAmericas, title: "Global Job Readiness", desc: "Portfolio, English fluency and freelancing for global gigs." },
  { icon: FaHandHoldingHeart, title: "Non-Profit Organization", desc: "Mission-first. Every rupee fuels youth empowerment." },
];

export const testimonials = [
  { name: "Junaid Iqbal", course: "Full Stack Digital Marketing", rating: 5, quote: "YETP didn't just teach me marketing — they made me hire-ready. I landed a remote job in month 5." },
  { name: "Nayab Mirza", course: "UI/UX Designing", rating: 5, quote: "The mentors push you like real product teams do. My portfolio finally feels Awwwards-grade." },
  { name: "Tahir Ghaffar", course: "Amazon VA", rating: 5, quote: "From zero to $1.2K/month in client retainers. The internship pipeline is the real deal." },
  { name: "Faiza Maryam", course: "Premium Graphic Designing", rating: 5, quote: "Three years of self-study did less for me than one quarter at YETP. Worth every minute." },
];

export const founders = [
  { name: "Engr. Waqar Rao", role: "Founder & CEO", bio: "Engineer-turned-educator on a mission to industrialize Pakistan's youth talent pipeline." },
  { name: "Engr. Umair Iftikhar", role: "Co-Founder & COO", bio: "Operator behind YETP's curriculum, mentorship and internship partnerships nationwide." },
];

export const pillars = [
  { title: "Skills Development", desc: "Industry-grade, hands-on curriculum." },
  { title: "Equal Opportunities", desc: "Talent first. Background second." },
  { title: "Scholarships", desc: "Up to Rs.100,000 per deserving student." },
  { title: "6-Figure Careers", desc: "Local jobs, remote roles and freelancing." },
];
