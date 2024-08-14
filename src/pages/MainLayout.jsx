import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import Navbar from '../components/Navbar';

function MainLayout() {
  const { isDarkMode } = useTheme();

  return (
    <div data-theme={isDarkMode ? 'dark' : 'light'} className="min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default MainLayout;