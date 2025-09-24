import { API_BASE_URL } from "../api/config";

export type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
};

// ✅ beauty, fragrances, skincare 3개만 필터링
export const BEAUTY_CATEGORIES = ["beauty", "fragrances", "skincare"] as const;
export type BeautyCategory = typeof BEAUTY_CATEGORIES[number];

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

// ✅ 카테고리 불러오기
export async function fetchBeautyCategories(): Promise<BeautyCategory[]> {
  const data = await fetchJSON<string[]>(`${API_BASE_URL}/products/categories`);
  return data.filter((c) =>
    (BEAUTY_CATEGORIES as readonly string[]).includes(c)
  ) as BeautyCategory[];
}

// ✅ 전체 상품 불러오기 (dummyjson은 { products: [...] } 구조라 꺼내줘야 함)
export async function fetchBeautyProducts(): Promise<Product[]> {
  const data = await fetchJSON<{ products: Product[] }>(`${API_BASE_URL}/products`);
  return data.products;
}

// ✅ 카테고리별 상품 불러오기
export async function fetchBeautyProductsByCategory(
  cat: BeautyCategory
): Promise<Product[]> {
  const data = await fetchJSON<{ products: Product[] }>(
    `${API_BASE_URL}/products/category/${cat}`
  );
  return data.products;
}
