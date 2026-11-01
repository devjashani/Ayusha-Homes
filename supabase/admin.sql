create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.admin_users enable row level security;
drop policy if exists "admin reads own row" on public.admin_users;
create policy "admin reads own row" on public.admin_users for select to authenticated using (user_id = auth.uid());

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.submissions add column if not exists notes text;
alter table public.submissions drop constraint if exists submissions_notes_check;
alter table public.submissions add constraint submissions_notes_check check (notes is null or char_length(notes) <= 2000);
alter table public.submissions drop constraint if exists submissions_status_check;
alter table public.submissions add constraint submissions_status_check check (status in ('new','contacted','qualified','archived'));

drop policy if exists "anyone can submit" on public.submissions;
create policy "anyone can submit" on public.submissions for insert to anon, authenticated with check (consent = true);
drop policy if exists "admins read" on public.submissions;
create policy "admins read" on public.submissions for select to authenticated using (public.is_admin());
drop policy if exists "admins update" on public.submissions;
create policy "admins update" on public.submissions for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admins delete" on public.submissions;
create policy "admins delete" on public.submissions for delete to authenticated using (public.is_admin());

do $$ begin
  alter publication supabase_realtime add table public.submissions;
exception when duplicate_object then null; end $$;

insert into public.admin_users (user_id)
select id from auth.users where email = 'shobhitnandwana2001@gmail.com'
on conflict do nothing;
