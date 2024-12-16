import React, { useEffect } from 'react';
import { useAuthStore } from './store/auth';
import { useThemeStore } from './store/theme';
import { AuthContainer } from './components/auth/AuthContainer';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { WhiteboardGrid } from './components/whiteboard/WhiteboardGrid';

function App() {
  const { isAuthenticated } = useAuthStore();
  const isDark = useThemeStore((state) => state.isDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  if (!isAuthenticated) {
    return <AuthContainer />;
  }

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <WhiteboardGrid />
        </main>
      </div>
    </div>
  );
}

export default App;