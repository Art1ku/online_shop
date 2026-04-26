import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, Home, Package, BarChart3, Users, Sun, Moon, 
  ShoppingCart, User, LogOut, Menu, X 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const CartCount: React.FC = () => {
  const { cart } = useCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (count === 0) return null;
  return (
    <div className="absolute -top-1 -right-1 bg-rose-500 text-[10px] font-mono w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-zinc-900">
      {count > 9 ? '9+' : count}
    </div>
  );
};

export const Navbar: React.FC = () => {
  const { user, logout, isAdmin, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully');
  };

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-2xl tracking-tighter text-white">FORGE</span>
                <span className="font-semibold text-indigo-400 text-xl">STORE</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1 text-sm">
              <Link to="/" className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-colors ${isActive('/') ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}>
                <Home className="w-4 h-4" /> Home
              </Link>
              <Link to="/shop" className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-colors ${isActive('/shop') ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}>
                <Package className="w-4 h-4" /> Shop
              </Link>
              {isAuthenticated && (
                <>
                  <Link to="/dashboard" className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-colors ${isActive('/dashboard') ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}>
                    <BarChart3 className="w-4 h-4" /> Dashboard
                  </Link>
                  {isAdmin && (
                    <Link to="/admin/products" className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-colors ${location.pathname.startsWith('/admin') ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}>
                      <Users className="w-4 h-4" /> Admin
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-2xl transition-all" title={isDark ? "Light mode" : "Dark mode"}>
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              <>
                <Link to="/cart" className="relative p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-2xl transition-all flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  <CartCount />
                </Link>
                
                <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
                  <div className="text-right hidden md:block">
                    <div className="text-sm font-medium text-white">{user?.username}</div>
                    <div className="text-[10px] text-emerald-400 -mt-0.5">{user?.role}</div>
                  </div>
                  <div onClick={() => navigate('/profile')} className="w-9 h-9 bg-zinc-700 hover:bg-zinc-600 rounded-2xl flex items-center justify-center cursor-pointer transition-colors">
                    <User className="w-4 h-4 text-zinc-300" />
                  </div>
                  <button onClick={handleLogout} className="p-2 text-zinc-400 hover:text-red-400 transition-colors">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="px-6 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-3xl transition-colors">Login</Link>
                <Link to="/register" className="px-6 py-2 text-sm font-semibold bg-white text-zinc-900 hover:bg-white/90 rounded-3xl transition-all active:scale-[0.985]">Register</Link>
              </div>
            )}

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-zinc-400">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800 py-4 px-6">
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="py-3 px-4 hover:bg-zinc-800 rounded-2xl flex items-center gap-3">🏠 Home</Link>
            <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="py-3 px-4 hover:bg-zinc-800 rounded-2xl flex items-center gap-3">🛍️ Shop</Link>
            {isAuthenticated && (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="py-3 px-4 hover:bg-zinc-800 rounded-2xl flex items-center gap-3">📊 Dashboard</Link>
                {isAdmin && <Link to="/admin/products" onClick={() => setIsMenuOpen(false)} className="py-3 px-4 hover:bg-zinc-800 rounded-2xl flex items-center gap-3">⚙️ Admin Panel</Link>}
                <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="py-3 px-4 hover:bg-zinc-800 rounded-2xl flex items-center gap-3">🛒 Cart</Link>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="py-3 px-4 hover:bg-zinc-800 rounded-2xl flex items-center gap-3">👤 Profile</Link>
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="py-3 px-4 hover:bg-red-500/10 hover:text-red-400 text-left rounded-2xl flex items-center gap-3 text-red-400">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};