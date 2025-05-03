"use client";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">HSE Logistics</h3>
            <p className="text-foreground/80 mb-6">
              Specializing in over-the-road transportation with a focus on safety, efficiency, and compliance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground hover:text-accent">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-foreground hover:text-accent">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-foreground hover:text-accent">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-foreground/80 hover:text-foreground transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="text-foreground/80 hover:text-foreground transition-colors">Services</a>
              </li>
              <li>
                <a href="#documents" className="text-foreground/80 hover:text-foreground transition-colors">Documents</a>
              </li>
              <li>
                <a href="#careers" className="text-foreground/80 hover:text-foreground transition-colors">Careers</a>
              </li>
              <li>
                <a href="#contact" className="text-foreground/80 hover:text-foreground transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Newsletter</h3>
            <p className="text-foreground/80 mb-4">
              Stay updated with our latest news and special offers.
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-surface-alt text-foreground placeholder:text-foreground/40 focus:ring-accent focus:border-accent"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-accent hover:bg-blue-600 text-white transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-foreground/60">
          <p>&copy; {new Date().getFullYear()} HSE Logistics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
