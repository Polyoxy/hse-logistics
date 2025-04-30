"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from 'next/link';

export default function Home() {
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white bg-opacity-60 backdrop-blur-lg shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center">
            <i className="fas fa-truck text-accent text-2xl mr-2"></i>
            <span className="text-xl font-bold text-foreground">HSE Logistics</span>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a href="#home" className="text-foreground hover:text-accent px-3 py-2 text-sm font-medium transition-colors">Home</a>
            <a href="#services" className="text-foreground hover:text-accent px-3 py-2 text-sm font-medium transition-colors">Services</a>
            <a href="#documents" className="text-foreground hover:text-accent px-3 py-2 text-sm font-medium transition-colors">Submit Documents</a>
            <a href="#careers" className="text-foreground hover:text-accent px-3 py-2 text-sm font-medium transition-colors">Careers</a>
            <a href="#contact" className="text-foreground hover:text-accent px-3 py-2 text-sm font-medium transition-colors">Contact</a>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
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
                      href="/documents" 
                      className="text-foreground hover:text-accent px-3 py-2 text-sm font-medium transition-colors flex items-center"
                    >
                      <i className="fas fa-file-alt mr-2"></i>
                      Documents
                    </Link>
                    <div className="flex items-center text-foreground px-3 py-2 text-sm font-medium">
                      <i className="fas fa-user-circle mr-2"></i>
                      {user.displayName || user.email}
                    </div>
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
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/login" 
                      className="text-foreground hover:text-accent px-3 py-2 text-sm font-medium transition-colors flex items-center"
                    >
                      <i className="fas fa-sign-in-alt mr-2"></i>
                      Login
                    </Link>
                    <Link 
                      href="/signup" 
                      className="bg-accent hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                    >
                      <i className="fas fa-user-plus mr-2"></i>
                      Sign Up
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
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 inset-x-0 z-50 bg-white shadow-lg rounded-b-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#home" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-accent hover:bg-surface-alt">Home</a>
                <a href="#services" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-accent hover:bg-surface-alt">Services</a>
                <a href="#documents" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-accent hover:bg-surface-alt">Submit Documents</a>
                <a href="#careers" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-accent hover:bg-surface-alt">Careers</a>
                <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-accent hover:bg-surface-alt">Contact</a>
              </div>
              
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
                          <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-accent hover:bg-surface-alt">
                            <i className="fas fa-tachometer-alt mr-2"></i>
                            Dashboard
                          </Link>
                          <Link href="/documents" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-accent hover:bg-surface-alt">
                            <i className="fas fa-file-alt mr-2"></i>
                            Documents
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
                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-red-500 hover:bg-surface-alt"
                          >
                            <i className="fas fa-sign-out-alt mr-2"></i>
                            Logout
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="mt-3 px-2 space-y-1">
                        <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-accent hover:bg-surface-alt">
                          <i className="fas fa-sign-in-alt mr-2"></i>
                          Login
                        </Link>
                        <Link href="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-accent hover:bg-surface-alt">
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

      {/* Hero Section */}
      <section id="home" className="relative min-h-[600px] overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent opacity-90 z-10"></div>
          <img src="/hero-truck.jpg" alt="Logistics truck" className="w-full h-full object-cover object-bottom" />
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
                <a href="#documents" className="btn bg-surface-alt text-accent hover:bg-surface/80 px-6 py-3 rounded-lg font-medium text-center transition duration-300">Submit Documents</a>
                <button onClick={() => setShowDriverModal(true)} className="btn bg-accent hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300">Driver Application</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-xl text-foreground/90 max-w-3xl mx-auto">Tailored logistics solutions for your business needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 hover:ring-2 hover:ring-accent transition-all duration-300 transform hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-foreground mb-4">OTR Services</h3>
              <p className="text-foreground/80 leading-relaxed">
                Specializing in over-the-road transportation with a focus on safety, efficiency, and compliance. Our experienced drivers and modern fleet ensure your cargo arrives on time, every time.
              </p>
              <div className="mt-6">
                <button className="btn bg-surface-alt text-accent hover:bg-surface/80 px-6 py-2 rounded-lg font-medium transition duration-300 w-full">
                  Learn More
                </button>
              </div>
            </div>

            <div className="card p-8 hover:ring-2 hover:ring-accent transition-all duration-300 transform hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-foreground mb-4">Contract Management</h3>
              <p className="text-foreground/80 leading-relaxed">
                Expert management of logistics contracts, ensuring compliance, optimizing costs, and maintaining service quality. Our team handles all aspects of contract negotiation, execution, and performance monitoring.
              </p>
              <div className="mt-6">
                <button className="btn bg-surface-alt text-accent hover:bg-surface/80 px-6 py-2 rounded-lg font-medium transition duration-300 w-full">
                  Learn More
                </button>
              </div>
            </div>

            <div className="card p-8 hover:ring-2 hover:ring-accent transition-all duration-300 transform hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-foreground mb-4">Logistics Solutions</h3>
              <p className="text-foreground/80 leading-relaxed">
                Comprehensive logistics solutions tailored to your business needs. From route optimization to fleet management, we provide end-to-end support to streamline your operations and improve efficiency.
              </p>
              <div className="mt-6">
                <button className="btn bg-surface-alt text-accent hover:bg-surface/80 px-6 py-2 rounded-lg font-medium transition duration-300 w-full">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Document Submission Section */}
      <section id="documents" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Submit Your Documents</h2>
            <p className="text-xl text-foreground/80">Upload your documents easily with our intuitive interface. We accept various file formats including PDFs, spreadsheets, images, and multimedia files.</p>
          </div>
          <div className="card p-8 hover:ring-2 hover:ring-accent transition duration-300">
            <form id="document-form" className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                    <input type="text" id="name" name="name" className="w-full p-4 rounded-lg focus:ring-accent focus:border-accent bg-surface-alt text-foreground placeholder:text-foreground/40 shadow-sm" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                    <input type="email" id="email" name="email" className="w-full p-4 rounded-lg focus:ring-accent focus:border-accent bg-surface-alt text-foreground placeholder:text-foreground/40 shadow-sm" required />
                  </div>
                </div>
              </div>

              {/* Organization */}
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-foreground mb-1">Organization (if applicable)</label>
                <input type="text" id="organization" name="organization" className="w-full p-4 rounded-lg focus:ring-accent focus:border-accent bg-surface-alt text-foreground placeholder:text-foreground/40 shadow-sm" />
              </div>

              {/* Purpose */}
              <div>
                <label htmlFor="purpose" className="block text-sm font-medium text-foreground mb-1">Purpose of Submission</label>
                <select id="purpose" name="purpose" className="w-full p-4 rounded-lg focus:ring-accent focus:border-accent bg-surface-alt text-foreground placeholder:text-foreground/40 shadow-sm">
                  <option value="quote">Request a Quote</option>
                  <option value="shipment">Shipment Documentation</option>
                  <option value="billing">Billing/Payment</option>
                  <option value="employment">Employment Application</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">File Upload</label>
                <div className="file-drop-area relative border-2 border-dashed border-accent/20 rounded-lg p-12 text-center cursor-pointer bg-surface-alt hover:border-accent/40 transition-colors">
                  <div className="flex flex-col items-center justify-center">
                    <i className="fas fa-cloud-upload-alt text-accent text-4xl mb-3"></i>
                    <p className="text-foreground/80 mb-1">Drag & drop your files here or click to browse</p>
                    <p className="text-sm text-foreground/60">Accepted formats: PDF, TXT, Google Sheets, Excel, Images (PNG, JPG), Audio, Video</p>
                  </div>
                  <input type="file" id="file-input" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" multiple />
                </div>
                <div id="file-list" className="mt-4 space-y-2">
                  {/* File list will be populated by JavaScript */}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Additional Notes</label>
                <textarea id="message" name="message" rows={4} className="w-full p-4 rounded-lg focus:ring-accent focus:border-accent bg-surface-alt text-foreground placeholder:text-foreground/40 shadow-sm"></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button type="submit" className="w-full btn bg-accent hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-300">
                  <span className="flex items-center justify-center gap-2">
                    <i className="fas fa-paper-plane text-lg"></i>
                    Submit Documents
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Join Our Team</h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">We're always looking for talented individuals to join the HSE Logistics family</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="card p-8 hover:ring-2 hover:ring-accent transition duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-surface-alt rounded-full flex items-center justify-center mr-6">
                  <i className="fas fa-truck text-accent text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Professional Drivers</h3>
              </div>
              <p className="text-foreground/80 mb-6">We're seeking experienced, safety-conscious drivers to join our fleet. Competitive pay, benefits, and a supportive work environment.</p>
              <button onClick={() => setShowDriverModal(true)} className="btn bg-accent hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition duration-300">Apply Now</button>
            </div>
            <div className="card p-8 hover:ring-2 hover:ring-accent transition duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-surface-alt rounded-full flex items-center justify-center mr-6">
                  <i className="fas fa-users text-accent text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Operations Team</h3>
              </div>
              <p className="text-foreground/80 mb-6">Join our logistics coordination team to help manage shipments, customer service, and warehouse operations.</p>
              <button className="btn bg-accent hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition duration-300">Apply Now</button>
            </div>
          </div>
          <div className="bg-surface-alt p-8 rounded-xl">
            <h3 className="text-xl font-semibold text-foreground mb-4">Why Work With Us?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start">
                <i className="fas fa-dollar-sign text-accent mt-1 mr-3"></i>
                <div>
                  <h4 className="font-medium text-foreground">Competitive Compensation</h4>
                  <p className="text-foreground/80 text-sm">We offer industry-leading pay and benefits packages.</p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-heartbeat text-accent mt-1 mr-3"></i>
                <div>
                  <h4 className="font-medium text-foreground">Health & Wellness</h4>
                  <p className="text-foreground/80 text-sm">Comprehensive health insurance and wellness programs.</p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-graduation-cap text-accent mt-1 mr-3"></i>
                <div>
                  <h4 className="font-medium text-foreground">Career Growth</h4>
                  <p className="text-foreground/80 text-sm">Opportunities for advancement and professional development.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Contact Us</h2>
            <p className="text-xl text-foreground/80">Get in touch with our team for any questions or inquiries</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card p-8 hover:ring-2 hover:ring-accent transition duration-300">
              <h3 className="text-xl font-semibold text-foreground mb-6">Send Us a Message</h3>
              <form>
                <div className="mb-6">
                  <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1">Name</label>
                  <input type="text" id="contact-name" className="w-full p-4 rounded-lg focus:ring-accent focus:border-accent bg-surface-alt text-foreground placeholder:text-foreground/40" required />
                </div>
                <div className="mb-6">
                  <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <input type="email" id="contact-email" className="w-full p-4 rounded-lg focus:ring-accent focus:border-accent bg-surface-alt text-foreground placeholder:text-foreground/40" required />
                </div>
                <div className="mb-6">
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground mb-1">Subject</label>
                  <input type="text" id="contact-subject" className="w-full p-4 rounded-lg focus:ring-accent focus:border-accent bg-surface-alt text-foreground placeholder:text-foreground/40" required />
                </div>
                <div className="mb-6">
                  <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1">Message</label>
                  <textarea id="contact-message" rows={4} className="w-full p-4 rounded-lg focus:ring-accent focus:border-accent bg-surface-alt text-foreground placeholder:text-foreground/40 shadow-sm" required></textarea>
                </div>
                <button type="submit" className="w-full btn bg-accent hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
                  Send Message
                </button>
              </form>
            </div>
            <div>
              <div className="bg-surface p-8 rounded-xl shadow-2xl mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <i className="fas fa-phone-alt text-accent mt-1 mr-4"></i>
                    <div>
                      <h4 className="font-medium text-foreground">Phone</h4>
                      <p className="text-foreground/80">786-572-9215</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-envelope text-accent mt-1 mr-4"></i>
                    <div>
                      <h4 className="font-medium text-foreground">Email</h4>
                      <p className="text-foreground/80">hselog2023@gmail.com</p>
                      <p className="text-foreground/80">prodkhai@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-clock text-accent mt-1 mr-4"></i>
                    <div>
                      <h4 className="font-medium text-foreground">Business Hours</h4>
                      <p className="text-foreground/80">Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p className="text-foreground/80">Saturday: 9:00 AM - 2:00 PM</p>
                      <p className="text-foreground/80">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-surface-alt p-6 rounded-xl shadow-2xl  hover:shadow-accent/60 hover:ring-2 hover:ring-accent transition duration-300">
                <h4 className="font-medium text-foreground mb-3">Need immediate assistance?</h4>
                <p className="text-foreground/80 mb-4">Our customer service team is available to help with any urgent matters during business hours.</p>
                <button className="btn bg-accent hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
                  <i className="fas fa-phone-alt mr-2"></i> Call Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface text-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">HSE Logistics</h3>
              <p className="text-foreground/60">Your trusted partner for all shipping and logistics needs. We ship it all - safely, securely, and on time.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-foreground/60 hover:text-accent transition">Home</a></li>
                <li><a href="#services" className="text-foreground/60 hover:text-accent transition">Services</a></li>
                <li><a href="#documents" className="text-foreground/60 hover:text-accent transition">Submit Documents</a></li>
                <li><a href="#careers" className="text-foreground/60 hover:text-accent transition">Careers</a></li>
                <li><a href="#contact" className="text-foreground/60 hover:text-accent transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-foreground/60 hover:text-accent transition">Freight Transportation</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-accent transition">Warehousing</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-accent transition">Supply Chain Solutions</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-accent transition">Expedited Shipping</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-accent transition">Specialized Hauling</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-foreground/60 hover:text-accent transition"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-foreground/60 hover:text-accent transition"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-foreground/60 hover:text-accent transition"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="text-foreground/60 hover:text-accent transition"><i className="fab fa-instagram"></i></a>
              </div>
              <p className="text-foreground/60">Subscribe to our newsletter for updates</p>
              <div className="mt-3 flex">
                <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-lg text-foreground bg-surface-alt w-full placeholder:text-foreground/40" />
                <button className="bg-accent hover:bg-blue-500 px-4 py-2 rounded-r-lg">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-surface-alt pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-foreground/60 text-sm mb-4 md:mb-0"> 2023 HSE Logistics. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-foreground/60 hover:text-accent text-sm">Privacy Policy</a>
              <a href="#" className="text-foreground/60 hover:text-accent text-sm">Terms of Service</a>
              <a href="#" className="text-foreground/60 hover:text-accent text-sm">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

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
    </div>
  );
}
