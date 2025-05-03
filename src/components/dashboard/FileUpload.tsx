"use client";

import { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Document } from '@/types';

interface FileUploadProps {
  onUploadComplete?: () => void;
}

export default function FileUpload({ onUploadComplete }: FileUploadProps) {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Clean up interval on unmount
  const cleanupInterval = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const resetUploadState = () => {
    setTimeout(() => {
      setUploadProgress(0);
      setIsUploading(false);
      setSelectedFiles([]);
      setTimeout(() => {
        setUploadStatus('idle');
      }, 3000);
    }, 1000);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const handleFileUpload = async () => {
    if (selectedFiles.length === 0 || !user) return;

    try {
      setIsUploading(true);
      setUploadStatus('uploading');
      setUploadProgress(0);
      setErrorMessage('');

      // Start progress simulation
      progressIntervalRef.current = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 85) {
            return 85;
          }
          return prev + 5;
        });
      }, 300);

      // Upload all selected files
      const uploadPromises = selectedFiles.map(async (file) => {
        // Create a unique filename to prevent overwrites
        const timestamp = Date.now();
        const fileName = `${timestamp}-${file.name}`;
        
        // Upload file to Firebase Storage
        const storageRef = ref(storage, `documents/${user.uid}/${fileName}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        // Add document reference to Firestore
        await addDoc(collection(db, 'documents'), {
          userId: user.uid,
          name: file.name,
          type: file.type,
          size: file.size,
          url: downloadURL,
          createdAt: serverTimestamp(),
        });

        return true;
      });

      // Wait for all uploads to complete
      await Promise.all(uploadPromises);

      // Clean up and set success
      cleanupInterval();
      setUploadProgress(100);
      setUploadStatus('success');
      
      if (onUploadComplete) {
        onUploadComplete();
      }
      
      resetUploadState();
    } catch (error) {
      console.error('Upload error:', error);
      cleanupInterval();
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
      resetUploadState();
    }
  };

  return (
    <div className="space-y-4">
      <div className="file-drop-area relative border-2 border-dashed border-accent/20 rounded-lg p-10 text-center cursor-pointer bg-surface-alt hover:border-accent/40 transition-colors">
        <div className="flex flex-col items-center justify-center">
          <i className="fas fa-cloud-upload-alt text-accent text-4xl mb-3"></i>
          <p className="text-foreground/80 mb-1">
            {selectedFiles.length > 0 
              ? `Selected ${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''}`
              : 'Drag & drop your files here or click to browse'
            }
          </p>
          <p className="text-sm text-foreground/60">Accepted formats: PDF, TXT, Google Sheets, Excel, Images (PNG, JPG), Audio, Video</p>
        </div>
        <input 
          type="file" 
          id="file-input" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          multiple 
          onChange={handleFileSelect} 
          disabled={isUploading} 
        />
      </div>

      {selectedFiles.length > 0 && !isUploading && (
        <button
          onClick={handleFileUpload}
          className="w-full btn bg-accent hover:bg-blue-600 text-white py-3 rounded-lg transition duration-300 flex items-center justify-center"
        >
          <i className="fas fa-upload mr-2"></i>
          Upload {selectedFiles.length} {selectedFiles.length === 1 ? 'File' : 'Files'}
        </button>
      )}
      
      {isUploading && (
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-4">
            <div className="w-full h-3 bg-accent/20 rounded-full">
              <div className="h-3 bg-accent rounded-full transition-transform duration-300" style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <span className="text-foreground/80 whitespace-nowrap">{uploadProgress}%</span>
          </div>
          <p className="text-sm text-foreground/70">Uploading {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'}...</p>
        </div>
      )}

      {uploadStatus === 'success' && !isUploading && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md">
          <p className="flex items-center">
            <i className="fas fa-check-circle mr-2"></i>
            Files uploaded successfully!
          </p>
        </div>
      )}

      {uploadStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
          <p className="flex items-center">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {errorMessage || 'Error uploading files. Please try again.'}
          </p>
        </div>
      )}
    </div>
  );
}
