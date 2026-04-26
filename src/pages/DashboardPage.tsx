import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Product, User } from '../types';
import { api } from '../services/api';
import { usePageTitle } from '../hooks/usePageTitle';

export function DashboardPage() {
  usePageTitle('Dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const salesData = [
    { name: 'Jan', sales: 4200, orders: 42 },
    { name: 'Feb', sales: 3100, orders: 31 },
    { name: 'Mar', sales: 6800, orders: 64 },
    { name: 'Apr', sales: 5200, orders: 55 },
    { name: 'May', sales: 8100, orders: 79 },
    { name: 'Jun', sales: 9400, orders: 93 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 42, color: '#6366f1' },
    { name: 'Clothing', value: 38, color: '#a855f7' },
    { name: 'Jewelry', value: 20, color: '#ec4899' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodData, userData] = await Promise.all([
          api.getProducts(),
          api.getUsers(6)
        ]);
        
        setProducts(prodData.slice(0, 8));
        setUsers(userData);
      } catch (error) {
        console.error('Failed to load dashboard data');
      }
    };
    
    fetchData();
  }, []);

  const totalRevenue = salesData.reduce((sum, month) => sum + month.sales, 0);
  const totalOrders = salesData.reduce((sum, month) => sum + month.orders, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-5xl font-semibold tracking-tighter">Dashboard</h1>
          <p className="text-zinc-400">Welcome back • Overview of your store</p>
        </div>
        <div className="text-xs px-5 py-2 bg-emerald-900/30 text-emerald-400 rounded-3xl font-mono">LIVE</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Total Revenue", value: `$${totalRevenue}`, change: "+18%", color: "emerald" },
          { label: "Total Orders", value: totalOrders.toString(), change: "+9%", color: "violet" },
          { label: "Products", value: products.length + 120, change: "-2%", color: "amber" },
          { label: "Active Users", value: users.length + 1240, change: "+31%", color: "sky" }
        ].map((stat, index) => (
          <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <div className="text-xs text-zinc-400 tracking-wider mb-3">{stat.label}</div>
            <div className="text-5xl font-semibold text-white tracking-tighter mb-6">{stat.value}</div>
            <div className={`inline-flex text-xs items-center gap-1 ${stat.color === 'emerald' ? 'text-emerald-400' : stat.color === 'violet' ? 'text-violet-400' : stat.color === 'amber' ? 'text-amber-400' : 'text-sky-400'}`}>
              {stat.change} from last month
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <div className="flex justify-between mb-8">
            <div>
              <div className="font-semibold text-xl">Revenue Trend</div>
              <div className="text-sm text-zinc-400">Monthly performance</div>
            </div>
            <div className="text-xs self-end bg-zinc-800 text-zinc-400 px-4 py-2 rounded-2xl">LAST 6 MONTHS</div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="name" stroke="#3f3f46" />
              <YAxis stroke="#3f3f46" />
              <Tooltip contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '12px' }} />
              <Line type="natural" dataKey="sales" stroke="#6366f1" strokeWidth={4} dot={{ fill: '#6366f1', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <div className="font-semibold text-xl mb-8">Category Breakdown</div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="48%"
                innerRadius={72}
                outerRadius={110}
                dataKey="value"
                nameKey="name"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center mt-4">
            {categoryData.map((entry, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded" style={{backgroundColor: entry.color}}></div>
                <span>{entry.name}</span>
                <span className="font-mono text-xs text-zinc-400">({entry.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-12 mt-2">
          <div className="flex justify-between items-baseline mb-6 px-1">
            <div className="font-semibold tracking-tight text-xl">Recent Products</div>
            <Link to="/admin/products" className="text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300">MANAGE ALL PRODUCTS →</Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, 4).map(product => (
              <div key={product.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 flex gap-5">
                <img src={product.image} className="w-20 h-20 object-contain bg-zinc-950 rounded-2xl" alt="" />
                <div className="flex-1 pt-1">
                  <div className="text-sm font-medium line-clamp-2 leading-tight mb-3">{product.title}</div>
                  <div className="text-xs text-emerald-400">${product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}