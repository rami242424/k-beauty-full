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
  const data = await fetchJSON<any[]>("https://dummyjson.com/products/categories");
  
  return data.filter((c) => (BEAUTY_CATEGORIES as readonly string[]).includes(c)) as BeautyCategory[];
}

export async function fetchBeautyProducts(): Promise<Product[]> {
  let all: Product[] = [];
  for (const cat of BEAUTY_CATEGORIES) {
    const data = await fetchJSON<{ products: any[] }>(
      `https://dummyjson.com/products/category/${cat}`
    );
    const mapped = (data.products ?? []).map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      rating: p.rating,
      category: p.category,     
      thumbnail: p.thumbnail,
    })) as Product[];
    all = all.concat(mapped);
  }
  return all;
}

export async function fetchBeautyProductsByCategory(cat: BeautyCategory): Promise<Product[]> {
  const data = await fetchJSON<{ products: any[] }>(
    `https://dummyjson.com/products/category/${cat}`
  );
  return (data.products ?? []).map((p) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    rating: p.rating,
    category: p.category,
    thumbnail: p.thumbnail,
  })) as Product[];
}
