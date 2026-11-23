# Setup, configuration & deployment

## 1. Requirements

- Node.js 20.9+ (developed on Node 24), npm 11
- No other services are required for local development — the site runs on the local content in `src/content/` and stores test leads in a local file.

## 2. Install & run

```bash
npm install
npm run dev            # http://localhost:4000 — shows unverified content (badges optional, see below)
npm run build          # production build (unverified content hidden)
npm run start          # serve the production build
npm run lint
npx tsc --noEmit
```

`.env.development` (committed, no secrets) turns on `NEXT_PUBLIC_SHOW_UNVERIFIED` so the design can be reviewed with realistic content. Production builds ignore that file. Set `NEXT_PUBLIC_VERIFY_BADGES=true` to mark each unverified item with a “Pending verification” badge (see CONTENT-VERIFICATION.md).

## 3. Environment variables

Copy `.env.example` to `.env.local` (git-ignored) for local secrets, or set the variables in your host’s dashboard. **Never commit real values. Anything prefixed `NEXT_PUBLIC_` is visible in the browser — only publishable values belong there.**

| Variable | Where it is used | Secret? |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, Open Graph, allowed form origin | no |
| `NEXT_PUBLIC_SHOW_UNVERIFIED` | Preview builds only — shows unverified claims | no |
| `NEXT_PUBLIC_VERIFY_BADGES` | Preview builds only — `true` adds “Pending verification” badges to those claims | no |
| `NEXT_PUBLIC_NOINDEX` | `true` on staging/preview to block indexing | no |
| `ALLOWED_ORIGINS` | Extra origins allowed to POST the form (preview domains) | no |
| `WEBFLOW_API_TOKEN` | Webflow Data API (server only, `cms:read` scope) | **yes** |
| `WEBFLOW_WEBHOOK_SECRET` | Verifies Webflow publish webhooks | **yes** |
| `WEBFLOW_COLLECTION_*` | One collection ID per content type (see CMS-MODEL.md) | no |
| `CRM_PROVIDER` | `hubspot` \| `zoho` \| `webhook` (empty = email only) | no |
| `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_GUID` | HubSpot Forms API | no |
| `HUBSPOT_PRIVATE_APP_TOKEN` | Optional — authenticated HubSpot submissions | **yes** |
| `ZOHO_DC`, `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN` | Zoho CRM (Leads module) | **yes** (secret, token) |
| `LEADS_WEBHOOK_URL`, `LEADS_WEBHOOK_SECRET` | Generic signed webhook (Zapier/Make/n8n) | **yes** (secret) |
| `RESEND_API_KEY`, `LEADS_EMAIL_FROM`, `LEADS_EMAIL_TO` | Email notification for each lead | **yes** (API key) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Optional Cloudflare Turnstile | site key no / secret **yes** |
| `NEXT_PUBLIC_GA4_ID` | GA4 measurement ID (loaded only after consent) | no |

## 4. Consultation leads — how delivery works

`POST /api/consultation/` → origin check → size limit → rate limit (5 per 10 min per IP) → schema validation (zod) → honeypot + minimum fill time → optional Turnstile → idempotency (submission ID) → delivery.

Delivery goes to **every configured destination in parallel**: the CRM selected by `CRM_PROVIDER` and, if Resend is configured, an email notification. A lead counts as delivered when at least one destination accepts it.

- **Development** with nothing configured: leads are appended to `.leads/dev-leads.ndjson` (git-ignored — contains personal data; never commit).
- **Production** with nothing configured: the form shows an honest failure message with the phone number. It never pretends to have sent a lead.
- Server logs record each attempt *before* the external calls, using only the submission ID and destination names — no personal data.

### HubSpot
Create a HubSpot form containing fields with these internal names: `firstname`, `lastname`, `email`, `phone`, `study_level`, `applicant_role`, `preferred_country`, `intended_intake`, `service_interest`, `message`, `utm_source`, `utm_medium`, `utm_campaign`, `lead_source_detail` (create custom contact properties for the non-standard ones). Set `CRM_PROVIDER=hubspot`, `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_GUID`.

