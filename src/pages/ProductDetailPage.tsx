import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { api } from '../services/api';
import { usePageTitle } from '../hooks/usePageTitle';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { NotFoundPage } from './NotFoundPage';

export function ProductDetailPage() {
  usePageTitle('Product Details');
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    api.getProduct(id)
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Product not found");
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="h-96 bg-zinc-900 rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (!product) {
    return <NotFoundPage />;
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Added ${quantity} × ${product.title.slice(0, 18)} to cart!`);
    setQuantity(1);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm mb-8 hover:text-white text-zinc-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to shop
      </button>

      <div className="grid md:grid-cols-2 gap-16">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-[460px] object-contain drop-shadow-2xl"
          />
        </div>

        <div className="flex flex-col">
          <div className="uppercase text-xs tracking-widest text-zinc-500">{product.category}</div>
          <h1 className="text-5xl leading-none font-semibold tracking-tighter text-white mt-3 mb-6">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating.rate) ? "text-yellow-400 fill-yellow-400" : "text-zinc-700"}`} />
              ))}
            </div>
            <div className="text-sm text-zinc-400">
              {product.rating.rate} • {product.rating.count} reviews
            </div>
            <div className="ml-auto text-4xl font-semibold text-white tabular-nums">${product.price}</div>
          </div>

          <div className="border-t border-b border-zinc-800 py-8 text-zinc-300 leading-relaxed text-[15.2px]">
            {product.description}
          </div>

          <div className="mt-auto pt-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-sm text-zinc-400 mr-3">QUANTITY</div>
              <div className="flex border border-zinc-700 rounded-3xl">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center text-2xl hover:bg-zinc-900 rounded-l-3xl active:bg-zinc-800">-</button>
                <div className="w-12 h-12 flex items-center justify-center font-mono text-lg border-x border-zinc-700">{quantity}</div>
                <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center text-2xl hover:bg-zinc-900 rounded-r-3xl active:bg-zinc-800">+</button>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full py-6 bg-white text-xl font-semibold text-black rounded-3xl active:scale-[0.985] flex items-center justify-center gap-3 hover:bg-amber-100 transition-all"
            >
              <ShoppingBag className="w-6 h-6" /> ADD TO CART — ${ (product.price * quantity).toFixed(2) }
            </button>
            
            <div className="text-center text-xs text-zinc-500 mt-6">Free shipping on orders over $50 • 30 day returns</div>
          </div>
        </div>
      </div>
    </div>
  );
}