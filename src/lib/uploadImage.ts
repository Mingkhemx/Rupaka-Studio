export async function uploadImage(file: File, folder: string): Promise<string> {
  console.log('uploadImage called with file:', file.name, 'folder:', folder);
  
  if (!file) {
    console.error('No file provided');
    throw new Error('File tidak ditemukan');
  }

  if (file.size > 10 * 1024 * 1024) { // 10MB limit
    console.error('File too large:', file.size);
    throw new Error('Ukuran file terlalu besar. Maksimal 10MB.');
  }

  // Check if Cloudinary is configured
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
  const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.error('Cloudinary not configured');
    throw new Error('Cloudinary belum dikonfigurasi. Silakan gunakan URL gambar eksternal atau tambahkan environment variables VITE_CLOUDINARY_* di Vercel.');
  }

  try {
    console.log('Uploading to Cloudinary...');
    
    // Convert file to base64
    const base64 = await fileToBase64(file);
    
    // Create signature for Cloudinary upload
    const timestamp = Math.floor(Date.now() / 1000);
    const folderParam = folder ? `folder=${folder}&` : '';
    const stringToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    
    // Simple signature (in production, use crypto-js or similar)
    const signature = await simpleSHA1(stringToSign);
    
    // Upload to Cloudinary using direct API
    const formData = new FormData();
    formData.append('file', base64);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);
    formData.append('folder', folder);
    
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Upload failed');
    }
    
    const result = await response.json();
    console.log('Upload completed:', result.secure_url);
    
    return result.secure_url;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    
    if (error instanceof Error) {
      throw new Error(`Gagal upload gambar: ${error.message}`);
    }
    
    throw new Error('Gagal upload gambar. Terjadi kesalahan tidak diketahui.');
  }
}

// Helper function to convert file to base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}

// Simple SHA1 implementation for signature
async function simpleSHA1(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
