/**
 * @fileoverview TypeScript definitions for the Mold Quiz system
 */

export interface QuizState {
  answers: Record<string, string | string[]>;
  email: string;
  name: string;
  score: number;
  profile: string;
  completed: boolean;
}

export interface QuizQuestion {
  id: string;
  title: string;
  description?: string;
  type: 'multiple-choice' | 'multi-select' | 'single-select';
  options: QuizOption[];
  required?: boolean;
}

export interface QuizOption {
  id: string;
  label: string;
  value: string;
  points?: number;
}

export interface QuizProfile {
  id: 'investigator' | 'seeker' | 'learner';
  title: string;
  description: string;
  scoreRange: [number, number];
  recommendations: string[];
  nextSteps: {
    primary: string;
    secondary: string;
    cta: string;
  };
}

export interface QuizContextType {
  quizData: QuizState;
  handleAnswerUpdate: (questionId: string, answer: string | string[]) => void;
  handleEmailCapture: (email: string, name: string) => void;
}

// Question definitions
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'symptoms-neuro',
    title: 'Which of these common "mystery" symptoms have you been experiencing for more than 3 months?',
    description: 'Select all that apply',
    type: 'multi-select',
    options: [
      { id: 'brain-fog', label: 'Brain Fog', value: 'brain-fog' },
      { id: 'chronic-fatigue', label: 'Chronic Fatigue', value: 'chronic-fatigue' },
      { id: 'anxiety', label: 'Unexplained Anxiety', value: 'anxiety' },
      { id: 'memory-issues', label: 'Memory Issues', value: 'memory-issues' },
      { id: 'muscle-aches', label: 'Muscle Aches', value: 'muscle-aches' },
      { id: 'dizziness', label: 'Dizziness', value: 'dizziness' },
    ],
  },
  {
    id: 'symptoms-physical',
    title: 'How about these symptoms?',
    description: 'Select all that apply',
    type: 'multi-select',
    options: [
      { id: 'sinus-issues', label: 'Persistent Sinus Issues', value: 'sinus-issues' },
      { id: 'skin-rashes', label: 'Skin Rashes or Hives', value: 'skin-rashes' },
      { id: 'digestive-problems', label: 'Digestive Problems (bloating, etc.)', value: 'digestive-problems' },
      { id: 'sensitivity', label: 'Sensitivity to Light/Sound', value: 'sensitivity' },
      { id: 'metallic-taste', label: 'Metallic Taste', value: 'metallic-taste' },
    ],
  },
  {
    id: 'environmental',
    title: 'Thinking about your primary living space (home/apartment), have you noticed any of the following?',
    description: 'Select all that apply',
    type: 'multi-select',
    options: [
      { id: 'musty-smell', label: 'A musty or damp smell', value: 'musty-smell' },
      { id: 'visible-mold', label: 'Visible mold spots (even small ones)', value: 'visible-mold' },
      { id: 'water-damage', label: 'Past water damage or leaks', value: 'water-damage' },
      { id: 'worse-at-home', label: 'Symptoms feel worse at home vs. outside', value: 'worse-at-home' },
    ],
  },
  {
    id: 'timeline',
    title: 'When did your symptoms seem to start or worsen?',
    type: 'single-select',
    options: [
      { id: 'after-move', label: 'After moving to a new home/apartment', value: 'after-move' },
      { id: 'after-water', label: 'After a water event (flood, leak)', value: 'after-water' },
      { id: 'gradual-decline', label: "They've been a slow, gradual decline", value: 'gradual-decline' },
      { id: 'not-sure', label: "I'm not sure", value: 'not-sure' },
    ],
  },
  {
    id: 'doctor-experience',
    title: 'Have you seen a doctor for these symptoms? If so, what was the result?',
    type: 'single-select',
    options: [
      { id: 'normal-labs', label: 'Yes, but my lab tests came back "normal"', value: 'normal-labs' },
      { id: 'other-diagnosis', label: 'Yes, I was diagnosed with something else (e.g., fibromyalgia, anxiety) but treatment isn\'t helping', value: 'other-diagnosis' },
      { id: 'no-doctor', label: "No, I haven't seen a doctor for these specific issues yet", value: 'no-doctor' },
    ],
  },
];

// Profile definitions
export const QUIZ_PROFILES: Record<string, QuizProfile> = {
  investigator: {
    id: 'investigator',
    title: 'The Investigator',
    description: 'You have a significant number of red flags. It\'s time to investigate further.',
    scoreRange: [7, 10],
    recommendations: [
      'Immediate environmental assessment of your living space',
      'Consider mycotoxin testing to confirm exposure',
      'Begin gentle drainage support while investigating',
      'Document symptoms and timeline for healthcare providers',
    ],
    nextSteps: {
      primary: 'Watch our free masterclass on the "Drainage First" approach',
      secondary: 'Download the Emergency Protocol Guide',
      cta: 'Get the Complete Recovery System',
    },
  },
  seeker: {
    id: 'seeker',
    title: 'The Seeker',
    description: 'You have enough overlapping symptoms and risk factors that mold is a strong possibility.',
    scoreRange: [4, 6],
    recommendations: [
      'Begin with a thorough home inspection',
      'Start tracking symptoms and patterns',
      'Consider basic drainage support',
      'Explore testing options when ready',
    ],
    nextSteps: {
      primary: 'Learn about the connection between your symptoms and environment',
      secondary: 'Get the free "Is It Mold?" checklist',
      cta: 'Explore the Full Program',
    },
  },
  learner: {
    id: 'learner',
    title: 'The Learner',
    description: 'While mold may not be the primary issue, learning about environmental health is still valuable.',
    scoreRange: [1, 3],
    recommendations: [
      'Focus on general environmental health',
      'Monitor symptoms and living conditions',
      'Learn about prevention strategies',
      'Consider other root causes for your symptoms',
    ],
    nextSteps: {
      primary: 'Explore environmental health fundamentals',
      secondary: 'Get our prevention guide',
      cta: 'Learn More About Root Causes',
    },
  },
};
