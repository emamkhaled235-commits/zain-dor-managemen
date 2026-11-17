# Secure order importer (Zain Dor)

This workflow imports **text-only** confirmed orders using GitHub Actions workflow_dispatch and Supabase REST. It never embeds service-role credentials in the static website.

## One-time setup
In repository **Settings → Secrets and variables → Actions**, add repository secrets:
- `ZAIN_DOR_SUPABASE_URL`: your Supabase project URL (https://PROJECT.supabase.co).
- `ZAIN_DOR_SUPABASE_SERVICE_ROLE_KEY`: server-side service-role key from Supabase API settings.

Never send this key in chat, commit it, or put it in browser JavaScript. Limit GitHub repository administrator access.

## Running
Actions → **Secure Zain Dor order import** → **Run workflow**. Provide a JSON array with 1–20 objects, for example:
```json
[{"code":"silver1002","order_type":"خاتم","stone":"حجر المزاج","size":"22","customer":"الهواري","notes":"الهواري على الجانبين"}]
```
Each order is checked against existing codes before insertion. New orders get stage **تم التأكيد**, payment **معلق**. No existing order is overwritten.

## Security and limitations
- **Do not put sensitive customer data or image content into workflow inputs.** GitHub workflow inputs can be exposed in workflow run metadata to people with repository access.
- The importer intentionally does not accept images, URLs, arbitrary SQL, or client-supplied stages.
- Photos should be uploaded through the authenticated Zain Dor web app to the private `order-images` Supabase Storage bucket. The existing app supports this.
- GitHub Actions is **not** a direct ChatGPT-to-database connector. Running the workflow requires a supported dispatch action or a repository user triggering it.
- If automatic insertion directly from ChatGPT becomes available, use a properly authenticated private API endpoint or tool; do not make an unauthenticated public import endpoint.
- The import script logs only counts and generic errors; do not add logging of JSON inputs or credentials.
