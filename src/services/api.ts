export const API_BASE = 'https://fakestoreapi.com';

export const api = {
  getProducts: (limit?: number) => 
    fetch(`${API_BASE}/products${limit ? `?limit=${limit}` : ''}`).then(r => r.json()),
  
  getProduct: (id: string | number) => 
    fetch(`${API_BASE}/products/${id}`).then(r => r.json()),
  
  createProduct: (data: any) => 
    fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
    
  updateProduct: (id: string | number, data: any) => 
    fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
    
  deleteProduct: (id: string | number) => 
    fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' }).then(r => r.json()),
    
  getUsers: (limit = 8) => 
    fetch(`${API_BASE}/users?limit=${limit}`).then(r => r.json()),
};