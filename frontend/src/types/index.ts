export enum Language {
  EN = "English",
  HI = "Hindi",
  MR = "Marathi",
}

export interface User {
  username: string;
  email: string;
  region: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
}

export interface NotificationState {
  id: string;
  message: string;
  type: "success" | "error";
}

export enum MarketplaceCategory {
  Crops = "crops",
  Fertilizers = "fertilizers",
  Machineries = "machineries",
  Chemicals = "chemicals",
}

export interface Product {
  id: string;
  category: MarketplaceCategory;
  name: string;
  price: number;
  image: string;
  unit: string;
  quantity?: number;
  expiryDate?: string;
  sellOrRent?: "sell" | "rent";
  sellerName?: string; // ← ADD THIS
  sellerPhone?: string; // ← ADD THIS
  description?: string; // ← ADD THIS
}

export interface DiseaseDetectionResult {
  diseaseName: string;
  confidence: number;
  treatments: string[];
  preventions: string[];
}

export interface GovernmentScheme {
  id: string;
  title: { [key in Language]: string };
  description: { [key in Language]: string };
  eligibility: { [key in Language]: string };
  benefits: { [key in Language]: string };
  link: string;
}
