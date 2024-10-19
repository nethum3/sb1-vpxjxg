export interface BusinessModel {
  name: string;
  skills: string[];
  budget: {
    min: number;
    max: number;
  };
  growthStrategy: string[];
}

export interface BusinessModelOutput {
  title: string;
  description: string;
  skills: string[];
  budget: {
    min: number;
    max: number;
  };
  growthStrategy: string[];
  weeklyTasks: string[];
  trendChart: {
    labels: string[];
    data: number[];
  };
  successChart: {
    labels: string[];
    data: number[];
  };
}

export interface User {
  isPro: boolean;
}