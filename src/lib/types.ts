export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: "Social Media Ads" | "Search & PPC" | "E-Commerce" | "AI Marketing" | "Strategy";
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
  courseTitle: string;
  testimonial: string;
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
