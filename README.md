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
genuine static file at its own address, generated from a plain Markdown
content model.

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
    render.js                 Shared HTML helpers: tag/related renderer, page layout
    markdown.js                 The markdown-it setup: dropcap/pullquote/keystat/
                                  sidenote rendering rules
  _data/
    site.json                 Site-wide config and interface strings
    papers.json                The inventory: one entry per paper (id, order,
                                 status, title, abstract) — this is what
                                 drives the home-page list, published or not
    publishedPapers.js          Global data: papers.json entries filtered to
                                  only those with a body file (see below)
    paperBodies.js               Global data: every paper body, read as
                                   Markdown and keyed by "<id>.<locale>"
    papers-content/
      current-state.en.md        Paper bodies — one file per paper per locale,
      sovereignty-risk.en.md      frontmatter + plain Markdown prose
```

## Writing a paper

Papers are authored as plain Markdown — the goal is that anyone can open a
pull request adding or editing one without reading any code. A body file
looks like this:

```markdown
---
id: current-state
locale: en
translation_status: final
tags: [fragmentation, OSCAR EMR, Infoway]
related: [sovereignty-risk, open-source-foundations]
---

Ordinary paragraphs work exactly like normal Markdown. The very first
paragraph in the file automatically gets the drop-cap treatment — you don't
need to do anything special for it.

## A section heading

`##` headings get the section-heading styling automatically. Standard
**bold**, *italic*, and [links](https://example.com) all work as you'd
expect, and so does raw HTML if you ever need something Markdown can't do.

> A blockquote is always rendered as a pullquote.

::: keystat 10 yrs | the length of Nova Scotia's Oracle Cerner contract
:::

::: sidenote
A sidenote — rendered smaller, indented, with a "Note —" label added
automatically by CSS.
:::
```

To add a new paper: add its metadata to `papers.json` (`status: "draft"` to
start) and create `src/_data/papers-content/<id>.en.md` with frontmatter +
prose as above — Eleventy picks it up automatically on the next build; no
route or template file to touch, and the local dev server (`npm start`)
watches these files and rebuilds live. Flip `status` to `"published"` in
`papers.json` when it's ready for readers — that's the review gate: a `draft`
paper builds and is reachable by direct URL, but stays greyed out and
unlinked on the home page until someone with merge access flips the flag.

**A gotcha this project already hit once:** the `related` frontmatter field
links to other paper IDs. If you reference a paper that's still `planned`
(no body file yet), the link renderer silently drops it rather than
generating a dead link — that's why `paper.11ty.js` passes `publishedPapers`
into the renderer, not the full inventory. Keep that in mind if you ever
change what gets passed there.

**The raw content is published too.** `/data/papers.json` and
`/data/papers/<id>.en.md` are copied straight into the built site, so anyone
can see the exact source a paper was built from without cloning the repo —
the same "auditable as flat files" idea the Alberta site's README talks
about, kept here even without their in-browser CMS or AI-generation
pipeline.

## Running it locally

```bash
npm install
npm run start     # serves http://localhost:8080 with live reload
npm run build     # builds to ./_site once, no server
```

## Deploying (Cloudflare Pages)

Cloudflare Pages watches this repo directly and deploys `main` — there's no
GitHub Actions workflow and no Cloudflare API token sitting in the repo's
secrets. The review gate is the pull request itself: nothing reaches `main`
until it's been reviewed and merged, and a merge to `main` is what goes
live.

**One-time setup:**

1. In the Cloudflare dashboard: Workers & Pages → Create → Pages → Connect
   to Git → pick this repo.
2. Production branch: `main`. Build command: `npm run build`. Output
   directory: `_site`.
3. Save. Cloudflare builds and deploys on every push to `main` from here on
   (and gives PR preview deployments for other branches automatically,
   which is a nice side effect for reviewing a contribution before merging
   it).

**Pointing the domain at it:** once the Pages project has had one successful
deploy, go to the project → Custom domains → add `ownthestack.ca` (and
`www.ownthestack.ca` if wanted). If the domain's DNS is already on
Cloudflare, this is a one-click add. If it's registered elsewhere, either
move DNS to Cloudflare (free) or CNAME to the `*.pages.dev` URL the project
gets by default.

## Not yet built

- **French.** The data model is ready for it (`papers-content/<id>.fr.md`
  alongside the `.en.md`, a `translation_status` field already used
  elsewhere in this project's earlier draft) but no French content exists
  yet and the locale-switching UI isn't wired up. Get the English argument
  right first.
- **AI-generated imagery/narration**, the in-browser CMS editor, and the
  style-guide/eval pipeline the Alberta original has — intentionally left
  out for now. See the git history of the earlier SPA draft if any of these
  turn out to be worth adding back deliberately.

## License

MIT.
