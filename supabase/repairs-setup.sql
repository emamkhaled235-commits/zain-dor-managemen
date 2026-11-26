-- ZAIN repairs (المرمات). Run once in Supabase SQL Editor. Does not touch existing tables.
create table if not exists public.repair_requests (
 id uuid primary key default gen_random_uuid(),
 code text not null default ('R-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,6))),
 tracking_token uuid not null unique default gen_random_uuid(),
 customer_name text not null,
 phone text not null,
 item_type text,
 description text not null,
 photo_urls text[] not null default '{}',
 status text not null default 'new' check (status in ('new','quoted','accepted','deposit_sent','deposit_confirmed','shipped','received','final_priced','repairing','ready','returned','declined','cancelled')),
 prelim_price numeric,
 deposit_amount numeric,
 final_price numeric,
 team_note text,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create table if not exists public.repair_events (
 id uuid primary key default gen_random_uuid(),
 request_id uuid not null references public.repair_requests(id) on delete cascade,
 status text not null,
 note text,
 created_at timestamptz not null default now()
);
alter table public.repair_requests enable row level security;
alter table public.repair_events enable row level security;
drop policy if exists zain_repairs_staff_all on public.repair_requests;
create policy zain_repairs_staff_all on public.repair_requests for all to authenticated
 using (exists(select 1 from public.staff s where s.user_id=auth.uid() and s.active=true and s.role in ('admin','manager')))
 with check (exists(select 1 from public.staff s where s.user_id=auth.uid() and s.active=true and s.role in ('admin','manager')));
drop policy if exists zain_repair_events_staff_all on public.repair_events;
create policy zain_repair_events_staff_all on public.repair_events for all to authenticated
 using (exists(select 1 from public.staff s where s.user_id=auth.uid() and s.active=true and s.role in ('admin','manager')))
 with check (exists(select 1 from public.staff s where s.user_id=auth.uid() and s.active=true and s.role in ('admin','manager')));

-- Customer submit (no account). Returns the tracking token.
create or replace function public.zain_repair_submit(p_name text,p_phone text,p_item text,p_desc text,p_photos text[])
returns text language plpgsql security definer set search_path='' as $$
declare r public.repair_requests; u text;
begin
 if length(trim(coalesce(p_name,'')))<2 or length(trim(coalesce(p_phone,'')))<8 or length(trim(coalesce(p_desc,'')))<5 then raise exception 'بيانات ناقصة'; end if;
 if coalesce(array_length(p_photos,1),0)<1 or array_length(p_photos,1)>6 then raise exception 'أرفق من 1 إلى 6 صور'; end if;
 foreach u in array p_photos loop
  if u not like 'https://ycfmmulwumzuavgywzgy.supabase.co/storage/v1/object/public/repair-photos/%' then raise exception 'رابط صورة غير صالح'; end if;
 end loop;
 insert into public.repair_requests(customer_name,phone,item_type,description,photo_urls)
 values (left(trim(p_name),80),left(trim(p_phone),30),left(coalesce(p_item,''),60),left(trim(p_desc),2000),p_photos) returning * into r;
 insert into public.repair_events(request_id,status,note) values (r.id,'new','تم استلام طلبك وهو قيد المراجعة من فريق زين');
 return r.tracking_token::text;
end $$;
revoke all on function public.zain_repair_submit(text,text,text,text,text[]) from public;
grant execute on function public.zain_repair_submit(text,text,text,text,text[]) to anon, authenticated;

-- Customer status by private token.
create or replace function public.zain_repair_status(p_token text)
returns json language sql stable security definer set search_path='' as $$
 select json_build_object('code',r.code,'item_type',r.item_type,'description',r.description,'photo_urls',r.photo_urls,'status',r.status,
  'prelim_price',r.prelim_price,'deposit_amount',r.deposit_amount,'final_price',r.final_price,'team_note',r.team_note,'created_at',r.created_at,
  'events',coalesce((select json_agg(json_build_object('status',e.status,'note',e.note,'at',e.created_at) order by e.created_at) from public.repair_events e where e.request_id=r.id),'[]'::json))
 from public.repair_requests r where r.tracking_token::text=p_token limit 1
$$;
revoke all on function public.zain_repair_status(text) from public;
grant execute on function public.zain_repair_status(text) to anon, authenticated;

-- Customer actions: accept / decline quote, paid (deposit sent), accept_final, decline_final.
create or replace function public.zain_repair_respond(p_token text,p_action text)
returns text language plpgsql security definer set search_path='' as $$
declare r public.repair_requests; ns text; nt text;
begin
 select * into r from public.repair_requests where tracking_token::text=p_token;
 if not found then raise exception 'طلب غير موجود'; end if;
 if p_action='accept' and r.status='quoted' then ns:='accepted'; nt:='وافق العميل على التسعير المبدئي';
 elsif p_action='decline' and r.status='quoted' then ns:='declined'; nt:='اعتذر العميل عن التسعير المبدئي';
 elsif p_action='paid' and r.status='accepted' then ns:='deposit_sent'; nt:='أبلغ العميل بتحويل العربون، بانتظار تأكيد الفريق';
 elsif p_action='shipped' and r.status='deposit_confirmed' then ns:='shipped'; nt:='أبلغ العميل بشحن القطعة';
 elsif p_action='accept_final' and r.status='final_priced' then ns:='repairing'; nt:='وافق العميل على السعر النهائي وبدأ العمل على القطعة';
 elsif p_action='decline_final' and r.status='final_priced' then ns:='cancelled'; nt:='اعتذر العميل عن السعر النهائي، ستُعاد القطعة إليه';
 else raise exception 'إجراء غير متاح في هذه المرحلة'; end if;
 update public.repair_requests set status=ns, updated_at=now() where id=r.id;
 insert into public.repair_events(request_id,status,note) values (r.id,ns,nt);
 return ns;
end $$;
revoke all on function public.zain_repair_respond(text,text) from public;
grant execute on function public.zain_repair_respond(text,text) to anon, authenticated;

-- Staff update: status, prices, and a customer-visible note.
create or replace function public.zain_repair_staff_update(p_id uuid,p_status text,p_note text,p_prelim numeric,p_deposit numeric,p_final numeric)
returns void language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null or not exists(select 1 from public.staff s where s.user_id=auth.uid() and s.active=true and s.role in ('admin','manager')) then raise exception 'Access denied'; end if;
 update public.repair_requests set status=coalesce(p_status,status), prelim_price=coalesce(p_prelim,prelim_price), deposit_amount=coalesce(p_deposit,deposit_amount),
  final_price=coalesce(p_final,final_price), team_note=coalesce(nullif(p_note,''),team_note), updated_at=now() where id=p_id;
 insert into public.repair_events(request_id,status,note) values (p_id,coalesce(p_status,(select status from public.repair_requests where id=p_id)),nullif(p_note,''));
end $$;
revoke all on function public.zain_repair_staff_update(uuid,text,text,numeric,numeric,numeric) from public;
grant execute on function public.zain_repair_staff_update(uuid,text,text,numeric,numeric,numeric) to authenticated;

-- Photo bucket: public read (unguessable paths), anyone may upload images up to 6 MB.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types) values ('repair-photos','repair-photos',true,6291456,array['image/jpeg','image/png','image/webp']) on conflict(id) do nothing;
drop policy if exists "Anyone uploads repair photos" on storage.objects;
create policy "Anyone uploads repair photos" on storage.objects for insert to anon, authenticated with check (bucket_id='repair-photos');
