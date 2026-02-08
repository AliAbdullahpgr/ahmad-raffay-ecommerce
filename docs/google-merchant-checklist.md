# Google Merchant Center Readiness Checklist

## Implemented in this repo

- Product feed endpoint: `/merchant-feed.xml` (Google RSS 2.0 with `g:` namespace).
- Product detail pages now render server-side metadata + Product JSON-LD in initial HTML.
- Merchant return policy and shipping details added to structured data.
- Crawlable policy pages:
  - `/shipping-policy`
  - `/return-policy`
  - `/contact`
- Footer and sitemap include policy/contact pages.

## Required account-side setup (still needed in GMC)

1. Verify and claim your site domain in Merchant Center.
2. Add shipping settings (or ensure feed shipping values are accurate).
3. Add return policy settings in Merchant Center.
4. Upload the feed URL: `https://your-domain.com/merchant-feed.xml`.
5. Fix diagnostics for any product-level issues (missing data, image quality, policy mismatches).

## Critical policy requirement

Google Merchant requires a working online purchase flow and at least one standard payment method.
If orders are only handled in chat without checkout/payment flow, listings can be limited or rejected.
