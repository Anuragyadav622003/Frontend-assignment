import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import UserDetail from './pages/UserDetail';
import CreateUser from './pages/CreateUser';
import ErrorBoundary from './components/ErrorBoundary';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Router>
          <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Home />} />
                <Route path="/users/create" element={<CreateUser />} />
                <Route path="/users/:id" element={<UserDetail />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                className: 'dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700',
              }}
            />
          </div>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;