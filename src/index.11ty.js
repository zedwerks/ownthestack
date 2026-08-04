const { layout, paperRow, escapeHtml } = require("./_lib/render.js");

class HomePage {
  data() {
    return {
      permalink: "/index.html",
    };
  }

  render(data) {
    const { site, papers, publishedPapers } = data;
    const title = `${site.title} — ${site.subtitle}`;
    const description = site.hero.sub;
    const papersWithBodies = new Set(publishedPapers.map((paper) => paper.id));

    // Point "see the governance model" at the real paper once it's published;
    // until then, fall back to the on-page index instead of a dead link.
    const governance = publishedPapers.find((p) => p.id === "governance");
    const secondaryHref = governance ? `/paper/governance/` : `/#papers`;

    const bodyHtml = `
      <section class="hero">
        <div class="wrap">
          <div class="eyebrow">${escapeHtml(site.hero.eyebrow)}</div>
          <h1 class="headline">${escapeHtml(site.hero.headline)}</h1>
          <p class="sub">${escapeHtml(site.hero.sub)}</p>
          <div class="cta-row">
            <a href="/paper/current-state/" class="btn primary">${escapeHtml(
              site.hero.cta_primary
            )}</a>
            <a href="${secondaryHref}" class="btn">${escapeHtml(site.hero.cta_secondary)}</a>
          </div>
        </div>
      </section>
      <section class="paper-index" id="papers">
        <div class="wrap">
          ${papers
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((p) =>
              paperRow(p, {
                // Draft papers are clickable on the live site too, as long as
                // a body file actually exists for them — the "In draft" pill
                // (see site.json status_labels) is what signals draft status
                // to readers, not whether the link works.
                linkable:
                  p.status === "published" ||
                  (p.status === "draft" && papersWithBodies.has(p.id)),
              })
            )
            .join("\n")}
        </div>
      </section>
    `;

    const canonical = `https://${site.domain}/`;

    const jsonLd = [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: site.title,
        description: site.hero.sub,
        url: canonical,
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Own the Stack",
        url: canonical,
        logo: `https://${site.domain}/apple-touch-icon.png`,
      },
    ];

    return layout({
      site,
      title,
      description,
      activeNav: "home",
      canonical,
      jsonLd,
      bodyHtml,
    });
  }
}

module.exports = HomePage;
