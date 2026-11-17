-- Run once in Supabase SQL Editor, using the same Supabase project as Zain.
create table if not exists public.gallery_products (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 code text,
 category text not null check (category in ('خواتم','حلقان','أساور','سبح','أحجار')),
 description text,
 image_url text not null,
 published boolean not null default true,
 created_at timestamptz not null default now()
);
alter table public.gallery_products enable row level security;
drop policy if exists "Public reads published gallery products" on public.gallery_products;
create policy "Public reads published gallery products" on public.gallery_products for select to anon, authenticated using (published = true or exists(select 1 from public.staff s where s.user_id = auth.uid() and s.active = true and s.role in ('admin','manager')));
drop policy if exists "Managers can manage gallery products" on public.gallery_products;
create policy "Managers can manage gallery products" on public.gallery_products for all to authenticated using (exists(select 1 from public.staff s where s.user_id=auth.uid() and s.active=true and s.role in ('admin','manager'))) with check (exists(select 1 from public.staff s where s.user_id=auth.uid() and s.active=true and s.role in ('admin','manager')));
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types) values ('gallery-products','gallery-products',true,8388608,array['image/jpeg','image/png','image/webp','image/gif']) on conflict(id) do nothing;
drop policy if exists "Managers upload gallery product photos" on storage.objects;
create policy "Managers upload gallery product photos" on storage.objects for insert to authenticated with check (bucket_id='gallery-products' and exists(select 1 from public.staff s where s.user_id=auth.uid() and s.active=true and s.role in ('admin','manager')));
-- Public image reads are provided by the public storage bucket.
