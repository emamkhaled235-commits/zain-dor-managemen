-- Zain Dor: reversible order trash
-- Run once in Supabase SQL Editor (project ycfmmulwumzuavgywzgy).
-- This is additive: existing orders are not removed or changed.
alter table public.orders
  add column if not exists previous_stage text;

-- Optional index for browsing deleted orders.
create index if not exists zain_dor_orders_stage_idx
  on public.orders(stage);

-- Existing RLS UPDATE policies remain in effect.
-- Confirm manager/admin UPDATE access in your existing RLS policies.
