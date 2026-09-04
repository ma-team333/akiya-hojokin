import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date("2026-09-04");
  return ["", "/subsidies", "/verification", "/operator", "/privacy", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: updatedAt,
    changeFrequency: path === "/subsidies" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
}
