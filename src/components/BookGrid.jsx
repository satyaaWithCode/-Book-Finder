


// src/components/BookGrid.jsx
import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";

export default function BookGrid({ books = [], loading = false, onSelect }) {
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("relevance");

  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem("bf_theme") === "dark";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "bf_theme") {
        setIsDark(e.newValue === "dark");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const total = books?.length || 0;

  const GridWrapper = ({ children }) => (
    <div
      className={
        view === "grid"
          ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5"
          : "flex flex-col gap-4 sm:gap-5"
      }
    >
      {children}
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-6 w-56 skeleton rounded" />
          <div className="flex items-center gap-3">
            <div className="h-8 w-24 skeleton rounded" />
            <div className="h-8 w-20 skeleton rounded" />
          </div>
        </div>

        <GridWrapper>
          {Array.from({ length: view === "grid" ? 8 : 6 }).map((_, i) => (
            <div key={i} className="p-0 rounded overflow-hidden">
              <div className="w-full h-[300px] skeleton rounded-lg mb-3" />
              <div className="h-3 skeleton rounded w-3/4 mb-2" />
              <div className="h-3 skeleton rounded w-1/2" />
            </div>
          ))}
        </GridWrapper>
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="py-28 text-center">
        <div className="max-w-xl mx-auto">
          <div className="inline-flex items-center justify-center mb-6 p-6 bg-white rounded-2xl shadow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-sky-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M4 21h16" />
            </svg>
            <div className="text-left">
              <div className="text-lg font-semibold text-slate-900">No results found</div>
              <div className="text-sm text-slate-500">Try another title, author, or keyword.</div>
            </div>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-4 px-5 py-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
          >
            Go back to search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="text-sm text-slate-400">Results:</div>
          <div className="text-base font-semibold text-white">{total}</div>
          <div className="text-xs text-slate-500">items</div>
        </div>

        <div className="flex items-center flex-wrap gap-2 sm:gap-3 justify-end">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={`text-sm px-3 py-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-400
              ${isDark
                ? "bg-slate-800 border-slate-600 text-white"
                : "bg-white border-slate-300 text-slate-800"
              }`}
          >
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>

          {/* Grid/List toggle */}
          <div
            className={`inline-flex items-center rounded-lg border overflow-hidden shadow-sm ${
              isDark ? "border-slate-600 bg-slate-800" : "border-slate-300 bg-white"
            }`}
          >
            <button
              onClick={() => setView("grid")}
              className={`px-3 py-1 text-sm font-medium transition ${
                view === "grid"
                  ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-white"
                  : "text-slate-400 hover:bg-slate-700"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1 text-sm font-medium transition ${
                view === "list"
                  ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-white"
                  : "text-slate-400 hover:bg-slate-700"
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      <GridWrapper>
        {books.map((b, i) =>
          view === "grid" ? (
            <BookCard key={b.key || `${b.title}-${i}`} book={b} onClick={() => onSelect?.(b)} />
          ) : (
            <div
              key={b.key || `${b.title}-${i}`}
              onClick={() => onSelect?.(b)}
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl ${
                isDark ? "bg-slate-800 text-white" : "bg-white text-slate-800"
              } border border-slate-600/30 shadow-sm hover:shadow-lg transition`}
              role="button"
              tabIndex={0}
            >
              <div className="w-full sm:w-28 flex-shrink-0">
                {b.cover_i ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`}
                    alt={b.title}
                    className="w-full h-40 sm:h-28 object-cover rounded-lg"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-40 sm:h-28 bg-slate-700 flex items-center justify-center text-xs text-slate-300 rounded-lg">
                    No cover
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold leading-tight line-clamp-2">{b.title}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  {(b.author_name || []).slice(0, 2).join(", ") || "Unknown author"}
                </p>
                <div className="flex flex-wrap gap-2 text-xs mt-2">
                  <span className="bg-sky-600/20 text-sky-300 px-2 py-0.5 rounded-full">
                    {b.first_publish_year || "—"}
                  </span>
                  <span className="bg-sky-600/20 text-sky-300 px-2 py-0.5 rounded-full">
                    {(b.edition_count || 0) + " eds"}
                  </span>
                </div>
              </div>
            </div>
          )
        )}
      </GridWrapper>
    </div>
  );
}
