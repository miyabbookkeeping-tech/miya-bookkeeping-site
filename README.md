# Miya B Bookkeeping — Website

A premium, responsive, bee-inspired static website for Miya B Bookkeeping, a Florida-based bookkeeping firm serving businesses and individuals.

---

## Site strategy summary

**Positioning:** Premium, discreet, meticulous bookkeeping partner for small/medium businesses and individuals. The brand is luxury-toned — deep charcoal, honey gold, cream — with a subtle bee motif expressed through typography, a "B" monogram, and hexagon shapes rather than cartoonish yellow-and-black.

**Voice:** Calm, organized, intelligent, service-oriented. Avoids overly playful or "bee themed" copy. Uses the bee concept conceptually (order, structure, quiet productivity) rather than literally.

**Conversion path:** Every page drives toward the `contact.html` inquiry form, which begins with a Personal vs. Business segmentation and reveals conditional fields from there.

**Trust signals included:** QuickBooks Online workflow, view-only access language, Florida-based, monthly flat-rate transparency, testimonials, FAQ, process explanation, legal pages.

---

## Recommended sitemap

```
Home (/)
├── Services (/services.html)
│   ├── Monthly Bookkeeping
│   ├── Catch-Up & Cleanup
│   ├── Account Reconciliation
│   ├── Financial Reporting
│   ├── Payroll Support
│   ├── Tax-Ready Books
│   ├── QuickBooks Online Setup
│   ├── Personal Bookkeeping
│   └── Ongoing Advisory Support
├── Pricing (/pricing.html)
├── About Miya (/about.html)
├── FAQ (/faq.html)
├── Contact (/contact.html)
├── Thank You (/thank-you.html)   [noindex, form success]
└── Legal
    ├── Privacy Policy (/privacy-policy.html)
    ├── Terms of Use (/terms-of-use.html)
    ├── Terms of Service (/terms-of-service.html)
    └── Cookie Policy (/cookie-policy.html)
```

---

## File structure

```
miyab-bookkeeping/
├── index.html                 Home page
├── services.html              Services
├── pricing.html               Pricing
├── about.html                 About Miya
├── faq.html                   FAQ
├── contact.html               Inquiry form
├── thank-you.html             Form confirmation
├── privacy-policy.html        Legal
├── terms-of-use.html          Legal
├── terms-of-service.html      Legal
├── cookie-policy.html         Legal
├── robots.txt                 SEO
├── sitemap.xml                SEO
├── README.md                  This file
├── css/
│   └── styles.css             All styling
└── js/
    └── main.js                Nav, FAQ, form logic, reveal animations
```

No build step required. Plain HTML/CSS/JS.

---

## Local preview

```bash
# any static server works. Two quick options:
python3 -m http.server 8000
# or
npx serve .
```

Then visit `http://localhost:8000`.

---

## Deploying to Vercel (step-by-step, beginner friendly)

Vercel is free for static sites and perfect for this project. You have two options — choose one.

### Option A — Deploy via the Vercel dashboard (easiest, no terminal)

