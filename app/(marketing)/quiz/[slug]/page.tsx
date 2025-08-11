/**
 * @fileoverview Dynamic Quiz Content Page - Renders quiz results, guides, and follow-up content
 * This handles quiz results pages like /quiz/first-steps-guide accessed from marketing
 */

import { notFound } from 'next/navigation';
import { allQuizzes } from 'contentlayer/generated';
import { Metadata } from 'next';
import { QuizContentDisplay } from './quiz-content-display';

interface QuizContentPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allQuizzes.map((quiz) => ({
    slug: quiz.slug,
  }));
}

export async function generateMetadata({ params }: QuizContentPageProps): Promise<Metadata> {
  const quiz = allQuizzes.find((quiz) => quiz.slug === params.slug);

  if (!quiz) {
    return {
      title: 'Quiz Content Not Found',
    };
  }

  return {
    title: quiz.title,
    description: quiz.description,
    keywords: 'mold exposure, health assessment, mycotoxin symptoms, environmental illness, action guide',
  };
}

export default function QuizContentPage({ params }: QuizContentPageProps) {
  const quiz = allQuizzes.find((quiz) => quiz.slug === params.slug);

  if (!quiz) {
    notFound();
  }

  return <QuizContentDisplay quiz={quiz} />;
}
