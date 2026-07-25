const { layout, renderBlocks, escapeHtml } = require("./_lib/render.js");

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
              ? renderBlocks(body.blocks, { papers: publishedPapers })
              : `<p>This paper isn't available yet — check the home page for status.</p>`
          }
        </div>
      </section>
    `;

    return layout({
      site,
      title,
      description,
      activeNav: "papers",
      canonical: `https://${site.domain}/paper/${paperMeta.id}/`,
      bodyHtml,
    });
  }
}

module.exports = PaperPage;
