'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

interface Document {
  id: string;
  userId: string;
  name: string;
  type: string;
  size: number;
  url: string;
  createdAt: Timestamp | Date;
}

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('documents');

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
      {/* Dashboard Header */}
      <header className="bg-surface shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-foreground">HSE Logistics Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-foreground font-medium">{user?.displayName || 'User'}</p>
                <p className="text-foreground/70 text-sm">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="btn bg-surface-alt hover:bg-surface/80 text-accent px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Navigation */}
      <nav className="bg-surface-alt border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'documents'
                  ? 'border-b-2 border-accent text-accent'
                  : 'text-foreground/70 hover:text-accent'
              }`}
              onClick={() => setActiveTab('documents')}
            >
              Documents
            </button>
            <button
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'uploads'
                  ? 'border-b-2 border-accent text-accent'
                  : 'text-foreground/70 hover:text-accent'
              }`}
              onClick={() => setActiveTab('uploads')}
            >
              Upload
            </button>
            <button
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'settings'
                  ? 'border-b-2 border-accent text-accent'
                  : 'text-foreground/70 hover:text-accent'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'documents' && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">Your Documents</h2>
              
              {documents.length === 0 ? (
                <div className="card p-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <i className="fas fa-file-alt text-accent text-4xl mb-4"></i>
                    <p className="text-foreground/80 mb-4">You haven't uploaded any documents yet.</p>
                    <button
                      className="btn bg-accent hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                      onClick={() => setActiveTab('uploads')}
                    >
                      Upload Your First Document
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {documents.map((doc) => (
                    <div key={doc.id} className="card p-6 hover:ring-2 hover:ring-accent transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded bg-accent/20 flex items-center justify-center mr-3">
                          <i className="fas fa-file-alt text-accent"></i>
                        </div>
                        <div className="truncate">
                          <h3 className="font-medium text-foreground truncate">{doc.name}</h3>
                          <p className="text-sm text-foreground/70">
                            {doc.createdAt && ('toDate' in doc.createdAt) 
                              ? new Date(doc.createdAt.toDate()).toLocaleDateString() 
                              : (doc.createdAt instanceof Date) 
                                ? doc.createdAt.toLocaleDateString()
                                : 'Unknown date'} • {formatFileSize(doc.size)}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="btn p-2 bg-surface-alt hover:bg-surface/80 text-accent rounded">
                          <i className="fas fa-download"></i>
                        </button>
                        <button className="btn p-2 bg-surface-alt hover:bg-surface/80 text-accent rounded">
                          <i className="fas fa-share-alt"></i>
                        </button>
                        <button className="btn p-2 bg-surface-alt hover:bg-surface/80 text-red-500 rounded">
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'uploads' && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">Upload Documents</h2>
              
              <div className="card p-8">
                <div className="file-drop-area relative border-2 border-dashed border-accent/30 rounded-lg p-12 text-center hover:border-accent/60 transition-colors">
                  <div className="flex flex-col items-center justify-center">
                    <i className="fas fa-cloud-upload-alt text-accent text-4xl mb-4"></i>
                    <p className="text-foreground/80 mb-2">Drag & drop your files here or click to browse</p>
                    <p className="text-sm text-foreground/60 mb-4">Accepted formats: PDF, DOC, XLSX, Images, and more</p>
                    
                    <input
                      type="file"
                      id="file-input"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                    
                    <label
                      htmlFor="file-input"
                      className="btn bg-accent hover:bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer"
                    >
                      {isUploading ? 'Uploading...' : 'Select Files'}
                    </label>
                  </div>
                </div>
                
                {isUploading && (
                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-foreground/70">Uploading...</span>
                      <span className="text-sm text-foreground/70">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-surface-alt rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">Account Settings</h2>
              
              <div className="card p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-4">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                        <input
                          type="text"
                          value={user?.displayName || ''}
                          className="w-full p-3 rounded-lg focus:ring-2 focus:ring-accent bg-surface-alt text-foreground"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                        <input
                          type="email"
                          value={user?.email || ''}
                          className="w-full p-3 rounded-lg focus:ring-2 focus:ring-accent bg-surface-alt text-foreground"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-4">Security</h3>
                    <button className="btn bg-surface-alt hover:bg-surface/80 text-accent px-6 py-3 rounded-lg">
                      Change Password
                    </button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-4">Danger Zone</h3>
                    <button className="btn bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
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
