import React from 'react';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-[180px] font-bold text-zinc-800 tracking-tighter leading-none mb-4">404</div>
        <div className="text-3xl font-medium mb-3">Page not found</div>
        <p className="text-zinc-400 max-w-xs mx-auto">The page you are looking for doesn't exist or has been moved.</p>
        
        <button 
          onClick={() => navigate('/')}
          className="mt-12 px-8 py-4 border border-white/30 text-sm rounded-3xl hover:bg-white hover:text-black transition-colors"
        >
          RETURN TO HOMEPAGE
        </button>
      </div>
    </div>
  );
}