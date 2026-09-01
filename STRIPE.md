# Accepting donations with Stripe

The site is static (no server), so it uses **Stripe Payment Links** — Stripe
hosts the payment window, and no API keys ever live in this repo. Nothing to
install, nothing to deploy.

## One-time setup (about 10 minutes)

**1. Create the Stripe account**
Go to dashboard.stripe.com, sign up, and complete "Activate payments" — Stripe
asks for your EIN, bank account, and business address. Until that's done you can
still build links, but they only accept test cards.

If Dear Black Boy is a registered 501(c)(3), apply for Stripe's nonprofit rate
(2.2% + 30¢ instead of 2.9% + 30¢) at stripe.com/nonprofits.

**2. Make one product**
Dashboard → **Product catalog** → **+ Add product**
- Name: `Sponsor a Scholar`
- Description: `Supports scholar care packages, mentor stipends, and trips.`
- Leave pricing for the next step.

**3. Make four payment links**
Dashboard → **Payment links** → **+ New**. Repeat four times:

| Link | Amount | Notes |
| --- | --- | --- |
| $50 | one-time, $50 | "A signed book in a scholar's hands" |
| $250 | one-time, $250 | "A full care package + journal kit" |
| $1,000 | one-time, $1,000 | "Sponsors a scholar for a cycle" |
| Corporate | **Customer chooses what to pay** | lets partners enter any amount |

For each link, before saving:
- Turn on **Let customers adjust quantity** — a donor can then give $50 × 6.
- Under **After payment** → **Redirect customers to a page** →
  `https://dearblackboyaffirmations.org`
- Optionally turn on **Collect customers' addresses** if you mail receipts.

Each saved link gives you a URL like `https://buy.stripe.com/aEU00k1234abcd`.

**4. Paste the four URLs into the site**
Open `js/main.js`. The very top has:

```js
var STRIPE_LINKS = {
  '$50':     '',
  '$250':    '',
  '$1,000':  '',
  corporate: ''
};
```

Paste each URL inside the matching quotes, commit, done. An empty slot makes
that button fall back to the contact form, so a partial setup never breaks the
page.

**5. Test before announcing**
Flip the dashboard to **Test mode**, create one throwaway link the same way, and
pay with card `4242 4242 4242 4242`, any future expiry, any CVC. Confirm the
payment appears under Payments and that you land back on the site. Then switch
to live mode and use the real links.

## What you get automatically

- Apple Pay, Google Pay, and card payments — no extra work
- Emailed receipts to every donor
- A dashboard of who gave what and when (Payments → export CSV for your records)
- PCI compliance handled entirely by Stripe

## Things you do NOT need

- API keys, publishable or secret — Payment Links use neither
- `npm install`, a build step, or `package.json`
- An SSL certificate purchase — GitHub Pages provides HTTPS free

## When to graduate to a real integration

Payment Links cover one-time giving well. Move to Stripe Checkout with a small
backend (a serverless function) only when you need:

- **Recurring monthly donors** — Payment Links do support subscriptions, so try
  a recurring link first
- Donor accounts, a donation wall, or progress-to-goal thermometers
- Donations tied to specific school campaigns with reporting per school

At that point the site needs a server-side piece to hold the secret key, and
GitHub Pages can't run one — you'd move hosting to Netlify, Vercel, or Cloudflare
Pages (all free tiers, all support serverless functions).
