-- ZAIN: allow the deposit payment status without modifying existing orders.
BEGIN;
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_payment_check;
ALTER TABLE public.orders ADD CONSTRAINT orders_payment_check
  CHECK (payment IN ('معلق', 'دفع عربون', 'اتحاسبنا'));
COMMIT;
