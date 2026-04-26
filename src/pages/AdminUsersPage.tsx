import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../services/api';
import { usePageTitle } from '../hooks/usePageTitle';

export function AdminUsersPage() {
  usePageTitle('Manage Users');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getUsers(8)
      .then((data: any[]) => {
        const mapped = data.map((u: any, index: number) => ({
          ...u,
          role: index % 3 === 0 ? 'admin' : 'user'
        }));
        setUsers(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-5xl font-semibold tracking-tight">Users</h1>
        <p className="text-zinc-400">Customer and admin accounts</p>
      </div>

      <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">
        <div className="p-8 flex items-center justify-between border-b border-zinc-800">
          <div className="font-semibold">Registered Users</div>
          <div className="text-xs font-mono bg-zinc-800 px-4 py-2 rounded-3xl">8 shown from API</div>
        </div>
        
        <div className="divide-y divide-zinc-800">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="px-8 py-7 flex items-center gap-4 animate-pulse">
                <div className="w-9 h-9 rounded-2xl bg-zinc-700" />
                <div className="flex-1">
                  <div className="h-3 w-44 bg-zinc-700 rounded" />
                  <div className="h-2.5 w-64 bg-zinc-800 mt-3 rounded" />
                </div>
              </div>
            ))
          ) : (
            users.map((user: User) => (
              <div key={user.id} className="px-8 py-7 flex gap-6 items-center">
                <div className="w-10 h-10 bg-zinc-700 rounded-2xl flex items-center justify-center text-xl">
                  {user.role === 'admin' ? '👑' : '🧑'}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">{user.username || user.email.split('@')[0]}</div>
                  <div className="text-xs text-zinc-400 font-mono">{user.email}</div>
                </div>
                <div>
                  <span className={`text-xs px-6 py-2 rounded-3xl ${user.role === 'admin' ? 'bg-violet-400/10 text-violet-400' : 'bg-zinc-700 text-zinc-400'}`}>
                    {user.role}
                  </span>
                </div>
                <div className="text-xs text-right text-zinc-500 tabular-nums font-mono">ID: {user.id}</div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="mt-8 text-xs text-zinc-500 text-center">Users are fetched from the Fake Store API</div>
    </div>
  );
}