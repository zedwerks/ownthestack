# Contributing to Own the Stack

Thank you for helping make the case for Canadian-owned, open, interoperable
health infrastructure stronger. Contributions are welcome from writers,
editors, researchers, clinicians, policy specialists, designers, and
developers.

You can contribute by:

- correcting or clarifying an existing paper;
- adding evidence, references, or Canadian context;
- drafting a planned paper;
- proposing a new paper or translation;
- improving accessibility, design, or site behaviour; or
- reporting an error or opening an issue for discussion.

## Before you begin

For a small correction, feel free to open a pull request directly. For a new
paper, a substantial rewrite, or a technical change that affects the site's
structure, please open a GitHub issue first. This gives maintainers and other
contributors a place to agree on scope before significant work begins.

Keep discussion constructive and focused on the argument, evidence, and public
interest. Disagreement is welcome; personal attacks are not.

## Where the content lives

Paper prose is written in Markdown in:

```text
src/_data/papers-content/
```

Each paper has one file per language, named with the paper ID and locale:

```text
src/_data/papers-content/<paper-id>.en.md
src/_data/papers-content/<paper-id>.fr.md
```

English content exists today. The data model supports French filenames, but
the locale-switching interface is not yet implemented.

The paper inventory and publication state live separately in:

```text
src/_data/papers.json
```

That file contains each paper's ID, order, status, tags, title, and abstract.
Use an existing planned entry when drafting one of the papers already listed.
For a genuinely new paper, add a new metadata entry with a unique ID and order.

Other useful locations are:

```text
src/style.css          Site-wide styles
src/_lib/markdown.js   Markdown rendering and custom content blocks
src/_lib/render.js     Shared page-layout and HTML helpers
src/*.11ty.js          Eleventy page templates
src/_data/site.json    Site-wide configuration and interface text
```

Do not edit `_site/`. It is generated output and is rebuilt from the source
files.

## Writing or editing a paper

A paper body begins with YAML frontmatter followed by ordinary Markdown:

```markdown
---
id: current-state
locale: en
translation_status: final
tags: [fragmentation, primary care, hospitals]
related: [sovereignty-risk]
---

The paper begins here.

## A section heading

Continue with ordinary Markdown prose.
```

Use the same paper ID in the filename, frontmatter, and `papers.json`. Values
in `related` must be paper IDs from `papers.json`. Related papers without a
body file are omitted from the rendered links until their content exists.

The first paragraph automatically receives drop-cap styling. The renderer also
supports these content patterns:

```markdown
> A blockquote is rendered as a pullquote.

::: keystat 10 yrs | the length of the example contract
:::

::: sidenote
Supporting context that should sit outside the main narrative.
:::
```

When possible:

- write in clear language for a broad Canadian audience;
- support factual claims with links to primary or authoritative sources;
- distinguish facts from proposals, estimates, and opinions;
- preserve Canadian spelling; and
- keep links descriptive rather than using phrases such as "click here."

Set a new or in-progress paper to `"status": "draft"` in `papers.json`.
Drafts build and can be reviewed at their direct URL, but remain unlinked on
the home page. A maintainer will change the status to `"published"` when the
paper is approved for release. Do not mark your own contribution as published
unless a maintainer has asked you to do so.

## Fork the repository and open a pull request

1. On GitHub, open
   [zedwerks/ownthestack](https://github.com/zedwerks/ownthestack) and select
   **Fork**.
2. Clone your fork and enter the project directory:

   ```bash
   git clone https://github.com/<your-username>/ownthestack.git
   cd ownthestack
   ```

3. Add the original repository as `upstream`:

   ```bash
   git remote add upstream https://github.com/zedwerks/ownthestack.git
   ```

4. Create a focused branch from the latest `main`:

   ```bash
   git fetch upstream
   git switch main
   git merge --ff-only upstream/main
   git switch -c content/short-description
   ```

   Use a descriptive prefix such as `content/`, `fix/`, `docs/`, or `feature/`.

5. Make your changes, preview them locally, and commit them:

   ```bash
   git add <changed-files>
   git commit -m "Describe the contribution"
   git push -u origin content/short-description
   ```

6. Open a pull request from your fork to `zedwerks/ownthestack:main`.

In the pull request, explain what changed, why it improves the project, and
which sources support substantial factual additions. Link the relevant issue
if one exists. Keep each pull request focused on one paper or one coherent
technical change so it can be reviewed independently.

## Run the site locally

The site requires Node.js and npm. Install the dependencies once:

```bash
npm install
```

Start the local development server with live reload:

```bash
npm start
```

Then open <http://localhost:8080>.

Before submitting a pull request, run a production build:

```bash
npm run build
```

The build output is written to `_site/`. Review the changed paper in the local
site, check its title and abstract on the home page, follow its related-paper
links, and confirm the build finishes without errors.

## Pull-request checklist

- [ ] The change is limited to one clear contribution.
- [ ] Paper prose is in `src/_data/papers-content/`, not `_site/`.
- [ ] The filename, frontmatter ID, and `papers.json` ID agree.
- [ ] New factual claims are supported by reliable sources.
- [ ] Links work and use descriptive text.
- [ ] New work is marked `draft`, unless a maintainer requested otherwise.
- [ ] `npm run build` completes successfully.
- [ ] The rendered page has been reviewed locally.

## Review and publication

Maintainers may request changes for accuracy, clarity, scope, accessibility,
or consistency with the site's content model. A merged change to `main` is
automatically deployed through Cloudflare Pages. Maintainers therefore control
the final merge and the change from draft to published status.

By contributing, you agree that your contribution will be distributed under
the project's [MIT License](LICENSE).
