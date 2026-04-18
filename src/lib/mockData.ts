// src/lib/mockData.ts

export type UserPlan = "basic" | "premium" | "yearly";

export interface User {
  id: string;
  name: string;
  email: string;
  plan: UserPlan;
}

export const currentUser: User = {
  id: "u_12345",
  name: "Angel",
  email: "angel@example.com",
  plan: "premium", // Toggle this to 'basic' to test restrictions
};

export const MOCK_COURSES = [
  {
    id: "c_1",
    title: "Content Mastery 101",
    description: "Learn how to write high-converting copy and grow an audience.",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    modules: 12,
    locked: false,
  },
  {
    id: "c_2",
    title: "Audience Monetization",
    description: "Turn your audience into a predictable revenue stream.",
    thumbnail: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80",
    modules: 8,
    locked: false, // For premium users
  },
  {
    id: "c_3",
    title: "Advanced Viral Hooks",
    description: "The secret framework to making any piece of content go viral.",
    thumbnail: "https://images.unsplash.com/photo-1616469829581-73993eb8afb0?w=800&q=80",
    modules: 5,
    locked: true, // Drip content or higher tier
  },
];

export const MOCK_CALLS = [
  {
    id: "call_1",
    title: "Weekly Hot Seats & Q&A",
    date: "Next Tuesday, 2:00 PM EST",
    link: "#",
  },
  {
    id: "call_2",
    title: "Guest Speaker: Content Scaling",
    date: "Next Thursday, 4:00 PM EST",
    link: "#",
  },
];
