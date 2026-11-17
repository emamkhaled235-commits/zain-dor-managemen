-- ZAIN: run in Supabase SQL Editor after reviewing existing staff schema and policies.
-- Requires public.staff(user_id uuid, full_name text, role text, active boolean).
-- New users are inserted as inactive workers; only active admins can approve them.
create or replace function public.zain_register_staff()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.staff (user_id, full_name, role, active)
  values (new.id, left(coalesce(new.raw_user_meta_data ->> 'full_name','عضو جديد'),100), 'worker', false)
  on conflict (user_id) do nothing;
  return new;
end;
$$;
drop trigger if exists zain_staff_signup on auth.users;
create trigger zain_staff_signup after insert on auth.users
for each row execute function public.zain_register_staff();

alter table public.staff enable row level security;

-- Remove any older staff UPDATE policy that permits non-admin users to change role/active.
-- Review existing policies BEFORE deploying. Policies are OR-combined in PostgreSQL.
-- The following policies alone do not override more permissive policies.
create or replace function public.zain_is_active_admin()
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists(select 1 from public.staff
    where user_id = (select auth.uid()) and active = true and role = 'admin');
$$;
revoke all on function public.zain_is_active_admin() from public;
grant execute on function public.zain_is_active_admin() to authenticated;

drop policy if exists zain_staff_select on public.staff;
create policy zain_staff_select on public.staff for select to authenticated
using (user_id = (select auth.uid()) or (select public.zain_is_active_admin()));

drop policy if exists zain_staff_admin_update on public.staff;
create policy zain_staff_admin_update on public.staff for update to authenticated
using ((select public.zain_is_active_admin()))
with check ((select public.zain_is_active_admin()));

-- For strong protection, ensure no other INSERT/UPDATE/DELETE policies grant staff edits.
-- Do not run this migration without auditing existing policies and checking initial admin provisioning.
