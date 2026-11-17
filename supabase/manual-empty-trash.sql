-- Run once in Supabase SQL Editor. Only active admins may permanently empty the trash.
CREATE OR REPLACE FUNCTION public.zain_permanently_delete_trashed_order(p_order_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
 IF NOT EXISTS (SELECT 1 FROM public.staff WHERE user_id=auth.uid() AND active=true AND role='admin') THEN
  RAISE EXCEPTION 'Admin only';
 END IF;
 IF NOT EXISTS (SELECT 1 FROM public.orders WHERE id=p_order_id AND stage='ملغي') THEN
  RAISE EXCEPTION 'Order is not in trash';
 END IF;
 DELETE FROM public.order_history WHERE order_id=p_order_id;
 DELETE FROM public.orders WHERE id=p_order_id AND stage='ملغي';
END $$;
REVOKE ALL ON FUNCTION public.zain_permanently_delete_trashed_order(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.zain_permanently_delete_trashed_order(uuid) TO authenticated;
-- Allow active admins to delete only uploaded order images through Storage API.
DROP POLICY IF EXISTS "zain_admin_delete_order_images" ON storage.objects;
CREATE POLICY "zain_admin_delete_order_images" ON storage.objects
FOR DELETE TO authenticated USING (
 bucket_id='order-images' AND EXISTS (
 SELECT 1 FROM public.staff WHERE user_id=auth.uid() AND active=true AND role='admin'
 )
);
