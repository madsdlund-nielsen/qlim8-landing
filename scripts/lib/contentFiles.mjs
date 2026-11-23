/**
 * The files whose git history dates a blog article (scripts/content-dates.mjs).
 *
 * An article lives in src/content/<slug>.ts. A comparison article (category
 * "Sammenligning") also renders its table from the shared module in
 * src/content/sammenligning/ (the vendor data and the table builder), so an
 * edit there changes what the page says and must move its lastmod too. A git
 * pathspec naming the directory covers every file under it.
 */
export const COMPARISON_CATEGORY = "Sammenligning";
export const COMPARISON_DIR = "src/content/sammenligning";

export function articleContentFiles(article) {
  const files = [`src/content/${article.slug}.ts`];
  if (article.category === COMPARISON_CATEGORY) files.push(COMPARISON_DIR);
  return files;
}
