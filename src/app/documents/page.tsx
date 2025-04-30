'use client';

import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { DocumentList } from './components/DocumentList';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);

  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setDocuments(prev => [...prev, data]);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Upload Documents</h2>
              <FileUpload onUpload={handleFileUpload} />
            </div>
          </div>
          <div className="col-span-2">
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Your Documents</h2>
              <DocumentList documents={documents} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
