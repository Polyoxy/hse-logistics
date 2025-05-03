'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import AuthLayout from "@/app/layout/AuthLayout";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Failed to log in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-xl text-foreground/80 max-w-md mx-auto mt-2">Log in to access your document portal and manage your logistics operations.</p>
          </div>
          
          <div className="card p-8 hover:ring-2 hover:ring-accent transition duration-300">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 rounded-lg focus:ring-2 focus:ring-accent bg-surface-alt text-foreground placeholder:text-foreground/40 shadow-sm"
                  placeholder="you@example.com"
                  required
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-foreground">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-sm text-accent hover:text-accent/80 transition-colors">
                    <i className="fas fa-lock mr-1"></i>
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 rounded-lg focus:ring-2 focus:ring-accent bg-surface-alt text-foreground placeholder:text-foreground/40 shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full btn bg-accent hover:bg-blue-600 text-white py-3 rounded-lg transition duration-300 flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
                      Logging in...
                    </div>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt mr-2"></i>
                      Log In
                    </>
                  )}
                </button>
              </div>
            </form>
            
            <div className="text-center mt-6">
              <p className="text-foreground/70">
                Don't have an account?{' '}
                <Link href="/signup" className="text-accent hover:text-accent/80 transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
