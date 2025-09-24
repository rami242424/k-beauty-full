import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchBeautyCategories,
  fetchBeautyProducts,
  type Product,
} from "../../api/products";
import RankingSection from "./RankingSection";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { useCartStore } from "../../stores/cartStore";
import { toast } from "sonner";
import { useI18n } from "../../lib/i18n";
import { formatFromUSD } from "../../lib/money";

export default function HomePage() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [cats, prods] = await Promise.all([
          fetchBeautyCategories(),
          fetchBeautyProducts(),
        ]);
        if (!mounted) return;
        setCategories(cats);
        setProducts(prods);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const todaysDeals = useMemo(
    () => [...products].sort((a, b) => a.price - b.price).slice(0, 6),
    [products]
  );
  const topRank = useMemo(
    () => [...products].sort((a, b) => b.rating - a.rating).slice(0, 10),
    [products]
  );

  if (loading) return <div className="p-6 text-gray-600">로딩 중...</div>;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    navigate(query ? `/catalog?q=${encodeURIComponent(query)}` : "/catalog");
  };


  const promotions = [
    {
      id: "demonhunters",
      title: "데몬헌터스 속 뷰티제품",
      desc: "저승에서도 변함없는 촉촉함, 데몬 헌터 크림",
      img: "/images/demon_1.png",
    },
    {
      id: "jennie",
      title: "제니의 뷰티제품",
      desc: "K-뷰티의 얼굴, 제니가 선택한 글로우 세럼",
      img: "/images/jenny_2.png",
    },
    {
      id: "cardib",
      title: "헐리우드 스타 뷰티",
      desc: "카디비도 반한 한국산 틴트 & 쿠션팩트",
      img: "/images/cardib_3.png",
    },
  ];

  return (
    <div className="pb-16">
      <section className="mt-4">
        <div className="max-w-6xl mx-auto px-4">
          <form onSubmit={onSubmit} className="w-full">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchPlaceholder")}
              className="w-full px-3 py-2 rounded-xl border outline-none"
            />
          </form>
        </div>
      </section>
      <section className="mt-4">
        <div className="max-w-6xl mx-auto px-4">
          <div
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory rounded-2xl"
            style={{ scrollBehavior: "smooth" }}
          >
            {promotions.map((p) => (
              <div
                key={p.id}
                className="snap-center min-w-[90%] sm:min-w-[48%] md:min-w-[32%] relative"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-2xl border"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-xl font-semibold">{p.title}</div>
                  <p className="text-sm opacity-90">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mt-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-bold ink">{t("todaysDeals")}</h2>
            <Link to="/catalog" className="text-sm text-brand-600">
              {t("seeMore")} →
            </Link>
          </div>
          <div className="mt-4 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
            {todaysDeals.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>
      <section className="mt-10">
        <div className="max-w-6xl mx-auto px-4">
          <RankingSection products={topRank} title={t("rankingTop10")} />
        </div>
      </section>
    </div>
  );
}

function ProductCard({ p, compact }: { p: Product; compact?: boolean }) {
  const { t, lang } = useI18n();
  const addItem = useCartStore((s) => s.addItem);

  return (
    <article className="card flex h-full flex-col p-3">
      <div
        className={`${
          compact ? "h-32" : "h-40"
        } mb-3 w-full overflow-hidden rounded-xl bg-white`}
      >
        <img
          src={p.thumbnail}
          alt={p.title}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="font-semibold line-clamp-2 min-h-[3rem] ink">
        {p.title}
      </div>

      <div className="mt-1 flex items-center gap-2 text-sm">
        <span className="text-gray-500 capitalize">
          {p.category.replace("-", " ")}
        </span>
        <Badge variant="brand">
          ★ {typeof p.rating === "number" ? p.rating.toFixed(1) : p.rating}
        </Badge>
      </div>

      <div className="mt-1 price font-bold">
        {formatFromUSD(p.price, lang)}
      </div>

      <div className="mt-auto" />

      <Button
        variant="solid"
        className="mt-3 w-full"
        onClick={() => {
          addItem({
            id: String(p.id),
            name: p.title,
            priceUsd: p.price,
            imageUrl: p.thumbnail,
            qty: 1,
          });
          toast.success(t("toast_addedToCart"));
        }}
      >
        {t("addToCart")}
      </Button>
    </article>
  );
}
