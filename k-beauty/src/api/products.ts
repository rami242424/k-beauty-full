import { API_BASE_URL } from "../api/config";

export type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
};

export const BEAUTY_CATEGORIES = ["beauty", "skin-care", "fragrances"] as const;
export type BeautyCategory = typeof BEAUTY_CATEGORIES[number];

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export async function fetchBeautyCategories(): Promise<BeautyCategory[]> {
  const data = await fetchJSON<any[]>(`${API_BASE_URL}/categories`);
  return data.filter((c) =>
    (BEAUTY_CATEGORIES as readonly string[]).includes(c)
  ) as BeautyCategory[];
}

export async function fetchBeautyProducts(): Promise<Product[]> {
  return await fetchJSON<Product[]>(`${API_BASE_URL}/products`);
}

export async function fetchBeautyProductsByCategory(
  cat: BeautyCategory
): Promise<Product[]> {
  return await fetchJSON<Product[]>(`${API_BASE_URL}/products/category/${cat}`);
}
