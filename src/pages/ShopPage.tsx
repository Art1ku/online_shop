import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Product } from '../types';

import { usePageTitle } from '../hooks/usePageTitle';
import { ProductCard } from '../components/ProductCard';
import { toast } from 'sonner';
import { api } from '../services/api';

export function ShopPage() {
  usePageTitle('Shop');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'rating' | 'default'>('default');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const categories = ['all', "electronics", "jewelery", "men's clothing", "women's clothing"];

  useEffect(() => {
    setLoading(true);
    api.getProducts()
      .then((data: Product[]) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        toast.error('Failed to load products');
      });
  }, []);

  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, searchTerm, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="text-xs tracking-[2px] text-indigo-400">MARKETPLACE</div>
          <h1 className="text-5xl font-semibold tracking-tighter text-white">All Products</h1>
          <p className="text-zinc-400 mt-2">Discover our complete catalog • {filteredProducts.length} results</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 bg-zinc-900 border border-zinc-700 focus:border-indigo-500 w-full md:w-72 py-3.5 rounded-3xl text-sm placeholder:text-zinc-500 focus:outline-none"
            />
          </div>
          
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 text-sm rounded-3xl px-5 py-3.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-zinc-900 border border-zinc-700 text-sm rounded-3xl px-5 py-3.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="default">Sort: Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Best Rated</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-96 bg-zinc-900 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="h-80 flex flex-col items-center justify-center text-center">
          <div className="text-6xl mb-6 opacity-40">🔎</div>
          <h3 className="text-2xl font-medium text-white mb-2">No products found</h3>
          <p className="text-zinc-400 max-w-xs">We couldn't find any products matching your criteria. Try different filters.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSortBy('default');
            }}
            className="mt-8 px-8 py-3.5 text-sm border border-white/30 rounded-3xl hover:bg-white/5"
          >
            CLEAR FILTERS
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {paginatedProducts.map(product => (
              <ProductCard key={product.id} product={product} showAddToCart={true} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-16">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-5 py-3 disabled:opacity-40 border border-zinc-700 hover:bg-zinc-900 rounded-2xl flex items-center justify-center"
              >
                ← Previous
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-medium transition-all ${currentPage === pageNum 
                      ? 'bg-white text-black shadow-inner' 
                      : 'border border-zinc-700 hover:bg-zinc-900'}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-5 py-3 disabled:opacity-40 border border-zinc-700 hover:bg-zinc-900 rounded-2xl flex items-center justify-center"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}