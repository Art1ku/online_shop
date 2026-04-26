import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 dark">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};