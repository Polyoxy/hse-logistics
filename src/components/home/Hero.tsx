"use client";

import { useState } from "react";
import Link from 'next/link';

export default function Hero() {
  const [showDriverModal, setShowDriverModal] = useState(false);

  return (
    <section id="home" className="relative min-h-[600px] overflow-hidden mt-0">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent z-10"></div>
        <img src="/hero-truck.jpg" alt="Logistics truck" className="w-full h-full object-cover object-bottom opacity-80 contrast-110" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 flex items-center min-h-[600px]">
        <div className="md:w-1/2">
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-white">
              Your Trusted Logistics Partner
            </h1>
            <p className="text-xl mb-8 text-white/90">
              We ship it all - safely, securely, and on time. HSE Logistics delivers solutions tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="#documents" className="btn bg-white text-black hover:bg-gray-100 px-4 py-2" style={{ borderRadius: '28px' }}>Submit Documents</Link>
              <button onClick={() => setShowDriverModal(true)} className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2" style={{ borderRadius: '28px' }}>Driver Application</button>
            </div>
          </div>
        </div>
      </div>

      {/* Driver Application Modal */}
      {showDriverModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Driver Application</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="driverName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" id="driverName" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-accent focus:border-accent" />
              </div>
              <div>
                <label htmlFor="driverEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="driverEmail" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-accent focus:border-accent" />
              </div>
              <div>
                <label htmlFor="driverPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" id="driverPhone" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-accent focus:border-accent" />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDriverModal(false);
                  }}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-blue-600">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
