import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import AppRouter from './AppRouter.tsx';
import { AuthProvider } from './contexts/AuthContext';
import './firebase/config';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>,
);
