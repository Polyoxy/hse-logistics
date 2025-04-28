"use client";
import { useState } from "react";

export default function Home() {
  const [showDriverModal, setShowDriverModal] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center">
            <i className="fas fa-truck text-blue-600 text-2xl mr-2"></i>
            <span className="text-xl font-bold text-gray-900">HSE Logistics</span>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a href="#home" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">Home</a>
            <a href="#services" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">Services</a>
            <a href="#documents" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">Submit Documents</a>
            <a href="#careers" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">Careers</a>
            <a href="#contact" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">Contact</a>
          </div>
          <div className="md:hidden flex items-center">
            {/* Hamburger menu placeholder, could be implemented with useState for mobile nav */}
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
              <span className="sr-only">Open main menu</span>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">Your Trusted Logistics Partner</h1>
              <p className="text-xl mb-8">We ship it all - safely, securely, and on time. HSE Logistics delivers solutions tailored to your needs.</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="#documents" className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium text-center transition duration-300">Submit Documents</a>
                <button onClick={() => setShowDriverModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300">Driver Application</button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src="https://images.unsplash.com/photo-1609973840110-74bd08b5a521?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Truck on highway" className="rounded-lg shadow-2xl max-h-72 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive logistics solutions designed to meet your business needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-truck text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Freight Transportation</h3>
              <p className="text-gray-600">Reliable and efficient transportation services for all your freight needs, from local deliveries to cross-country shipments.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-warehouse text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Warehousing</h3>
              <p className="text-gray-600">Secure storage solutions with inventory management to keep your goods safe until they're ready for distribution.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-boxes text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Supply Chain Solutions</h3>
              <p className="text-gray-600">End-to-end supply chain management to optimize your logistics operations and reduce costs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Document Submission Section */}
      <section id="documents" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Submit Your Documents</h2>
            <p className="text-xl text-gray-600">We accept various file formats including PDFs, spreadsheets, images, and multimedia files.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <form id="document-form">
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" id="name" name="name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" id="email" name="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
              </div>
              <div className="mb-6">
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">Organization (if applicable)</label>
                <input type="text" id="organization" name="organization" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="mb-6">
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">Purpose of Submission</label>
                <select id="purpose" name="purpose" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                  <option value="quote">Request a Quote</option>
                  <option value="shipment">Shipment Documentation</option>
                  <option value="billing">Billing/Payment</option>
                  <option value="employment">Employment Application</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">File Upload</label>
                <div className="file-drop-area relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer">
                  <div className="flex flex-col items-center justify-center">
                    <i className="fas fa-cloud-upload-alt text-blue-500 text-4xl mb-3"></i>
                    <p className="text-gray-600 mb-1">Drag & drop your files here or click to browse</p>
                    <p className="text-sm text-gray-500">Accepted formats: PDF, TXT, Google Sheets, Excel, Images (PNG, JPG), Audio, Video</p>
                  </div>
                  <input type="file" id="file-input" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" multiple />
                </div>
                <div id="file-list" className="mt-4 space-y-2"></div>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea id="message" name="message" rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
                Submit Documents
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">We're always looking for talented individuals to join the HSE Logistics family</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                  <i className="fas fa-truck text-blue-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Professional Drivers</h3>
              </div>
              <p className="text-gray-600 mb-6">We're seeking experienced, safety-conscious drivers to join our fleet. Competitive pay, benefits, and a supportive work environment.</p>
              <button onClick={() => setShowDriverModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-300">Apply Now</button>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                  <i className="fas fa-users text-blue-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Operations Team</h3>
              </div>
              <p className="text-gray-600 mb-6">Join our logistics coordination team to help manage shipments, customer service, and warehouse operations.</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-300">Apply Now</button>
            </div>
          </div>
          <div className="bg-blue-50 p-8 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Work With Us?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start">
                <i className="fas fa-dollar-sign text-blue-600 mt-1 mr-3"></i>
                <div>
                  <h4 className="font-medium text-gray-900">Competitive Compensation</h4>
                  <p className="text-gray-600 text-sm">We offer industry-leading pay and benefits packages.</p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-heartbeat text-blue-600 mt-1 mr-3"></i>
                <div>
                  <h4 className="font-medium text-gray-900">Health & Wellness</h4>
                  <p className="text-gray-600 text-sm">Comprehensive health insurance and wellness programs.</p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-graduation-cap text-blue-600 mt-1 mr-3"></i>
                <div>
                  <h4 className="font-medium text-gray-900">Career Growth</h4>
                  <p className="text-gray-600 text-sm">Opportunities for advancement and professional development.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-xl text-gray-600">Get in touch with our team for any questions or inquiries</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Send Us a Message</h3>
              <form>
                <div className="mb-6">
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" id="contact-name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div className="mb-6">
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="contact-email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div className="mb-6">
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input type="text" id="contact-subject" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div className="mb-6">
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea id="contact-message" rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
                  Send Message
                </button>
              </form>
            </div>
            <div>
              <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <i className="fas fa-phone-alt text-blue-600 mt-1 mr-4"></i>
                    <div>
                      <h4 className="font-medium text-gray-900">Phone</h4>
                      <p className="text-gray-600">786-572-9215</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-envelope text-blue-600 mt-1 mr-4"></i>
                    <div>
                      <h4 className="font-medium text-gray-900">Email</h4>
                      <p className="text-gray-600">hselog2023@gmail.com</p>
                      <p className="text-gray-600">prodkhai@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-clock text-blue-600 mt-1 mr-4"></i>
                    <div>
                      <h4 className="font-medium text-gray-900">Business Hours</h4>
                      <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 9:00 AM - 2:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl">
                <h4 className="font-medium text-gray-900 mb-3">Need immediate assistance?</h4>
                <p className="text-gray-600 mb-4">Our customer service team is available to help with any urgent matters during business hours.</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
                  <i className="fas fa-phone-alt mr-2"></i> Call Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">HSE Logistics</h3>
              <p className="text-gray-400">Your trusted partner for all shipping and logistics needs. We ship it all - safely, securely, and on time.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white transition">Home</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition">Services</a></li>
                <li><a href="#documents" className="text-gray-400 hover:text-white transition">Submit Documents</a></li>
                <li><a href="#careers" className="text-gray-400 hover:text-white transition">Careers</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Freight Transportation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Warehousing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Supply Chain Solutions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Expedited Shipping</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Specialized Hauling</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-instagram"></i></a>
              </div>
              <p className="text-gray-400">Subscribe to our newsletter for updates</p>
              <div className="mt-3 flex">
                <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-lg text-gray-900 w-full" />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} HSE Logistics. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Driver Application Modal Placeholder */}
      {showDriverModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-8 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowDriverModal(false)}
              aria-label="Close modal"
            >
              <i className="fas fa-times"></i>
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Driver Employment Application</h3>
            <p className="text-gray-600 mb-4">(Full application form coming soon!)</p>
            <div className="flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-300" onClick={() => setShowDriverModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
