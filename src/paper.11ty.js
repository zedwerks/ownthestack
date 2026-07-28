const { layout, renderBlocks, escapeHtml, BUILD_TIME } = require("./_lib/render.js");

class PaperPage {
  data() {
    return {
      pagination: {
        data: "publishedPapers",
        size: 1,
        alias: "paperMeta",
      },
      permalink: (data) => `/paper/${data.paperMeta.id}/index.html`,
    };
  }

  render(data) {
    const { site, paperMeta, paperBodies, publishedPapers } = data;
    const body = paperBodies[`${paperMeta.id}.en`];
    const title = `${paperMeta.en.title} — ${site.title}`;
    const description = paperMeta.en.abstract;

    const footerBlocks = body
      ? renderBlocks(
          [
            body.tags?.length && { type: "tag_row", tags: body.tags },
            body.related?.length && { type: "related", ids: body.related },
          ].filter(Boolean),
          { papers: publishedPapers }
        )
      : "";

    const bodyHtml = `
      <section class="paper-page">
        <div class="wrap">
          <div class="paper-header">
            <span class="status-pill ${paperMeta.status}">${escapeHtml(
      site.status_labels[paperMeta.status]
    )}</span>
            <h1>${escapeHtml(paperMeta.en.title)}</h1>
            <p class="sub">${escapeHtml(paperMeta.en.abstract)}</p>
          </div>
          ${
            body
              ? body.html + footerBlocks
              : `<p>This paper isn't available yet — check the home page for status.</p>`
          }
        </div>
      </section>
    `;

    const canonical = `https://${site.domain}/paper/${paperMeta.id}/`;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      headline: paperMeta.en.title,
      description: paperMeta.en.abstract,
      url: canonical,
      image: `https://${site.domain}/assets/og-image.png`,
      inLanguage: "en-CA",
      keywords: paperMeta.tags?.join(", "),
      datePublished: BUILD_TIME,
      dateModified: BUILD_TIME,
      author: {
        "@type": "Person",
        name: "Brad Head",
      },
      publisher: {
        "@type": "Organization",
        name: "Own the Stack",
        url: `https://${site.domain}/`,
        logo: {
          "@type": "ImageObject",
          url: `https://${site.domain}/apple-touch-icon.png`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonical,
      },
    };

    return layout({
      site,
      title,
      description,
      activeNav: "papers",
      canonical,
      type: "article",
      jsonLd,
      bodyHtml,
    });
  }
}

module.exports = PaperPage;
