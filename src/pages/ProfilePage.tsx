import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center mb-8">
          <div className="w-28 h-28 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-3xl flex items-center justify-center text-6xl border border-white/10">
            👤
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-10">
          <h2 className="text-center text-3xl font-semibold mb-8">My Profile</h2>
          
          <div className="space-y-8">
            <div>
              <div className="text-xs text-zinc-400 mb-1">USERNAME</div>
              <div className="text-3xl font-medium text-white">{user.username}</div>
            </div>
            <div>
              <div className="text-xs text-zinc-400 mb-1">EMAIL</div>
              <div className="font-mono text-zinc-300">{user.email}</div>
            </div>
            <div>
              <div className="text-xs text-zinc-400 mb-1">ROLE</div>
              <div className={`inline-block px-4 py-1 rounded-3xl text-xs font-medium ${user.role === 'admin' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                {user.role?.toUpperCase()}
              </div>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-zinc-700 flex flex-col gap-3">
            <button 
              onClick={() => navigate('/dashboard')}
              className="py-4 border border-zinc-700 hover:bg-zinc-800 rounded-3xl text-sm font-medium"
            >
              GO TO DASHBOARD
            </button>
            <button 
              onClick={logout}
              className="py-4 text-red-400 hover:bg-red-500/10 rounded-3xl text-sm font-medium"
            >
              SIGN OUT
            </button>
          </div>
        </div>
        
        <div className="text-center mt-8 text-xs text-zinc-500">Data is saved in localStorage</div>
      </div>
    </div>
  );
}