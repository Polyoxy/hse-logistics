"use client";

import { useState } from "react";
import Link from 'next/link';
import { useAuth } from "@/context/AuthContext";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex justify-between items-center h-14 bg-white w-full">
        <div className="flex items-center">
          <span className="text-2xl font-extrabold tracking-tight text-foreground">HSE Logistics</span>
        </div>
        
        <div className="hidden md:flex md:items-center md:space-x-3">
          {!loading && (
            <>
              {user ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="text-foreground hover:text-accent px-3 py-2 text-sm font-medium transition-colors flex items-center"
                  >
                    <i className="fas fa-tachometer-alt mr-2"></i>
                    Dashboard
                  </Link>
                  <Link
                    href="/"
                    className="text-foreground hover:text-accent px-3 py-2 text-sm font-medium transition-colors flex items-center"
                  >
                    <i className="fas fa-globe mr-2"></i>
                    Main Site
                  </Link>
                  <button 
                    onClick={async () => {
                      try {
                        await logout();
                      } catch (error) {
                        console.error('Logout error:', error);
                      }
                    }}
                    className="text-foreground hover:text-red-500 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="text-foreground hover:text-accent px-3 py-2 text-sm font-medium transition-colors flex items-center"
                  >
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    <span className="text-sm font-medium">Login</span>
                  </Link>
                  <Link 
                    href="/signup" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-sm font-semibold flex items-center transition-colors"
                    style={{ borderRadius: '28px' }}
                  >
                    <i className="fas fa-user-plus mr-2"></i>
                    <span className="text-sm font-semibold">Sign Up</span>
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-accent hover:bg-surface-alt focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}>
            </i>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-14 inset-x-0 z-50 bg-white">
            <div className="pt-4 pb-3 border-t border-gray-200">
              {!loading && (
                <>
                  {user ? (
                    <>
                      <div className="flex items-center px-4 py-2">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                            <i className="fas fa-user-circle text-accent"></i>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium text-foreground">{user.displayName || 'User'}</div>
                          <div className="text-sm font-medium text-foreground/70">{user.email}</div>
                        </div>
                      </div>
                      <div className="mt-3 px-2 space-y-1">
                        <Link href="/dashboard" className="block px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-accent hover:bg-surface-alt">
                          <i className="fas fa-tachometer-alt mr-2"></i>
                          Dashboard
                        </Link>
                        <Link href="/" className="block px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-accent hover:bg-surface-alt">
                          <i className="fas fa-globe mr-2"></i>
                          Main Site
                        </Link>
                        <button 
                          onClick={async () => {
                            try {
                              await logout();
                              setMobileMenuOpen(false);
                            } catch (error) {
                              console.error('Logout error:', error);
                            }
                          }}
                          className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-red-500 hover:bg-surface-alt"
                        >
                          <i className="fas fa-sign-out-alt mr-2"></i>
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="mt-3 px-2 space-y-1">
                      <Link href="/login" className="block px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-accent hover:bg-surface-alt">
                        <i className="fas fa-sign-in-alt mr-2"></i>
                        Login
                      </Link>
                      <Link href="/signup" className="block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors" style={{ borderRadius: '28px' }}>
                        <i className="fas fa-user-plus mr-2"></i>
                        Sign Up
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
