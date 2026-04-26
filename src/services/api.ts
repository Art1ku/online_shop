export const API_BASE = 'https://fakestoreapi.com';

const LOCAL_PRODUCTS_KEY = 'custom_products';

export const api = {
  getProducts: async (limit?: number) => {
    const apiProducts = await fetch(
      `${API_BASE}/products${limit ? `?limit=${limit}` : ''}`
    ).then(r => r.json());

    const localProducts = JSON.parse(
      localStorage.getItem(LOCAL_PRODUCTS_KEY) || '[]'
    );

    return [...localProducts, ...apiProducts];
  },

  getProduct: async (id: string | number) => {
    const localProducts = JSON.parse(
      localStorage.getItem(LOCAL_PRODUCTS_KEY) || '[]'
    );

    const localProduct = localProducts.find(
      (p: any) => String(p.id) === String(id)
    );

    if (localProduct) {
      return localProduct;
    }

    return fetch(`${API_BASE}/products/${id}`).then(r => r.json());
  },

  createProduct: async (data: any) => {
    const localProducts = JSON.parse(
      localStorage.getItem(LOCAL_PRODUCTS_KEY) || '[]'
    );

    const newProduct = {
      ...data,
      id: Date.now(),
      rating: {
        rate: 5,
        count: 1,
      },
    };

    localProducts.unshift(newProduct);

    localStorage.setItem(
      LOCAL_PRODUCTS_KEY,
      JSON.stringify(localProducts)
    );

    return newProduct;
  },

  updateProduct: async (id: string | number, data: any) => {
    const localProducts = JSON.parse(
      localStorage.getItem(LOCAL_PRODUCTS_KEY) || '[]'
    );

    const updated = localProducts.map((p: any) =>
      String(p.id) === String(id)
        ? { ...p, ...data }
        : p
    );

    localStorage.setItem(
      LOCAL_PRODUCTS_KEY,
      JSON.stringify(updated)
    );

    return data;
  },

  deleteProduct: async (id: string | number) => {
    const localProducts = JSON.parse(
      localStorage.getItem(LOCAL_PRODUCTS_KEY) || '[]'
    );

    const filtered = localProducts.filter(
      (p: any) => String(p.id) !== String(id)
    );

    localStorage.setItem(
      LOCAL_PRODUCTS_KEY,
      JSON.stringify(filtered)
    );

    return { success: true };
  },

  getUsers: (limit = 8) =>
    fetch(`${API_BASE}/users?limit=${limit}`).then(r => r.json()),
};