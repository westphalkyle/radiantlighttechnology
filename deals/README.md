# Maintaining deals and recommended gear

The page is served at `/deals/` (GitHub Pages redirects `/deals` to it). It is absent from the header. The home page is unchanged.

Edit `deals.json` to maintain the list. `trackingId` contains the public Amazon.com Associates tracking ID, never account credentials.

Every entry needs `asin`, `name`, `category`, `description`, and an explicit `type` of `recommendation` or `deal`. Set `active` to `false`, or delete the entry, to remove it. `sourceUrl` is optional editorial reference data; displayed links use the ASIN and configured tracking ID.

## Recommended gear

Recommendations remain listed until manually removed. They do not require a discount or a `checkedOn` date. Cards say “Recommended” and make clear that the product is not necessarily discounted.

```json
{
  "asin": "B07FN2FBML",
  "type": "recommendation",
  "name": "Midland MXT275 MicroMobile GMRS Radio",
  "category": "Radios & communication",
  "description": "An original explanation of who this product suits.",
  "active": true
}
```

Review recommendations periodically for relevance and working links. Being recommended does not imply hands-on testing or current availability.

## Deals

Only use `"type": "deal"` after verifying a worthwhile current offer on the exact product and variant. Check seller, coupon conditions, and Prime restrictions. Explain relevant conditions in original wording without copying Amazon marketing text.

Deals additionally require `checkedOn` in `YYYY-MM-DD` format. Update that date only after actually reviewing the offer. Deals hide seven days after that date at 00:00 UTC. Optional `expiresOn` uses the same format and hides the entry after that date ends in UTC. Remove offers manually if they end sooner.

When an offer ends, change its type to `recommendation` if it still deserves a place on the page, or deactivate it. Remove offer-specific claims from the description when changing its type.

Date checks use the visitor's browser clock. They limit stale deals but do not monitor Amazon prices or detect offers ending early.

## Affiliate content

Cards use direct Amazon.com product URLs with your tracking tag, a nearby paid-link disclosure, and `rel="sponsored noopener"`. The page also contains the Associates statement. Ensure the website is listed in your Associates account before launch.

No exact prices, discount percentages, Amazon product images, or ratings are copied into the site. Adding those later requires checking Amazon's current content and pricing rules and using approved sources where required.

Publish changes through the normal GitHub Pages deployment. No server or API credentials are needed.
