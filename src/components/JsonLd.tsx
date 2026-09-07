/**
 * JSON-LD 構造化データを <script type="application/ld+json"> で埋め込む。
 * Server Component 専用（Next.js App Router で ISR/SSG 時に HTML に焼き込まれる）。
 */

interface JsonLdProps {
  /** JSON-LD オブジェクト（@context + @type を含む） */
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
