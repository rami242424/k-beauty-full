import { PRODUCT_API_URL } from "../api/config";

export type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
};

export const BEAUTY_CATEGORIES = ["beauty", "fragrances", "skincare"] as const;
export type BeautyCategory = typeof BEAUTY_CATEGORIES[number];

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

// ✅ 카테고리 목록 가져오기
export async function fetchBeautyCategories(): Promise<BeautyCategory[]> {
  const data = await fetchJSON<string[]>(`${PRODUCT_API_URL}/products/categories`);
  return data.filter((c) =>
    (BEAUTY_CATEGORIES as readonly string[]).includes(c)
  ) as BeautyCategory[];
}

// ✅ 전체 상품 (뷰티 전용으로 필터링)
export async function fetchBeautyProducts(): Promise<Product[]> {
  const data = await fetchJSON<{ products: Product[] }>(`${PRODUCT_API_URL}/products`);
  return data.products.filter((p) =>
    (BEAUTY_CATEGORIES as readonly string[]).includes(p.category as BeautyCategory)
  );
}

// ✅ 카테고리별 상품 가져오기
export async function fetchBeautyProductsByCategory(
  cat: BeautyCategory
): Promise<Product[]> {
  const data = await fetchJSON<{ products: Product[] }>(
    `${PRODUCT_API_URL}/products/category/${cat}`
  );
  return data.products;
}
