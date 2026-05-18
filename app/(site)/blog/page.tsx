import Link from "next/link";
import type { Metadata } from "next";
import TrialCTA from "@/components/TrialCTA";
import { getPublishedBlog, type BlogPost } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog — ATHLETIX",
  description:
    "Training tips, science-backed insights, athlete stories and behind-the-scenes from the Athletix Brisbane floor.",
};

export const dynamic = "force-dynamic";

export const POSTS_PER_PAGE = 10;

function formatDateBadge(d: string): { day: string; month: string } {
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return { day: "—", month: "—" };
  const day = String(date.getDate()).padStart(2, "0");
  const month = date
    .toLocaleDateString("en-AU", { month: "short" })
    .toUpperCase();
  return { day, month };
}

export function BlogListing({
  posts,
  page,
  totalPages,
}: {
  posts: BlogPost[];
  page: number;
  totalPages: number;
}) {
  return (
    <>
      <link rel="stylesheet" href="/css/blog-page.css" />

      <section className="page-banner page-banner--blog page-banner--compact">
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

      <section className="page-section blog-listing">
        <div className="container">
          {posts.length === 0 ? (
            <p className="lede">No posts yet — check back soon.</p>
          ) : (
            <>
              <div className="blog-grid" id="athletixBlogGrid">
                {posts.map((p) => {
                  const { day, month } = formatDateBadge(p.date);
                  return (
                    <article key={p.slug} className="blog-card">
                      <Link
                        href={`/blog/${p.slug}`}
                        className="blog-card-media"
                        aria-hidden="true"
                        tabIndex={-1}
                      >
                        <img src={p.image} alt={p.title} loading="lazy" />
                        <span className="date-badge" aria-hidden="true">
                          <span className="d">{day}</span>
                          <span className="m">{month}</span>
                        </span>
                      </Link>
                      <div className="body">
                        <h3>
                          <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                        </h3>
                        <p>{p.excerpt}</p>
                        <Link href={`/blog/${p.slug}`} className="view-here">
                          View here <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>

              <Pagination page={page} totalPages={totalPages} />
            </>
          )}
        </div>
      </section>

      <TrialCTA />
    </>
  );
}

function pageHref(n: number): string {
  return n === 1 ? "/blog" : `/blog/page/${n}`;
}

function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  // Build a compact list of page numbers with dots, e.g. 1 … 4 [5] 6 … 9
  const nums: (number | "dots")[] = [];
  const add = (n: number | "dots") => {
    if (n === "dots") {
      if (nums[nums.length - 1] !== "dots") nums.push("dots");
    } else if (!nums.includes(n)) {
      nums.push(n);
    }
  };
  add(1);
  if (page > 3) add("dots");
  for (let i = page - 1; i <= page + 1; i++) {
    if (i > 1 && i < totalPages) add(i);
  }
  if (page < totalPages - 2) add("dots");
  if (totalPages > 1) add(totalPages);

  return (
    <nav className="blog-pagination" aria-label="Posts navigation">
      {page > 1 && (
        <Link className="prev page-numbers" href={pageHref(page - 1)}>
          ← Prev
        </Link>
      )}
      {nums.map((n, i) =>
        n === "dots" ? (
          <span key={`d-${i}`} className="page-numbers dots">
            …
          </span>
        ) : n === page ? (
          <span
            key={n}
            aria-current="page"
            className="page-numbers current"
          >
            {n}
          </span>
        ) : (
          <Link key={n} className="page-numbers" href={pageHref(n)}>
            {n}
          </Link>
        ),
      )}
      {page < totalPages && (
        <Link className="next page-numbers" href={pageHref(page + 1)}>
          Next →
        </Link>
      )}
    </nav>
  );
}

export default async function BlogPage() {
  const all = await getPublishedBlog();
  const totalPages = Math.max(1, Math.ceil(all.length / POSTS_PER_PAGE));
  const posts = all.slice(0, POSTS_PER_PAGE);
  return <BlogListing posts={posts} page={1} totalPages={totalPages} />;
}
