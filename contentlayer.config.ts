import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import readingTime from 'reading-time'

export const Module = defineDocumentType(() => ({
  name: 'Module',
  filePathPattern: `modules/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    moduleNumber: { type: 'number', required: true },
    duration: { type: 'string', required: true },
    difficulty: { 
      type: 'enum',
      options: ['beginner', 'intermediate', 'advanced'],
      required: true 
    },
    category: {
      type: 'enum',
      options: ['foundation', 'assessment', 'detox', 'lifestyle', 'advanced', 'treatment', 'maintenance'],
      required: true
    },
    objectives: { type: 'list', of: { type: 'string' }, required: true },
    prerequisites: { type: 'list', of: { type: 'string' }, default: [] },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    status: {
      type: 'enum',
      options: ['published', 'draft', 'gated'],
      default: 'draft'
    },
    publishedAt: { type: 'date' },
    updatedAt: { type: 'date' },
    tldr: { type: 'string' },
    readingTime: { type: 'number' },
    // Additional fields found in frontmatter
    evidenceLevel: { 
      type: 'enum',
      options: ['solid', 'emerging', 'controversial', 'solid-emerging', 'mixed'],
      required: false
    },
    safetyLevel: {
      type: 'enum', 
      options: ['low', 'moderate', 'high', 'critical'],
      required: false
    },
    gatingRequirement: { type: 'string', required: false },
    keyTakeaways: { type: 'list', of: { type: 'string' }, default: [] },
    nextModule: { type: 'string', required: false },
    previousModule: { type: 'string', required: false },
    audioUrl: { type: 'string', required: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (module) => `/modules/${module._raw.sourceFileName.replace(/\.mdx$/, '')}`,
    },
    slug: {
      type: 'string',
      resolve: (module) => module._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    readingTimeComputed: {
      type: 'json',
      resolve: (module) => readingTime(module.body.raw),
    },
  },
}))

export const Lesson = defineDocumentType(() => ({
  name: 'Lesson', 
  filePathPattern: `lessons/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    moduleSlug: { type: 'string', required: true },
    lessonNumber: { type: 'number', required: true },
    duration: { type: 'string', required: true },
    lessonType: {
      type: 'enum',
      options: ['video', 'reading', 'exercise', 'quiz', 'resource', 'protocol'],
      required: true
    },
    videoUrl: { type: 'string' },
    downloadableResources: { type: 'list', of: { type: 'string' }, default: [] },
    keyTakeaways: { type: 'list', of: { type: 'string' }, default: [] },
    actionItems: { type: 'list', of: { type: 'string' }, default: [] },
    status: {
      type: 'enum',
      options: ['published', 'draft'],
      default: 'draft'
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (lesson) => `/modules/${lesson.moduleSlug}/lessons/${lesson._raw.sourceFileName.replace(/\.mdx$/, '')}`,
    },
    slug: {
      type: 'string',
      resolve: (lesson) => lesson._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    readingTime: {
      type: 'json',
      resolve: (lesson) => readingTime(lesson.body.raw),
    },
  },
}))

export const Resource = defineDocumentType(() => ({
  name: 'Resource',
  filePathPattern: `resources/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    category: {
      type: 'enum',
      options: ['guide', 'checklist', 'template', 'reference', 'tool'],
      required: true
    },
    downloadUrl: { type: 'string' },
    relatedModules: { type: 'list', of: { type: 'string' }, default: [] },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    featured: { type: 'boolean', default: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (resource) => `/resources/${resource._raw.sourceFileName.replace(/\.mdx$/, '')}`,
    },
    slug: {
      type: 'string',
      resolve: (resource) => resource._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}))

export const Quiz = defineDocumentType(() => ({
  name: 'Quiz',
  filePathPattern: `quiz/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    category: {
      type: 'enum',
      options: ['email', 'guide', 'assessment'],
      required: true
    },
    order: { type: 'number', required: false },
    status: {
      type: 'enum',
      options: ['published', 'draft'],
      default: 'draft'
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (quiz) => `/quiz/${quiz._raw.sourceFileName.replace(/\.mdx$/, '')}`,
    },
    slug: {
      type: 'string',
      resolve: (quiz) => quiz._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Module, Lesson, Resource, Quiz],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})