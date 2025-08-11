/**
 * @fileoverview Simplified MDX Content Component for debugging
 */

'use client';

interface SimpleMDXContentProps {
  children: React.ReactNode;
}

export function SimpleMDXContent({ children }: SimpleMDXContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      {children || (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-gray-600">Loading lesson content...</p>
        </div>
      )}
    </div>
  );
}
