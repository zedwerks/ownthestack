# Own the Stack

**[ownthestack.ca](https://ownthestack.ca)** *(not yet registered/deployed — see below)*

A proposal for a Canadian-owned, open-source clinical information system —
governed by a federal-provincial-territorial consortium, funded through
mandated contribution, and built to remove Canadian health data from foreign
vendor risk.

Every paper here is a real, statically generated HTML page: its own URL, its
own title and description for link previews and search results, built fresh
from plain JSON on every push. Nothing is hand-edited output, and there's no
backend — this is Eleventy generating flat files, deployed to Cloudflare
Pages. Licensed MIT so it can be forked, argued with, and rewritten by anyone
who wants to make the case better.

## Status

Two papers are written. Five more are scaffolded in `src/_data/papers.json`
with working titles, abstracts, and `"status": "planned"` — they show up on
the home page already, greyed out and unlinked, so the shape of the whole
argument is visible before it's finished.

1. **The Fragmentation We Call a System** — current-state analysis — *published*
2. **Renting Sovereignty: The Foreign Vendor Problem** — sovereignty risk case — *published*
3. **What We Don't Have to Build Twice** — OpenMRS / Bahmni / openEHR assessment — planned
4. **One Spine, Many Modules** — technical architecture, CA Core+ alignment — planned
5. **Who Holds the Pen** — governance model — planned
6. **The Mandated Contribution Model** — funding model — planned
7. **Ten Years, Thirteen Jurisdictions** — delivery roadmap — planned

## Why Eleventy, not a client-side app

An earlier draft of this site was a single-page Vue app with hash routing
(`#/paper/current-state`). That's the architecture the Government of
Alberta's own Velocity White Papers uses, and it's fine for them because
their build pipeline pre-renders a static page per paper for crawlers. This
project didn't have that step, which meant no real per-paper URLs, no link
previews when a paper gets shared, and effectively no SEO — a search engine
sees one page, not seven. Eleventy fixes that natively: every paper is a
genuine static file at its own address, generated from the same JSON content
model. The authoring workflow (write a paper as a `blocks` array in JSON) is
unchanged from that earlier draft — only how it becomes HTML changed.

## How it works

```
.eleventy.js              Eleventy config — input/output dirs, passthrough copies
src/
  index.11ty.js            Home page (hero + paper index)
  about.11ty.js             About page
  paper.11ty.js              Paper template — paginates over publishedPapers,
                               one real HTML file per paper
  sitemap.11ty.js             /sitemap.xml
  robots.txt
  style.css                   The whole design system (ledger/archival theme)
  _lib/
    render.js                 Shared HTML helpers: block renderer, page layout
  _data/
    site.json                 Site-wide config and interface strings
    papers.json                The inventory: one entry per paper (id, order,
                                 status, title, abstract) — this is what
                                 drives the home-page list, published or not
    publishedPapers.js          Global data: papers.json entries filtered to
                                  only those with a body file (see below)
    paperBodies.js               Global data: every paper body JSON, loaded
                                   and keyed by "<id>.<locale>"
    papers-content/
      current-state.en.json      Paper bodies — one file per paper per locale,
      sovereignty-risk.en.json    each an ordered `blocks` array
```

**Content model** (unchanged from the earlier draft): a paper body is an
ordered `blocks` array. Block types implemented in `_lib/render.js`:
`dropcap_paragraph`, `paragraph`, `section_heading`, `pullquote`, `keystat`,
`sidenote`, `tag_row`, `related`. To write a new paper, add its metadata to
`papers.json` (`status: "draft"` to start) and create
`src/_data/papers-content/<id>.en.json` with a `blocks` array — Eleventy
picks it up automatically on the next build; no route or template file to
touch. Flip `status` to `"published"` when it's ready for readers.

**A gotcha this project already hit once:** the `related` block at the end
of a paper links to other paper IDs. If you reference a paper that's still
`planned` (no body file yet), the link renderer silently drops it rather than
generating a dead link — that's why `paper.11ty.js` passes `publishedPapers`
into the block-rendering context, not the full inventory. Keep that in mind
if you ever change what gets passed there.

**The raw content is published too.** `/data/papers.json` and
`/data/papers/<id>.en.json` are copied straight into the built site, so
anyone can see the exact source a paper was built from without cloning the
repo — the same "auditable as flat files" idea the Alberta site's README
talks about, kept here even without their in-browser CMS or AI-generation
pipeline.

## Running it locally

```bash
npm install
npm run start     # serves http://localhost:8080 with live reload
npm run build     # builds to ./_site once, no server
```

## Deploying (Cloudflare Pages)

**One-time setup:**

1. In the Cloudflare dashboard, create a Pages project named `own-the-stack`
   (Workers & Pages → Create → Pages → Direct Upload — the GitHub Action
   pushes the build, Cloudflare doesn't need to watch the repo for this
   setup).
2. Create an API token: My Profile → API Tokens → Create Token → a token
   scoped to `Account.Cloudflare Pages: Edit`. Copy it.
3. Find your Account ID on any domain's Overview page in the dashboard,
   right sidebar.
4. In the GitHub repo: Settings → Secrets and variables → Actions, add
   `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
5. Push to `main`. `.github/workflows/deploy.yml` runs `npm ci && npm run
   build`, then `wrangler pages deploy _site`.

**Pointing the domain at it:** once the Pages project has had one successful
deploy, go to the project → Custom domains → add `ownthestack.ca` (and
`www.ownthestack.ca` if wanted). If the domain's DNS is already on
Cloudflare, this is a one-click add. If it's registered elsewhere, either
move DNS to Cloudflare (free) or CNAME to the `*.pages.dev` URL the project
gets by default.

**`.github/workflows/ci.yml`** runs the same build (no deploy) on every pull
request and on pushes to any branch that isn't `main`, so a broken build
can't reach production and can't silently merge, either.

**Alternative, skipping GitHub Actions entirely:** Cloudflare Pages can
watch the repo directly (Workers & Pages → Create → Pages → Connect to Git,
build command `npm run build`, output directory `_site`) and redeploy on
every push with no workflow file and no secrets. Simpler if you don't need
deploy logic under version control. The Actions route above is worth keeping
if you want that, or expect to add steps (linting, a future style-guide
eval) that should block a bad deploy.

## Not yet built

- **French.** The data model is ready for it (`papers-content/<id>.fr.json`
  alongside the `.en.json`, a `translation_status` field already used
  elsewhere in this project's earlier draft) but no French content exists
  yet and the locale-switching UI isn't wired up. Get the English argument
  right first.
- **AI-generated imagery/narration**, the in-browser CMS editor, and the
  style-guide/eval pipeline the Alberta original has — intentionally left
  out for now. See the git history of the earlier SPA draft if any of these
  turn out to be worth adding back deliberately.

## License

MIT.
