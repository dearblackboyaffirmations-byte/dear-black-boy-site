# Dear Black Boy — static site

Plain HTML/CSS/JS. No build step, no dependencies. Upload the contents of this
folder to your host's web root (GoDaddy: File Manager → `/public_html`).

## First push

```bash
cd site
git init -b main
git add .
git commit -m "Dear Black Boy site"
gh repo create dear-black-boy-site --private --source=. --push
# or, without the gh CLI, after creating an empty repo on github.com:
# git remote add origin https://github.com/<you>/dear-black-boy-site.git
# git push -u origin main
```

```
site/
├─ index.html         all page content
├─ css/styles.css     all styling (tokens at the top under :root)
├─ js/main.js         FAQ accordion, donate tier selector, form handler
└─ images/            all photography and the logo
```

## Brand tokens

Edit once at the top of `css/styles.css`:

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#0C0B09` | page background |
| `--panel` | `#16130F` | cards and bands |
| `--gold` | `#F2B23E` | headings, buttons, accents |
| `--cream` | `#F5F1E8` | body text |

Type: **Anton** (display), **Inter** (body), **Caveat** (scholar notes) — loaded
from Google Fonts in `index.html`.

## Hooking up the contact form

`index.html` has the form at `#contact` with fields `name`, `email`, `school`,
`package`, `message`. Two options:

1. **Host form service** — set `action` to your endpoint (e.g. Formspree,
   GoDaddy's form handler) and `method="post"`, then delete the submit handler
   at the bottom of `js/main.js`.
2. **Email fallback** — swap the `<form>` for a `mailto:` link.

As shipped, submitting shows a thank-you state without sending anything.

## Notes

- No prices appear anywhere; the packages section links to the form
  ("Request pricing").
- Photo filenames are descriptive — swap any file in `images/` at the same name
  and the page picks it up.
- Fully responsive: every grid collapses with `auto-fit`, no fixed breakpoints
  to maintain.
