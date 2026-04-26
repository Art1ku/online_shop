import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Edit2, Trash2, Package, Star } from 'lucide-react';
import { Product } from '../types';
import { api } from '../services/api';
import { usePageTitle } from '../hooks/usePageTitle';
import { toast } from 'sonner';

export function AdminProductsPage() {
  usePageTitle('Manage Products');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (e) {
      toast.error("Could not load products from API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteProduct = async (id: number) => {
    if (!confirm('Delete this product permanently?')) return;
    
    try {
      await api.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-violet-500/10 text-violet-400 p-3 rounded-2xl">
            <Package className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">Products</h1>
            <p className="text-zinc-400">Manage inventory • {filteredProducts.length} items</p>
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/admin/products/new')}
          className="flex items-center gap-3 bg-white hover:bg-zinc-100 text-zinc-950 px-7 py-3.5 rounded-3xl font-medium text-sm active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" /> ADD NEW PRODUCT
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-5 top-4 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Filter products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 pl-12 py-4 rounded-3xl focus:outline-none text-sm"
            />
          </div>
          <button onClick={fetchProducts} className="px-8 py-4 border border-zinc-700 rounded-3xl text-sm hover:bg-zinc-800">REFRESH</button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-zinc-400">Loading products from FakeStore API...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 text-xs text-left text-zinc-400">
                  <th className="pl-8 py-5 font-normal">PRODUCT</th>
                  <th className="py-5 font-normal">CATEGORY</th>
                  <th className="py-5 font-normal">PRICE</th>
                  <th className="py-5 font-normal">RATING</th>
                  <th className="py-5 font-normal text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-sm">
                {filteredProducts.slice(0, 12).map(product => (
                  <tr key={product.id} className="hover:bg-zinc-950/60 group">
                    <td className="pl-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className="w-10 h-10 bg-zinc-800 rounded-2xl overflow-hidden">
                          <img src={product.image} className="h-full w-full object-cover" alt="" />
                        </div>
                        <div className="line-clamp-1 max-w-[260px]">{product.title}</div>
                      </div>
                    </td>
                    <td className="py-6">
                      <span className="uppercase text-xs tracking-widest px-4 py-1 bg-zinc-800 rounded-3xl text-zinc-400">{product.category}</span>
                    </td>
                    <td className="py-6 font-medium tabular-nums">${product.price}</td>
                    <td className="py-6">
                      <div className="flex items-center gap-px">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating.rate) ? 'text-yellow-400' : 'text-zinc-700'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="py-6">
                      <div className="flex items-center justify-center gap-3 opacity-70 group-hover:opacity-100 transition-all">
                        <button 
                          onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                          className="p-3 hover:bg-zinc-800 rounded-2xl"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          className="p-3 hover:bg-red-950 text-red-400 rounded-2xl"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => navigate(`/product/${product.id}`)}
                          className="text-xs px-5 py-2 border border-zinc-700 rounded-3xl hover:bg-white hover:text-black transition-all"
                        >
                          VIEW
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <div className="text-xs text-center mt-8 text-zinc-500">Note: The API is read-only for this demo. CRUD operations update local state only.</div>
    </div>
  );
}