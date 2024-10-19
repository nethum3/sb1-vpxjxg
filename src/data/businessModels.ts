import { BusinessModel } from '../types';

export const businessModels: BusinessModel[] = [
  {
    name: "E-commerce Store",
    skills: ["Digital Marketing", "Inventory Management", "Customer Service"],
    budget: { min: 5000, max: 20000 },
    growthStrategy: [
      "Expand product range",
      "Implement loyalty program",
      "Optimize for mobile shopping"
    ]
  },
  {
    name: "Freelance Writing",
    skills: ["Writing", "Editing", "Research", "Time Management"],
    budget: { min: 500, max: 2000 },
    growthStrategy: [
      "Specialize in niche topics",
      "Build a strong portfolio",
      "Network with potential clients"
    ]
  },
  {
    name: "Mobile App Development",
    skills: ["Programming", "UI/UX Design", "Project Management"],
    budget: { min: 10000, max: 50000 },
    growthStrategy: [
      "Focus on user acquisition",
      "Implement monetization strategies",
      "Regularly update and improve the app"
    ]
  }
];