import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password.length < 4) {
      setError('Password must be at least 4 characters long');
      return;
    }
    
    setIsLoading(true);
    const success = await register(formData.email, formData.username, formData.password);
    
    if (success) {
      toast.success('Account created successfully! Welcome.');
      navigate('/dashboard');
    } else {
      setError('Failed to create account. Please try different credentials.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="mb-10 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6">
            <User className="w-9 h-9 text-white" />
          </div>
          <h2 className="text-4xl font-semibold tracking-tight">Create an account</h2>
          <p className="text-zinc-400 mt-3">Join the ForgeStore community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-2xl text-sm mb-6">
              {error}
            </div>
          )}
          <div>
            <label className="text-xs tracking-widest block mb-2 text-zinc-400">USERNAME</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
              className="w-full bg-zinc-900 border border-zinc-700 focus:border-white rounded-3xl px-6 py-5 outline-none text-lg"
              placeholder="johndoe"
            />
          </div>
          
          <div>
            <label className="text-xs tracking-widest block mb-2 text-zinc-400">EMAIL ADDRESS</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              className="w-full bg-zinc-900 border border-zinc-700 focus:border-white rounded-3xl px-6 py-5 outline-none text-lg"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label className="text-xs tracking-widest block mb-2 text-zinc-400">PASSWORD</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              className="w-full bg-zinc-900 border border-zinc-700 focus:border-white rounded-3xl px-6 py-5 outline-none text-lg"
              placeholder="Create a strong password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-6 bg-white text-black rounded-3xl font-semibold text-lg disabled:opacity-70 hover:bg-zinc-100 transition-all active:scale-[0.985]"
          >
            {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className="text-center mt-8 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
}