-- Run once in Supabase SQL Editor. Customer tracking without accounts.
-- Tracking tokens are unguessable UUIDs; never expose full order rows to anon.
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS tracking_token uuid NOT NULL DEFAULT gen_random_uuid();
CREATE UNIQUE INDEX IF NOT EXISTS zain_orders_tracking_token_idx
  ON public.orders(tracking_token);

CREATE OR REPLACE FUNCTION public.zain_public_order_status(p_token text)
RETURNS TABLE(code text, stage text, updated_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT o.code::text, o.stage::text, o.created_at::timestamptz
  FROM public.orders o
  WHERE o.tracking_token::text = p_token
  LIMIT 1
$$;
REVOKE ALL ON FUNCTION public.zain_public_order_status(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.zain_public_order_status(text) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.zain_staff_tracking_link(p_code text)
RETURNS text
LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE result_token text;
BEGIN
  IF auth.uid() IS NULL OR NOT EXISTS (
    SELECT 1 FROM public.staff s
    WHERE s.user_id = auth.uid() AND s.active = true
  ) THEN
    RAISE EXCEPTION 'Access denied';
  END IF;
  SELECT o.tracking_token::text INTO result_token
  FROM public.orders o
  WHERE lower(o.code::text) = lower(trim(p_code))
  ORDER BY o.created_at DESC LIMIT 1;
  RETURN result_token;
END;
$$;
REVOKE ALL ON FUNCTION public.zain_staff_tracking_link(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.zain_staff_tracking_link(text) TO authenticated;
