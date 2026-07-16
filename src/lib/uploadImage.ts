import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirebaseStorage, isFirebaseConfigured } from './firebase';

export async function uploadImage(file: File, folder: string): Promise<string> {
  console.log('uploadImage called with file:', file.name, 'folder:', folder);
  
  if (!isFirebaseConfigured()) {
    console.error('Firebase not configured');
    throw new Error('Firebase belum dikonfigurasi. Pastikan environment variables VITE_FIREBASE_* sudah diisi.');
  }

  if (!file) {
    console.error('No file provided');
    throw new Error('File tidak ditemukan');
  }

  if (file.size > 5 * 1024 * 1024) { // 5MB limit
    console.error('File too large:', file.size);
    throw new Error('Ukuran file terlalu besar. Maksimal 5MB.');
  }

  try {
    const storage = getFirebaseStorage();
    console.log('Storage obtained');
    
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = `${folder}/${Date.now()}-${safeName}`;
    console.log('Uploading to path:', path);
    
    const storageRef = ref(storage, path);
    console.log('Storage ref created');
    
    const metadata = {
      contentType: file.type || 'image/jpeg',
    };
    
    await uploadBytes(storageRef, file, metadata);
    console.log('Upload completed');
    
    const url = await getDownloadURL(storageRef);
    console.log('Download URL obtained:', url);
    
    return url;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    
    if (error instanceof Error) {
      // Provide more specific error messages
      if (error.message.includes('storage/unauthorized')) {
        throw new Error('Anda tidak memiliki izin untuk upload gambar. Periksa Firebase Storage rules.');
      }
      if (error.message.includes('storage/quota-exceeded')) {
        throw new Error('Kuota Firebase Storage penuh. Hapus beberapa file atau upgrade plan.');
      }
      if (error.message.includes('storage/canceled')) {
        throw new Error('Upload dibatalkan');
      }
      throw new Error(`Gagal upload gambar: ${error.message}`);
    }
    
    throw new Error('Gagal upload gambar. Terjadi kesalahan tidak diketahui.');
  }
}
