import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App.tsx'; 
import reportWebVitals from './reportWebVitals.ts'; 
import { AuthProvider } from './context/AuthContext.tsx'; // Import the AuthProvider

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <AuthProvider> {/* Wrap App with AuthProvider */}
            <App />
        </AuthProvider>
    </React.StrictMode>
);

reportWebVitals();
