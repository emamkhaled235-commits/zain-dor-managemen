alter table public.orders add column if not exists order_type text not null default 'خاتم' check (order_type in ('خاتم','إنسيال'));
