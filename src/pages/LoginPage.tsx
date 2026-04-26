import React, { useState, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }
    
    const success = await login(email, password);
    
    if (success) {
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } else {
      setError('Invalid credentials. Try admin@forgestore.com / admin');
      toast.error('Login failed');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-zinc-950">
      <div className="max-w-md w-full">
        <div className="mb-10 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6">
            <ShoppingBag className="w-9 h-9 text-white" />
          </div>
          <h2 className="text-4xl font-semibold tracking-tight">Welcome back</h2>
          <p className="text-zinc-400 mt-3">Sign in to access the admin dashboard and store</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-2xl text-sm mb-6">
              {error}
            </div>
          )}
          <div>
            <label className="text-xs tracking-widest block mb-2 text-zinc-400">EMAIL ADDRESS</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-zinc-900 border border-zinc-700 focus:border-white rounded-3xl px-6 py-5 outline-none text-lg placeholder:text-zinc-600"
              placeholder="admin@forgestore.com"
            />
          </div>
          
          <div>
            <label className="text-xs tracking-widest block mb-2 text-zinc-400">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-zinc-900 border border-zinc-700 focus:border-white rounded-3xl px-6 py-5 outline-none text-lg placeholder:text-zinc-600"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-6 bg-white text-black rounded-3xl font-semibold text-lg disabled:opacity-70 hover:bg-zinc-100 transition-all active:scale-[0.985]"
          >
            {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>

        <div className="text-center mt-8 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-400 hover:underline">Create one for free</Link>
        </div>
        
        <div className="text-[10px] text-center mt-16 text-zinc-500">
          Demo credentials:<br />admin@forgestore.com / admin<br />any@email.com / any password
        </div>
      </div>
    </div>
  );
}