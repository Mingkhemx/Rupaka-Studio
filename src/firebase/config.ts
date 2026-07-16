import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyD5-5W3-5W3-5W3-5W3-5W3-5W3-5W3",
  authDomain: "rupaka-studio.firebaseapp.com",
  projectId: "rupaka-studio",
  storageBucket: "rupaka-studio.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
