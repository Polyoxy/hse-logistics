"use client";

export default function DocumentSubmission() {
  return (
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
  );
}
