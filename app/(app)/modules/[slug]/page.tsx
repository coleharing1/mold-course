'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ModuleResources } from '@/components/modules/module-resources'
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  CheckCircle, 
  PlayCircle,
  Lock,
  FileText,
  Video,
  HelpCircle,
  Download,
  ChevronRight,
  Target,
  AlertCircle,
  Shield,
  Activity,
  AlertTriangle
} from 'lucide-react'

// Mock data - will come from Contentlayer
const moduleData = {
  '00-quick-start': {
    title: 'Quick Start Guide',
    description: 'Your first 5 essential steps to begin mold detoxification safely and effectively',
    moduleNumber: 0,
    duration: '30 minutes',
    difficulty: 'beginner',
    category: 'foundation',
    progress: 100,
    objectives: [
      'Understand the immediate safety steps for mold exposure',
      'Learn the foundation of mold detoxification',
      'Set up your recovery environment',
      'Begin basic detox support protocols',
      'Create your recovery tracking system'
    ],
    lessons: [
      {
        id: 1,
        title: 'Stop the Exposure',
        type: 'reading',
        duration: '5 min',
        completed: true,
        description: 'Learn to identify and eliminate mold sources'
      },
      {
        id: 2,
        title: 'Open Drainage Pathways',
        type: 'video',
        duration: '8 min',
        completed: true,
        description: 'Prepare your body for safe detoxification'
      },
      {
        id: 3,
        title: 'Reduce Inflammation',
        type: 'reading',
        duration: '6 min',
        completed: true,
        description: 'Anti-inflammatory strategies for healing'
      },
      {
        id: 4,
        title: 'Bind and Remove Toxins',
        type: 'exercise',
        duration: '7 min',
        completed: true,
        description: 'Introduction to binder protocols'
      },
      {
        id: 5,
        title: 'Track Your Progress',
        type: 'quiz',
        duration: '4 min',
        completed: true,
        description: 'Set up your recovery tracking system'
      }
    ],
    resources: [
      { title: 'Exposure Checklist PDF', type: 'pdf', size: '245 KB' },
      { title: 'Symptom Tracker Template', type: 'excel', size: '128 KB' },
      { title: 'Quick Reference Guide', type: 'pdf', size: '512 KB' }
    ],
    nextModule: '01-understanding-mold',
    previousModule: null
  },
  '01-identify-exposure': {
    title: 'Identify Your Exposure',
    description: 'Learn to find and eliminate all sources of mold exposure in your environment',
    moduleNumber: 1,
    duration: '60 minutes',
    difficulty: 'beginner',
    category: 'foundation',
    progress: 0,
    objectives: [
      'Master visual mold identification techniques',
      'Conduct systematic home and workplace assessments',
      'Find hidden mold without destructive testing',
      'Evaluate vehicle and social space contamination',
      'Eliminate dietary sources of mycotoxins',
      'Create comprehensive exposure elimination plan'
    ],
    lessons: [
      {
        id: 1,
        title: 'Visual Inspection Mastery',
        type: 'reading',
        duration: '10 min',
        completed: false,
        description: 'Learn to spot mold like a professional inspector'
      },
      {
        id: 2,
        title: 'Room-by-Room Home Audit',
        type: 'exercise',
        duration: '15 min',
        completed: false,
        description: 'Systematic approach to checking every space'
      },
      {
        id: 3,
        title: 'Hidden Mold Detection',
        type: 'reading',
        duration: '12 min',
        completed: false,
        description: 'Finding mold without destructive testing'
      },
      {
        id: 4,
        title: 'Vehicle Contamination',
        type: 'exercise',
        duration: '10 min',
        completed: false,
        description: 'Cars are often overlooked mold sources'
      },
      {
        id: 5,
        title: 'Workplace & Other Spaces',
        type: 'reading',
        duration: '10 min',
        completed: false,
        description: 'Evaluate all environments you frequent'
      },
      {
        id: 6,
        title: 'Mold in Food Supply',
        type: 'reading',
        duration: '5 min',
        completed: false,
        description: 'Dietary sources of mycotoxin exposure'
      }
    ],
    resources: [
      { title: 'Exposure & Dampness Checklist', type: 'pdf', size: '345 KB' },
      { title: 'Mold Identification Chart', type: 'pdf', size: '892 KB' },
      { title: 'Vehicle Inspection Guide', type: 'pdf', size: '234 KB' },
      { title: 'Food Safety Guidelines', type: 'pdf', size: '156 KB' }
    ],
    nextModule: '02-testing-diagnosis',
    previousModule: '00-quick-start'
  },
  '02-testing-diagnosis': {
    title: 'Testing & Diagnosis',
    description: 'Understand all testing options and make informed decisions about mold and mycotoxin testing',
    moduleNumber: 2,
    duration: '75 minutes',
    difficulty: 'beginner',
    category: 'foundation',
    progress: 0,
    objectives: [
      'Understand environmental testing options (ERMI, HERTSMI-2)',
      'Learn about DIY testing methods and their limitations',
      'Navigate medical testing for mycotoxins in your body',
      'Interpret biomarker tests that indicate mold illness',
      'Use VCS testing as a screening tool',
      'Understand genetic susceptibility factors'
    ],
    lessons: [
      {
        id: 1,
        title: 'Environmental Testing Overview',
        type: 'reading',
        duration: '15 min',
        completed: false,
        description: 'Understanding home and building tests'
      },
      {
        id: 2,
        title: 'DIY Testing Methods',
        type: 'exercise',
        duration: '10 min',
        completed: false,
        description: 'Affordable testing you can do yourself'
      },
      {
        id: 3,
        title: 'Medical Testing - Mycotoxins',
        type: 'reading',
        duration: '15 min',
        completed: false,
        description: 'Testing for mold in your body'
      },
      {
        id: 4,
        title: 'Biomarker Testing',
        type: 'reading',
        duration: '15 min',
        completed: false,
        description: 'Blood tests that indicate CIRS/mold illness'
      },
      {
        id: 5,
        title: 'VCS Testing',
        type: 'exercise',
        duration: '10 min',
        completed: false,
        description: 'Visual Contrast Sensitivity as screening tool'
      },
      {
        id: 6,
        title: 'Genetic Testing - HLA-DR',
        type: 'reading',
        duration: '10 min',
        completed: false,
        description: 'Understanding genetic susceptibility'
      }
    ],
    resources: [
      { title: 'Lab Comparison Chart', type: 'pdf', size: '890 KB' },
      { title: 'Test Interpretation Guide', type: 'pdf', size: '456 KB' },
      { title: 'Insurance Code List', type: 'pdf', size: '234 KB' },
      { title: 'Sample Test Results', type: 'pdf', size: '1.2 MB' }
    ],
    nextModule: '03-drainage-pathways',
    previousModule: '01-identify-exposure'
  },
  '03-drainage-pathways': {
    title: 'Open Drainage Pathways',
    description: 'Essential 2-4 week preparation before starting any mold detox protocol',
    moduleNumber: 3,
    duration: '90 minutes',
    difficulty: 'intermediate',
    category: 'detox',
    progress: 0,
    objectives: [
      'Understand why drainage MUST come before binders',
      'Optimize bowel movements for primary toxin elimination',
      'Support liver and gallbladder function for toxin processing',
      'Achieve optimal hydration and kidney support',
      'Activate lymphatic system for cellular waste transport',
      'Use skin and sweating for backup toxin elimination',
      'Reach 80% drainage readiness for 7 consecutive days'
    ],
    lessons: [
      {
        id: 1,
        title: 'Why Drainage Matters',
        type: 'reading',
        duration: '10 min',
        completed: false,
        description: 'The science of detox pathways and why they must come before binders'
      },
      {
        id: 2,
        title: 'Bowel Optimization',
        type: 'exercise',
        duration: '20 min',
        completed: false,
        description: 'Achieving 1-3 daily bowel movements through targeted protocols'
      },
      {
        id: 3,
        title: 'Liver & Gallbladder Support',
        type: 'reading',
        duration: '20 min',
        completed: false,
        description: 'Optimizing bile flow and liver function for safe detoxification'
      },
      {
        id: 4,
        title: 'Kidney & Urinary Support',
        type: 'exercise',
        duration: '15 min',
        completed: false,
        description: 'Optimizing hydration and kidney function for toxin elimination'
      },
      {
        id: 5,
        title: 'Lymphatic Activation',
        type: 'exercise',
        duration: '15 min',
        completed: false,
        description: 'Moving lymph fluid to transport cellular waste for elimination'
      },
      {
        id: 6,
        title: 'Sweat & Skin Detox',
        type: 'exercise',
        duration: '10 min',
        completed: false,
        description: 'Activating your largest organ for toxin elimination through sweating'
      }
    ],
    resources: [
      { title: 'Drainage Supplements Guide', type: 'pdf', size: '15 pages' },
      { title: 'Castor Oil Pack Protocol', type: 'pdf', size: '8 pages' },
      { title: 'Coffee Enema Guide (Advanced)', type: 'pdf', size: '12 pages' },
      { title: 'Daily Drainage Checklist', type: 'pdf', size: '6 pages' }
    ],
    nextModule: '04-mycotoxin-binders',
    previousModule: '02-testing-diagnosis'
  },
  '04-mycotoxin-binders': {
    title: 'Mycotoxin Binders',
    description: 'Essential binder protocols to safely remove mycotoxins from your body',
    moduleNumber: 4,
    duration: '85 minutes',
    difficulty: 'intermediate',
    category: 'detox',
    progress: 0,
    objectives: [
      'Understand the science behind mycotoxin binding',
      'Master CSM (Cholestyramine) protocol - the gold standard',
      'Learn Welchol as alternative for CSM-intolerant patients',
      'Understand natural binder options and their limitations',
      'Master critical timing protocols (30-60 min before meals)',
      'Troubleshoot common binder side effects and interactions'
    ],
    lessons: [
      {
        id: 1,
        title: 'Binder Science & Why They Work',
        type: 'reading',
        duration: '15 min',
        completed: false,
        description: 'Enterohepatic recirculation and bile acid sequestration'
      },
      {
        id: 2,
        title: 'CSM Protocol - The Gold Standard',
        type: 'reading',
        duration: '20 min',
        completed: false,
        description: '4g 4x daily protocol with titration schedule'
      },
      {
        id: 3,
        title: 'Welchol Alternative Protocol',
        type: 'reading',
        duration: '15 min',
        completed: false,
        description: 'For patients who cannot tolerate CSM (25% as effective)'
      },
      {
        id: 4,
        title: 'Natural Binders Overview',
        type: 'reading',
        duration: '15 min',
        completed: false,
        description: 'Charcoal, chlorella, MCP, clay - pros and cons'
      },
      {
        id: 5,
        title: 'Timing Mastery',
        type: 'exercise',
        duration: '10 min',
        completed: false,
        description: 'Critical 30-60 min before meals, 2+ hours from meds'
      },
      {
        id: 6,
        title: 'Troubleshooting & Side Effects',
        type: 'reading',
        duration: '10 min',
        completed: false,
        description: 'Constipation, nutrient depletion, herx management'
      }
    ],
    resources: [
      { title: 'CSM Prescription Script Template', type: 'pdf', size: '2 pages' },
      { title: 'Binder Timing Chart', type: 'pdf', size: '1 page' },
      { title: 'Natural Binder Comparison', type: 'pdf', size: '4 pages' },
      { title: 'Troubleshooting Flowchart', type: 'pdf', size: '3 pages' }
    ],
    nextModule: '05-antifungals',
    previousModule: '03-drainage-pathways'
  },
  '05-antifungals': {
    title: 'Antifungal Protocols',
    description: 'Prescription and natural antifungal protocols for colonization treatment',
    moduleNumber: 5,
    duration: '70 minutes',
    difficulty: 'intermediate',
    category: 'detox',
    progress: 0,
    objectives: [
      'Determine if you need antifungals (only 20-30% of patients do)',
      'Master Itraconazole protocol - 100mg daily to 100mg 2x daily',
      'Understand other prescription options (Fluconazole, Nystatin)',
      'Learn natural antifungal rotation strategies',
      'Manage die-off reactions with severity scale (1-10)',
      'Monitor liver function and drug interactions'
    ],
    lessons: [
      {
        id: 1,
        title: 'Do You Need Antifungals?',
        type: 'reading',
        duration: '15 min',
        completed: false,
        description: 'Colonization vs exposure assessment criteria'
      },
      {
        id: 2,
        title: 'Itraconazole (Sporanox) Protocol',
        type: 'reading',
        duration: '20 min',
        completed: false,
        description: 'Gold standard: 100mg daily → 100mg 2x daily'
      },
      {
        id: 3,
        title: 'Other Prescription Options',
        type: 'reading',
        duration: '15 min',
        completed: false,
        description: 'Fluconazole, Nystatin, Amphotericin B comparison'
      },
      {
        id: 4,
        title: 'Natural Antifungal Protocols',
        type: 'reading',
        duration: '10 min',
        completed: false,
        description: 'Neem, oregano oil, O3 oils with rotation'
      },
      {
        id: 5,
        title: 'Die-off Management',
        type: 'exercise',
        duration: '10 min',
        completed: false,
        description: 'Severity scale 1-10 with action protocols'
      }
    ],
    resources: [
      { title: 'Itraconazole Prescription Script', type: 'pdf', size: '2 pages' },
      { title: 'Liver Monitoring Schedule', type: 'pdf', size: '1 page' },
      { title: 'Natural Antifungal Rotation Chart', type: 'pdf', size: '3 pages' },
      { title: 'Die-off Emergency Kit', type: 'pdf', size: '2 pages' }
    ],
    nextModule: '06-herx-management',
    previousModule: '04-mycotoxin-binders'
  },
  '06-herx-management': {
    title: 'Herx Management - Riding the Waves',
    description: 'Safely manage detox reactions and prevent dangerous symptoms during treatment',
    moduleNumber: 6,
    duration: '60 minutes',
    difficulty: 'intermediate',
    category: 'safety',
    progress: 0,
    objectives: [
      'Recognize normal vs dangerous Herx reactions',
      'Master severity assessment techniques (1-10 scale)',
      'Learn specific management strategies by severity level',
      'Know emergency protocols and red flag symptoms',
      'Implement prevention strategies for future protocols'
    ],
    lessons: [
      {
        id: 1,
        title: 'Understanding Herx Reactions',
        type: 'reading',
        duration: '10 min',
        completed: false,
        description: 'The science of die-off and what happens biochemically'
      },
      {
        id: 2,
        title: 'Severity Assessment',
        type: 'exercise',
        duration: '10 min',
        completed: false,
        description: 'Rating reactions 1-10 and recognizing patterns'
      },
      {
        id: 3,
        title: 'Management Strategies',
        type: 'reading',
        duration: '20 min',
        completed: false,
        description: 'Specific interventions for each severity level'
      },
      {
        id: 4,
        title: 'Emergency Protocols',
        type: 'exercise',
        duration: '10 min',
        completed: false,
        description: 'When to stop everything and seek help'
      },
      {
        id: 5,
        title: 'Prevention Strategies',
        type: 'reading',
        duration: '10 min',
        completed: false,
        description: 'Minimizing future reactions through better protocols'
      }
    ],
    resources: [
      { title: 'Herx Severity Scale Visual Guide', type: 'pdf', size: '8 pages' },
      { title: 'Emergency Contact Template', type: 'pdf', size: '4 pages' },
      { title: 'Supplement Emergency Kit Guide', type: 'pdf', size: '10 pages' },
      { title: 'Detox Bath Recipe Collection', type: 'pdf', size: '6 pages' },
      { title: 'Herx Recovery Timeline Guide', type: 'pdf', size: '12 pages' }
    ],
    nextModule: '07-supportive-modalities',
    previousModule: '05-antifungals'
  },
  '07-supportive-modalities': {
    title: 'Supportive Modalities',
    description: 'Enhance your detox with sauna, HBOT, massage, and other supportive therapies',
    moduleNumber: 7,
    duration: '55 minutes',
    difficulty: 'intermediate',
    category: 'support',
    progress: 0,
    objectives: [
      'Master infrared sauna protocols for mycotoxin elimination',
      'Understand HBOT basics and when it\'s beneficial',
      'Learn lymphatic drainage massage techniques',
      'Implement grounding/earthing for inflammation reduction',
      'Use coffee enemas safely for liver support',
      'Optimize sleep and stress management for healing'
    ],
    lessons: [
      {
        id: 1,
        title: 'Infrared Sauna Protocols',
        type: 'reading',
        duration: '15 min',
        completed: false,
        description: 'Temperature, timing, and safety protocols'
      },
      {
        id: 2,
        title: 'HBOT - Hyperbaric Oxygen',
        type: 'reading',
        duration: '10 min',
        completed: false,
        description: 'When to consider and what to expect'
      },
      {
        id: 3,
        title: 'Lymphatic Drainage',
        type: 'exercise',
        duration: '10 min',
        completed: false,
        description: 'Self-massage and professional techniques'
      },
      {
        id: 4,
        title: 'Grounding & Stress Management',
        type: 'reading',
        duration: '10 min',
        completed: false,
        description: 'Natural inflammation reduction techniques'
      },
      {
        id: 5,
        title: 'Coffee Enemas (Advanced)',
        type: 'reading',
        duration: '10 min',
        completed: false,
        description: 'Liver support protocol with safety considerations'
      }
    ],
    resources: [
      { title: 'Sauna Protocol Guide', type: 'pdf', size: '6 pages' },
      { title: 'Lymphatic Massage Video Series', type: 'video', size: '25 min' },
      { title: 'Coffee Enema Safety Checklist', type: 'pdf', size: '3 pages' },
      { title: 'HBOT Provider Directory', type: 'pdf', size: '8 pages' }
    ],
    nextModule: '08-diet-nutrition',
    previousModule: '06-herx-management'
  },
  '08-diet-nutrition': {
    title: 'Diet & Nutrition',
    description: 'Anti-inflammatory nutrition protocols to support mold detox and healing',
    moduleNumber: 8,
    duration: '50 minutes',
    difficulty: 'beginner',
    category: 'support',
    progress: 0,
    objectives: [
      'Eliminate dietary sources of mycotoxins',
      'Implement anti-inflammatory meal planning',
      'Support liver detox with specific nutrients',
      'Optimize gut health during treatment',
      'Balance blood sugar for stable energy',
      'Create sustainable meal prep systems'
    ],
    lessons: [
      {
        id: 1,
        title: 'Low-Mold Diet Essentials',
        type: 'reading',
        duration: '15 min',
        completed: false,
        description: 'Foods to avoid and safe alternatives'
      },
      {
        id: 2,
        title: 'Anti-Inflammatory Protocols',
        type: 'reading',
        duration: '10 min',
        completed: false,
        description: 'Reducing inflammation through nutrition'
      },
      {
        id: 3,
        title: 'Liver Support Nutrition',
        type: 'reading',
        duration: '10 min',
        completed: false,
        description: 'Nutrients that enhance detoxification'
      },
      {
        id: 4,
        title: 'Gut Health During Detox',
        type: 'reading',
        duration: '10 min',
        completed: false,
        description: 'Probiotics, prebiotics, and gut support'
      },
      {
        id: 5,
        title: 'Meal Planning & Prep',
        type: 'exercise',
        duration: '5 min',
        completed: false,
        description: 'Sustainable systems for healthy eating'
      }
    ],
    resources: [
      { title: 'Low-Mold Food Lists', type: 'pdf', size: '12 pages' },
      { title: '7-Day Meal Plan', type: 'pdf', size: '15 pages' },
      { title: 'Anti-Inflammatory Recipes', type: 'pdf', size: '25 pages' },
      { title: 'Supplement Timing Chart', type: 'pdf', size: '2 pages' }
    ],
    nextModule: '09-retesting-prevention',
    previousModule: '07-supportive-modalities'
  },
  '09-retesting-prevention': {
    title: 'Retesting & Prevention',
    description: 'Know when to retest, how to interpret results, and prevent future exposure',
    moduleNumber: 9,
    duration: '45 minutes',
    difficulty: 'intermediate',
    category: 'maintenance',
    progress: 0,
    objectives: [
      'Understand optimal retesting timeline (6-9 months minimum)',
      'Interpret follow-up test results correctly',
      'Implement maintenance protocols for long-term health',
      'Prevent re-exposure in your environment',
      'Recognize early warning signs of re-exposure',
      'Build resilience for occasional exposures'
    ],
    lessons: [
      {
        id: 1,
        title: 'When & What to Retest',
        type: 'reading',
        duration: '15 min',
        completed: false,
        description: 'Optimal timing and test selection'
      },
      {
        id: 2,
        title: 'Interpreting Follow-up Results',
        type: 'reading',
        duration: '10 min',
        completed: false,
        description: 'Understanding improvement patterns'
      },
      {
        id: 3,
        title: 'Maintenance Protocols',
        type: 'reading',
        duration: '10 min',
        completed: false,
        description: 'Long-term support strategies'
      },
      {
        id: 4,
        title: 'Prevention Strategies',
        type: 'exercise',
        duration: '10 min',
        completed: false,
        description: 'Avoiding future mold exposure'
      }
    ],
    resources: [
      { title: 'Retest Timeline Calculator', type: 'tool', size: 'Interactive' },
      { title: 'Maintenance Protocol Guide', type: 'pdf', size: '8 pages' },
      { title: 'Prevention Checklist', type: 'pdf', size: '4 pages' },
      { title: 'Travel Safety Guide', type: 'pdf', size: '6 pages' }
    ],
    nextModule: '10-advanced-protocols',
    previousModule: '08-diet-nutrition'
  },
  '10-advanced-protocols': {
    title: 'Advanced Protocols',
    description: 'Advanced therapies for complex cases and treatment-resistant mold illness',
    moduleNumber: 10,
    duration: '65 minutes',
    difficulty: 'advanced',
    category: 'advanced',
    progress: 0,
    objectives: [
      'Understand when advanced protocols are needed',
      'Learn HBOT protocols (2.0-2.4 ATA)',
      'Master peptide protocols (BPC-157, KPV, TA-1)',
      'Implement IV therapy protocols (glutathione, PC)',
      'Address biofilm disruption strategies',
      'Navigate neural retraining programs (DNRS)'
    ],
    lessons: [
      {
        id: 1,
        title: 'When to Consider Advanced Protocols',
        type: 'reading',
        duration: '10 min',
        completed: false,
        description: 'Criteria for complex case management'
      },
      {
        id: 2,
        title: 'Advanced HBOT Protocols',
        type: 'reading',
        duration: '15 min',
        completed: false,
        description: 'High-pressure protocols (2.0-2.4 ATA)'
      },
      {
        id: 3,
        title: 'Peptide Protocols',
        type: 'reading',
        duration: '15 min',
        completed: false,
        description: 'BPC-157, KPV, TA-1, LL-37 protocols'
      },
      {
        id: 4,
        title: 'IV Therapy Protocols',
        type: 'reading',
        duration: '10 min',
        completed: false,
        description: 'Glutathione, phosphatidylcholine, ozone'
      },
      {
        id: 5,
        title: 'Biofilm Disruption',
        type: 'reading',
        duration: '10 min',
        completed: false,
        description: 'Advanced biofilm protocols'
      },
      {
        id: 6,
        title: 'Neural Retraining (DNRS)',
        type: 'reading',
        duration: '5 min',
        completed: false,
        description: 'Limbic system retraining programs'
      }
    ],
    resources: [
      { title: 'Advanced HBOT Provider Directory', type: 'pdf', size: '20 pages' },
      { title: 'Peptide Dosing Protocols', type: 'pdf', size: '12 pages' },
      { title: 'IV Therapy Safety Guidelines', type: 'pdf', size: '8 pages' },
      { title: 'DNRS Program Comparison', type: 'pdf', size: '6 pages' }
    ],
    nextModule: null,
    previousModule: '09-retesting-prevention'
  },
  '01-understanding-mold': {
    title: 'Understanding Mold Illness',
    description: 'Comprehensive overview of mold toxicity, mycotoxins, and how they affect your body',
    moduleNumber: 1,
    duration: '45 minutes',
    difficulty: 'beginner',
    category: 'foundation',
    progress: 60,
    objectives: [
      'Understand the science of mold illness and CIRS',
      'Identify different types of toxic molds and mycotoxins',
      'Learn how mold affects different body systems',
      'Recognize the stages of mold illness',
      'Understand genetic susceptibility factors'
    ],
    lessons: [
      {
        id: 1,
        title: 'What Makes Mold Toxic',
        type: 'video',
        duration: '7 min',
        completed: true,
        description: 'Introduction to mycotoxins and biotoxins'
      },
      {
        id: 2,
        title: 'Types of Toxic Molds',
        type: 'reading',
        duration: '5 min',
        completed: true,
        description: 'Common indoor molds and their effects'
      },
      {
        id: 3,
        title: 'The Biotoxin Pathway',
        type: 'video',
        duration: '8 min',
        completed: true,
        description: 'How mycotoxins affect your body'
      },
      {
        id: 4,
        title: 'CIRS Explained',
        type: 'reading',
        duration: '6 min',
        completed: true,
        description: 'Chronic Inflammatory Response Syndrome'
      },
      {
        id: 5,
        title: 'Body Systems Affected',
        type: 'video',
        duration: '9 min',
        completed: true,
        description: 'Multi-system impacts of mold illness'
      },
      {
        id: 6,
        title: 'Genetic Susceptibility',
        type: 'reading',
        duration: '5 min',
        completed: false,
        description: 'HLA-DR genes and mold sensitivity'
      },
      {
        id: 7,
        title: 'Testing Options',
        type: 'exercise',
        duration: '6 min',
        completed: false,
        description: 'Overview of mold and mycotoxin testing'
      },
      {
        id: 8,
        title: 'Knowledge Check',
        type: 'quiz',
        duration: '4 min',
        completed: false,
        description: 'Test your understanding'
      }
    ],
    resources: [
      { title: 'Mycotoxin Reference Guide', type: 'pdf', size: '890 KB' },
      { title: 'CIRS Diagnostic Criteria', type: 'pdf', size: '456 KB' },
      { title: 'Lab Test Interpretation Guide', type: 'pdf', size: '1.2 MB' }
    ],
    nextModule: '02-exposure-assessment',
    previousModule: '00-quick-start'
  }
}

