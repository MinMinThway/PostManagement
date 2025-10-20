"use client";
import React, { useEffect, useState } from "react";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data.slice(0, 10)); // first 10 posts only
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // ✅ Loading spinner UI
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-3">
        <svg
          className="animate-spin h-12 w-12 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span className="text-gray-500 font-medium animate-pulse">
          Loading posts...
        </span>
      </div>
    );
  }

  // ✅ Error UI
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-40 space-y-2">
        <p className="text-red-500 text-lg font-semibold">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

  // ✅ Post list UI
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">
        📜 Post Titles
      </h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className={`p-4 border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ${
              post.title.length > 30
                ? "bg-yellow-50 border-yellow-400"
                : "bg-white border-gray-200"
            }`}
          >
            <h3 className="font-semibold text-gray-800 text-sm mb-1">
              #{post.id}
            </h3>
            <p className="text-gray-700 text-sm leading-snug">{post.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
