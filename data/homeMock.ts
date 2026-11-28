export interface CategoryItem {
  label: string;
  icon: string;
}

export interface EventItem {
  id: number;
  category: string;
  title: string;
  location: string;
  image: string;
  bg: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
}

export interface SponsorItem {
  name: string;
  label: string;
  color: string;
  image: string;
}

export const CATEGORIES: CategoryItem[] = [
  { label: "All", icon: "" },
  { label: "Forum", icon: "/images/chat 1.png" },
  { label: "Seminar", icon: "/images/team 1.png" },
  { label: "Classroom", icon: "/images/education 1.png" },
];

export const EVENTS: EventItem[] = [
  {
    id: 1,
    category: "Seminar",
    title: "ASA PROFESSIONAL\nSEMINAR",
    location: "IMPACT Challenger",
    image: "/images/Rectangle 97.png",
    bg: "linear-gradient(135deg, #7F1D1D 0%, #991B1B 45%, #1F2937 100%)",
  },
  {
    id: 2,
    category: "Forum",
    title: "ASA INTERNATIONAL\nFORUM",
    location: "IMPACT Challenger",
    image: "/images/Rectangle 98.png",
    bg: "linear-gradient(135deg, #1E293B 0%, #334155 50%, #0F172A 100%)",
  },
  {
    id: 3,
    category: "Classroom",
    title: "STORY OF\n3 GENERATIONS",
    location: "Bangkok Midtown Hotel",
    image: "/images/Rectangle 99.png",
    bg: "linear-gradient(135deg, #14532D 0%, #166534 45%, #1E293B 100%)",
  },
];

export const NEWS: NewsItem[] = [
  {
    id: 1,
    title: "Arcasia Thesis of the Year 2026",
    date: "18 Oct 2026",
    image: "/images/Rectangle 56.png",
  },
  {
    id: 2,
    title: "Early Bird Extended",
    date: "15 Oct 2026",
    image: "/images/Rectangle 56 (1).png",
  },
  {
    id: 3,
    title: "Sia Design 2026 Awards",
    date: "10 Oct 2026",
    image: "/images/Rectangle 56 (2).png",
  },
];

export const SPONSORS: SponsorItem[] = [
  {
    name: "TOA",
    label: "TOA",
    color: "#1D4ED8",
    image: "/images/Screenshot 2569-10-28 at 12.29.15 2.png",
  },
  { name: "TODA", label: "TODA", color: "#DC2626", image: "/images/1.png" },
  { name: "DOS", label: "THAMMASORN", color: "#15803D", image: "/images/2.png" },
  { name: "JORAKAY", label: "JORAKAY", color: "#047857", image: "/images/3.png" },
];