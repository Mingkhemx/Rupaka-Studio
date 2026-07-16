import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirebaseStorage, isFirebaseConfigured } from './firebase';

export async function uploadImage(file: File, folder: string): Promise<string> {
  console.log('uploadImage called with file:', file.name, 'folder:', folder);
  
  if (!isFirebaseConfigured()) {
    console.error('Firebase not configured');
    throw new Error('Firebase belum dikonfigurasi');
  }

  try {
    const storage = getFirebaseStorage();
    console.log('Storage obtained');
    
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = `${folder}/${Date.now()}-${safeName}`;
    console.log('Uploading to path:', path);
    
    const storageRef = ref(storage, path);
    console.log('Storage ref created');
    
    await uploadBytes(storageRef, file);
    console.log('Upload completed');
    
    const url = await getDownloadURL(storageRef);
    console.log('Download URL obtained:', url);
    
    return url;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    throw error;
  }
}
