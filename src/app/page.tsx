"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from 'next/link';
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import DocumentSubmission from "@/components/home/DocumentSubmission";
import Careers from "@/components/home/Careers";

export default function Home() {
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  return (
    <>
      <main>
        <Hero />
        <Services />
        <DocumentSubmission />
        <Careers />

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h2>
              <p className="text-xl text-foreground/80">We're here to help! Whether you have questions, need a quote, or want to learn more about our services.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="card p-8 hover:ring-2 hover:ring-accent transition duration-300">
                <h3 className="text-xl font-semibold text-foreground mb-6">Send Us a Message</h3>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <input type="text" id="contact-name" name="name" className="w-full p-4 rounded-lg focus:ring-accent focus:border-accent bg-surface-alt text-foreground placeholder:text-foreground/40 shadow-sm" required />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                    <input type="email" id="contact-email" name="email" className="w-full p-4 rounded-lg focus:ring-accent focus:border-accent bg-surface-alt text-foreground placeholder:text-foreground/40 shadow-sm" required />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground mb-2">Subject</label>
                    <select id="contact-subject" name="subject" className="w-full p-4 rounded-lg focus:ring-accent focus:border-accent bg-surface-alt text-foreground placeholder:text-foreground/40 shadow-sm">
                      <option value="general">General Inquiry</option>
                      <option value="quote">Request a Quote</option>
                      <option value="services">Services Information</option>
                      <option value="careers">Career Opportunities</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea id="contact-message" name="message" rows={6} className="w-full p-4 rounded-lg focus:ring-accent focus:border-accent bg-surface-alt text-foreground placeholder:text-foreground/40 shadow-sm" required></textarea>
                  </div>
                  <button type="submit" className="w-full btn bg-accent hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
                    <span className="flex items-center justify-center gap-2">
                      <i className="fas fa-paper-plane text-lg"></i>
                      Send Message
                    </span>
                  </button>
                </form>
              </div>
              <div className="bg-glass-morphic p-8 rounded-3xl shadow-2xl">
                <h3 className="text-xl font-semibold text-foreground mb-6">Contact Information</h3>
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-surface-alt rounded-full flex items-center justify-center mr-6">
                      <i className="fas fa-map-marker-alt text-accent text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Headquarters</h4>
                      <p className="text-foreground/80">123 Logistics Drive<br />Logistics City, LC 12345</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-surface-alt rounded-full flex items-center justify-center mr-6">
                      <i className="fas fa-phone text-accent text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Phone</h4>
                      <p className="text-foreground/80">(555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-surface-alt rounded-full flex items-center justify-center mr-6">
                      <i className="fas fa-envelope text-accent text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Email</h4>
                      <p className="text-foreground/80">info@hse-logistics.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-surface-alt rounded-full flex items-center justify-center mr-6">
                      <i className="fas fa-clock text-accent text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Hours</h4>
                      <p className="text-foreground/80">Mon-Fri: 8:00 AM - 5:00 PM<br />Sat: 9:00 AM - 1:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Driver Application Modal Placeholder */}
      {showDriverModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="card p-8 w-full max-w-lg">
            <h3 className="text-xl font-bold text-foreground mb-4">Driver Employment Application</h3>
            <p className="text-foreground/80 mb-4">(Full application form coming soon!)</p>
            <div className="flex justify-end">
              <button className="btn bg-accent hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition duration-300" onClick={() => setShowDriverModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
