
// src/components/BookCardInner.jsx
import React from "react";
import { coverUrl } from "../lib/api";

/**
 * Poster-style card for Book Grid.
 * Keeps the same props interface: (book, onClick)
 */
function BookCardInner({ book, onClick }) {
  const cover = coverUrl(book.cover_i, "L") || coverUrl(book.cover_i, "M");
  const author = (book.author_name || []).slice(0, 2).join(", ");

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
      className="cursor-pointer transform hover:scale-[1.02] transition-all duration-300"
    >
      <div className="rounded-lg overflow-hidden shadow-lg bg-slate-800">
        {/* Poster image */}
        <div className="w-full bg-slate-200">
          <div className="relative w-full" style={{ paddingBottom: "150%" /* tall poster aspect */ }}>
            {cover ? (
              <img
                src={cover}
                alt={`${book.title} cover`}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/300x450?text=No+Cover";
                }}
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                No cover
              </div>
            )}

            {/* overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* title at bottom of poster */}
            <div className="absolute left-3 right-3 bottom-3">
              <div className="backdrop-blur-sm bg-black/40 px-3 py-2 rounded">
                <div className="text-sm font-semibold text-white leading-tight line-clamp-2">
                  {book.title}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* meta band */}
        <div className="px-3 py-3 bg-white">
          <div className="text-xs text-slate-500">{author || "Unknown author"}</div>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-sm font-medium text-slate-900 line-clamp-1">{book.title}</div>
            <div className="text-xs text-slate-400 text-right">
              <div>{book.first_publish_year || "—"}</div>
              <div className="text-[11px] mt-1">{(book.edition_count || 0) + " eds"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(BookCardInner);
