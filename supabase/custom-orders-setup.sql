-- ZAIN custom orders (صُنع خصيصًا لك): reuses repair tables with a kind column. Run after repairs-setup.sql.
alter table public.repair_requests add column if not exists kind text not null default 'repair';
alter table public.repair_requests drop constraint if exists repair_requests_kind_check;
alter table public.repair_requests add constraint repair_requests_kind_check check (kind in ('repair','custom'));

create or replace function public.zain_repair_submit(p_name text,p_phone text,p_item text,p_desc text,p_photos text[],p_kind text)
returns text language plpgsql security definer set search_path='' as $$
declare r public.repair_requests; u text; k text := case when p_kind='custom' then 'custom' else 'repair' end;
begin
 if length(trim(coalesce(p_name,'')))<2 or length(trim(coalesce(p_phone,'')))<8 or length(trim(coalesce(p_desc,'')))<5 then raise exception 'بيانات ناقصة'; end if;
 if k='repair' and coalesce(array_length(p_photos,1),0)<1 then raise exception 'أرفق صورة واحدة على الأقل'; end if;
 if coalesce(array_length(p_photos,1),0)>6 then raise exception 'الحد الأقصى 6 صور'; end if;
 if p_photos is not null then foreach u in array p_photos loop
  if u not like 'https://ycfmmulwumzuavgywzgy.supabase.co/storage/v1/object/public/repair-photos/%' then raise exception 'رابط صورة غير صالح'; end if;
 end loop; end if;
 insert into public.repair_requests(kind,code,customer_name,phone,item_type,description,photo_urls)
 values (k,(case when k='custom' then 'C-' else 'R-' end)||upper(substr(replace(gen_random_uuid()::text,'-',''),1,6)),left(trim(p_name),80),left(trim(p_phone),30),left(coalesce(p_item,''),60),left(trim(p_desc),2000),coalesce(p_photos,'{}')) returning * into r;
 insert into public.repair_events(request_id,status,note) values (r.id,'new','تم استلام طلبك وهو قيد المراجعة من فريق زين');
 return r.tracking_token::text;
end $$;
revoke all on function public.zain_repair_submit(text,text,text,text,text[],text) from public;
grant execute on function public.zain_repair_submit(text,text,text,text,text[],text) to anon, authenticated;

create or replace function public.zain_repair_status(p_token text)
returns json language sql stable security definer set search_path='' as $$
 select json_build_object('kind',r.kind,'code',r.code,'item_type',r.item_type,'description',r.description,'photo_urls',r.photo_urls,'status',r.status,
  'prelim_price',r.prelim_price,'deposit_amount',r.deposit_amount,'final_price',r.final_price,'team_note',r.team_note,'created_at',r.created_at,
  'events',coalesce((select json_agg(json_build_object('status',e.status,'note',e.note,'at',e.created_at) order by e.created_at) from public.repair_events e where e.request_id=r.id),'[]'::json))
 from public.repair_requests r where r.tracking_token::text=p_token limit 1
$$;