### Zoho CRM
Create a self-client in the Zoho API console, generate a refresh token with scope `ZohoCRM.modules.leads.CREATE`, set `CRM_PROVIDER=zoho` and the four `ZOHO_*` variables (`ZOHO_DC=in` for zoho.in accounts). Details beyond name/email/phone are written to the lead’s Description.

### Generic webhook
`CRM_PROVIDER=webhook`, `LEADS_WEBHOOK_URL` (https only). Requests are signed: header `x-ethos-signature: sha256=<hex>` = HMAC-SHA256 of `${x-ethos-timestamp}.${body}` with `LEADS_WEBHOOK_SECRET`. Verify it on the receiving side.

### Email (Resend)
Verify the sending domain in Resend, then set `RESEND_API_KEY`, `LEADS_EMAIL_FROM` (e.g. `Ethos Website <leads@ethoseducation.world>`), `LEADS_EMAIL_TO` (comma-separated).

> None of these integrations has been tested against live accounts (no credentials were available). Test each one with a real submission on a staging deployment before launch — see KNOWN-LIMITATIONS.md.

## 5. Webflow CMS

See [CMS-MODEL.md](CMS-MODEL.md) for collections and field slugs.

1. In Webflow, create the collections and fields exactly as listed (field **slugs** matter).
2. Import content: the current content lives in `src/content/*` — use it as the source for the first import (CSV export scripts can be added if needed).
3. Site settings → Apps & integrations → generate an API token with **CMS: read** scope → `WEBFLOW_API_TOKEN`.
4. Copy each collection ID (Collection settings) into the matching `WEBFLOW_COLLECTION_*` variable.
5. Webhooks: create a `site_publish` webhook (and optionally `collection_item_changed`) pointing at `https://<domain>/api/revalidate/`, and set its signing secret as `WEBFLOW_WEBHOOK_SECRET`. **Confirm the signature scheme against Webflow’s current webhook documentation** — the route expects `x-webflow-timestamp` + `x-webflow-signature` (HMAC-SHA256 of `timestamp:body`).
6. Only **published, non-draft, non-archived** items are read. Content is cached for an hour and refreshed immediately when the webhook fires. If Webflow is unreachable, the site falls back to the local content so pages always render.

## 6. Deployment

**Recommended: Vercel** (first-class Next.js 16 support: Cache Components, Partial Prefetching, image optimisation, proxy).

1. Import the repository, framework preset *Next.js*, build command `npm run build`.
2. Set environment variables for *Production* (and separately for *Preview* with `NEXT_PUBLIC_NOINDEX=true`, `NEXT_PUBLIC_SHOW_UNVERIFIED=true` if wanted).
3. Point `www.ethoseducation.world` at the deployment; redirect the apex domain to `www`.
4. Production rate limiting: the built-in limiter is per-instance. Replace the functions in `src/lib/leads/server/rate-limit.ts` with a shared store (e.g. Upstash Redis) for multi-instance hosting.

**Webflow Cloud** can host Next.js apps, but check its current support for Next.js 16 features used here (Cache Components, `proxy.ts`, image optimisation, Node runtime route handlers) before choosing it. Never run the old WordPress site and the new site on competing public URLs.

## 7. Go-live checklist

- [ ] Every item in [CONTENT-VERIFICATION.md](CONTENT-VERIFICATION.md) resolved (or deliberately left hidden)
- [ ] Real photography replaces provisional images (`provisional: true` in content)
- [ ] Fonts: the current theme uses only SIL OFL fonts (Bricolage Grotesque, DM Sans, Dancing Script, Fraunces — self-hosted). If HK Grotesk Wide is reinstated, buy its web-font licence first
- [ ] CRM + email tested end to end on staging with a real submission
- [ ] `NEXT_PUBLIC_SITE_URL` set to the production domain
- [ ] GA4 + consent tested; privacy policy updated to describe analytics and form handling
- [ ] Legal pages reviewed by Ethos’s legal adviser
- [ ] Old WordPress site taken offline **after** the spam clean-up evidence has been preserved
- [ ] Sitemap submitted; Search Console monitored for 404s (see MIGRATION-MAP.md)
