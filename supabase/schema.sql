create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type text not null check (type in ('pilot','talk')),
  full_name text not null check (char_length(full_name) between 2 and 100),
  email text not null check (char_length(email) between 5 and 254),
  persona text,
  origin text,
  destination text,
  message text check (char_length(message) <= 1000),
  consent boolean not null default false,
  status text not null default 'new'
);
create unique index if not exists submissions_email_type_idx on public.submissions (lower(email), type);
alter table public.submissions enable row level security;
drop policy if exists "anyone can submit" on public.submissions;
create policy "anyone can submit" on public.submissions for insert to anon with check (consent = true);

