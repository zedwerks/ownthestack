const { layout, renderBlocks, escapeHtml } = require("./_lib/render.js");

const publicationDateFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

function publicationDate(value, fieldName, inputPath) {
  if (!value) return null;
  const iso = value instanceof Date
    ? value.toISOString().slice(0, 10)
    : String(value).slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    throw new Error(`${inputPath}: ${fieldName} must use YYYY-MM-DD`);
  }
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== iso) {
    throw new Error(`${inputPath}: ${fieldName} is not a valid calendar date`);
  }
  return { iso, label: publicationDateFormatter.format(date) };
}

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
    const inputPath = `src/_data/papers-content/${paperMeta.id}.en.md`;
    const datePublished = publicationDate(body?.datePublished, "datePublished", inputPath);
    const dateModified = publicationDate(body?.dateModified, "dateModified", inputPath);

    if (datePublished && dateModified && dateModified.iso < datePublished.iso) {
      throw new Error(`${inputPath}: dateModified cannot precede datePublished`);
    }

    const publicationMeta = [
      datePublished && `<span>First published <time datetime="${datePublished.iso}">${escapeHtml(datePublished.label)}</time></span>`,
      dateModified && dateModified.iso !== datePublished?.iso &&
        `<span>Updated <time datetime="${dateModified.iso}">${escapeHtml(dateModified.label)}</time></span>`,
      body?.revision && `<span>Revision ${escapeHtml(body.revision)}</span>`,
    ].filter(Boolean).join("");
    const visiblePublicationMeta = publicationMeta ||
      (paperMeta.status === "published"
        ? '<span class="publication-date-pending">Publication date pending</span>'
        : "");

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
            <div class="paper-header-meta">
              <span class="status-pill ${paperMeta.status}">${escapeHtml(
      site.status_labels[paperMeta.status]
    )}</span>
              ${visiblePublicationMeta ? `<div class="publication-meta" aria-label="Publication details">${visiblePublicationMeta}</div>` : ""}
            </div>
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
      ...(datePublished ? { datePublished: datePublished.iso } : {}),
      ...(dateModified || datePublished
        ? { dateModified: dateModified?.iso || datePublished.iso }
        : {}),
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
      datePublished: datePublished?.iso,
      dateModified: dateModified?.iso || datePublished?.iso,
      jsonLd,
      bodyHtml,
    });
  }
}

module.exports = PaperPage;
