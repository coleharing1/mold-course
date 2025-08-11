/**
 * @fileoverview MDX Content Component - Renders compiled MDX content
 */

'use client';

// Polyfill process for browser environment
if (typeof window !== 'undefined' && typeof (globalThis as any).process === 'undefined') {
  (globalThis as any).process = {
    env: {},
    browser: true,
    version: 'v16.0.0',
    platform: 'browser',
    nextTick: (fn: () => void) => setTimeout(fn, 0),
  };
}

import { useMDXComponent } from 'next-contentlayer2/hooks';
import { DoThisNow } from '@/components/modules/do-this-now';
import { EvidenceBadge } from '@/components/modules/evidence-badge';
import { SafetyFlag } from '@/components/modules/safety-flag';
import { ToolPreview } from '@/components/modules/tool-preview';
import { MoldIdentificationChart } from '@/components/modules/mold-identification-chart';
import { ChecklistComponent } from '@/components/modules/checklist-component';

const mdxComponents = {
  DoThisNow,
  EvidenceBadge,
  SafetyFlag,
  ToolPreview,
  MoldIdentificationChart,
  ChecklistComponent,
  // Add more custom components as needed
};

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  // Temporary fallback to test if the issue is with MDX compilation
  if (typeof window !== 'undefined' && !code) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h2 className="font-bold text-yellow-800 mb-2">Content Loading Error</h2>
        <p className="text-yellow-700">Unable to load lesson content. Please try refreshing the page.</p>
      </div>
    );
  }
  
  try {
    const Component = useMDXComponent(code);
    return <Component components={mdxComponents} />;
  } catch (error) {
    console.error('MDX Component Error:', error);
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="font-bold text-red-800 mb-2">Error Loading Content</h2>
        <p className="text-red-700">There was an error loading the lesson content. Please try again.</p>
        <details className="mt-2">
          <summary className="cursor-pointer text-sm text-red-600">Error Details</summary>
          <pre className="text-xs mt-1 text-red-500">{String(error)}</pre>
        </details>
      </div>
    );
  }
}
