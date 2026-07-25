const { layout, escapeHtml } = require("./_lib/render.js");

class AboutPage {
  data() {
    return {
      permalink: "/about/index.html",
    };
  }

  render(data) {
    const { site } = data;
    const title = `About this proposal — ${site.title}`;
    const description = site.footer.note;
    const bodyHtml = `
      <section class="paper-page">
        <div class="wrap">
          <div class="paper-header">
            <h1>About this proposal</h1>
          </div>
          <p class="paragraph">${escapeHtml(site.footer.note)}</p>
          <p class="paragraph">This site is built with Eleventy. Every paper is a real, statically
            generated HTML page — not a client-side route — so each one has its own URL, its own
            title and description for link previews, and shows up properly in search results.
            The source content for every paper lives as plain JSON in the repository
            (see <code>/data/papers.json</code> and <code>/data/papers/</code> on this site) and is
            rebuilt into HTML on every push. Nothing here is hand-edited output.</p>
          <p class="paragraph">The visual and content architecture — JSON-driven papers, no backend,
            static hosting, MIT license — was adapted from the structure the Government of Alberta
            used for its own Velocity White Papers (thevelocitywhitepapers.com). No content, copy,
            or branding was reused, only the shape of the approach.</p>
        </div>
      </section>
    `;

    return layout({
      site,
      title,
      description,
      activeNav: "about",
      canonical: `https://${site.domain}/about/`,
      bodyHtml,
    });
  }
}

module.exports = AboutPage;
