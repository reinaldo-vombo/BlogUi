import { createClient } from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '0itb7jb6',
  dataset: 'production',
  apiVersion: '2023-06-26',
  useCdn: true, // Enable if you want to use the Sanity CDN for images
  token:
    'skJm4Fklb8TwJD6LTwyPVcfg4yBZuEdKl7yzD1YzSKoUYqCHffCIx9fQiFDgnBplZEn2Hl4bN0yNm8pVriqtdutMt0xRyEiYHtw4MtLbWRYMgk1QGAXbqkTF66f60iL2HdhjjMpXC00oZiTbCiQ8cIiC52Mr8NwbwhkgtyMk3oj5zYi7nXL7',
});
const builder = ImageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
