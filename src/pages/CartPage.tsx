import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CartItem } from '../types';
import { toast } from 'sonner';

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Please login to checkout");
      navigate('/login');
      return;
    }
    toast.success("🎉 Thank you! This is a demo. Your order has been placed.");
    clearCart();
    setTimeout(() => navigate('/'), 1600);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="mx-auto w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center mb-8">
          🛒
        </div>
        <h2 className="text-4xl font-semibold mb-3">Your cart is empty</h2>
        <p className="text-zinc-400 mb-10">Looks like you haven't added anything yet.</p>
        <button 
          onClick={() => navigate('/shop')}
          className="bg-white text-black px-10 py-4 rounded-3xl font-semibold"
        >
          START SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-semibold tracking-tighter mb-2">Your Cart</h1>
      <p className="text-zinc-400 mb-12">Review your selections before checkout</p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          {cart.map((item: CartItem, index: number) => (
            <div key={index} className="flex gap-7 border-b border-zinc-800 py-8 first:pt-0">
              <div className="w-28 h-28 bg-zinc-900 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                <img src={item.product.image} className="h-20 object-contain" alt="" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium text-lg leading-tight pr-8">{item.product.title}</div>
                    <div className="text-xs text-zinc-500 mt-1.5 uppercase">{item.product.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xl">${(item.product.price * item.quantity).toFixed(2)}</div>
                    <div className="text-xs text-zinc-400 mt-1">${item.product.price} each</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 mt-8">
                  <div className="flex items-center border border-zinc-700 rounded-3xl">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-4 py-2 text-xl hover:bg-zinc-900 rounded-l-3xl">-</button>
                    <div className="px-6 font-mono">{item.quantity}</div>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-4 py-2 text-xl hover:bg-zinc-900 rounded-r-3xl">+</button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-xs text-red-400 hover:text-red-500 flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> REMOVE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-5">
          <div className="bg-zinc-900 rounded-3xl p-8 sticky top-24">
            <div className="text-sm tracking-widest text-zinc-400 mb-4">ORDER SUMMARY</div>
            
            <div className="flex justify-between text-lg mb-4">
              <div>Subtotal</div>
              <div className="font-medium">${getTotal().toFixed(2)}</div>
            </div>
            
            <div className="flex justify-between text-lg mb-4">
              <div>Shipping</div>
              <div className="text-emerald-400">FREE</div>
            </div>
            
            <div className="h-px bg-zinc-800 my-8"></div>
            
            <div className="flex justify-between text-2xl font-semibold mb-10">
              <div>Total</div>
              <div>${getTotal().toFixed(2)}</div>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 rounded-3xl hover:brightness-110 active:scale-[0.985] transition-all"
            >
              PROCEED TO CHECKOUT
            </button>
            
            <div onClick={() => navigate('/shop')} className="text-center text-xs text-zinc-400 mt-8 underline cursor-pointer">Continue Shopping</div>
          </div>
        </div>
      </div>
    </div>
  );
}