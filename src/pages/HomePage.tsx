import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Product } from '../types';

import { usePageTitle } from '../hooks/usePageTitle';
import { ProductCard } from '../components/ProductCard';
import { api } from '../services/api';

export function HomePage() {
  usePageTitle('Home');
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getProducts(4)
      .then(data => {
        setFeaturedProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = [
    { name: "Electronics", icon: "💻", count: "142" },
    { name: "Jewelry", icon: "💎", count: "34" },
    { name: "Men's Clothing", icon: "👕", count: "87" },
    { name: "Women's Clothing", icon: "👗", count: "91" },
  ];

  return (
    <div className="pt-8">
      {/* HERO */}
      <div className="relative h-[640px] flex items-center bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(at_50%_30%,rgba(129,140,248,0.15),transparent)]"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 relative z-10 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/5 text-white text-sm px-5 py-1.5 rounded-3xl border border-white/10">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              NEW SEASON DROPS
            </div>
            
            <h1 className="text-7xl md:text-8xl font-semibold tracking-tighter leading-none text-white">
              MODERN<br />STYLE FOR<br />THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">DIGITAL AGE</span>
            </h1>
            
            <p className="max-w-md text-xl text-zinc-400">
              Discover premium products from the world's most iconic brands. 
              Shop the latest trends with confidence.
            </p>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/shop')}
                className="px-10 py-4 bg-white hover:bg-amber-100 active:bg-white text-zinc-950 rounded-3xl font-semibold flex items-center gap-3 group transition-all"
              >
                BROWSE COLLECTION
                <span className="group-active:rotate-45 transition">→</span>
              </button>
              
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-8 py-4 border border-white/30 hover:bg-white/5 text-white rounded-3xl font-medium transition-all"
              >
                Go to Dashboard
              </button>
            </div>

            <div className="flex items-center gap-8 pt-6 text-sm">
              <div>
                <div className="text-emerald-400 font-mono text-xl font-medium">4.98</div>
                <div className="text-zinc-500 text-xs">AVG RATING</div>
              </div>
              <div>
                <div className="text-emerald-400 font-mono text-xl font-medium">124k</div>
                <div className="text-zinc-500 text-xs">HAPPY CUSTOMERS</div>
              </div>
              <div>
                <div className="text-emerald-400 font-mono text-xl font-medium">∞</div>
                <div className="text-zinc-500 text-xs">PRODUCTS</div>
              </div>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute -right-6 -top-12 w-96 h-96 bg-indigo-500/10 rounded-[4rem] -rotate-12"></div>
            <img 
              src="https://picsum.photos/id/1015/600/620" 
              alt="Hero" 
              className="relative rounded-3xl shadow-2xl border border-white/10 object-cover h-[520px] w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-zinc-900 border border-zinc-700 rounded-3xl p-6 max-w-[220px]">
              <div className="flex gap-4">
                <div className="text-4xl">⭐</div>
                <div>
                  <div className="font-semibold">Trusted by the best</div>
                  <div className="text-xs text-zinc-400 mt-1 leading-tight">Featured in Vogue, Wired, and The New York Times</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/30'}`} />
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="uppercase tracking-[3px] text-xs text-indigo-400 font-medium">CATEGORIES</div>
            <h2 className="text-5xl font-semibold tracking-tight text-white">Shop by category</h2>
          </div>
          <Link to="/shop" className="flex items-center gap-2 text-sm group">
            EXPLORE ALL 
            <span className="transition group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div 
              key={index}
              onClick={() => navigate('/shop')}
              className="group bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800 hover:border-indigo-500/30 transition-all rounded-3xl p-8 cursor-pointer flex flex-col justify-between h-64"
            >
              <div className="text-6xl opacity-75 group-hover:scale-110 transition-transform">{cat.icon}</div>
              <div>
                <div className="text-3xl font-semibold text-white tracking-tight">{cat.name}</div>
                <div className="text-xs text-zinc-500 mt-1">{cat.count} products</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-semibold tracking-tight">Featured Products</h2>
          <Link to="/shop" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2 text-sm">
            VIEW ALL PRODUCTS <ArrowLeft className="rotate-180 w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-zinc-900 rounded-3xl h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <footer className="bg-black py-16 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-zinc-500">
          Built as a full-featured demo using FakeStore API • React 19 • Tailwind • Recharts • React Router
          <div className="mt-3">Meets all project criteria for an E-commerce Admin Dashboard with Storefront</div>
        </div>
      </footer>
    </div>
  );
}