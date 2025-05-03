'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs, serverTimestamp, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import DocumentList from '@/components/dashboard/DocumentList';
import FileUpload from '@/components/dashboard/FileUpload';
import { Document } from '@/types';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('documents');
  const [search, setSearch] = useState('');

  // Storage usage calculation
  const totalStorageUsed = useMemo(() => {
    return documents.reduce((acc, doc) => acc + (doc.size || 0), 0);
  }, [documents]);
  const maxStorage = 100 * 1024 * 1024; // 100 MB quota for example

  // Recent activity (last 5 documents)
  const recentDocuments = useMemo(() => {
    return [...documents]
      .sort((a, b) => {
        const aDate = a.createdAt && 'toDate' in a.createdAt ? a.createdAt.toDate() : a.createdAt;
        const bDate = b.createdAt && 'toDate' in b.createdAt ? b.createdAt.toDate() : b.createdAt;
        return (bDate ? new Date(bDate) : 0) - (aDate ? new Date(aDate) : 0);
      })
      .slice(0, 5);
  }, [documents]);

  // Filtered documents
  const filteredDocuments = useMemo(() => {
    return documents.filter(doc =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.type.toLowerCase().includes(search.toLowerCase())
    );
  }, [documents, search]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      fetchUserDocuments();
    }
  }, [user, loading, router]);

  const fetchUserDocuments = async () => {
    if (!user) return;
    
    try {
      const q = query(collection(db, 'documents'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const docs: Document[] = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() as Omit<Document, 'id'> });
      });
      setDocuments(docs);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      // Upload file to Firebase Storage
      const storageRef = ref(storage, `documents/${user.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Add document reference to Firestore
      const docRef = await addDoc(collection(db, 'documents'), {
        userId: user.uid,
        name: file.name,
        type: file.type,
        size: file.size,
        url: downloadURL,
        createdAt: serverTimestamp(),
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Update documents list
      setDocuments((prev) => [
        ...prev,
        {
          id: docRef.id,
          userId: user.uid,
          name: file.name,
          type: file.type,
          size: file.size,
          url: downloadURL,
          createdAt: new Date(),
        },
      ]);

      setTimeout(() => {
        setUploadProgress(0);
        setIsUploading(false);
      }, 1000);
    } catch (error) {
      console.error('Error uploading file:', error);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-12 w-12 border-t-4 border-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-1">Dashboard</h1>
            <p className="text-foreground/70 text-lg">Welcome, {user?.displayName || user?.email}</p>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Storage Usage Card */}
          <div className="card p-6 flex flex-col justify-between shadow-lg hover:ring-2 hover:ring-accent transition">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                <i className="fas fa-database text-accent"></i> Storage Usage
              </h2>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground/80">Used</span>
                <span className="text-sm text-foreground/60">{formatFileSize(totalStorageUsed)} / {formatFileSize(maxStorage)}</span>
              </div>
              <div className="w-full h-3 bg-accent/20 rounded-full mb-2">
                <div
                  className="h-3 bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (totalStorageUsed / maxStorage) * 100)}%` }}
                ></div>
              </div>
            </div>
            <div className="text-xs text-foreground/50 mt-2">100MB quota per user</div>
          </div>

          {/* Recent Activity Card */}
          <div className="card p-6 flex flex-col shadow-lg hover:ring-2 hover:ring-accent transition">
            <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
              <i className="fas fa-history text-accent"></i> Recent Activity
            </h2>
            <div className="flex-1 overflow-y-auto">
              {recentDocuments.length === 0 ? (
                <div className="text-foreground/60">No recent activity</div>
              ) : (
                <ul className="space-y-2">
                  {recentDocuments.map(doc => (
                    <li key={doc.id} className="flex items-center justify-between bg-surface-alt rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-file-alt text-accent"></i>
                        <span className="font-medium text-foreground text-sm">{doc.name}</span>
                      </div>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 text-xs flex items-center gap-1">
                        <i className="fas fa-download"></i> Download
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Profile Card */}
          <div className="card p-6 flex flex-col items-start shadow-lg hover:ring-2 hover:ring-accent transition">
            <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
              <i className="fas fa-user-circle text-accent"></i> Profile
            </h2>
            <div className="mb-2">
              <div className="font-medium text-foreground">{user?.displayName || 'User'}</div>
              <div className="text-sm text-foreground/70">{user?.email}</div>
            </div>
            <div className="text-xs text-foreground/50">Role: user</div>
            {/* Future: Add edit profile button here */}
          </div>
        </div>

        {/* Main Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Documents Card */}
          <div className="card p-6 flex flex-col shadow-lg hover:ring-2 hover:ring-accent transition">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <i className="fas fa-file-alt text-accent"></i> Your Documents
              </h2>
              <input
                type="text"
                placeholder="Search documents..."
                className="p-2 rounded-lg border border-accent/30 focus:ring-accent focus:border-accent bg-surface-alt text-foreground text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ minWidth: 180 }}
              />
            </div>
            <DocumentList documents={filteredDocuments} />
          </div>
          {/* Upload Card */}
          <div className="card p-6 flex flex-col shadow-lg hover:ring-2 hover:ring-accent transition">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <i className="fas fa-cloud-upload-alt text-accent"></i> Upload New Document
            </h2>
            <FileUpload onUploadComplete={fetchUserDocuments} />
          </div>
        </div>
      </div>
      {/* Dashboard IT Support Footer */}
      <div className="bg-surface-alt border-t border-accent/10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-foreground/70 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} HSE Logistics. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-foreground/70 text-sm">
                <i className="fas fa-headset text-accent mr-2"></i>
                <span>IT Support:</span>
                <a href="mailto:Support@aurorasma.com" className="text-accent hover:text-accent/70 ml-2 flex items-center">
                  <i className="fas fa-envelope mr-1"></i>
                  Support@aurorasma.com
                </a>
              </div>
              <div className="flex items-center text-foreground/70 text-sm">
                <a href="tel:7868129541" className="text-accent hover:text-accent/70 flex items-center">
                  <i className="fas fa-phone-alt mr-1"></i>
                  786-812-9541
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
