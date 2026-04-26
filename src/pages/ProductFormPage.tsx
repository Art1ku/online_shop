import React, { useState, useEffect, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { api } from '../services/api';
import { usePageTitle } from '../hooks/usePageTitle';
import { toast } from 'sonner';

export function ProductFormPage({ isEdit }: { isEdit: boolean }) {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: 'electronics',
    image: 'https://picsum.photos/id/20/300/300'
  });
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      setIsFetching(true);
      api.getProduct(id)
        .then((data: Product) => {
          setFormData({
            title: data.title,
            price: data.price.toString(),
            description: data.description,
            category: data.category,
            image: data.image
          });
          setIsFetching(false);
        })
        .catch(() => setIsFetching(false));
    }
  }, [isEdit, id]);

  usePageTitle(isEdit ? 'Edit Product' : 'Create Product');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: formData.title,
      price: parseFloat(formData.price),
      description: formData.description,
      category: formData.category,
      image: formData.image,
    };

    try {
      if (isEdit && id) {
        await api.updateProduct(id, payload);
        toast.success('Product updated successfully');
      } else {
        await api.createProduct(payload);
        toast.success('Product created successfully');
      }
      navigate('/admin/products');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return <div className="p-20 text-center">Loading product data...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <button onClick={() => navigate('/admin/products')} className="flex items-center gap-2 mb-8 text-sm text-zinc-400 hover:text-white">
        ← Back to products
      </button>

      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-12">
        <h1 className="text-4xl font-semibold tracking-tight mb-2">
          {isEdit ? 'Edit Product' : 'Create New Product'}
        </h1>
        <p className="text-zinc-400 mb-10">Fill in the details below</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-xs tracking-widest mb-3 text-zinc-400">PRODUCT TITLE</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full rounded-3xl border border-zinc-700 bg-zinc-950 px-7 py-6 outline-none text-lg placeholder:text-zinc-500"
              placeholder="Wireless Bluetooth Headphones"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs tracking-widest mb-3 text-zinc-400">PRICE ($)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                step="0.01"
                className="w-full rounded-3xl border border-zinc-700 bg-zinc-950 px-7 py-6 outline-none text-lg placeholder:text-zinc-500"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest mb-3 text-zinc-400">CATEGORY</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-3xl border border-zinc-700 bg-zinc-950 px-7 py-6 outline-none text-lg"
              >
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelry</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-widest mb-3 text-zinc-400">DESCRIPTION</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={5}
              className="w-full rounded-3xl border border-zinc-700 bg-zinc-950 px-7 py-6 outline-none resize-y text-base"
              placeholder="Describe this product in detail..."
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest mb-3 text-zinc-400">IMAGE URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full rounded-3xl border border-zinc-700 bg-zinc-950 px-7 py-6 outline-none text-base font-mono text-xs"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={() => navigate('/admin/products')}
              className="flex-1 py-6 border border-zinc-700 rounded-3xl text-sm font-medium"
            >
              CANCEL
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 py-6 bg-white text-black rounded-3xl text-sm font-semibold disabled:opacity-60"
            >
              {loading ? 'SAVING...' : isEdit ? 'UPDATE PRODUCT' : 'CREATE PRODUCT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}