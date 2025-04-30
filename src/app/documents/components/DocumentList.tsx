export function DocumentList({ documents }) {
  if (!documents || documents.length === 0) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-file-alt text-accent text-4xl mb-4"></i>
        <p className="text-foreground/80">No documents uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((doc, index) => (
        <div key={index} className="file-item">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="file-icon"></div>
              <div className="ml-4">
                <h3 className="text-foreground font-medium">{doc.name}</h3>
                <p className="text-foreground/80 text-sm">{formatFileSize(doc.size)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="btn bg-surface-alt hover:bg-surface text-accent">
                <i className="fas fa-download"></i>
              </button>
              <button className="btn bg-surface-alt hover:bg-surface text-accent">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
