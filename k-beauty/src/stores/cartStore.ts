import { create } from "zustand";
import { useAuthStore } from "./authStore";

export type CartItem = {
  id: string;
  name: string;
  imageUrl: string;
  qty: number;
  priceUsd: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  hydrateCart: () => void;
  totalUsd: () => number;
};

const getCartKey = () => {
  const email = useAuthStore.getState().user?.email;
  return email ? `cart_${email}` : "cart_guest";
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) => {
    const key = getCartKey();
    const saved = localStorage.getItem(key);
    const current = saved ? (JSON.parse(saved) as CartItem[]) : [];
    const exists = current.find((i) => i.id === item.id);

    let newItems: CartItem[];
    if (exists) {
      newItems = current.map((i) =>
        i.id === item.id ? { ...i, qty: i.qty + item.qty } : i
      );
    } else {
      newItems = [...current, item];
    }

    localStorage.setItem(key, JSON.stringify(newItems));
    set({ items: newItems });
  },

  removeItem: (id) => {
    const key = getCartKey();
    const saved = localStorage.getItem(key);
    const current = saved ? (JSON.parse(saved) as CartItem[]) : [];
    const newItems = current.filter((i) => i.id !== id);

    localStorage.setItem(key, JSON.stringify(newItems));
    set({ items: newItems });
  },

  updateQty: (id, qty) => {
    const key = getCartKey();
    const saved = localStorage.getItem(key);
    const current = saved ? (JSON.parse(saved) as CartItem[]) : [];
    const newItems = current.map((i) =>
      i.id === id ? { ...i, qty: Math.max(1, qty) } : i
    );

    localStorage.setItem(key, JSON.stringify(newItems));
    set({ items: newItems });
  },

  clear: () => {
    const key = getCartKey();
    localStorage.removeItem(key);
    set({ items: [] });
  },

  hydrateCart: () => {
    const key = getCartKey();
    const saved = localStorage.getItem(key);
    set({ items: saved ? (JSON.parse(saved) as CartItem[]) : [] });
  },

  totalUsd: () =>
    get().items.reduce((sum, i) => sum + i.priceUsd * i.qty, 0),
}));

export const useCartTotalUSD = () => useCartStore((s) => s.totalUsd());
export const useCartCount = () =>
  useCartStore((s) => s.items.reduce((sum, i) => sum + i.qty, 0));
