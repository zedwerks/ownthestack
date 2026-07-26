module.exports = function (eleventyConfig) {
  // Static assets served as-is.
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Logo assets: /assets/logo-mark.svg is the one canonical URL for the
  // source SVG — used by the header lockup and, via the <link rel="icon">
  // tag in render.js, as the favicon too. (Eleventy dedupes passthrough
  // entries by source path, so mapping this same file to two destinations
  // here would silently drop one of them.)
  eleventyConfig.addPassthroughCopy({ "src/assets/logo-mark.svg": "assets/logo-mark.svg" });
  eleventyConfig.addPassthroughCopy({ "src/assets/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "src/assets/apple-touch-icon.png": "apple-touch-icon.png" });

  // Publish the raw paper content as plain Markdown too, so the site's own
  // claims are auditable the same way the rest of this project is:
  // https://ownthestack.ca/data/papers.json and /data/papers/<id>.en.md
  eleventyConfig.addPassthroughCopy({ "src/_data/papers-content": "data/papers" });
  eleventyConfig.addPassthroughCopy({ "src/_data/papers.json": "data/papers.json" });

  // paperBodies.js reads these .md/.mdx files itself (fs.readFileSync), so
  // Eleventy can't infer the dependency automatically the way it can for
  // required .json/.js data files — watch them explicitly.
  eleventyConfig.addWatchTarget("src/_data/papers-content");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
};