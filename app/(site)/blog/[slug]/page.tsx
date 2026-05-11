import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { marked } from "marked";
import TrialCTA from "@/components/TrialCTA";
import { getBlog, getBlogBySlug } from "@/lib/data";

type Ctx = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Ctx): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} — ATHLETIX Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = await getBlog();
  return posts.filter((p) => p.published).map((p) => ({ slug: p.slug }));
}

function formatDate(d: string) {
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Ctx) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post || !post.published) notFound();

  const html = marked.parse(post.body, { breaks: true, async: false }) as string;

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> <Link href="/blog">Blog</Link>{" "}
            <span>/</span> {post.category}
          </p>
          <h1>{post.title}</h1>
          <p className="lede">{post.excerpt}</p>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 13,
              marginTop: 12,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {formatDate(post.date)} · {post.readTime}
            {post.author && <> · By {post.author}</>}
          </p>
          {post.tags && post.tags.length > 0 && (
            <p style={{ marginTop: 8 }}>
              {post.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    display: "inline-block",
                    marginRight: 6,
                    padding: "3px 10px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 999,
                    fontSize: 11,
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  #{t}
                </span>
              ))}
            </p>
          )}
        </div>
      </section>

      <section className="page-section">
        <div
          className="container"
          style={{ maxWidth: 760 }}
        >
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 12,
              marginBottom: 32,
            }}
          />
          <div
            className="blog-body"
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "#dfe2e7",
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div style={{ marginTop: 40 }}>
            <Link href="/blog" className="arrow-link">
              <span>←</span> Back to all posts
            </Link>
          </div>
        </div>
      </section>

      <TrialCTA />
    </>
  );
}
