

import React from "react";
import { coverUrl } from "../lib/api";

function BookCardInner({ book, onClick }) {
  // use medium size for grid to save bandwidth; modal uses L
  const cover = coverUrl(book.cover_i, "M");
  const author = (book.author_name || []).slice(0, 2).join(", ");

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
      className="group relative bg-gradient-to-br from-white to-sky-50 rounded-2xl border border-slate-200 hover:border-sky-300 shadow-sm hover:shadow-2xl transition-all duration-300 ease-out overflow-hidden cursor-pointer flex flex-col"
    >
      <div className="relative w-full h-52 sm:h-56 md:h-60 bg-slate-100 overflow-hidden">
        {cover ? (
          <img
            src={cover}
            alt={`${book.title} cover`}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/200x300?text=No+Cover";
            }}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
            No cover available
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3
            className="text-base font-semibold text-slate-900 leading-tight mb-1 line-clamp-2 
            group-hover:text-sky-700 transition-colors duration-300"
          >
            {book.title}
          </h3>

          <p className="text-xs text-slate-500 italic mb-2">
            {author || "Unknown author"}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 text-sky-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10m-9 8h8m-9-4h10"
              />
            </svg>
            {book.first_publish_year || "—"}
          </span>
          <span className="px-2 py-0.5 bg-sky-100 text-sky-600 rounded-full text-[10px] font-medium">
            {book.edition_count || 0} eds
          </span>
        </div>
      </div>

      <div className="absolute -inset-[1px] bg-gradient-to-r from-sky-300 to-sky-500 opacity-0 group-hover:opacity-40 blur-xl transition-all duration-700 rounded-2xl pointer-events-none" />
    </div>
  );
}

export default React.memo(BookCardInner);
