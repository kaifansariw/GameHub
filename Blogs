import React, { useEffect, useState } from "react";

/**
 * BlogSection.jsx
 * Single-file React component (default export) for a responsive Blog section.
 * - TailwindCSS + DaisyUI-friendly classes
 * - Glassmorphism style cards
 * - Search, tag filter, read-more modal
 * - Create new post (stored in localStorage)
 *
 * Usage: import BlogSection from './BlogSection.jsx' and render <BlogSection />
 */

const STORAGE_KEY = "mini_games_blog_posts_v1";

const samplePosts = [
  {
    id: "p1",
    title: "Mastering Snake: 5 Quick Tips",
    excerpt:
      "Small moves add up — learn space management, corner avoidance, and controlled turns to push your high score.",
    content:
      "Small moves add up. Tip 1: control your speed and plan 3 moves ahead. Tip 2: use the walls as guides but avoid getting trapped in corners. Tip 3: create loops to buy yourself time. Tip 4: always keep an escape path. Tip 5: practice patience — high scores come from consistent play.",
    tags: ["strategy", "snake"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
  {
    id: "p2",
    title: "Tic Tac Toe: When to Force a Draw",
    excerpt:
      "Tic Tac Toe looks simple — but learning forced draws and optimal openings wins friendly games.",
    content:
      "Start in the corner if you can and aim for forks. Pay attention to immediate blocks and always look for double-threats. This article shows examples and practice puzzles.",
    tags: ["tactics", "tic-tac-toe"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
];

function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initial;
    } catch (e) {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      // ignore
    }
  }, [key, state]);

  return [state, setState];
}

export default function BlogSection() {
  const [posts, setPosts] = useLocalStorage(STORAGE_KEY, samplePosts);
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [activePost, setActivePost] = useState(null);
  const [showNew, setShowNew] = useState(false);

  // derived tags
  const tags = Array.from(
    new Set(posts.flatMap((p) => p.tags || []).concat(["all"]))
  );

  function handleCreate(post) {
    const newPost = {
      id: uid("p"),
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      tags: post.tags || [],
      createdAt: Date.now(),
    };
    setPosts([newPost, ...posts]);
    setShowNew(false);
  }

  function handleDelete(id) {
    if (!confirm("Delete this post?")) return;
    setPosts(posts.filter((p) => p.id !== id));
    setActivePost(null);
  }

  const filtered = posts.filter((p) => {
    const matchesQuery =
      query.trim() === "" ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      p.content.toLowerCase().includes(query.toLowerCase());
    const matchesTag = selectedTag === "all" || (p.tags || []).includes(selectedTag);
    return matchesQuery && matchesTag;
  });

  return (
    <section className="max-w-6xl mx-auto p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold">Game Journal</h2>
          <span className="text-sm text-slate-400">Tips, updates & tutorials</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="input-group">
            <input
              aria-label="Search posts"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
              className="input input-bordered input-sm w-64 bg-white/5 backdrop-blur"
            />
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setQuery("")}
              title="Clear"
            >
              Clear
            </button>
          </div>

          <div className="hidden sm:block">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="select select-sm select-bordered bg-white/5 backdrop-blur"
              aria-label="Filter by tag"
            >
              {tags.map((t) => (
                <option key={t} value={t}>
                  {t === "all" ? "All" : t}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-primary btn-sm" onClick={() => setShowNew(true)}>
            New Post
          </button>
        </div>
      </div>

      <div className="mb-4 flex gap-2 flex-wrap">
        {tags
          .filter((t) => t !== "all")
          .slice(0, 8)
          .map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`btn btn-xs btn-outline rounded-full ${selectedTag === t ? "btn-active" : ""}`}
            >
              {t}
            </button>
          ))}

        <button
          onClick={() => setSelectedTag("all")}
          className={`btn btn-xs rounded-full ${selectedTag === "all" ? "btn-primary" : "btn-ghost"}`}
        >
          Show All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-slate-400">No posts found.</div>
        )}

        {filtered.map((post) => (
          <article
            key={post.id}
            className="rounded-2xl p-4 border border-white/5 bg-gradient-to-br from-white/3 to-white/2 backdrop-blur shadow-lg"
            role="article"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-sm text-slate-400 mt-1">{post.excerpt}</p>
              </div>
              <div className="text-right text-xs text-slate-400">{new Date(post.createdAt).toLocaleDateString()}</div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {(post.tags || []).map((tag) => (
                <span key={tag} className="badge badge-outline badge-sm">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <button className="btn btn-sm btn-outline" onClick={() => setActivePost(post)}>
                Read
              </button>
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => {
                  navigator.clipboard?.writeText(`${window.location.href}#post-${post.id}`);
                  alert("Post link copied to clipboard");
                }}
              >
                Share
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Read modal */}
      {activePost && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setActivePost(null)} />
          <div className="relative max-w-3xl w-full rounded-2xl p-6 bg-white/5 backdrop-blur border border-white/5 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{activePost.title}</h3>
                <div className="text-sm text-slate-400">{new Date(activePost.createdAt).toLocaleString()}</div>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-sm btn-error" onClick={() => handleDelete(activePost.id)}>
                  Delete
                </button>
                <button className="btn btn-sm" onClick={() => setActivePost(null)}>
                  Close
                </button>
              </div>
            </div>

            <div className="mt-4 prose max-w-none text-sm">
              {activePost.content}
            </div>
          </div>
        </div>
      )}

      {/* New post modal */}
      {showNew && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowNew(false)} />
          <div className="relative max-w-2xl w-full rounded-2xl p-6 bg-white/5 backdrop-blur border border-white/5 shadow-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Create new blog post</h3>
              <button className="btn btn-sm" onClick={() => setShowNew(false)}>
                Close
              </button>
            </div>

            <NewPostForm onSubmit={handleCreate} />
          </div>
        </div>
      )}
    </section>
  );
}

function NewPostForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required");
      return;
    }
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    onSubmit({ title: title.trim(), excerpt: excerpt.trim(), content: content.trim(), tags });
    setTitle("");
    setExcerpt("");
    setContent("");
    setTagsInput("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <div>
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full bg-white/5 backdrop-blur"
          placeholder="e.g. 5 Ways to Improve at Memory Flip"
        />
      </div>

      <div>
        <label className="label">
          <span className="label-text">Excerpt (short)</span>
        </label>
        <input
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="input input-bordered w-full bg-white/5 backdrop-blur"
          placeholder="One-sentence summary"
        />
      </div>

      <div>
        <label className="label">
          <span className="label-text">Content</span>
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea textarea-bordered w-full bg-white/5 backdrop-blur h-40"
        />
      </div>

      <div>
        <label className="label">
          <span className="label-text">Tags (comma separated)</span>
        </label>
        <input
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          className="input input-bordered w-full bg-white/5 backdrop-blur"
          placeholder="e.g. strategy, snake"
        />
      </div>

      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary">
          Publish
        </button>
      </div>
    </form>
  );
}
