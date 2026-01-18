"use client";
import Link from "next/link";
import { getBlogs } from "../lib/contentful";

export default async function HomePage() {
  const blogs = await getBlogs();

  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "60px 24px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
      }}
    >
      {/* Page Header */}
      <header style={{ marginBottom: "48px", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "44px",
            fontWeight: "800",
            color: "#111827",
            marginBottom: "12px",
          }}
        >
          Contentful CMS Blog
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#6b7280",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          Articles powered by Contentful CMS and built with Next.js App Router
        </p>
      </header>

      {/* Blog Grid */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "28px",
        }}
      >
        {blogs.map((blog: any) => (
          <article
            key={blog.sys.id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              padding: "24px",
              backgroundColor: "#ffffff",
              boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "12px",
                color: "#111827",
              }}
            >
              {blog.fields.title}
            </h2>

            <p
              style={{
                fontSize: "16px",
                color: "#4b5563",
                lineHeight: "1.6",
                marginBottom: "20px",
              }}
            >
              {blog.fields.excerpt || blog.fields.description}
            </p>

            {/* Read More Link */}
            <Link
              href={`/blog/${blog.fields.slug}`}
              style={{
                fontSize: "15px",
                fontWeight: "600",
                color: "#2563eb",
                textDecoration: "none",
              }}
            >
              Read full article →
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
