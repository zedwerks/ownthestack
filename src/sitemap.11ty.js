class Sitemap {
  data() {
    return {
      permalink: "/sitemap.xml",
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const { site, publishedPapers, collections } = data;
    const urls = [
      `https://${site.domain}/`,
      `https://${site.domain}/about/`,
      ...publishedPapers.map((p) => `https://${site.domain}/paper/${p.id}/`),
      ...(collections.evidence || []).map(
        (note) => `https://${site.domain}${note.url}`
      ),
    ];

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>
`;
  }
}

module.exports = Sitemap;
