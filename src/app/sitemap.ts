import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

interface SitemapEntry {
  path: string;
  lastModified: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
}

const HOME_PATHS: SitemapEntry[] = [
  { path: "", lastModified: "2026-09-07", changeFrequency: "weekly", priority: 1 },
  { path: "/subsidies", lastModified: "2026-09-07", changeFrequency: "weekly", priority: 0.8 },
  { path: "/verification", lastModified: "2026-09-04", changeFrequency: "monthly", priority: 0.6 },
  { path: "/operator", lastModified: "2026-09-04", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy", lastModified: "2026-09-04", changeFrequency: "monthly", priority: 0.4 },
  { path: "/contact", lastModified: "2026-09-04", changeFrequency: "monthly", priority: 0.4 },
];

/** ポートフォリオ#21 移行先16ページ（/guide ハブ + 2テーマハブ + 13記事）。 */
const GUIDE_PATHS: SitemapEntry[] = [
  { path: "/guide", lastModified: "2026-09-07", changeFrequency: "weekly", priority: 0.9 },
  { path: "/guide/furuie", lastModified: "2026-09-07", changeFrequency: "weekly", priority: 0.7 },
  { path: "/guide/tochi-jimai", lastModified: "2026-09-07", changeFrequency: "weekly", priority: 0.7 },
  { path: "/guide/brokerage-vs-buyout", lastModified: "2026-08-16", changeFrequency: "monthly", priority: 0.6 },
  { path: "/guide/sale-vs-buyout", lastModified: "2026-08-15", changeFrequency: "monthly", priority: 0.6 },
  { path: "/guide/leaseback", lastModified: "2026-08-17", changeFrequency: "monthly", priority: 0.6 },
  { path: "/guide/kaitori-satei", lastModified: "2026-09-03", changeFrequency: "monthly", priority: 0.6 },
  { path: "/guide/demolition-subsidy", lastModified: "2026-08-20", changeFrequency: "monthly", priority: 0.6 },
  { path: "/guide/demolition-subsidy-timing", lastModified: "2026-08-20", changeFrequency: "monthly", priority: 0.6 },
  { path: "/guide/vacant-house-demolition-sale", lastModified: "2026-08-20", changeFrequency: "monthly", priority: 0.6 },
  { path: "/guide/inherited-house-keep-cost", lastModified: "2026-09-04", changeFrequency: "monthly", priority: 0.6 },
  { path: "/guide/maintenance-cost-risk", lastModified: "2026-08-15", changeFrequency: "monthly", priority: 0.6 },
  { path: "/guide/tokutei-akiya-tax", lastModified: "2026-09-04", changeFrequency: "monthly", priority: 0.6 },
  { path: "/guide/chiho-jikka-shobun", lastModified: "2026-09-05", changeFrequency: "monthly", priority: 0.6 },
  { path: "/guide/kokko-kizoku", lastModified: "2026-08-16", changeFrequency: "monthly", priority: 0.6 },
  { path: "/guide/sanrin-inheritance-disposal", lastModified: "2026-08-16", changeFrequency: "monthly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...HOME_PATHS, ...GUIDE_PATHS].map((entry) => ({
    url: `${SITE_URL}${entry.path}`,
    lastModified: new Date(entry.lastModified),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
