// lib/contentful.js
import { createClient } from "contentful";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID||'',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN||'',
});


export async function getBlogs() {
  const res = await client.getEntries({
    content_type: "blogPost", // must match Contentful content type ID
  });
  return res.items;
}