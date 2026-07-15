export interface Program {
  id: string;
  name: string;
  category: "salud" | "ingenieria" | "social" | "creativo" | "negocios";
  description: string;
  duration: string; // e.g. "5 años"
  modality: "Presencial" | "Semipresencial";
  skillsLearned: string[];
  fieldHighlights: string[];
}

export interface University {
  id: string;
  name: string;
  abbreviation: string;
  logoUrl?: string;
  accentColor: string;
  description: string;
  website: string;
  programs: Program[];
}

export interface Registration {
  id: string;
  studentName: string;
  studentEmail: string;
  studentAge: number;
  studentPhone: string;
  highSchool: string;
  universityId: string;
  universityName: string;
  programId: string;
  programName: string;
  registrationDate: string;
  status: "Pendiente" | "Confirmado" | "En Curso";
  voucherCode: string;
  answersSummary?: {
    preferredArea: string;
    bitRecommendation: string;
  };
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface VocationalQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    score: "salud" | "ingenieria" | "social" | "creativo" | "negocios";
  }[];
}
