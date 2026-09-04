-- Akiya subsidy registry v1: append-only facts plus explicit publication gate.
-- Apply through the InsForge migration runner; never edit production rows manually.

create table if not exists public.akiya_registry_migrations (
  migration_id text primary key,
  checksum text not null,
  applied_at timestamptz not null default now(),
  applied_by text not null
);

create table if not exists public.akiya_subsidy_registry (
  id uuid primary key default gen_random_uuid(),
  prefecture_slug text not null,
  prefecture_name text not null,
  city_slug text not null,
  city_name text not null,
  program_name text not null,
  target text not null,
  max_amount text not null,
  requirements text not null,
  original_url text not null check (original_url ~ '^https?://'),
  checked_on date not null,
  source_kind text not null check (source_kind in ('municipal-official','sumaimachi','athome','competitor')),
  source_fingerprint text not null,
  human_review_status text not null default 'pending' check (human_review_status in ('pending','approved','rejected')),
  publication_status text not null default 'preview' check (publication_status in ('preview','published','held')),
  valid_from date not null default current_date,
  valid_to date,
  supersedes_id uuid references public.akiya_subsidy_registry(id),
  created_at timestamptz not null default now(),
  constraint published_requires_human_approval check (
    publication_status <> 'published' or human_review_status = 'approved'
  )
);

create unique index if not exists akiya_registry_current_fingerprint
  on public.akiya_subsidy_registry(source_fingerprint)
  where valid_to is null;

create index if not exists akiya_registry_city_idx
  on public.akiya_subsidy_registry(prefecture_slug, city_slug, valid_to);

revoke all on public.akiya_subsidy_registry from anon, authenticated;
revoke all on public.akiya_registry_migrations from anon, authenticated;

-- Public reads are exposed only by a reviewed view/RPC in the application layer.
-- Candidates remain inaccessible until the human gate changes both status fields.