1. **Create a free account** at https://vercel.com (sign up with GitHub, GitLab, or email).
2. Put the entire project folder (everything in this `outputs` folder) into a GitHub repository:
   - Go to https://github.com/new
   - Create a repo called `miyab-bookkeeping` (make it public or private — doesn't matter).
   - Follow GitHub's instructions to upload the files, either by:
     - Clicking "uploading an existing file" on the empty repo page and dragging everything in, **or**
     - Using GitHub Desktop (https://desktop.github.com) to sync the folder.
3. Back in Vercel, click **Add New… → Project**.
4. Click **Import** next to your `miyab-bookkeeping` repo.
5. Vercel will auto-detect a static site. Leave all settings at their defaults:
   - Framework preset: **Other**
   - Build command: *(leave blank)*
   - Output directory: *(leave blank — Vercel will use the project root)*
6. Click **Deploy**.
7. In about 30 seconds you'll have a live URL like `miyab-bookkeeping.vercel.app`.

That's it. You're live.

### Option B — Deploy via the Vercel CLI

1. Install Node.js from https://nodejs.org if you don't already have it.
2. Open a terminal in this project folder.
3. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
4. Run:
   ```bash
   vercel
   ```
5. Log in when prompted, then accept the defaults to deploy.
6. For production deployments later:
   ```bash
   vercel --prod
   ```

### Editing the site inside Vercel after deployment

Vercel itself does not have an in-dashboard code editor. To edit the site after it's live:

**Easiest route:** Edit the files in your GitHub repository directly (GitHub has a built-in editor — click any file, then the pencil icon, make changes, and commit). Vercel auto-deploys every push.

**Local route:** Edit on your computer, then:
```bash
git add .
git commit -m "update copy"
git push
```
Vercel redeploys automatically.

**In the Vercel dashboard you can:**
- Redeploy or roll back to any previous version.
- Change the production branch.
- Manage domains and DNS.
- View deploy logs and analytics.

---

## Connecting your custom domain (e.g. miyabbookkeeping.com)

1. **Buy the domain** from any registrar you prefer (Namecheap, Google Domains/Squarespace Domains, GoDaddy, Cloudflare Registrar, Porkbun, etc.). Cloudflare and Porkbun tend to be cheapest and cleanest.
2. In Vercel, open your project → **Settings → Domains**.
3. Click **Add Domain**, enter `miyabbookkeeping.com`, and press **Add**.
4. Vercel will ask you to verify ownership by adding DNS records at your registrar. You'll see one of two paths:

   **Path 1 — Point your domain's nameservers to Vercel (simplest):**
   - Vercel shows you two nameserver addresses (e.g., `ns1.vercel-dns.com`, `ns2.vercel-dns.com`).
   - Log into your registrar, find **Nameservers**, switch from the default to **custom**, and enter the Vercel nameservers.
   - Save. DNS changes can take anywhere from a few minutes to ~24 hours to propagate.

   **Path 2 — Keep your existing nameservers, add DNS records:**
   - Vercel shows you an **A record** (for the apex `miyabbookkeeping.com`) pointing to Vercel's IP.
   - And a **CNAME** for `www` pointing to `cname.vercel-dns.com`.
   - Add those exact records in your registrar's DNS settings.
   - Save and wait for propagation.

5. Once Vercel verifies the records, it issues a free SSL certificate automatically. Your site will be live at `https://miyabbookkeeping.com`.
6. In Vercel, set one version (apex or `www`) as the primary and configure the other to redirect — most people use `miyabbookkeeping.com` as primary with `www` redirecting to it.

---

## The contact form

The form at `/contact.html` currently:
- Performs client-side validation.
- Swaps fields conditionally based on Personal vs. Business selection.
- On submit, redirects to `thank-you.html`.

**It does not yet send the submission anywhere.** To actually receive leads, wire it up to one of these (requires a tiny edit to `js/main.js` or the form's `action`/`method`):

| Option | Cost | Effort | Notes |
| --- | --- | --- | --- |
| **Formspree** (https://formspree.io) | Free tier available | 2 minutes | Set `<form action="https://formspree.io/f/yourID" method="POST">` |
| **Web3Forms** (https://web3forms.com) | Free, unlimited | 2 minutes | Similar setup, no account sometimes required |
| **Netlify Forms** | Free on Netlify hosting | — | Only if you move to Netlify |
| **Custom backend** | Variable | Hours | Full control if you need it |

The simplest path is Formspree. Replace the form tag in `contact.html` with:
```html
<form id="inquiry-form" class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```
…then remove the `e.preventDefault()` / redirect block in `main.js` or set the form's `data-netlify` attribute if using Netlify.

---

## Notes on future improvements & integrations

- **Replace the portrait placeholder** on `about.html` with a real professional photo of Miya. Update the `.about-portrait` div in `about.html` to use an `<img>`.
- **Replace the hero monogram** on `index.html` with a real brand photograph (office shot, still life of ledgers/hands on keyboard, Florida coastal elegance) for maximum premium feel.
- **Add client logos / "featured in" strip** beneath the hero once Miya has permission to display them.
- **Case studies** — once there are 2–3 meaningful client stories, add a `case-studies.html` page or integrate them into `services.html`.
- **Booking integration** — add a Calendly / SavvyCal / TidyCal embed on `contact.html` for clients who'd rather book a discovery call than fill out a form.
- **Blog / resources** — helpful monthly posts ("5 signs your books are behind," "Getting tax-ready without the stress") are excellent for SEO and trust building. Easy to add as `/blog/` pages or drop in a headless CMS later.
- **Analytics** — add Google Analytics 4, Plausible, or Fathom for lightweight privacy-friendly analytics.
- **Email** — currently using `MiyaBBookkeeping@gmail.com`. Consider migrating to a custom domain address (e.g. `hello@miyabbookkeeping.com`) via Google Workspace or Fastmail once the domain is live.
- **Form file uploads** — Formspree supports file uploads on paid plans; Google Drive forms or a dedicated secure client portal (ShareFile, SuiteFiles, Content Snare) is better for sensitive financial documents.
- **Client portal** — eventually replace the contact form with an intake flow that routes into a portal (TaxDome, Content Snare, Liscio, Financial Cents) — common among top-tier bookkeeping firms.
- **Testimonial page** — expand the single testimonial quotes into a dedicated reviews/testimonials page with more stories.
- **Schema.org structured data** — add LocalBusiness / ProfessionalService schema for better Google results. This is a small JSON-LD snippet in each page's `<head>`.
- **Accessibility pass** — the site is built with semantic HTML and passes contrast requirements, but a full WCAG 2.1 AA audit is recommended before launch.

---

## Quality checklist (already done)

- Fully responsive, tested at mobile / tablet / desktop breakpoints.
- Semantic HTML (`<header>`, `<section>`, `<article>`, `<footer>`, `<main>`).
- Accessible nav toggle with `aria-expanded`, focus states, keyboard-friendly FAQ.
- SEO-friendly titles, meta descriptions, headings.
- `robots.txt` and `sitemap.xml` included.
- Consistent shared header/footer across every page.
- No external build step, no framework — pure static files, deploy anywhere.
- Google Fonts loaded with `preconnect` hints for performance.
- Favicon embedded as inline SVG (no additional file needed).

---

*"Lean on me for all of your needs."*
