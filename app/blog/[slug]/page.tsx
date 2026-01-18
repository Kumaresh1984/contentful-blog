import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID||'',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN||'',
});

export async function generateStaticParams() {
  const res = await client.getEntries({ content_type: "blogPost" });

  return res.items.map((item) => ({
    slug: item.fields.slug,
  }));
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const res = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": params.slug,
  });
 
  const blog:any = res.items[0];
    const richTextOptions = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node: { data: { target: { fields: { file: any; title: any; }; }; }; }) => {
        const { file, title } = node.data.target.fields;

        return (
            <figure style={{ margin: "32px 0", textAlign: "center" }}>
            <img
                src={`https:${file.url}`}
                alt={title || "Blog image"}
                style={{
                maxWidth: "100%",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                }}
            />
            {title && (
                <figcaption
                style={{
                    marginTop: "8px",
                    fontSize: "14px",
                    color: "#6b7280",
                }}
                >
                {title}
                </figcaption>
            )}
            </figure>
        );
        },
    },
    };

  return (
<main
  style={{
    maxWidth: "900px",
    margin: "0 auto",
    padding: "48px 24px",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
  }}
>
  {/* Title */}
  <h1
    style={{
      fontSize: "42px",
      fontWeight: "800",
      lineHeight: "1.2",
      marginBottom: "16px",
      color: "#111827",
    }}
  >
    {blog.fields.title}
  </h1>

  {/* Excerpt */}
  <p
    style={{
      fontSize: "18px",
      lineHeight: "1.7",
      color: "#4b5563",
      marginBottom: "40px",
    }}
  >
    {blog.fields.excerpt}
  </p>

  {/* Divider */}
  <hr
    style={{
      border: "none",
      borderTop: "1px solid #e5e7eb",
      marginBottom: "40px",
    }}
  />

  {/* Blog Body */}
  <article
    style={{
      fontSize: "18px",
      lineHeight: "1.8",
      color: "#1f2937",
    }}
  >
    {documentToReactComponents(blog.fields.body, richTextOptions)}
  </article>
</main>

  );
}
