import Link from "next/link";
import type { Metadata } from "next";
import TrialCTA from "@/components/TrialCTA";
import { getPublishedBlog } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog — ATHLETIX",
  description:
    "Training tips, science-backed insights, athlete stories and behind-the-scenes from the Athletix Brisbane floor.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublishedBlog();

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span> Blog
          </p>
          <h1>
            THE <span className="accent">BLOG</span>
          </h1>
          <p className="lede">
            Training tips, science-backed insights, athlete stories and
            behind-the-scenes from the Athletix floor.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          {posts.length === 0 ? (
            <p className="lede">No posts yet — check back soon.</p>
          ) : (
            <div className="blog-grid">
              {posts.map((p) => (
                <article key={p.slug} className="blog-card">
                  <img src={p.image} alt={p.title} />
                  <div className="body">
                    <p className="meta">
                      {p.category} · {p.readTime}
                    </p>
                    <h3>{p.title}</h3>
                    <p>{p.excerpt}</p>
                    <Link href={`/blog/${p.slug}`} className="arrow-link">
                      Read article <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <TrialCTA />
    </>
  );
}
