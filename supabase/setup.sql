-- ============================================================================
-- SMS ENTERPRISES website — Supabase setup
-- Run once in Supabase Dashboard → SQL Editor → New query → paste → Run.
-- Safe to run again later (it only creates what is missing).
-- ============================================================================

-- ── 1. ADMINS ──────────────────────────────────────────────────────────────
-- Only the emails in this table can change the website or read submissions.
-- ▶ Replace the email below with the admin user you created in Authentication → Users.
create table if not exists public.admin_users (email text primary key);
alter table public.admin_users enable row level security;   -- no policies: not readable through the website

insert into public.admin_users (email)
values ('swastik.smsenterprises@gmail.com')
on conflict do nothing;

create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- ── 2. SITE CONTENT (settings, products, home / about / careers pages) ──────
create table if not exists public.site_content (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;

drop policy if exists "Anyone can read site content" on public.site_content;
create policy "Anyone can read site content" on public.site_content
  for select using (true);

drop policy if exists "Admins can add site content" on public.site_content;
create policy "Admins can add site content" on public.site_content
  for insert with check (public.is_admin());

drop policy if exists "Admins can change site content" on public.site_content;
create policy "Admins can change site content" on public.site_content
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins can delete site content" on public.site_content;
create policy "Admins can delete site content" on public.site_content
  for delete using (public.is_admin());

-- ── 3. FORM SUBMISSIONS (quotes, contact messages, job applications) ────────
-- Visitors can only submit; only admins can read, update or delete.
do $$
declare t text;
begin
  foreach t in array array['quotes', 'messages', 'applications'] loop
    execute format('create table if not exists public.%I (
      id         text primary key,
      created_at timestamptz not null default now(),
      data       jsonb not null
    )', t);
    execute format('alter table public.%I enable row level security', t);

    execute format('drop policy if exists "Anyone can submit" on public.%I', t);
    execute format('create policy "Anyone can submit" on public.%I for insert with check (true)', t);

    execute format('drop policy if exists "Admins can read" on public.%I', t);
    execute format('create policy "Admins can read" on public.%I for select using (public.is_admin())', t);

    execute format('drop policy if exists "Admins can update" on public.%I', t);
    execute format('create policy "Admins can update" on public.%I for update using (public.is_admin()) with check (public.is_admin())', t);

    execute format('drop policy if exists "Admins can delete" on public.%I', t);
    execute format('create policy "Admins can delete" on public.%I for delete using (public.is_admin())', t);
  end loop;
end $$;

-- ── 4. FILE STORAGE ────────────────────────────────────────────────────────
-- media   : public  — product / page images and videos (max 50 MB per file on the free plan)
-- resumes : private — job application resumes (max 5 MB), only admins can open them
insert into storage.buckets (id, name, public, file_size_limit)
values ('media', 'media', true, 52428800)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public, file_size_limit)
values ('resumes', 'resumes', false, 5242880)
on conflict (id) do nothing;

drop policy if exists "Anyone can view media" on storage.objects;
create policy "Anyone can view media" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "Admins can upload media" on storage.objects;
create policy "Admins can upload media" on storage.objects
  for insert with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "Admins can change media" on storage.objects;
create policy "Admins can change media" on storage.objects
  for update using (bucket_id = 'media' and public.is_admin());

drop policy if exists "Admins can delete media" on storage.objects;
create policy "Admins can delete media" on storage.objects
  for delete using (bucket_id = 'media' and public.is_admin());

drop policy if exists "Anyone can upload a resume" on storage.objects;
create policy "Anyone can upload a resume" on storage.objects
  for insert with check (bucket_id = 'resumes');

drop policy if exists "Admins can open resumes" on storage.objects;
create policy "Admins can open resumes" on storage.objects
  for select using (bucket_id = 'resumes' and public.is_admin());

drop policy if exists "Admins can delete resumes" on storage.objects;
create policy "Admins can delete resumes" on storage.objects
  for delete using (bucket_id = 'resumes' and public.is_admin());

-- Done. Check: Table Editor should now show admin_users, site_content, quotes, messages, applications;
-- Storage should show the buckets "media" and "resumes".
