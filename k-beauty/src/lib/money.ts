import type { Lang } from "./i18n";

const RATES: Record<Lang, { code: string; locale: string; rate: number }> = {
  ko: { code: "KRW", locale: "ko-KR", rate: 1350 },
  en: { code: "USD", locale: "en-US", rate: 1 },
  ja: { code: "JPY", locale: "ja-JP", rate: 150 }, 
  zh: { code: "CNY", locale: "zh-CN", rate: 7.2 }, 
};

export const USD_TO_KRW = 1350;
export function usdToKrw(usd: number, rate = USD_TO_KRW): number {
  return Math.round(usd * rate);
}
export function roundKrwHundreds(krw: number): number {
  return Math.round(krw / 100) * 100;
}
export function formatKrwWon(usd: number, rate = USD_TO_KRW): string {
  const krw = usdToKrw(usd, rate);
  const rounded = roundKrwHundreds(krw);
  return `${rounded.toLocaleString("ko-KR")}원`;
}

function roundJPY(n: number) { return Math.round(n); }
export function numberFromUSD(usd: number, lang: Lang): number {
  const r = RATES[lang].rate;
  let v = usd * r;
  if (lang === "ko") v = Math.round(v / 100) * 100;
  if (lang === "ja") v = roundJPY(v);
  return v;
}
export function formatFromUSD(usd: number, lang: Lang): string {
  const { code, locale } = RATES[lang];
  const n = numberFromUSD(usd, lang);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: code,
    maximumFractionDigits: lang === "ja" || lang === "ko" ? 0 : 2,
  }).format(n);
}
