"use client";

import { Document } from "@/types";
import { formatFileSize } from "@/lib/utils";

interface DocumentListProps {
  documents: Document[];
}

export default function DocumentList({ documents }: DocumentListProps) {
  // Helper to get icon class based on file type
  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return 'fa-file-pdf';
    if (type.includes('image')) return 'fa-file-image';
    if (type.includes('audio')) return 'fa-file-audio';
    if (type.includes('video')) return 'fa-file-video';
    if (type.includes('spreadsheet') || type.includes('excel')) return 'fa-file-excel';
    if (type.includes('word')) return 'fa-file-word';
    if (type.includes('zip')) return 'fa-file-archive';
    if (type.includes('text')) return 'fa-file-alt';
    return 'fa-file';
  };

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div key={doc.id} className="flex items-center justify-between p-4 bg-surface-alt rounded-lg shadow-sm hover:ring-2 hover:ring-accent transition">
          <div className="flex items-center">
            <i className={`fas ${getFileIcon(doc.type)} text-accent text-2xl mr-4`}></i>
            <div>
              <h3 className="font-medium text-foreground">{doc.name}</h3>
              <p className="text-sm text-foreground/70">
                {doc.createdAt && ('toDate' in doc.createdAt) 
                  ? new Date(doc.createdAt.toDate()).toLocaleDateString() 
                  : (doc.createdAt instanceof Date) 
                    ? doc.createdAt.toLocaleDateString()
                    : 'Unknown date'} • {formatFileSize(doc.size)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors px-2 py-1 rounded-lg flex items-center text-sm" title="View">
              <i className="fas fa-external-link-alt mr-1"></i>
              View
            </a>
            <a href={doc.url} download className="text-accent hover:text-blue-600 transition-colors px-2 py-1 rounded-lg flex items-center text-sm" title="Download">
              <i className="fas fa-download mr-1"></i>
              Download
            </a>
          </div>
        </div>
      ))}
      {documents.length === 0 && (
        <p className="text-foreground/60 text-center py-8">
          <i className="fas fa-folder-open text-4xl mb-2 text-foreground/40"></i>
          <br />
          No documents uploaded yet
        </p>
      )}
    </div>
  );
}
