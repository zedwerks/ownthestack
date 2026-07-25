module.exports = function (eleventyConfig) {
  // Static assets served as-is.
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Publish the raw paper content as flat JSON too, so the site's own
  // claims are auditable the same way the rest of this project is:
  // https://ownthestack.ca/data/papers.json and /data/papers/<id>.en.json
  eleventyConfig.addPassthroughCopy({ "src/_data/papers-content": "data/papers" });
  eleventyConfig.addPassthroughCopy({ "src/_data/papers.json": "data/papers.json" });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
};