import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

export function ProductCard({ product, showAddToCart = true }: { product: Product; showAddToCart?: boolean }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="group bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-700 transition-all cursor-pointer flex flex-col"
    >
      <div className="relative h-60 bg-zinc-950 flex items-center justify-center p-8">
        <img 
          src={product.image} 
          alt={product.title}
          className="max-h-[190px] object-contain group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-black/70 text-[10px] font-mono px-2.5 py-1 rounded-2xl">
          ${product.price}
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="text-xs uppercase tracking-widest text-zinc-500 mb-1">{product.category}</div>
        <div className="line-clamp-2 font-medium leading-tight text-lg mb-auto group-hover:text-indigo-400 transition-colors">
          {product.title}
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-px">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating.rate) ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-700'}`} 
              />
            ))}
            <span className="text-[10px] ml-2 text-zinc-500 tabular-nums">({product.rating.count})</span>
          </div>
          
          {showAddToCart && (
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                addToCart(product); 
              }}
              className="bg-white text-black px-5 py-2 text-xs font-semibold rounded-2xl active:scale-95 transition-all hover:bg-amber-200"
            >
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
}