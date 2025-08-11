/**
 * @fileoverview Quiz Email Templates Index
 * Configuration for the 5-day automated email sequence
 */

export interface EmailTemplate {
  id: string;
  title: string;
  subject: string;
  delay: string;
  filePath: string;
}

export const QUIZ_EMAIL_SEQUENCE: EmailTemplate[] = [
  {
    id: 'results-delivery',
    title: 'Your Mold Recovery Readiness Results + Free Guide',
    subject: '{{name}}, your results are in! (Score: {{score}}/10)',
    delay: 'immediate',
    filePath: 'content/quiz/emails/01-results-delivery.mdx'
  },
  {
    id: 'biggest-mistake',
    title: 'The #1 Mistake People Make When Detoxing',
    subject: '{{name}}, this mistake made me sicker (avoid it!)',
    delay: '2 days',
    filePath: 'content/quiz/emails/02-biggest-mistake.mdx'
  },
  {
    id: 'kajsas-story',
    title: 'A Story of Hope (and a path forward)',
    subject: 'The prescription that changed everything',
    delay: '4 days',
    filePath: 'content/quiz/emails/03-kajsas-story.mdx'
  },
  {
    id: 'faq',
    title: 'Your Questions, Answered',
    subject: '{{name}}, answering your biggest concerns',
    delay: '6 days',
    filePath: 'content/quiz/emails/04-faq.mdx'
  },
  {
    id: 'enrollment',
    title: 'An Invitation to Get Your Life Back',
    subject: '{{name}}, doors close tonight (your decision)',
    delay: '7 days',
    filePath: 'content/quiz/emails/05-enrollment.mdx'
  }
];

export const EMAIL_TEMPLATE_VARIABLES = {
  // User data
  name: 'User first name',
  email: 'User email address',
  score: 'Quiz score (1-10)',
  profile_title: 'Profile title (The Investigator, The Seeker, The Learner)',
  profile_description: 'Profile description text',
  
  // Conditional content
  high_risk: 'Boolean - score >= 7',
  moderate_risk: 'Boolean - score 4-6',
  low_risk: 'Boolean - score 1-3',
  
  // Dynamic content
  symptom_overlap: 'Text describing symptom overlap level',
  environmental_risk: 'Text describing environmental risk level',
  diagnostic_situation: 'Text describing their doctor experience',
  assessment_text: 'Text assessment based on score',
  
  // Links
  guide_download_link: 'Link to PDF guide download',
  masterclass_link: 'Link to free video masterclass',
  resources_link: 'Link to additional resources',
  drainage_protocol_link: 'Link to drainage protocol info',
  prescription_scripts_link: 'Link to prescription scripts',
  course_link: 'Link to main course sales page',
  enrollment_link: 'Link to course enrollment page'
};

export default QUIZ_EMAIL_SEQUENCE;
