// Server-side importer. Never publish service-role credentials in the browser or repository.
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw Error('Missing GitHub Actions secrets: ZAIN_DOR_SUPABASE_URL / ZAIN_DOR_SUPABASE_SERVICE_ROLE_KEY');
const origin = new URL(url);
if (origin.protocol !== 'https:' || !origin.hostname.endsWith('.supabase.co')) throw Error('Invalid Supabase URL');
let orders;
try { orders = JSON.parse(process.env.ORDERS_JSON || ''); } catch { throw Error('Invalid JSON input'); }
if (!Array.isArray(orders) || orders.length < 1 || orders.length > 20) throw Error('Expected 1 to 20 orders');
const headers = { apikey: key, Authorization: 'Bearer ' + key };
const allowedTypes = new Set(['خاتم', 'إنسيال']);
const allowedStones = new Set(['حجر المزاج', 'حجر التنين', 'عين التنين', 'أخرى']);
const seen = new Set();
let inserted = 0, skipped = 0;
async function request(path, options = {}) {
  const response = await fetch(url + path, { ...options, headers: { ...headers, ...(options.headers || {}) } });
  if (!response.ok) throw Error('Supabase request failed (' + response.status + ')');
  return response;
}
function string(value, max = 500) {
  if (value == null) return '';
  if (typeof value !== 'string') throw Error('Order fields must be text');
  if (value.length > max) throw Error('Order field exceeds maximum length');
  return value.trim();
}
for (const order of orders) {
  if (!order || typeof order !== 'object' || Array.isArray(order)) throw Error('Invalid order object');
  const code = string(order.code, 80);
  if (!/^[a-zA-Z0-9_-]{2,80}$/.test(code)) throw Error('Invalid order code');
  const codeKey = code.toLowerCase();
  if (seen.has(codeKey)) { skipped++; continue; }
  seen.add(codeKey);
  const type = string(order.order_type || 'خاتم', 20);
  const stone = string(order.stone || 'أخرى', 40);
  if (!allowedTypes.has(type) || !allowedStones.has(stone)) throw Error('Invalid order type or stone');
  const existing = await request('/rest/v1/orders?select=id&code=ilike.' + encodeURIComponent(code) + '&limit=1');
  if ((await existing.json()).length) { skipped++; continue; }
  const payload = {
    code, order_type: type, stone,
    customer: string(order.customer, 150) || null,
    size: string(order.size, 30) || null,
    notes: string(order.notes, 1500) || null,
    worker: null, confirmed_at: new Date().toISOString(), due_at: null,
    stage: 'تم التأكيد', payment: 'معلق', priority: 'عادي',
    has_issue: false, image_path: null
  };
  // Image bytes and personal order photos must NOT be sent through workflow inputs.
  const result = await request('/rest/v1/orders', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify(payload)
  });
  if (result.ok) inserted++;
}
console.log('Import finished. Added: ' + inserted + ', skipped duplicates: ' + skipped);
