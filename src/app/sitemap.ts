import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date("2026-09-07");
  const baseEntries: MetadataRoute.Sitemap = ["", "/subsidies", "/verification", "/operator", "/privacy", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: updatedAt,
    changeFrequency: path === "/subsidies" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
  // 判断ページ・ハブ・記事(r-sic ③所有群の移行先 — portfolio#21)
  const decidePaths = [
    "/akiya-sale-route",
    "/jikka-jimai",
    "/demolition-subsidy",
    "/akiya-management-service",
    "/old-house-sale-comparison",
    "/furuie",
    "/furuie/articles",
    "/furuie/articles/nonconformity-exemption",
    "/tochi-jimai",
    "/articles/vacant-house-demolition-sale",
    "/articles/inherited-house-keep-cost",
    "/articles/leaseback",
    "/articles/demolition-subsidy-timing",
    "/articles/demolition-subsidy",
    "/articles/brokerage-vs-buyout",
    "/articles/sale-vs-buyout",
    "/articles/maintenance-cost-risk",
    "/articles/tokutei-akiya-tax",
    "/articles/chiho-jikka-shobun",
    "/articles/sanrin-inheritance-disposal",
    "/articles/kokko-kizoku",
  ];
  const decideEntries: MetadataRoute.Sitemap = decidePaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...baseEntries, ...decideEntries];
}
