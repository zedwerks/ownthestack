const { layout, escapeHtml, BUILD_TIME } = require("../../_lib/render.js");

class EvidenceLayout {
  render(data) {
    const {
      site,
      title,
      description = "Supporting evidence for the Own the Stack proposal.",
      content,
      page,
      paper,
      reference,
    } = data;

    if (!title) {
      throw new Error(`Evidence page ${page?.inputPath || ""} is missing a title`);
    }

    const canonical = `https://${site.domain}${page.url}`;
    const paperHref = paper ? `/paper/${encodeURIComponent(paper)}/` : "";
    const bodyHtml = `
      <main class="paper-page evidence-page">
        <div class="wrap">
          <header class="paper-header">
            <div class="evidence-kicker">
              <span>Evidence note${reference ? ` ${escapeHtml(reference)}` : ""}</span>
              ${paperHref ? `<a class="evidence-back" href="${paperHref}">Back to paper</a>` : ""}
            </div>
            <h1>${escapeHtml(title)}</h1>
            ${description ? `<p class="sub">${escapeHtml(description)}</p>` : ""}
          </header>
          <article class="evidence-body">
            ${content}
          </article>
        </div>
      </main>
    `;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      url: canonical,
      inLanguage: "en-CA",
      datePublished: data.datePublished || BUILD_TIME,
      dateModified: data.dateModified || BUILD_TIME,
      author: { "@type": "Person", name: "Brad Head" },
      publisher: {
        "@type": "Organization",
        name: site.title,
        url: `https://${site.domain}/`,
      },
      ...(paperHref
        ? { isPartOf: { "@type": "Article", url: `https://${site.domain}${paperHref}` } }
        : {}),
    };

    return layout({
      site,
      title: `${title} — ${site.title}`,
      description,
      activeNav: "papers",
      canonical,
      type: "article",
      datePublished: data.datePublished,
      dateModified: data.dateModified,
      jsonLd,
      bodyHtml,
    });
  }
}

module.exports = EvidenceLayout;
