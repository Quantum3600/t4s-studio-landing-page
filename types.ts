export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface PortfolioItem {
  id: string;
  name: string;
  description: string;
  category: string;
  color: "red" | "blue" | "green" | "purple";
  accentHex: string;
  image: string;
  githubUrl: string;
}

export interface AiResponse {
  analysis: string;
  stackRecommendation: string[];
  complexity: "Low" | "Medium" | "High" | "Extreme";
  technicalNotes: string;
}
