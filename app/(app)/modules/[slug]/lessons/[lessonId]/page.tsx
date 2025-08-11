/**
 * @fileoverview Individual Lesson Page - Renders lesson content with navigation
 */

import { notFound } from 'next/navigation';
import { allLessons, allModules } from 'contentlayer/generated';
import { MDXContent } from '@/components/mdx-content';
import { LessonNavigation } from '@/components/modules/lesson-navigation';
import { VisualInspectionContent } from '@/components/lessons/visual-inspection-content';

interface LessonPageProps {
  params: {
    slug: string;
    lessonId: string;
  };
}

export async function generateStaticParams() {
  return allLessons.map((lesson) => ({
    slug: lesson.moduleSlug,
    lessonId: lesson.slug,
  }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const lesson = allLessons.find(
    (lesson) => lesson.moduleSlug === params.slug && lesson.slug === params.lessonId
  );

  if (!lesson) {
    return {
      title: 'Lesson Not Found',
    };
  }

  return {
    title: `${lesson.title} | Mold Detox Mastery`,
    description: lesson.description,
  };
}

export default function LessonPage({ params }: LessonPageProps) {
  const lesson = allLessons.find(
    (lesson) => lesson.moduleSlug === params.slug && lesson.slug === params.lessonId
  );

  const module = allModules.find((module) => module.slug === params.slug);

  if (!lesson || !module) {
    notFound();
  }

  // Get all lessons for this module for navigation
  const moduleLessons = allLessons
    .filter((l) => l.moduleSlug === params.slug)
    .sort((a, b) => a.lessonNumber - b.lessonNumber)
    .map((l) => ({
      slug: l.slug,
      title: l.title,
      duration: l.duration,
      type: l.lessonType as 'reading' | 'exercise' | 'video' | 'quiz' | 'resource',
    }));

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {/* Lesson Navigation */}
      <LessonNavigation
        moduleSlug={params.slug}
        currentLessonSlug={params.lessonId}
        lessons={moduleLessons}
        moduleName={module.title}
      />

      {/* Lesson Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>Lesson {lesson.lessonNumber}</span>
          <span>•</span>
          <span>{lesson.duration}</span>
          <span>•</span>
          <span className="capitalize">{lesson.lessonType}</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {lesson.title}
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          {lesson.description}
        </p>

        {/* Key Takeaways */}
        {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-3">
              Key Takeaways
            </h2>
            <ul className="space-y-2">
              {lesson.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-2 text-blue-800">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Lesson Content */}
      <div className="prose prose-lg max-w-none mb-8">
        {params.lessonId === '01-visual-inspection-mastery' ? (
          <VisualInspectionContent />
        ) : (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h2 className="font-bold text-yellow-800 mb-2">Content Preview</h2>
            <p className="text-yellow-700 mb-4">
              This lesson content is currently being processed. Full interactive content will be available soon.
            </p>
            <div className="prose prose-gray">
              <h1>Stop Exposure NOW</h1>
              <p><em>Emergency action required - you cannot heal while still being exposed</em></p>
              
              <h2>Why This Step Comes First</h2>
              <p>You cannot heal while still being exposed to mold. It's like trying to bail water out of a boat with a hole in it. No matter how many supplements you take or protocols you follow, continuous exposure will prevent recovery.</p>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
                <h3 className="text-red-800 font-bold">🏃‍♂️ Emergency Action Required</h3>
                <p className="text-red-700">If you've found mold or tested positive for mycotoxins, you must stop exposure immediately. This may mean leaving your home temporarily.</p>
                <p className="text-sm text-red-600 font-medium">Timeframe: Within 24 hours</p>
              </div>
              
              <h2>Document Everything First</h2>
              <p>Before you do anything else, create a record of what you're dealing with. This documentation is crucial for insurance claims, legal action, and medical treatment.</p>
              
              <h3>Photo/Video Documentation</h3>
              <p><strong>What to capture:</strong></p>
              <ul>
                <li>📸 All visible mold growth</li>
                <li>📸 Water damage and stains</li>
                <li>📸 Damaged belongings</li>
                <li>📸 Overall room conditions</li>
                <li>📸 HVAC systems and vents</li>
              </ul>
              
              <h2>Emergency Housing Options</h2>
              <p>You need a safe place to stay while dealing with the mold problem. Here are your options:</p>
              
              <h3>Immediate Solutions (24-48 hours)</h3>
              <ul>
                <li><strong>Hotel/Motel:</strong> Check for mold before booking, request top floor</li>
                <li><strong>Friends/Family:</strong> Assess their space first, be honest about situation</li>
                <li><strong>Extended Stay Hotels:</strong> Often have kitchenettes, weekly rates available</li>
              </ul>
              
              <h2>Cross-Contamination Prevention</h2>
              <p><strong>Every time you leave moldy space:</strong></p>
              <ul>
                <li>Remove shoes before entering car/new space</li>
                <li>Change clothes immediately</li>
                <li>Wash hands and face</li>
                <li>Use nasal rinse if available</li>
                <li>Don't touch clean items until decontaminated</li>
              </ul>
              
              <h2>Your Emergency Action Checklist</h2>
              <h3>Today (Within 4 Hours):</h3>
              <ul>
                <li>[ ] Document all mold with photos</li>
                <li>[ ] Pack emergency bag</li>
                <li>[ ] Find tonight's accommodation</li>
                <li>[ ] Notify work/school</li>
                <li>[ ] Start insurance claim</li>
              </ul>
              
              <h2>Next Steps</h2>
              <p>After securing safe housing, continue to <strong>Lesson 2: Quick Environmental Assessment</strong> to evaluate all your exposure sources.</p>
              
              <p>Remember: No possession is worth your health. When faced with the choice between staying and leaving, choose your health every time.</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Items */}
      {lesson.actionItems && lesson.actionItems.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-green-900 mb-3">
            Action Items
          </h2>
          <ul className="space-y-2">
            {lesson.actionItems.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-green-800">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="pt-8 border-t border-gray-200">
        <LessonNavigation
          moduleSlug={params.slug}
          currentLessonSlug={params.lessonId}
          lessons={moduleLessons}
          moduleName={module.title}
        />
      </div>
    </div>
  );
}