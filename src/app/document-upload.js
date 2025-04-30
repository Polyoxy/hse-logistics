document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('file-input');
  const fileList = document.getElementById('file-list');
  const fileDropArea = document.querySelector('.file-drop-area');

  // File type icons
  const fileTypeIcons = {
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'doc',
    'application/vnd.ms-excel': 'xlsx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpeg',
    'audio/mpeg': 'mp3',
    'video/mp4': 'mp4'
  };

  // Create file item element
  function createFileItem(file) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';

    const fileType = file.type;
    const iconClass = fileTypeIcons[fileType] || 'default';

    fileItem.innerHTML = `
      <div class="file-icon ${iconClass}"></div>
      <div class="file-info">
        <div class="file-name">${file.name}</div>
        <div class="file-size">${formatFileSize(file.size)}</div>
      </div>
      <button class="remove-btn" onclick="removeFile(this)">
        <i class="fas fa-times"></i>
      </button>
    `;

    return fileItem;
  }

  // Format file size
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Handle file selection
  function handleFiles(files) {
    Array.from(files).forEach(file => {
      const fileItem = createFileItem(file);
      fileList.appendChild(fileItem);
    });
  }

  // Remove file
  function removeFile(button) {
    button.closest('.file-item').remove();
  }

  // Handle drag and drop
  fileDropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileDropArea.classList.add('hover');
  });

  fileDropArea.addEventListener('dragleave', () => {
    fileDropArea.classList.remove('hover');
  });

  fileDropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    fileDropArea.classList.remove('hover');
    const files = e.dataTransfer.files;
    handleFiles(files);
  });

  // Handle file input change
  fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    handleFiles(files);
  });

  // Handle form submission
  const form = document.getElementById('document-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Create FormData object
    const formData = new FormData(form);
    
    // Add all selected files
    const selectedFiles = Array.from(fileList.querySelectorAll('.file-item'))
      .map(item => item.querySelector('.file-name').textContent);
    
    formData.append('files', JSON.stringify(selectedFiles));
    
    // Here you would typically send the form data to your server
    console.log('Form submitted:', formData);
    
    // Reset form
    form.reset();
    fileList.innerHTML = '';
  });
});
