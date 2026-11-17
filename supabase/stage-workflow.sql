-- ZAIN stage workflow: run once in Supabase SQL Editor.
-- Non-destructive: does not delete or rewrite existing orders, staff, or history.
-- Keeps existing stage strings and adds two new ones.
CREATE OR REPLACE FUNCTION public.zain_stage_rank(p_stage text)
RETURNS integer LANGUAGE sql IMMUTABLE SET search_path = '' AS $$
 SELECT CASE p_stage
 WHEN 'تحت التصميم' THEN 1 WHEN 'تم التأكيد' THEN 2
 WHEN 'تحت التشغيل' THEN 3 WHEN 'في التشطيب' THEN 4
 WHEN 'متشطب' THEN 5 WHEN 'وصل المخزن' THEN 6
 WHEN 'جاهز للتسليم' THEN 7 WHEN 'استلمه المخزن' THEN 8
 ELSE NULL END
$$;
REVOKE ALL ON FUNCTION public.zain_stage_rank(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.zain_stage_rank(text) TO authenticated;

CREATE OR REPLACE FUNCTION public.zain_guard_stage_change()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE v_role text;
BEGIN
 IF NEW.stage IS NOT DISTINCT FROM OLD.stage THEN RETURN NEW; END IF;
 SELECT s.role::text INTO v_role FROM public.staff s
 WHERE s.user_id=auth.uid() AND s.active=true;
 IF v_role IS NULL OR v_role NOT IN ('admin','manager') THEN
   RAISE EXCEPTION 'تغيير المرحلة للأدمن والمدير فقط';
 END IF;
 IF NEW.stage='ملغي' THEN
   IF OLD.stage='ملغي' THEN RETURN NEW; END IF;
   RETURN NEW; -- existing trash flow
 END IF;
 IF public.zain_stage_rank(NEW.stage) IS NULL THEN
   RAISE EXCEPTION 'مرحلة غير معتمدة';
 END IF;
 IF OLD.stage='ملغي' THEN
   IF v_role<>'admin' THEN RAISE EXCEPTION 'استرجاع الطلب الملغي للأدمن فقط'; END IF;
   RETURN NEW;
 END IF;
 IF v_role<>'admin' AND public.zain_stage_rank(NEW.stage)<public.zain_stage_rank(OLD.stage) THEN
   RAISE EXCEPTION 'الرجوع لمرحلة سابقة للأدمن فقط';
 END IF;
 RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS zain_guard_stage_update ON public.orders;
CREATE TRIGGER zain_guard_stage_update BEFORE UPDATE OF stage ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.zain_guard_stage_change();

CREATE OR REPLACE FUNCTION public.zain_save_order_stage(p_order_id uuid,p_stage text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE v_role text; v_old text;
BEGIN
 SELECT s.role::text INTO v_role FROM public.staff s
 WHERE s.user_id=auth.uid() AND s.active=true;
 IF v_role IS NULL OR v_role NOT IN ('admin','manager') THEN
   RAISE EXCEPTION 'غير مصرح بتغيير المرحلة';
 END IF;
 IF public.zain_stage_rank(p_stage) IS NULL THEN
   RAISE EXCEPTION 'مرحلة غير معتمدة';
 END IF;
 SELECT o.stage INTO v_old FROM public.orders o WHERE o.id=p_order_id FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'الأوردر غير موجود'; END IF;
 IF v_old='ملغي' THEN RAISE EXCEPTION 'استرجع الأوردر أولاً'; END IF;
 IF v_role='manager' AND public.zain_stage_rank(p_stage)<public.zain_stage_rank(v_old) THEN
   RAISE EXCEPTION 'الرجوع للخلف للأدمن فقط';
 END IF;
 UPDATE public.orders SET stage=p_stage WHERE id=p_order_id;
 RETURN true;
END $$;
REVOKE ALL ON FUNCTION public.zain_save_order_stage(uuid,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.zain_save_order_stage(uuid,text) TO authenticated;
