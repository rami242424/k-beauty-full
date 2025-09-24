import { useEffect, useRef, useState } from "react";
import type { Product } from "../../api/products";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { useCartStore } from "../../stores/cartStore";
import { toast } from "sonner";
import { useI18n } from "../../lib/i18n";
import { formatFromUSD } from "../../lib/money";

export default function RankingSection({
  products,
  title = "랭킹 TOP 10",
}: {
  products: Product[];
  title?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const CARD_WIDTH = 220; 
  const updateEdge = () => {
    const el = ref.current;
    if (!el) return;
    const sl = el.scrollLeft;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(sl <= 1);
    setAtEnd(sl >= max - 1);
  };

  useEffect(() => {
    updateEdge();
    const el = ref.current;
    if (!el) return;
    const onScroll = () => updateEdge();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = ref.current;
    if (!el) return;

    const styles = getComputedStyle(el);
    const gap = parseInt(styles.columnGap || "16", 10) || 16;

    const step = CARD_WIDTH + gap;
    const currentIdx = Math.round(el.scrollLeft / step);
    const nextIdx = dir === "left" ? Math.max(0, currentIdx - 1) : currentIdx + 1;

    const maxLeft = el.scrollWidth - el.clientWidth;
    const nextLeft = Math.min(Math.max(nextIdx * step, 0), maxLeft);

    el.scrollTo({ left: nextLeft, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <h3 className="text-lg font-bold ink mb-3">{title}</h3>
      <button
        onClick={() => scroll("left")}
        disabled={atStart}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full shadow border
          ${atStart ? "bg-white/40 text-gray-400 cursor-not-allowed" : "bg-white/80 hover:bg-white"}`}
        aria-label="왼쪽으로"
      >
        ◀
      </button>
      <button
        onClick={() => scroll("right")}
        disabled={atEnd}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full shadow border
          ${atEnd ? "bg-white/40 text-gray-400 cursor-not-allowed" : "bg-white/80 hover:bg-white"}`}
        aria-label="오른쪽으로"
      >
        ▶
      </button>
      <div
        ref={ref}
        className="
          flex gap-4 overflow-x-auto overflow-y-visible scroll-smooth px-10 py-4
          snap-x snap-mandatory
          [scroll-padding-inline:2.5rem]
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
        "
      >
        {products.map((p, idx) => (
          <div
            key={p.id}
            className="flex-[0_0_220px] max-w-[220px] box-border snap-start"
            data-rank-card
          >
            <div className="text-xs text-gray-500 mb-1">#{idx + 1}</div>
            <RankingCard p={p} />
          </div>
        ))}
      </div>
    </div>
  );
}

function RankingCard({ p }: { p: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const { lang, t } = useI18n();

  return (
    <article className="card flex h-full flex-col p-3">
      <div className="h-40 mb-3 w-full overflow-hidden rounded-xl bg-white">
        <img
          src={p.thumbnail}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="font-semibold line-clamp-2 min-h-[3rem] ink break-words break-keep">
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

      <div className="mt-1 price font-bold">{formatFromUSD(p.price, lang)}</div>

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
