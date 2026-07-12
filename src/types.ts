export interface Service {
  id: string;
  name: string;
  description: string;
  startingPrice?: string;
  image: string;
  category: string;
}

export interface PortfolioItem {
  id: string;
  url: string;
  title: string;
  category: string;
  description: string;
  location: string;
  aspectRatio: "portrait" | "landscape" | "square";
  noFilter?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  image?: string;
  rating: number;
}

export interface Booking {
  name: string;
  email: string;
  phone: string;
  shootType: string;
  preferredDate: string;
  location?: string;
  additionalRequirements?: string;
  message: string;
}

export interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
}
