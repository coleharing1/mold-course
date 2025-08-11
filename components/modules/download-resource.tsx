/**
 * @fileoverview Download Resource Component - Handles downloadable PDFs and checklists
 */

'use client';

import { useState } from 'react';
import { Download, FileText, CheckSquare, Eye, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DownloadResourceProps {
  title: string;
  description: string;
  filename: string;
  type: 'pdf' | 'checklist' | 'guide' | 'template';
  size?: string;
  preview?: boolean;
  className?: string;
}

export function DownloadResource({ 
  title, 
  description, 
  filename, 
  type, 
  size = 'Unknown', 
  preview = true,
  className 
}: DownloadResourceProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const getTypeIcon = () => {
    switch (type) {
      case 'checklist': return <CheckSquare className="w-5 h-5" />;
      case 'guide': return <FileText className="w-5 h-5" />;
      case 'template': return <FileText className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'checklist': return 'text-green-600 bg-green-50 border-green-200';
      case 'guide': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'template': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Determine module path based on filename location
      let modulePath = 'module-01'; // default
      if (filename.includes('drainage') || filename.includes('castor') || filename.includes('coffee')) {
        modulePath = 'module-03';
      }
      
      // Convert markdown to PDF download (placeholder - would need actual PDF generation)
      const response = await fetch(`/downloads/${modulePath}/${filename}`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename.replace('.md', '.txt'); // For now, download as text
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error('Download failed');
      }
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePreview = () => {
    // Determine module path based on filename location
    let modulePath = 'module-01'; // default
    if (filename.includes('drainage') || filename.includes('castor') || filename.includes('coffee')) {
      modulePath = 'module-03';
    }
    
    // Open in new tab for preview
    window.open(`/downloads/${modulePath}/${filename}`, '_blank');
  };

  return (
    <div className={cn(
      'border rounded-lg p-4 hover:shadow-md transition-all duration-200',
      getTypeColor(),
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="flex-shrink-0 mt-0.5">
            {getTypeIcon()}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">
              {title}
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              {description}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="capitalize">{type}</span>
              <span>•</span>
              <span>{size}</span>
              <span>•</span>
              <span>Module 01</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 ml-4">
          {preview && (
            <button
              onClick={handlePreview}
              className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded-md hover:bg-white transition-colors"
              title="Preview"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Preview</span>
            </button>
          )}
          
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-white border rounded-md hover:shadow-sm transition-all disabled:opacity-50"
            title="Download"
          >
            {isDownloading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">
              {isDownloading ? 'Downloading...' : 'Download'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
