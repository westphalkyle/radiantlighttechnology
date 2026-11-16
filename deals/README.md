# Maintaining the deals page

The page is served from `/deals/` (GitHub Pages redirects `/deals` to it). It is deliberately absent from the header. The home page is unchanged.

Edit `deals.json` to maintain the list. Set `trackingId` to your Amazon.com Associates tracking ID. This is a public identifier, not an API secret. Never add account credentials here.

The initial list is empty until real offers are reviewed. Example configuration (replace every example value before publishing):

```json
{
  "trackingId": "YOUR-TRACKING-ID-20",
  "deals": [
    {
      "asin": "B000000000",
      "name": "Exact product and model name",
      "category": "Storage",
      "description": "An original explanation of who this product suits and why the offer is useful.",
      "checkedOn": "2026-11-16",
      "active": true
    }
  ]
}
```

For each entry:

- Find the 10-character ASIN in its Amazon.com product URL after `/dp/`.
- Verify that the exact product has a worthwhile, currently available offer before listing it. Check seller, variant, coupon requirements, and Prime restrictions. Include relevant conditions in the description without copying Amazon marketing text.
- Use `YYYY-MM-DD` for `checkedOn`. Update this date only after actually reviewing the deal.
- Optionally add `expiresOn` in the same format. The entry hides after that date ends in UTC; for offers ending earlier, remove or deactivate them at the actual end time.
- Set `active` to `false`, or delete the entry, to remove a deal.

Listings hide seven days after `checkedOn` at 00:00 UTC. This limits stale offers but does not verify prices or detect offers ending early. Review regularly and remove expired offers promptly. The browser clock controls these display checks.

Cards use direct Amazon.com product URLs with your tracking tag. No exact prices, discount percentages, Amazon product images, or ratings are copied into the site. Adding those later requires checking Amazon's current content and pricing rules and using approved sources where required.

The page contains the Associates statement and a paid-link disclosure next to each product link. Ensure this website is listed in your Associates account before launch.

Publish updates through the repository's normal GitHub Pages deployment. No server or API credentials are needed.
