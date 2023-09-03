import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'datanist | blog',
    description: 'En blogg om ibland intressanta saker',
    site: 'https://datanist.se',
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
    
  });
}