import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary only if credentials are available
if (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME && 
    import.meta.env.VITE_CLOUDINARY_API_KEY && 
    import.meta.env.VITE_CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
    api_secret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
  });
}

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
  if (!import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 
      !import.meta.env.VITE_CLOUDINARY_API_KEY || 
      !import.meta.env.VITE_CLOUDINARY_API_SECRET) {
    console.error('Cloudinary not configured');
    throw new Error('Cloudinary belum dikonfigurasi. Silakan gunakan URL gambar eksternal atau tambahkan environment variables VITE_CLOUDINARY_* di Vercel.');
  }

  try {
    console.log('Uploading to Cloudinary...');
    
    // Convert file to base64
    const base64 = await fileToBase64(file);
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64, {
      folder: folder,
      resource_type: 'auto',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      max_file_size: 10000000, // 10MB
    });
    
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
