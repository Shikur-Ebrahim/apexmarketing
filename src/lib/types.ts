export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: "TikTok" | "Facebook & Instagram" | "Telegram & WhatsApp" | "YouTube" | "E-Commerce" | "AI Marketing";
  targetAudience: "For Beginners (Zero Capital)" | "For Business Owners" | "For Both";
  platformBadge: "TikTok" | "Facebook" | "Instagram" | "Telegram" | "YouTube" | "E-Commerce";
  earningPotential: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  instructor: string;
  instructorRole: string;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  price: number;
  originalPrice: number;
  duration: string;
  lessonsCount: number;
  featured: boolean;
  modules: {
    title: string;
    lessons: string[];
  }[];
}

export interface StudentEvidence {
  id: string;
  studentName: string;
  avatar: string;
  resultTitle: string;
  metric: string;
  metricType: "Revenue" | "ROAS" | "Growth" | "Leads";
  platform?: string;
  targetAudience?: "Beginner (Zero Capital)" | "Business Owner";
  courseTitle: string;
  testimonial: string;
  howTheyDidIt?: string[];
  proofImageUrl?: string;
  date: string;
  verified: boolean;
}

export interface UserActivity {
  id: string;
  name: string;
  email: string;
  course: string;
  progress: number;
  lastActive: string;
  status: "Active" | "Completed" | "Pending";
  joinedDate: string;
}
