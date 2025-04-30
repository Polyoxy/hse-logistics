import { useState } from 'react';

export function FileUpload({ onUpload }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      onUpload(file);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onUpload(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="file-upload-container">
      <form onSubmit={handleSubmit}>
        <div
          className={`file-drop-area ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="file-drop-content">
            <i className="fas fa-cloud-upload-alt text-accent text-4xl mb-3"></i>
            <p className="text-foreground/80 mb-1">Drag & drop your files here or click to browse</p>
            <p className="text-sm text-foreground/60">Accepted formats: PDF, TXT, Google Sheets, Excel, Images (PNG, JPG), Audio, Video</p>
          </div>
          <input
            type="file"
            id="file-input"
            className="hidden"
            onChange={handleChange}
            multiple
          />
          <label htmlFor="file-input" className="cursor-pointer">
            <button className="btn bg-accent hover:bg-blue-600 text-white mt-4">
              Select Files
            </button>
          </label>
        </div>
      </form>
    </div>
  );
}