const getLessonIcon = (type: string) => {
  switch(type) {
    case 'video': return <Video className="h-4 w-4" />
    case 'reading': return <FileText className="h-4 w-4" />
    case 'exercise': return <Target className="h-4 w-4" />
    case 'quiz': return <HelpCircle className="h-4 w-4" />
    default: return <BookOpen className="h-4 w-4" />
  }
}

const getLessonTypeColor = (type: string) => {
  switch(type) {
    case 'video': return 'bg-blue-100 text-blue-800'
    case 'reading': return 'bg-green-100 text-green-800'
    case 'exercise': return 'bg-purple-100 text-purple-800'
    case 'quiz': return 'bg-orange-100 text-orange-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function ModulePage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('lessons')
  
  const module = moduleData[params.slug as keyof typeof moduleData]
  
  if (!module) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Module Not Found</h2>
            <p className="text-gray-600 mb-4">The module you're looking for doesn't exist.</p>
            <Link href="/modules">
              <Button>Back to Modules</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const completedLessons = module.lessons.filter(l => l.completed).length
  const currentLesson = module.lessons.find(l => !l.completed) || module.lessons[0]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Navigation */}
      <Link href="/modules" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Modules
      </Link>

      {/* Module Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="outline">Module {String(module.moduleNumber).padStart(2, '0')}</Badge>
          <Badge className={
            module.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            module.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }>
            {module.difficulty}
          </Badge>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{module.title}</h1>
        <p className="text-gray-600 mb-4">{module.description}</p>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {completedLessons} of {module.lessons.length} lessons completed
            </span>
            <span className="font-semibold">{module.progress}%</span>
          </div>
          <Progress value={module.progress} className="h-3" />
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {module.duration}
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {module.lessons.length} lessons
          </div>
          <div className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            {module.resources.length} resources
          </div>
        </div>
      </div>

      {/* Learning Objectives */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {module.objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{objective}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Special tools section for Module 03 - Drainage Readiness */}
      {params.slug === '03-drainage-pathways' && (
        <Card className="bg-green-50 border-green-200 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Drainage Readiness Tool - Required for Progress
            </CardTitle>
            <CardDescription>
              Track your daily progress toward the required 80% readiness score for 7 consecutive days before accessing binders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div>
                  <p className="font-medium text-gray-900">Current Status</p>
                  <p className="text-sm text-gray-600">Track daily across all 5 drainage pathways</p>
                </div>
                <Link href="/tools/drainage-readiness">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Activity className="w-4 h-4 mr-2" />
                    Access Tool
                  </Button>
                </Link>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-amber-900 text-sm">Critical Safety Gate</p>
                    <p className="text-amber-800 text-sm">
                      Module 04 (Binders) will remain locked until you achieve 80% drainage readiness for 7 consecutive days. 
                      This prevents dangerous detox reactions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {params.slug === '06-herx-management' && (
        <Card className="bg-red-50 border-red-200 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Critical Safety Warning - Herx Reactions Can Be Dangerous
            </CardTitle>
            <CardDescription>
              Never "push through" severe symptoms. This module teaches you when to stop treatment and seek medical help.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border border-red-300 bg-red-50 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <strong>Emergency Threshold:</strong> Seek immediate help for severity 9-10 reactions or any red flag symptoms like chest pain, difficulty breathing, or severe confusion.
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div>
                  <p className="font-medium text-gray-900">Herx Toolkit - Assessment & Management</p>
                  <p className="text-sm text-gray-600">Rate severity, get personalized protocols, and track patterns</p>
                </div>
                <Link href="/tools/herx-toolkit">
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Activity className="w-4 h-4 mr-2" />
                    Open Herx Toolkit
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs for Lessons and Resources */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="space-y-4 mt-6">
          {/* Continue Learning Card */}
          {module.progress < 100 && (
            <Card className="bg-primary-50 border-primary-200 mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Continue where you left off</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{currentLesson.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{currentLesson.description}</p>
                  </div>
                  <Button>
                    Start Lesson
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lessons List */}
          <div className="space-y-3">
            {module.lessons.map((lesson) => (
              <Link 
                key={lesson.id}
                href={`/modules/${params.slug}/lessons/${lesson.id.toString().padStart(2, '0')}-${lesson.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`}
              >
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    lesson.completed ? 'bg-gray-50' : ''
                  }`}
                >
                  <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Status Icon */}
                      <div className="flex-shrink-0">
                        {lesson.completed ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : lesson === currentLesson ? (
                          <PlayCircle className="h-6 w-6 text-blue-600" />
                        ) : (
                          <Lock className="h-6 w-6 text-gray-400" />
                        )}
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">
                            Lesson {lesson.id}: {lesson.title}
                          </h3>
                          <Badge className={getLessonTypeColor(lesson.type)}>
                            {getLessonIcon(lesson.type)}
                            <span className="ml-1">{lesson.type}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{lesson.description}</p>
                      </div>

                      {/* Duration */}
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        {lesson.duration}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <ModuleResources 
            moduleSlug={params.slug as string} 
            moduleTitle={module.title}
          />
        </TabsContent>
      </Tabs>

      {/* Navigation Footer */}
      <div className="mt-8 flex justify-between">
        {module.previousModule ? (
          <Link href={`/modules/${module.previousModule}`}>
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Module
            </Button>
          </Link>
        ) : (
          <div />
        )}
        
        {module.nextModule ? (
          <Link href={`/modules/${module.nextModule}`}>
            <Button>
              Next Module
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}