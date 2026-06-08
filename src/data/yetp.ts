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
    duration: "3 Months + 1-Month Internship",
    description: "Planned with a 1-Month internship for entire trainees by industrial & Marketing Experts with maximum experience in the Digital Marketing field. 100% Hands-On Training included with Labs.",
    outcomes: ["Performance Marketer", "Growth Lead", "SEO Specialist"],
    internship: true,
  },
  {
    slug: "premium-graphic-designing",
    title: "Premium Graphic Designing",
    icon: FaPalette,
    duration: "3 Months + 1-Month Internship",
    description: "Premium Creative Designing program by industrial Experts with maximum experience in the Creative Designing field. 100% Hands-On Training included with Labs.",
    outcomes: ["Brand Designer", "Visual Designer", "Freelance Creative"],
    internship: true,
  },
  {
    slug: "shopify-daraz",
    title: "Shopify & Daraz",
    icon: FaShoppingCart,
    duration: "3 Months",
    description: "Daraz & Shopify Program by industrial VA Experts with maximum experience in the freelancing field. Practical, hands-on learning environment.",
    outcomes: ["Ecom Manager", "Store Owner", "Daraz Seller"],
    internship: true,
  },
  {
    slug: "amazon-va",
    title: "Amazon VA",
    icon: FaAmazon,
    duration: "3 Months",
    description: "Amazon Virtual Assistant Program by industrial VA Experts with maximum experience in the freelancing field. Practical, hands-on learning environment.",
    outcomes: ["Amazon VA", "FBA Specialist", "Account Manager"],
    internship: true,
  },
  {
    slug: "ui-ux-designing",
    title: "UI/UX Designing",
    icon: FaPaintBrush,
    duration: "2 Months + 1-Month Internship",
    description: "UI/UX Designing program by industrial & Software House Experts with maximum experience in the Creative Designing field. 100% Hands-On Training included with Labs.",
    outcomes: ["Product Designer", "UX Researcher", "Design Systems"],
    internship: true,
  },
  {
    slug: "react-node-js",
    title: "React & Node JS",
    icon: FaReact,
    duration: "3 Months",
    description: "Web Development program by Software House & industrial Experts with maximum experience in the Web Development field. Practical, hands-on learning.",
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
  { name: "Junaid Iqbal", course: "Premium Graphic Designing", rating: 5, quote: "I took the premium graphic design course from YETP. After completing it, YETP offered me an internship — I worked on Lucky Cement Faisalabad, GTA Homes, Stralent Brand Management and YETP's own branding. If you want a strong foundation for a future career in graphic design, YETP is the perfect choice." },
  { name: "Nayab Mirza", course: "Full Stack Digital Marketing", rating: 5, quote: "YETP is a very good institute for students who want to learn good skills. I'm doing the Digital Marketing course and I'm learning so many things." },
  { name: "Tahir Ghaffar", course: "Web Design", rating: 5, quote: "I recently completed the web design program at YETP. Instructors were highly knowledgeable and passionate. The curriculum was comprehensive with real-world examples. Facilities were well-equipped and staff was always helpful — I'd highly recommend it." },
  { name: "Faiza Maryam", course: "Premium Graphic Designing", rating: 5, quote: "I recently joined this institute as a graphic design student. It's the best opportunity to polish your skills. The teaching methodology is great for online and physical students — and the fee is very affordable. Come, learn and earn." },
];

export const founders = [
  { name: "Engr. Waqar Rao", role: "Founder & CEO, YETP", bio: "Leading YETP's mission to empower Pakistan's youth through industry-grade training and entrepreneurship." },
  { name: "Engr. Umair Iftikhar", role: "Co-Founder & COO, YETP", bio: "Driving operations, curriculum and nationwide internship partnerships at YETP." },
];

export const partners = [
  { name: "Lucky Cement", logo: "https://yetp.pk/wp-content/uploads/2024/05/Lucky-cement.jpg" },
  { name: "Techbuzz", logo: "https://yetp.pk/wp-content/uploads/2024/05/Techbuzz.jpg" },
  { name: "Locatio99", logo: "https://yetp.pk/wp-content/uploads/2024/05/Locatio99.jpg" },
  { name: "Stralent", logo: "https://yetp.pk/wp-content/uploads/2024/05/Stralent-update.jpg" },
  { name: "Sublime", logo: "https://yetp.pk/wp-content/uploads/2024/05/Sublime-update.jpg" },
  { name: "XpertPrime", logo: "https://yetp.pk/wp-content/uploads/2024/05/XpertPrime-update.jpg" },
  { name: "GTA Homes", logo: "https://yetp.pk/wp-content/uploads/2024/05/GTA.jpg" },
];

export const pillars = [
  { title: "Skills Development", desc: "Industry-grade, hands-on curriculum." },
  { title: "Equal Opportunities", desc: "Talent first. Background second." },
  { title: "Scholarships", desc: "Up to Rs.100,000 per deserving student." },
  { title: "6-Figure Careers", desc: "Local jobs, remote roles and freelancing." },
];
