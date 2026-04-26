import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

type ErrorsType = {
  title?: string;
  price?: string;
  category?: string;
  description?: string;
  image?: string;
};

export function CreateProductPage() {
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null; // Don't flash the form while redirecting
  }

  const [form, setForm] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
    image: '',
  });

  const [errors, setErrors] = useState<ErrorsType>({});
  const [loading, setLoading] = useState(false);

  const fields: (keyof typeof form)[] = [
    'title',
    'price',
    'category',
    'description',
    'image',
  ];

  const validate = () => {
    const e: ErrorsType = {};

    if (!form.title.trim()) {
      e.title = 'Title is required';
    }

    if (!form.price || isNaN(Number(form.price)) || +form.price <= 0) {
      e.price = 'Valid price required';
    }

    if (!form.category.trim()) {
      e.category = 'Category is required';
    }

    if (!form.description.trim()) {
      e.description = 'Description is required';
    }

    if (!form.image.trim()) {
      e.image = 'Image URL is required';
    }

    return e;
  };

  const handleSubmit = async () => {
    if (user?.role !== 'admin') {
      alert('Access denied: Admins only');
      navigate('/dashboard');
      return;
    }

    const e = validate();

    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    try {
      setLoading(true);

      const data = await api.createProduct({
        title: form.title,
        price: +form.price,
        category: form.category,
        description: form.description,
        image: form.image,
      });

      alert(`Product created successfully! ID: ${data.id}`);

      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <div className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight mb-2">
            Create Product
          </h1>

          <p className="text-zinc-400">
            Add a new item to your store
          </p>
        </div>

        <div className="space-y-6">
          {fields.map((field) => (
            <div key={field}>
              <label className="block text-sm text-zinc-400 mb-2 capitalize">
                {field}
              </label>

              <input
                type={field === 'price' ? 'number' : 'text'}
                value={form[field]}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [field]: e.target.value,
                  })
                }
                placeholder={`Enter ${field}`}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 transition-all"
              />

              {errors[field] && (
                <p className="text-red-400 text-sm mt-2">
                  {errors[field]}
                </p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-8 bg-white text-black py-4 rounded-2xl font-semibold hover:bg-zinc-200 active:scale-[0.99] transition-all disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </div>
    </div>
  );
}